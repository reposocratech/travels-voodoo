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
    const [adminUsers, setAdminUsers] =  useState()

    useEffect(() => {
      const tokenLocalStorage = getLocalStorage("token")
      setToken(tokenLocalStorage)

      if(tokenLocalStorage){
       
        const { id, type } = jwtDecode(tokenLocalStorage).user;

          axios
          .get(`http://localhost:3000/users/oneuser/${id}`)
          .then((res)=>{
            setUser(res.data.result)
            setTravels(res.data.resultTravel)
            setIsLogged(true)
          })
          .catch((err)=>{console.log(err)})            

          if(type === 2){
            axios
              .get('http://localhost:3000/admin/getAllUsers')
              .then((res)=>setAdminUsers(res.data))
              .catch((err)=>console.log(err))
          }
      }
    }, [isLogged])
    
  return (
    <TravelsContext.Provider value={{
        user, 
        setUser, 
        token, 
        setToken,
        isLogged,
        setIsLogged,
        travels,
        setTravels,
        adminUsers,
        setAdminUsers     
    }}>
        {children}
    </TravelsContext.Provider>
  )
}
