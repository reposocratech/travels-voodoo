import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorageUtils';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const TravelsContext = createContext()


export const TravelsProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [travels, setTravels] = useState();
    const [token, setToken] = useState();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      const tokenLocalStorage = getLocalStorage("token")
      setToken(tokenLocalStorage)

      if(tokenLocalStorage){
        const { id, type } = jwtDecode(tokenLocalStorage).user;
        
        console.log("el token", id, type);
        axios
          .get(`http://localhost:3000/users/oneuser/${id}`)
          .then((res)=>{
            console.log(res)
            setUser(res.data.result)
            setTravels(res.data.resultTravel)
            setIsLogged(true)
          })
          .catch((err)=>{console.log(err)})            
      }
    }, [isLogged])
    
console.log("isLooogggeeedd", isLogged);
  return (
    <TravelsContext.Provider value={{
        user, 
        setUser, 
        token, 
        setToken,
        isLogged,
        setIsLogged,
        travels,
        setTravels
    }}>
        {children}
    </TravelsContext.Provider>
  )
}
