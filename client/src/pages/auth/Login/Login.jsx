import React, { useContext, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {TravelsContext} from "../../../context/TravelsContext"
import { saveLocalStorage } from '../../../helpers/localStorageUtils'

const initialValue = {
  email: "",
  password: ""
}

export const Login = () => {
  const [login, setLogin] = useState(initialValue)
  const [msgError, setMsgError] = useState("")

  const {setUser, setToken, setIsLogged} = useContext(TravelsContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  }

  const handleSubmit = () =>{
      axios
        .post("http://localhost:3000/users/login", login)
        .then((res)=>{
          // setUser(res.data.user)
          setIsLogged(true)
          setToken(res.data.token)
          saveLocalStorage("token", res.data.token)

          const type = res.data.user.type;
          console.log("tipo, tipo", type);
          if(type === 1){
            navigate("/allusers")
          }else if(type === 2 ){
            navigate("/admin")
          }else{
            navigate("/")
          }
        })
        .catch((err)=>{setMsgError(err.response.data)})
  }

  return (
    <Row className='d-flex justify-content-center p-5'>
    <Col md={4}>
    <Form>
        <h2>Login</h2>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter email" 
        name='email'
        value={login.email}
        onChange={handleChange}
      />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Enter password" 
        name='password'
        value={login.password}
        onChange={handleChange}
      />
    </Form.Group>
    <p>{msgError}</p>

   
    <Button 
        variant="primary me-2" 
        onClick={handleSubmit}
    >
      Submit
    </Button>
    <Button 
        variant="primary" 
        onClick={()=>navigate("/")}
    >
      Cancelar
    </Button>
    <p>No estás registrado? <Link to={"/register"}>Regístrate</Link></p>
  </Form>
    </Col>
    </Row>
  )
}
