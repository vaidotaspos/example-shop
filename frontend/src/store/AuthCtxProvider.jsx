import {createContext, useContext, useState} from 'react';
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({
    token: '',
    email: '',
    userId: '',
    login(email, token) {},
    logout() {},
    isUserLoggedIn: false,
});

function parseJWTTokenData(token) {
  if (!token) return {};

  const tokenData = jwtDecode(token);

  const dataNow = Date.now() / 1000;
  const expire = tokenData.exp + tokenData.iat;

  if (dataNow > expire) {
    localStorage.removeItem('token');
    return {};
  }

  return {...tokenData, token:token}
}

export default function AuthCtxProvider({children}) {
    let tokenData = parseJWTTokenData(localStorage.getItem('token'));

    const [authState, setAuthState] = useState({
        token: tokenData?.token || '',
        email: tokenData?.email || '',
        userId: tokenData?.sub || '',
    });

    function login(email, token) {
        const tokenData = jwtDecode(token)

        setAuthState({
            token: token,
            email: email,
            userId: tokenData.sub
        });

        localStorage.setItem('token', token)
    }

    function logout() {
        localStorage.removeItem('token');

        setAuthState({
            token: '',
            email: '',
            userId: '',
        });
    }

    const isUserLoggedIn = !!authState.token;

    const ctxValue = {
        isUserLoggedIn,
        token: authState.token,
        email: authState.email,
        userId: authState.userId,
        login,
        logout,
    };

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
