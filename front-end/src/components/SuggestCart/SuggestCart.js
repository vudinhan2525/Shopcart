import CartComponent from '../CartComponent/CartComponent';
function SuggestCart() {
  return (
    <div>
      <h4 className="text-[26px] leading-[32px] font-bold ">Todays Best Deals For You! 🔥🔥🔥</h4>
      <div className="grid grid-cols-4 mt-6 gap-6">
        <CartComponent />
        <CartComponent />
        <CartComponent />
        <CartComponent />
        <CartComponent />
        <CartComponent />
      </div>
    </div>
  );
}

export default SuggestCart;
