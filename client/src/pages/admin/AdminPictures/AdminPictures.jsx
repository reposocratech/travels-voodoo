import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './adminPictures.scss';
import deleted from '../../../assets/delete.svg'

export const AdminPictures = () => {
  const [pics, setPics] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getAllPics")
      .then((res) => {
        console.log(res);
        setPics(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEnable = (id, is_del) =>{
    console.log(id)
    console.log(is_del)

    let url=`http://localhost:3000/admin/disablePic/${id}`;
        
        if(is_del === 1){
         console.log("hola")
            url=`http://localhost:3000/admin/enablePic/${id}`;
        }

        axios
            .put(url)
            .then((res)=>{
                console.log(res.data);
                setPics(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })
}

  return (
    <div >
    {pics && (
       <div className="contFotos">
         {pics.map((pic, index) => {
           return (
             <div key={index} className="adminPics">
               {pic.is_deleted === 0 ? 
               <img src={`http://localhost:3000/images/travels/${pic.picture_img}`} />: <img src="/deleted.png" />}
               <button 
               className="m-2"
               onClick={()=>handleEnable(pic.picture_id, pic.is_deleted)}
               >{pic.is_deleted===0 ? "desable":"enable"}</button>
             </div>
           );
         })}
       </div>
     )}
   </div>
   
);
}
