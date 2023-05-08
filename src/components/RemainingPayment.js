import React from 'react';

const RemainingPayment = ({paymentList, orderAmount}) => {
  let totalPayment = 0;
  paymentList.map(sub => {
    return totalPayment += sub.payment_amount;
  })
  let remainingPayment = orderAmount-totalPayment;
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  return (
    <div className="flex flex-row justify-between">
      <p className="mb-2 text-base font-bold mx-5 xl:mx-2">Remaining Payment</p>
      {remainingPayment > 0 
      ?
        <p className="mb-2 text-base font-bold text-red-600 mx-5 xl:mx-2">{formatter.format(remainingPayment)}</p>
      :
        <p className="mb-2 text-base font-bold mx-5 xl:mx-2">{formatter.format(remainingPayment)}</p>
      }
    </div>
  );
}

export default RemainingPayment;
