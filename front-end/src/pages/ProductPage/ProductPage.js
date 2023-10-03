import Slider from 'react-slick';
import { useState } from 'react';
import img1 from '../../assets/img/cart/test.webp';
import img2 from '../../assets/img/cart/test2.webp';
import img3 from '../../assets/img/cart/test3.webp';
import img4 from '../../assets/img/cart/test4.webp';
import img5 from '../../assets/img/cart/test5.webp';
import LeftArrow from '../../assets/img/slider/ArrowLeft.svg';
import RightArrow from '../../assets/img/slider/ArrowRight.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
const img = [img1, img2, img3, img4, img5, img1, img2, img3, img4, img5];
function ProductPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slider2Ref = useRef();
  const slider1Ref = useRef();
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => <img src={LeftArrow} alt="prevArrow" {...props} />;
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  useEffect(() => {
    if (activeSlide - 2 <= 0) {
      slider2Ref.current.slickGoTo(img.length + activeSlide - 2);
    } else slider2Ref.current.slickGoTo(activeSlide - 2);
    slider1Ref.current.slickGoTo(activeSlide);
  }, [activeSlide]);
  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
  };
  const settings2 = {
    infinite: true,
    focusOnSelect: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className="px-12">
      <p className="mt-5 mb-8 text-sm font-semibold">Home / SmartPhones / Iphone13</p>
      <div className="flex gap-16  ">
        <div className="basis-1/2">
          <div className="w-[450px] h-[400px] mx-auto">
            <Slider {...settings1} ref={slider1Ref}>
              {img.map((el, idx) => {
                return (
                  <div key={idx}>
                    <div
                      style={{ backgroundImage: `url(${el})` }}
                      className="h-[400px] w-[400px] mx-auto bg-no-repeat bg-center bg-cover"
                    ></div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="w-[550px] h-[200px] mx-auto mt-5">
            <Slider {...settings2} ref={slider2Ref}>
              {img.map((el, idx) => {
                return (
                  <div key={idx} className={idx === activeSlide ? `border-primary-color border-2 rounded-sm` : ``}>
                    <div
                      style={{ backgroundImage: `url(${el})` }}
                      onClick={() => {
                        setActiveSlide(idx);
                      }}
                      className="h-[90px] w-[90px] my-[5px] mx-auto bg-no-repeat bg-center bg-cover "
                    ></div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="bg-red-700 w-10 h-10 cursor-pointer" onClick={() => {}}></div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
