import React, {useState, useEffect} from 'react';
import ImageCard from '../components/ImageCard';
import { serverBase } from '../util/serverApi';

const DeleteImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // without pagination
    serverBase.get('image/', localStorage.getItem('token'))
    .then(data => {
      const filteredImages = data.filter(item => item.image_status !== 0);
      setImages(filteredImages);
      // console.log(filteredImages);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white rounded-xl'>
      <div className="pt-5 px-2 flex flex-row flex-wrap justify-center">
        {images.map((image) => {
          return (
            <div key={image.image_id} className='my-3'>
              <ImageCard key={image.product_id} image={image} setImages={setImages} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteImage;
