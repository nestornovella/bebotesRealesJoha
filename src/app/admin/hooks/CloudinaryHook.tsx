
import { showToast } from '@/app/helpers/tostify';
import axios from 'axios';
import { useState } from 'react';


function useCloudinary() {

  const [imageUrl, setImageUrl] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dg7galjwj/image/upload/"
  const CLOUDINARY_PRESET = "j3wpntjr"

  async function uploadToCloudinary(file) {
    showToast('subiendo imagen', 'info')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)
    if (file) {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(response.data.url){
        setImageUrl(response.data.url)
        showToast('Imagen subida con exito', 'success')
      }else{
        showToast('No se logro subir la imagen', 'error')
      }
    }
  }

  return {
    uploadToCloudinary,
    imageUrl
  }

}
export default useCloudinary