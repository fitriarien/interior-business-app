import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const ImageCard = ({image, setImages}) => {
  const deleteImage = () => {
    serverBase.put(`image/${image.image_id}/${localStorage.getItem('id')}`, null)
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

    // try {
    //   const response = await fetch(`http://localhost:8081/api/image/${image.image_id}/${localStorage.getItem('id')}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //     }
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to delete product.');
    //   }

    //   setImages((prevItems) =>
    //     prevItems.filter((prevItem) => prevItem.image_id !== image.image_id)
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // const handleDelete = () => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       );
  //       deleteImage();
  //     }
  //   });
  // }
  
  return (
    <div className="max-w-sm mx-5 rounded overflow-hidden shadow-lg justify-center cursor-pointer">
      <div className="px-6 py-4">
        <img className="w-72 h-56" src={image.image} alt={image.image_name}/>
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-md">{image.image_name}</div>
          <div className="flex items-center">
            <FaTrash className="text-gray-500 cursor-pointer" onClick={deleteImage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
