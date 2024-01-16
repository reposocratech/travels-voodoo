import React, { useContext } from 'react'
import { AdminTable } from '../../../components/AdminTable/AdminTable'
import { TravelsContext } from '../../../context/TravelsContext'

export const AdminUsers = () => {
  const {adminUsers, setAdminUsers} = useContext(TravelsContext);

  return (
    <div>
      <h2>Administración Usuarios</h2>
      <AdminTable 
        adminUsers={adminUsers} 
        setAdminUsers={setAdminUsers}
      />
    </div>
  )
}
