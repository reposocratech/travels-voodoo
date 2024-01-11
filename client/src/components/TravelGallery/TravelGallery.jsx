import React, { useContext, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { TravelsContext } from "../../context/TravelsContext";
import "./gallery.scss";
import { GalleryOneTravel } from "../GalleryOneTravel/GalleryOneTravel";
import { ModalEditTravel } from "../ModalEditTravel/ModalEditTravel";
import axios from "axios";

export const TravelGallery = () => {
  const [showModal, setShowModal] = useState(false)
  const { travels, setTravels } = useContext(TravelsContext);
  const [travelToEdit, setTravelToEdit] = useState();

  const openModal = (viaje) =>{
    setTravelToEdit(viaje)
    setShowModal(true)
  }

  const delTravel = (id) =>{
    axios
      .put(`http://localhost:3000/travels/deltravel/${id}`)
      .then((res)=>{
        let temp = travels.filter(elem=>elem.travel_id !== id)
        setTravels(temp)
        // setTravels(travels.filter(e=>e.travel_id !== id))
      })
      .catch((err)=>{console.log(err)})

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
              <Button onClick={()=>delTravel(elem.travel_id)} className="me-2">Eliminar</Button>
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
