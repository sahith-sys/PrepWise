import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = (props)=> {
    const[user, setUser] = useState(()=>{
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });

    const value = {
        user,
        setUser
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };