import React from 'react'
import {Card, Button, } from 'react-bootstrap'

export const CardUser = ({elem}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:3000/images/travels/${elem.picture_img}`}/>
      <Card.Body>
        <Card.Title>{elem.travel_city}</Card.Title>
        <Card.Text>pais: {elem.country}</Card.Text>
        <Card.Text>
         {elem.description}
        </Card.Text>
        <div>
            {elem.user_img?<img 
                src={`http://localhost:3000/images/users/${elem.user_img}`} 
                alt="" 
                style={{width:"50px", height:"50"}}
            />: <p>{elem.name.charAt(0).toUpperCase()}</p>}
        </div>
        <Button variant="primary">ver mas</Button>
      </Card.Body>
    </Card>
  )
}
