import React, {useState, useEffect, useRef} from 'react';
import ProductCard from '../components/ProductCard';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [dataProduct, setDataProduct] = useState({
    product_id: "",
    product_name:"",
    product_model:"",
    estimated_cost:"",
    image_id:""
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [productId, setProductId] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    serverBase.get('product/')
    .then(data => {
      const filteredProducts = data.filter(prod => prod.product_status !== 0);
      setProducts(filteredProducts);
      // console.log(filteredProducts);
    })
    .catch(error => {
      console.log(error);
    });

    // fetch(`http://localhost:8081/api/product/`, {
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
    //   const filteredProducts = data.filter(prod => prod.product_status !== 0);
    //   setProducts(filteredProducts);
    //   // console.log(filteredProducts);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }, [isUpdated]);

  function handleEditClick(product_id) {
    console.log(product_id);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    setProductId(product_id);
    products.forEach(product => {
      if (product.product_id === product_id) {
        setDataProduct({
          product_id: product_id,
          product_name: product.product_name,
          product_model: product.product_model,
          estimated_cost:product.estimated_cost,
          image_id: product.imageDAO?.image_id || ""
        })
      }
    })
    // setDataProduct(prevData => {
    //   return { ...prevData, ...products.find(curr => curr.product_id === product_id) };
    // });
  }

  function handleChange(e) {
    e.preventDefault();
    setDataProduct(curr => {
        return { ...curr, [e.target.id]:e.target.value}
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(dataProduct);

    serverBase.put(`product/${productId}/${localStorage.getItem('id')}`, {
      product_name: dataProduct.product_name,
      product_model: dataProduct.product_model,
      estimated_cost: dataProduct.estimated_cost,
      image_id: dataProduct.image_id
    })
    .then(data => {
      setIsUpdated(true);
      console.log("Update Product Success.");
      Swal.fire(
        'Updated!',
        'Your product has been updated.',
        'success'
      )
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    });

    // fetch(`http://localhost:8081/api/product/${productId}/${localStorage.getItem('id')}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     product_name: dataProduct.product_name,
    //     product_model: dataProduct.product_model,
    //     estimated_cost: dataProduct.estimated_cost,
    //     image_id: dataProduct.image_id
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })
    // .then((response) => {
    //   if(response.ok) {
    //     return response.json();
    //   } else {
    //     throw new Error(response.status)
    //   }
    // })
    // .then(data => {
    //   setIsUpdated(true);
    //   console.log("Update Product Success.");
    // })
    // .catch(err => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!'
    //   });
    //   console.log(err);
    // })
  }

  // const toSubmit = (e) => {
  //   e.preventDefault();

  //   Swal.fire({
  //     title: 'Do you want to submit the product?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, submit!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleSubmit();
  //       Swal.fire(
  //         'Updated!',
  //         'Your product has been updated.',
  //         'success'
  //       );
  //       setIsUpdated(false);
  //     }
  //   });
  // }

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white opacity-80 rounded-xl'>
      <div className="py-5 px-2 flex flex-row flex-wrap justify-center">
        {products.map((product) => {
          return (
            <ProductCard key={product.product_id} product={product} setProducts={setProducts} handleEditClick={handleEditClick}/>
          );
        })}
      </div>
      <div className="mx-auto max-w-screen-md py-5 px-20">
        <form ref={formRef} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div id="header">
            <h3 className="text-center text-3xl font-bold text-gray-900">
              Update Product
            </h3>
          </div>
          <div className="-space-y-px">
            <div className="my-5">
              <label htmlFor="product_id">
                Product ID
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.product_id}
                id="product_id"
                name="product_id"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder=""
                disabled
              />
            </div>
            <div className="my-5">
              <label htmlFor="product_name">
                Product Name
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.product_name}
                id="product_name"
                name="product_name"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="TV Cabinet"
              />
            </div>
            <div className="my-5">
              <label htmlFor="product_model" className="">
                Product Model
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.product_model}
                id="product_model"
                name="product_model"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="L-shaped"
              />
            </div>
            <div className="my-5">
              <label htmlFor="estimated_cost" className="">
                Cost Estimation
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.estimated_cost}
                id="estimated_cost"
                name="estimated_cost"
                type="number"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="5000000"
              />
            </div>
            <div className="my-5">
              <label htmlFor="image_id" className="">
                Image ID (if any)
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.image_id}
                id="image_id"
                name="image_id"
                type="number"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="4"
              />
            </div>
            <button
              type="submit"
              className="submitButton group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
}

export default UpdateProduct;
