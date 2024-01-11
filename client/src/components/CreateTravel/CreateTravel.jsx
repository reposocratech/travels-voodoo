import React, { useContext, useState } from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { TravelsContext } from '../../context/TravelsContext'

const initialValue = {
    travel_city:"",
    country:"",
    description:""
}

export const CreateTravel = ({setShowCreateTravel, user_id}) => {
    const [registerTravel, setRegisterTravel] = useState(initialValue);
    const [files, setFiles] = useState();
    const [msgError, setMsgError] = useState("");
    const {setTravels} = useContext(TravelsContext)
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setRegisterTravel({...registerTravel, [name]:value})
    }
    
    const handleFiles = (e) =>{
        setFiles(e.target.files)
    }
    
    const handleSubmit = () =>{
        if(!registerTravel.travel_city || !registerTravel.country || !registerTravel.description){
            setMsgError("Debes rellenar todos los campos!!!")
        }else{
            
            let temp = {...registerTravel, user_id: user_id}

            const newFormData = new FormData();
            newFormData.append("regTravel", JSON.stringify(temp))

            if(files){
                for(const elem of files){
                    newFormData.append("file", elem)
                }
            }

            axios
                .post('http://localhost:3000/travels/createtravel', newFormData)
                .then((res)=>{
                  setTravels(res.data)
                  setShowCreateTravel(false)
                })
                .catch((err)=>console.log(err))

        }
    }

console.log(registerTravel);
console.log(files);

  return (
    <Row className='d-flex justify-content-center p-5'>
    <Col md={4}>
    <Form>
        <h2>Registro de viaje</h2>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Ciudad</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter city" 
        name='travel_city'
        value={registerTravel.travel_city}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Pais</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter country" 
        name='country'
        value={registerTravel.country}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Descripción</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="description" 
        name='description'
        value={registerTravel.description}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Imagenes</Form.Label>
            <Form.Control 
              type="file"  
              onChange={handleFiles}
              multiple
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
        onClick={()=>setShowCreateTravel(false)}
    >
      Cancelar
    </Button>
  </Form>
    </Col>
    </Row>
  )
}
