import React, {useState, useEffect} from 'react';
import ImageCard from '../components/ImageCard';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const DeleteImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    serverBase.get('image/', localStorage.getItem('token'))
    .then(data => {
      const filteredImages = data.filter(item => item.image_status !== 0);
      setImages(filteredImages);
      console.log(filteredImages);
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(error);
    });

    // fetch(`http://localhost:8081/api/image/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })
    // .then(response => {
    //   if (response.ok) {
    //     console.log(response.status);
    //     return response.json();
    //   } else {
    //     throw new Error(response.status);
    //   }
    // })
    // .then(data => {
    //   const filteredImages = data.filter(item => item.image_status !== 0);
    //   setImages(filteredImages);
    //   console.log(filteredImages);
    // })
    // .catch(error => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!'
    //   });
    //   console.log(error);
    // })
  }, []);

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white rounded-xl'>
      <div className="py-5 px-2 flex flex-row flex-wrap justify-center">
        {images.map((image) => {
          return (
            <div key={image.image_id} className=''>
              <ImageCard key={image.product_id} image={image} setImages={setImages} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteImage;
