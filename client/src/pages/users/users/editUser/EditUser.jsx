import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TravelsContext } from "../../../../context/TravelsContext";
import axios from "axios";

const initialValue = {
  name:"",
  lastname:"",
  address:"",
  user_city:""
}

export const EditUser = () => {
  const [editUser, setEditUser] = useState(initialValue)//la primera vez que carga
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("")
  
  const {user, setUser} = useContext(TravelsContext);

  useEffect(()=>{
    if(user){
      setEditUser(user)
    }
  }, [user])
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditUser({...editUser, [name]:value})
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = () => {
    if(!editUser.name || !editUser.lastname || !editUser.address || !editUser.user_city){
      setMsgError("Algun campo no está relleno")
  }else{
    const newFormData = new FormData();

    newFormData.append("editUser", JSON.stringify(editUser))
    newFormData.append("file", file)

    axios
      .put("http://localhost:3000/users/edituser", newFormData)
      .then((res)=>{
        console.log(res)
        if(res.data.img){
          setUser({...editUser, user_img:res.data.img})
        }else{
          setUser(editUser)
        }
        navigate('/user')
      })
      .catch((err)=>{console.log(err)})
    }
  }

  console.log("user", user);
  console.log("editUSer", editUser);

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h2>Editar usuario</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={editUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              name="lastname"
              value={editUser.lastname?editUser.lastname:""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={editUser.address?editUser.address:""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="user_city"
              value={editUser.user_city?editUser.user_city:""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control 
              type="file"  
              onChange={handleFile}
            />
          </Form.Group>
          <p>{msgError}</p>

          <Button variant="primary me-2" onClick={handleSubmit}>
            Submit
          </Button>

          <Button variant="primary" onClick={() => navigate("/user")}>
            Cancelar
          </Button>
          
        </Form>
      </Col>
    </Row>
  );
};
