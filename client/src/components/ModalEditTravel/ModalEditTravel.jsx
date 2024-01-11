import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const ModalEditTravel = ({ showModal, setShowModal, travelToEdit, setTravelToEdit }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  console.log(travelToEdit);

  const handleChange = (e) => {
    const {name, value} =e.target
    setTravelToEdit({...travelToEdit, [name]:value})
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
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
