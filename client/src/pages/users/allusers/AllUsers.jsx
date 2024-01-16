import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CardUser } from '../../../components/CardUser/CardUser';
import { TravelsContext } from '../../../context/TravelsContext';
import { Button } from 'react-bootstrap';
import { textSensitive } from '../../../helpers/utils';

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState();
  const [foundUsers, setFoundUsers] = useState();
  const [filter, setFilter] = useState("");
  const [msn, setMsn] = useState("");
  const { token } = useContext(TravelsContext)

  useEffect(()=>{
    if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios
    
      .get("http://localhost:3000/users/allusers")
      .then((res)=>{  
        setAllUsers(res.data)
        setFoundUsers(res.data)
      })
      .catch((err)=>{
        console.log(err)
        if(err.response.status === 401){
          setMsn("No estás autorizado!!!!!!😡")
        }
      })
    }
  }, [token])

  const onChange = (e) => {
    setFilter(e.target.value)
  }

  const handleClick = (e) => {
    if(filter === ''){
      setFoundUsers(allUsers);
    }else{
      const tempArray = allUsers.filter((e)=>{
        return (
          textSensitive(e.travel_city, filter)
          ||
          textSensitive(e.country, filter)
          ||
          textSensitive(e.description, filter)

        )
      })
      setFoundUsers(tempArray)
    }
  }

  return (
    <div className='d-flex flex-wrap gap-3'>
      <h2>{msn}</h2>
       <div>
        <label>buscar por ciudad o pais o descripción</label>
        <input 
          onChange={onChange}
          value={filter}
        />
      

        <Button onClick={handleClick}>Buscar</Button>
       </div>
       {foundUsers?.map((elem)=>{
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
