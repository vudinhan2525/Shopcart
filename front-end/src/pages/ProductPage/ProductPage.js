import Slider from 'react-slick';
import img1 from '../../assets/img/cart/test.webp';
import img2 from '../../assets/img/cart/test2.webp';
import img3 from '../../assets/img/cart/test3.webp';
import img4 from '../../assets/img/cart/test4.webp';
import img5 from '../../assets/img/cart/test5.webp';
const img = [img1, img2, img3, img4, img5];
function ProductPage() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="px-12">
      <p className="mt-5 mb-8 text-sm font-semibold">Home / SmartPhones / Iphone13</p>
      <div className="flex gap-16  ">
        <div className="basis-1/2">
          <div className="w-[600px] h-[450px]">
            <Slider {...settings}>
              {img.map((el, idx) => {
                return (
                  <div key={idx}>
                    <div
                      style={{ backgroundImage: `url(${el})` }}
                      className="h-[450px] w-[450px] mx-auto bg-no-repeat bg-center bg-cover"
                    ></div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="basis-1/2"></div>
      </div>
    </div>
  );
}

export default ProductPage;
