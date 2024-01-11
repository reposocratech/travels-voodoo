import React, { useContext, useState } from 'react'
import { TravelsContext  } from '../../../../context/TravelsContext'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CreateTravel } from '../../../../components/CreateTravel/CreateTravel'
import { TravelGallery } from '../../../../components/TravelGallery/TravelGallery'

export const User = () => {
  const [showCreateTravel, setShowCreateTravel] = useState(false);
  const {user} = useContext(TravelsContext);
  const navigate = useNavigate();
console.log("estoy en el comp user", user);
  return (
    <>
    <Col>
      <h2>Perfil de usuario</h2>
      <div className='d-flex'>
        <div className='d-flex p-5 flex-column align-items-lg-center '>
          <p>Nombre: {user?.name}</p>
          <p>Apellidos: {user?.lastname}</p>
          <p>Dirección: {user?.address}</p>
          <p>Ciudad: {user?.user_city}</p>
          <p>Email: {user?.email}</p>
          <Button onClick={()=>navigate('/edituser')}>Editar</Button>
          <Button className='mt-5' onClick={()=>setShowCreateTravel(true)}>Crear Viaje</Button>
        </div>
        {user?.user_img?
          <img src={`http://localhost:3000/images/users/${user?.user_img}`} />
          :
          <p>{user?.name.charAt(0).toUpperCase()}</p>
        }
      </div>
    </Col>
    <Col>
    {showCreateTravel && <CreateTravel 
                            setShowCreateTravel={setShowCreateTravel}
                            user_id={user.user_id}
    />}
    </Col>
    <Row>
      <Col>
        <TravelGallery />
      </Col>
    </Row>
  </>
  )
}
