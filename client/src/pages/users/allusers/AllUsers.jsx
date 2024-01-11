import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CardUser } from '../../../components/CardUser/CardUser';
import { TravelsContext } from '../../../context/TravelsContext';

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState();
  const { token } = useContext(TravelsContext)

  useEffect(()=>{
    if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios
    
      .get("http://localhost:3000/users/allusers")
      .then((res)=>{
        setAllUsers(res.data)
      })
      .catch((err)=>{})
    }
  }, [token])

  return (
    <div className='d-flex flex-wrap gap-3'>
       {allUsers?.map((elem)=>{
        return(
          <CardUser 
            key={elem.travel_id}
            elem={elem}
          />
        )
       })}
    </div>
  )
}
