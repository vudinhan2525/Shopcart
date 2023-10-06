import SliderProduct from './SliderProduct/SliderProduct';
import InfoProduct from './InfoProduct/InfoProduct';
function ProductPage() {
  return (
    <div className="px-12">
      <p className="mt-5 mb-8 text-sm font-semibold">Home / SmartPhones / Iphone13</p>
      <div className="flex gap-16  ">
        <div className="basis-1/2">
          <SliderProduct />
        </div>
        <div className="basis-1/2">
          <InfoProduct />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
