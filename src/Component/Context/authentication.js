import { useEffect, useState } from "react";
import { createContext } from "react";



export const authcontext =  createContext();

export function AuthProvider( {children} ){

    const [token, setToken] = useState(null);

    useEffect(() => {
       if (localStorage.getItem( "tkn" ) !== null ) {
        setToken( localStorage.getItem( "tkn" ) );
       }
    }, []);
    
    return <authcontext.Provider  value={ { token , setToken } }>

        {children}  


    </authcontext.Provider>

}