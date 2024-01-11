import React, { useEffect, useState } from 'react'
import {Button} from 'react-bootstrap'
import trash from '../../assets/delete.svg'
import axios from 'axios'

export const GalleryOneTravel = ({travel_id}) => {
    const [images, setImages] = useState();
    
    useEffect(()=>{
        axios
            .get(`http://localhost:3000/travels/getpicsonetravel/${travel_id}`)
            .then((res)=>{
                setImages(res.data)
            })
            .catch((err)=>{})
    }, [])

    const handleFiles = (e) =>{
        console.log(e.target.files);
        const newFormData = new FormData();

        for(const elem of e.target.files){
            newFormData.append("file", elem)
        }

        axios
            .put(`http://localhost:3000/travels/addPics/${travel_id}`, newFormData)
            .then((res)=>{
                setImages(res.data);
            })
            .catch((err)=>{})
    }

    const delPicture = (id) => {
        axios
            .put(`http://localhost:3000/travels/delpic/${id}`)
            .then((res)=>{
                setImages(images.filter(e=>e.picture_id !== id))
            })
            .catch((err)=>{})
    }

  return (
    <div className='contPictures'>
        {images?.map((elem)=>{
            return(
                <div key={elem.picture_id}>
                    <img src={`http://localhost:3000/images/travels/${elem.picture_img}`} alt="" />
                    <button 
                        onClick={()=>delPicture(elem.picture_id)}
                        style={{color:"red", border:"none"}}>
                        <img 
                            style={{width:"40px", height:"40px", color:"red"}}
                        src={trash}/>
                    </button>
                </div>
            )
        })}
        <div>
            <label htmlFor={travel_id}><span style={{fontSize:"3rem", cursor: "pointer"}}>⬆️</span></label>
            <input 
                type="file" 
                id={travel_id}
                onChange={handleFiles}
                multiple
                hidden
            />

        </div>
    </div>
  )
}
