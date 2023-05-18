import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'

import {authRoutes, publicRoutes} from "../routes";
import {AppContext} from "./AppContext";

const AppRouter = () => {
    const {user} = useContext(AppContext)
    return (
        <Routes>
            {publicRoutes.map(({path, component})=>
                <Route
                    path={path} element={component} key={path}
                />
            )}
            {user.id && authRoutes.map(({path, component})=>
                <Route
                    path={path} element={component} key={path}
                />
            )}
        </Routes>

    )
}

export default AppRouter