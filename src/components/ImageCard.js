import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const ImageCard = ({image, setImages}) => {
  const deleteImage = () => {
    serverBase.put(`image/${image.image_id}/${localStorage.getItem('id')}`, null, localStorage.getItem('token'))
    .then(data => {
      setImages((prevItems) =>
        prevItems.filter((prevItem) => prevItem.image_id !== image.image_id)
      );
      Swal.fire(
        'Deleted!',
        'Your image has been deleted.',
        'success'
      );
    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    });
  };
  
  return (
    <div className="max-w-sm mx-5 rounded overflow-hidden shadow-lg justify-center cursor-pointer">
      <div className="px-6 py-4">
        <img className="w-56 h-56 object-contain pt-5" src={image.image} alt={image.image_name}/>
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-md ml-3">{image.image_name}</div>
          <div className="flex items-center">
            <FaTrash className="text-gray-200 hover:text-gray-500 cursor-pointer m-3" onClick={deleteImage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
