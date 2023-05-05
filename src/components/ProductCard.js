import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const ProductCard = ({product, setProducts, handleEditClick}) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

const formattedPrice = formatter.format(product.estimated_cost);

  const deleteProduct = () => {
    serverBase.put(`product/delete/${product.product_id}/${localStorage.getItem('id')}`, null, localStorage.getItem('token'))
    .then(data => {
      setProducts((prevProducts) =>
        prevProducts.filter((prevProduct) => prevProduct.product_id !== product.product_id)
      );
      Swal.fire(
        'Deleted!',
        'Your product has been deleted.',
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
    //   const response = await fetch(`http://localhost:8081/api/product/delete/${product.product_id}/${localStorage.getItem('id')}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //     }
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to delete product.');
    //   }

    //   setProducts((prevProducts) =>
    //     prevProducts.filter((prevProduct) => prevProduct.product_id !== product.product_id)
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
  //       )

  //       deleteProduct();
  //     }
  //   });
  // }

  return (
    <div className="max-w-sm mx-5 rounded overflow-hidden shadow-lg justify-center cursor-pointer">
      <div className="px-6 py-4">
        { product.imageDAO?.image 
        ? 
          <img className="w-72 h-56" src={product.imageDAO.image} alt={product.imageDAO.image_name}/> 
        :
          <img className="w-72 h-56" src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt='not-available'/>
        }
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">{product.product_name}</div>
          <div className="flex items-center">
            <FaEdit className="text-gray-500 mr-4 cursor-pointer" onClick={() => handleEditClick(product.product_id)}/>
            <FaTrash className="text-gray-500 cursor-pointer" onClick={deleteProduct}/>
          </div>
        </div>
        <p className="text-gray-700 text-base">ID: {product.product_id}</p>
        <p className="text-gray-700 text-base">
          {product.product_model} {formattedPrice}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
