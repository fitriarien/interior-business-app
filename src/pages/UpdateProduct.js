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
  const [images, setImages] = useState([]);
  const formRef = useRef(null);

  function fetchProducts() {
    serverBase.get('product/', localStorage.getItem('token'))
    .then(data => {
      const filteredProducts = data.filter(prod => prod.product_status !== 0);
      setProducts(filteredProducts);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function fetchImages() {
    setImages([]);
    serverBase.get('image/', localStorage.getItem('token'))
    .then(data => {
      const filteredImages = data.filter(item => item.image_status !== 0);
      setImages(filteredImages.map(item => {
        return { id: item.image_id, alt: item.image_name };
      }));
      // console.log(filteredImages);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchProducts();
    fetchImages();
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
    }, localStorage.getItem('token'))
    .then(data => {
      if (data === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Choose another image!'
        });
      } else {
        setIsUpdated(!isUpdated);
        console.log("Update Product Success.");
        Swal.fire(
          'Updated!',
          'Your product has been updated.',
          'success'
        )
      }
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    });
  }

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white rounded-xl'>
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
            <h3 className="text-center text-2xl font-bold text-gray-900">
              Update Product
            </h3>
          </div>
          <div className="-space-y-px">
            <div className="mt-5">
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
                min={0}
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="5000000"
              />
            </div>
            <div className="my-5">
              <label htmlFor="image_id" className="">
                Image (if any)
              </label>
              <select
                onChange={handleChange}
                value={dataProduct.image_id}
                id="image_id"
                name="image_id"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
              >
                <option value="">Select an image</option>
                {images.map(img => (
                  img.id !== null && (
                    <option key={img.id} value={img.id}>
                      {img.id + ". " + img.alt}
                    </option>
                  )
                ))}
              </select>
            </div>
            {/* <div className="my-5">
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
            </div> */}
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
