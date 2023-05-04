import React, {useState, useEffect} from 'react';
import { FaEdit } from 'react-icons/fa';

const OrderCard = ({order, handleEditClick}) => {
  const [orderDetList, setOrderDetList] = useState([]);

  useEffect(() => {
    setOrderDetList(order.orderDetDAOList);
  }, [order.orderDetDAOList]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-64 h-auto justify-center cursor-pointer m-5">
      <div className="px-6 py-4">
        <div className="items-center">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl mb-2">{order.order_code}</div>
            {orderDetList && 
              <div className="flex items-center">
                <FaEdit className="text-gray-500 mr-4 cursor-pointer" onClick={() => handleEditClick(order.order_id)}/>
              </div>
            }
          </div>
          {orderDetList.map((orderDet, i) => (
            <div key={orderDet.order_det_id} className="items-center">
              <p className="text-gray-800 text-base">
                Product {i+1}: {orderDet.productDAO?.product_name}
              </p>
            </div>
          ))}
        </div>
        <p className="text-gray-800 text-base">
          {order.visit_date} {order.visit_time} @{order.visit_address}
        </p>
      </div>
    </div>
  );
}

export default OrderCard;
