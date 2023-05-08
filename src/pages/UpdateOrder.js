import React, {useState, useEffect, useRef} from 'react';
import OrderCard from '../components/OrderCard';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';

const UpdateOrder = () => {
  const [ orders, setOrders ] = useState([]);
  const [orderDet, setOrderDet] = useState({
    order_id: "",
    estimated_time: "",
    product_id: "",
    product_size: "",
    product_theme: "",
    product_cost: ""
  });

  const currentPage = useSelector(state => state.pageRed);
  // const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const [products_id_name, setProducts_id_name] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const formRef = useRef(null);

  function fetchOrders() {
    serverBase.get(`orders?page=${currentPage-1}&size=3`, localStorage.getItem('token'))
    .then(data => {
      setOrders(data.content);
      setTotalPages(data.totalPages);
      console.log(currentPage);
      dispatch({type: 'SET_PAGE', payload: currentPage});
    })
    .catch(error => {
      console.log(error);
    })

    // without pagination
    // serverBase.get('order/', localStorage.getItem('token'))
    // .then(data => {
    //   setOrders(data);
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  function fetchProducts() {
    setProducts_id_name([]);
    serverBase.get('product/', localStorage.getItem('token'))
    .then(data => {
      // console.log(data);
      const filteredProducts = data.filter(item => item.product_status !== 0);
      setProducts_id_name(filteredProducts.map(product => {
        return { id: product.product_id, name: product.product_name };
      }));
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [currentPage]);

  function handleEditClick(order_id) {
    console.log(`Clicked order ${order_id}`);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    setOrderId(order_id);

    orders.map(order => {
      if (order.order_id === order_id) {
        setOrderDet(prev => (
          {...prev, order_id: order_id}
        ));
      }
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setOrderDet(curr => {
        return { ...curr, [e.target.id]:e.target.value}
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    serverBase.put(`order/${orderId}/${localStorage.getItem('id')}`, {
      order_details: [
        {
          estimated_time: orderDet.estimated_time,
          product_id: orderDet.product_id,
          product_size: orderDet.product_size,
          product_theme: orderDet.product_theme,
          product_cost: orderDet.product_cost
        }
      ]
    }, localStorage.getItem('token'))
    .then(data => {
      console.log("Update Success.");
      Swal.fire(
        'Updated!',
        'The order detail has been added.',
        'success'
      );
      setOrderDet({
        order_id: "",
        estimated_time: "",
        product_id: "",
        product_size: "",
        product_theme: "",
        product_cost: ""
      });
      fetchOrders();
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
    <div className='container mx-auto px-4 mb-5 bg-white rounded-xl'>
      <div className='mx-12 my-5 flex justify-end text-xl'>
        <Pagination totalPages={totalPages} />
      </div>
      <div className='flex flex-row flex-wrap justify-center'>
        {orders.length > 0 && orders.map(order => (
          <OrderCard key={order.order_id} order={order} handleEditClick={handleEditClick} />
        ))}
      </div>
      
      <div className="mx-auto max-w-screen-md py-5 px-20">
        <div id="header">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            Update Order
          </h3>
        </div>
        <form ref={formRef} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            <div className="mt-5">
              <label htmlFor="order_id" className="">
                Order ID
              </label>
              <input
                onChange={handleChange}
                value={orderDet.order_id}
                id="order_id"
                name="order_id"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="8"
                disabled
              />
            </div>
            <div className="my-5">
              <label htmlFor="product_id" className="">
                Product
              </label>
              <select
                onChange={handleChange}
                value={orderDet.product_id}
                id="product_id"
                name="product_id"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
              >
                <option value="">Select a product</option>
                {products_id_name.map(product => (
                  product.id !== null && (
                    <option key={product.id} value={product.id}>
                      {product.id + ". " + product.name}
                    </option>
                  )
                ))}
              </select>
            </div>

            {/* <div className="my-5">
              <label className="">
                Product ID
              </label>
              <input
                onChange={handleChange}
                value={orderDet.product_id}
                id="product_id"
                name="product_id"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="7"
              />
            </div> */}
            <div className="my-5">
              <label className="flex flex-row">
                <div>Product Size (m</div>
                <sup className='leading-3 mt-2'>2</sup>
                <div>)</div>
                {/* Product Size (m2) */}
              </label>
              <input
                onChange={handleChange}
                value={orderDet.product_size}
                id="product_size"
                name="product_size"
                type="number"
                min={0}
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="4"
              />
            </div>
            <div className="my-5">
              <label className="">
                Product Theme
              </label>
              <input
                onChange={handleChange}
                value={orderDet.product_theme}
                id="product_theme"
                name="product_theme"
                type="text"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="Minimalist"
              />
            </div>
            <div className="my-5">
              <label className="">
                Product Cost (Rp)
              </label>
              <input
                onChange={handleChange}
                value={orderDet.product_cost}
                id="product_cost"
                name="product_cost"
                type="number"
                min={0}
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="8000000"
              />
            </div>
            <div className="my-5">
              <label className="">
                Time Estimation (months)
              </label>
              <input
                onChange={handleChange}
                value={orderDet.estimated_time}
                id="estimated_time"
                name="estimated_time"
                type="number"
                min={0}
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                placeholder="2"
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

export default UpdateOrder;
