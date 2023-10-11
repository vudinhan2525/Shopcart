import SliderProduct from './SliderProduct/SliderProduct';
import InfoProduct from './InfoProduct/InfoProduct';
import IntroduceProduct from './IntroduceProduct/IntroduceProduct';
function ProductPage() {
  return (
    <div className="px-12">
      <p className="mt-5 mb-8 text-sm font-semibold">Home / SmartPhones / Iphone13</p>
      <div className="flex gap-4">
        <div className="basis-[60%]">
          <SliderProduct />
          <IntroduceProduct />
        </div>
        <div className="basis-[40%]">
          <InfoProduct />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
