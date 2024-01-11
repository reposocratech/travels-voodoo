import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
  return (
    <div className='contPictures'>
        {images?.map((elem)=>{
            return(
                <div key={elem.picture_id}>
                    <img src={`http://localhost:3000/images/travels/${elem.picture_img}`} alt="" />
                </div>
            )
        })}
    </div>
  )
}
