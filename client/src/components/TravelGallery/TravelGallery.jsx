import React, { useContext, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { TravelsContext } from "../../context/TravelsContext";
import "./gallery.scss";
import { GalleryOneTravel } from "../GalleryOneTravel/GalleryOneTravel";
import { ModalEditTravel } from "../ModalEditTravel/ModalEditTravel";

export const TravelGallery = () => {
  const [showModal, setShowModal] = useState(false)
  const { travels } = useContext(TravelsContext);
  const [travelToEdit, setTravelToEdit] = useState();

  const openModal = (viaje) =>{
    setTravelToEdit(viaje)
    setShowModal(true)
  }

  return (
    <Col className="d-flex flex-column">
      {travels?.map((elem) => {
        return (
          <div key={elem.travel_id} className="travel">
            <div>
              <h3>Viaje:</h3>
              <h4>Ciudad: {elem.travel_city}</h4>
              <h4>Pais: {elem.country}</h4>
              <p>Descripción: {elem.description}</p>
              <Button className="me-2">Eliminar</Button>
              <Button onClick={()=>openModal(elem)}>Editar</Button>
            </div>
            <GalleryOneTravel travel_id={elem.travel_id} />
          </div>
        )
        
      })}
      <ModalEditTravel 
        setShowModal={setShowModal}
        showModal={showModal}
        travelToEdit={travelToEdit}
        setTravelToEdit={setTravelToEdit}
      /> 
    </Col>
  );
};
