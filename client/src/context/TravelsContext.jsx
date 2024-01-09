import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorageUtils';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const TravelsContext = createContext()


export const TravelsProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
      const tokenLocalStorage = getLocalStorage("token")
      setToken(tokenLocalStorage)

      if(tokenLocalStorage){
        const { id, type } = jwtDecode(tokenLocalStorage).user;
        
        console.log("el token", id, type);
        axios
          .get(`http://localhost:3000/users/oneuser/${id}`)
          .then((res)=>{
            setUser(res.data)
          })
          .catch((err)=>{console.log(err)})            
      }
    }, [])
    

  return (
    <TravelsContext.Provider value={{
        user, 
        setUser, 
        token, 
        setToken
    }}>
        {children}
    </TravelsContext.Provider>
  )
}
