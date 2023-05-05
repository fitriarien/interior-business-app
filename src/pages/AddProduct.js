import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const AddProduct = () => {
  const [dataProduct, setDataProduct] = useState({
    name:"",
    model:"",
    costEstimation:"",
    imageId:""
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
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
  }, [])

  function handleChange(e) {
    e.preventDefault();
    setDataProduct(curr => {
        return { ...curr, [e.target.id]:e.target.value}
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    serverBase.post(`product/${localStorage.getItem('id')}`, {
      product_name: dataProduct.name,
      product_model: dataProduct.model,
      estimated_cost: parseInt(dataProduct.costEstimation),
      image_id: parseInt(dataProduct.imageId)
    }, localStorage.getItem('token'))
    .then(data => {
      console.log("Add Product Success.");
      Swal.fire(
        'Submitted!',
        'Your product has been submitted.',
        'success'
      )
      setDataProduct({
        name:"",
        model:"",
        costEstimation:"",
        imageId:""
      });
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    })

    // fetch(`http://localhost:8081/api/product/${localStorage.getItem('id')}`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     product_name: dataProduct.name,
    //     product_model: dataProduct.model,
    //     estimated_cost: parseInt(dataProduct.costEstimation),
    //     image_id: parseInt(dataProduct.imageId)
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
    //   console.log("Add Product Success.");
    //   setDataProduct({
    //     name:"",
    //     model:"",
    //     costEstimation:"",
    //     imageId:""
    //   });
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
  //       Swal.fire(
  //         'Submitted!',
  //         'Your product has been submitted.',
  //         'success'
  //       );
  //       handleSubmit();
  //     }
  //   });
  // }

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white opacity-80 rounded-xl'>
      <div className="mx-auto max-w-screen-md py-5 px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            <div className="my-5">
            <label htmlFor="name">
              Product Name
            </label>
            <input
              onChange={handleChange}
              value={dataProduct.name}
              id="name"
              name="product_name"
              type="text"
              className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
              placeholder="TV Cabinet"
            />
            </div>
            <div className="my-5">
              <label htmlFor="model" className="">
                Product Model
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.model}
                id="model"
                name="product_model"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="L-shaped"
              />
            </div>
            <div className="my-5">
              <label htmlFor="costEstimation" className="">
                Cost Estimation
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.costEstimation}
                id="costEstimation"
                name="costEstimation"
                type="number"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="5000000"
              />
            </div>
            <div className="my-5">
              <label htmlFor="product_id" className="">
                Image (if any)
              </label>
              <select
                onChange={handleChange}
                value={dataProduct.imageId}
                id="imageId"
                name="imageId"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
              >
                <option value="">Select an image</option>
                {images.map(img => (
                  <option key={img.id} value={img.id}>
                    {img.id + ". " + img.alt}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="my-5">
              <label htmlFor="imageId" className="">
                Image (if any)
              </label>
              <input
                onChange={handleChange}
                value={dataProduct.imageId}
                id="imageId"
                name="imageId"
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

export default AddProduct;
