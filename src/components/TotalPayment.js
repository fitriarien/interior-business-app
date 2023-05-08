import React from 'react';

const TotalPayment = ({paymentList}) => {
  let totalPayment = 0;
  paymentList.map(sub => {
    return totalPayment += sub.payment_amount;
  })
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  return (
    <div className="border-y-2 border-gray-500 flex flex-row justify-between">
      <p className="mb-2 text-base font-bold mx-5 xl:mx-2">Total Payment</p>
      <p className="mb-2 text-base font-bold mx-5 xl:mx-2">{formatter.format(totalPayment)}</p>
    </div>
  );
}

export default TotalPayment;
