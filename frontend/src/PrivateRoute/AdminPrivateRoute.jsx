import React from "react";
import {useAuthContext} from "../store/AuthCtxProvider.jsx";
import {Navigate} from "react-router-dom";

export default function AdminPrivateRoute({children}) {
    const {isUserLoggedIn, isUserAdmin} = useAuthContext()

    if (isUserLoggedIn) {
        return isUserAdmin ? children : <Navigate to='/' />;
    } else {
        return <Navigate to='/login' />
    }
}
