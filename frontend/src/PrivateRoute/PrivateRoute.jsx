import React from "react";
import {useAuthContext} from "../store/AuthCtxProvider.jsx";
import {Navigate} from "react-router-dom";

export default function PrivateRoute({children}) {
    const {isUserLoggedIn} = useAuthContext()

    return isUserLoggedIn ? children : <Navigate to='/' />
}
