import axios from "axios";
import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TravelsContext } from "../../context/TravelsContext";

export const ModalEditTravel = ({ showModal, setShowModal, travelToEdit, setTravelToEdit }) => {
  const { travels, setTravels} = useContext(TravelsContext)

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(travelToEdit);
  console.log("treavels", travels);

  const handleChange = (e) => {
    const {name, value} =e.target
    setTravelToEdit({...travelToEdit, [name]:value})
  }
  
  const handleSubmit = () => {

    const newTravels = travels.map((elem)=>(
      elem.travel_id === travelToEdit.travel_id? travelToEdit: elem      
    ))
    
    axios
      .put("http://localhost:3000/travels/edittravel", travelToEdit)
      .then((res)=>{
        setShowModal(false)
        setTravels(newTravels)
      })
      .catch((err)=>{})
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h2>Editar viaje</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="travel_city"
              value={travelToEdit?.travel_city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pais</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={travelToEdit?.country}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={travelToEdit?.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
