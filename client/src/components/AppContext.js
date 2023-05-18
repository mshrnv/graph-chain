import React, {createContext} from "react";

const AppContext = createContext()

const context = {
    user: {
        id: 'v'
    }
}

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    )
}
export {AppContext, AppContextProvider}