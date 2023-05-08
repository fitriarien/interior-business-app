import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverBase } from '../util/serverApi';
import TotalPayment from '../components/TotalPayment';
import RemainingPayment from '../components/RemainingPayment';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.pageRed);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  function fetchOrderDetail() {
    // console.log('masuk fetch');
    serverBase.get(`order/${id.toString()}/${localStorage.getItem('id')}`, localStorage.getItem('token'))
    .then(data => {
      setOrderDetails(data);
      setPaymentList(data.paymentDAOList);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  function goBack() {
    dispatch({type: 'SET_PAGE', payload: currentPage});
    navigate('/order');
  }

  return (
    <div className='container mx-auto p-5 my-5 bg-white rounded-xl items-center'>
      <div>
        {orderDetails && (
          <div className="mx-auto max-w-screen-lg py-5 px-20">
            <button className='border rounded border-gray-500 px-3' onClick={goBack}>Back</button>
            <p className="text-2xl font-bold tracking-tight text-center mb-5">Order Code: {orderDetails.order_code}</p>
            <div className="border rounded p-5">
              <p className="mb-2 text-lg font-bold mx-5 xl:mx-0">Visit Schedule</p>
              <p className="mb-1 font-normal text-gray-800">Visit Date: {orderDetails.visit_date}</p>
              <p className="mb-1 font-normal text-gray-800">Visit Time: {orderDetails.visit_time}</p>
              <p className="mb-3 font-normal text-gray-800">Visit Address: {orderDetails.visit_address}</p>
              <div className="border-t-2 border-gray-500 flex flex-row justify-between">
                <p className="mt-2 text-xl font-bold mx-5 xl:mx-0">Order List</p>
              </div>
              {orderDetails.orderDetDAOList && orderDetails.orderDetDAOList.map((orderDet, i) => (
                <div key={orderDet.order_det_id}>
                  <div className="w-full flex flex-col justify-stretch lg:flex-row md:flex-col">
                    <div className="my-2 object-cover border rounded lg:w-72 md:h-auto md:w-96">
                      <img className='border rounded' src={orderDet.productDAO?.imageDAO?.image} alt={orderDet.productDAO?.imageDAO?.image_name} />
                    </div>
                    <div className="my-5 px-5">
                      <p className="mb-2 text-xl font-bold">{orderDet.productDAO?.product_name}</p>
                      <p className="mb-1 font-normal text-gray-800">Model: {orderDet.productDAO?.product_model}</p>
                      <p className="mb-1 font-normal text-gray-800">Theme: {orderDet.product_theme}</p>
                      <p className="mb-1 font-normal text-gray-800">Size: {orderDet.product_size} m2</p>
                      <p className="mb-1 font-normal text-gray-800">Time Estimation: {orderDet.estimated_time} month(s)</p>
                      <p className="mb-1 font-bold text-gray-800">Cost: {formatter.format(orderDet.subtotal)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="my-2 border-y-2 border-gray-500 flex flex-row justify-between">
                <p className="my-1 text-base font-bold mx-5 xl:mx-2">Total Cost</p>
                <p className="my-1 text-base font-bold mx-5 xl:mx-2">{formatter.format(orderDetails.order_amount)}</p>
              </div>
              {paymentList !== [] &&
                <div>
                  <p className="mb-2 text-lg font-bold mx-5 xl:mx-2">Payment</p>
                  {paymentList.map((payment) => (
                    <div className='mx-5' key={payment.payment_id}>
                      <p className="mb-1 font-normal text-gray-800">Payment ID: {payment.payment_id}</p>
                      <p className="mb-1 font-normal text-gray-800">Date: {payment.payment_date}</p>
                      <p className="mb-1 font-normal text-gray-800">Method: {payment.payment_method}</p>
                      <p className="mb-1 font-normal text-gray-800">Notes: {payment.payment_detail}</p>
                      <p className="mb-2 text-normal text-gray-800 font-bold">Amount: {formatter.format(payment.payment_amount)}</p>
                    </div>
                  ))}
                </div>
              }
              <TotalPayment paymentList={paymentList} />
              <RemainingPayment paymentList={paymentList} orderAmount={orderDetails.order_amount} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
