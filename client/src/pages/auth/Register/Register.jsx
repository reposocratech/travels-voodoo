import React, { useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const initialValue = {
    name: "",
    email: "",
    password: ""
}

export const Register = () => {
    const [register, setRegister] = useState(initialValue)
    const [msgError, setMsgError] = useState("")

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setRegister({...register, [name]: value})
    }

    const handleSubmit = (e) => {
        //validación de datos: si bien axios, mal cartelito
        if(!register.name || !register.email || !register.password){
            setMsgError("Algun campo no está relleno")
        }else{
            axios
                .post("http://localhost:3000/users/createuser", register)
                .then((res)=>{
                    navigate('/login')
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.response.data.error?.errno === 1062){
                        setMsgError("Email duplicado")
                    }else if(err.response.data.error?.errno === 1406){
                        setMsgError("campo demasiado largo")
                    }else{
                        setMsgError("upps ha habido algún error")
                    }
                })
        }
    }



  return (
    <Row className='d-flex justify-content-center p-5'>
    <Col md={4}>
    <Form>
        <h2>registro</h2>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Nombre</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter name" 
        name='name'
        value={register.name}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter email" 
        name='email'
        value={register.email}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Email address</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Enter password" 
        name='password'
        value={register.password}
        onChange={handleChange}
      />
    </Form.Group>
    <p>{msgError}</p>

   
    <Button 
        variant="primary" 
        onClick={handleSubmit}
    >
      Submit
    </Button>
  </Form>
    </Col>
    </Row>
  )
}
