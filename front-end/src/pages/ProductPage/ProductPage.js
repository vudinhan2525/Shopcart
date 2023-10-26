import SliderProduct from './SliderProduct/SliderProduct';
import InfoProduct from './InfoProduct/InfoProduct';
import IntroduceProduct from './IntroduceProduct/IntroduceProduct';
import DetailProduct from './DetailProduct/DetailProduct';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import CartComponent from '../../components/CartComponent/CartComponent';
function ProductPage() {
  return (
    <div className="px-12 ">
      <p className="mt-5 mb-8">Home / SmartPhones / Iphone13</p>
      <div className="flex gap-4">
        <div className="basis-[60%]">
          <SliderProduct />
          <IntroduceProduct />
        </div>
        <div className="basis-[40%]">
          <InfoProduct />
          <DetailProduct />
        </div>
      </div>
      <ReviewProduct />
      <div className="mt-8">
        <h4 className="text-[26px] leading-[32px] font-bold ">Related products</h4>
        <div className="grid grid-cols-5 mt-6 gap-4">
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-[26px] leading-[32px] font-bold ">Products you last seen</h4>
        <div className="grid grid-cols-5 mt-6 gap-4">
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
