import OrderItem from './OrderItem/OrderItem';
import Payment from './Payment/Payment';
function OrderPage() {
  return (
    <div className="px-10">
      <p className="mt-5 mb-8">Home / Order</p>
      <div className="flex gap-6">
        <div className="basis-[65%] border-[1px] border-gray-300 rounded-xl px-6 py-6">
          <header className="text-2xl font-semibold">Review Item And Shipping</header>
          <div className="mt-6 flex flex-col gap-6">
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>
        </div>
        <div className="basis-[35%] border-[1px] border-gray-300 rounded-xl px-6 py-6">
          <Payment />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
