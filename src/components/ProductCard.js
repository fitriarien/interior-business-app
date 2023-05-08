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
  };

  return (
    <div className="max-w-sm mx-5 rounded overflow-hidden shadow-lg justify-center cursor-pointer">
      <div className="px-6 py-4">
        { product.imageDAO?.image 
        ? 
          <img className="w-56 h-56 object-contain pt-5" src={product.imageDAO.image} alt={product.imageDAO.image_name}/> 
        :
          <img className="w-56 h-56 object-contain pt-5" src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt='not-available'/>
        }
        <div className="flex justify-between items-center">
          <div className="font-bold text-base">{product.product_name}</div>
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
