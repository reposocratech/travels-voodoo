import React, {useContext, useEffect, useState} from 'react'
import { TravelsContext } from '../../../context/TravelsContext'
import {Col, Row} from 'react-bootstrap'

export const AdminHome = () => {
  const [total, setTotal] = useState();
  const [totalEnabled, setTotalEnabled] = useState();
  const [totalDisabled, setTotalDisabled] = useState();
  const {adminUsers} = useContext(TravelsContext)

  console.log(adminUsers);

  useEffect(()=>{
    setTotal(adminUsers?.length)
    setTotalEnabled(adminUsers?.filter(e=>e.is_deleted === 0).length)
    setTotalDisabled(adminUsers?.filter(e=>e.is_deleted === 1).length)
 },[adminUsers])
 

  return (
    <>
      <Col>
        <Row>
          <Col>
            <h2>Administración</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <h3>Usuarios Totales</h3>
              {total}
            </div>
          </Col>
          <Col>
            <div>
              <h3>Usuarios deshabilitados</h3>
              {totalDisabled}
            </div>
          </Col>
          <Col>
          <div>
              <h3>Usuarios habilitados</h3>
              {totalEnabled}
            </div>
          </Col>
        </Row>
      </Col>
    </>
  )
}
