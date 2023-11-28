import Slider from 'react-slick';
import { useState } from 'react';
import LeftArrow from '../../../assets/img/slider/ArrowLeft.svg';
import RightArrow from '../../../assets/img/slider/ArrowRight.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
function SliderProduct({ productImages }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slider2Ref = useRef();
  const slider1Ref = useRef();
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => <img src={LeftArrow} alt="prevArrow" {...props} />;
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  useEffect(() => {
    if (activeSlide - 2 <= 0) {
      slider2Ref.current.slickGoTo(productImages?.length + activeSlide - 2);
    } else slider2Ref.current.slickGoTo(activeSlide - 2);
    slider1Ref.current.slickGoTo(activeSlide);
  }, [activeSlide, productImages?.length]);
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
    <>
      <div className="w-[450px] h-[400px] mx-auto">
        <Slider {...settings1} ref={slider1Ref}>
          {productImages?.map((el, idx) => {
            return (
              <div key={idx}>
                <div
                  style={{ backgroundImage: `url(${el})` }}
                  className="h-[400px] w-[400px] mx-auto bg-no-repeat bg-center bg-contain rounded-xl"
                ></div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="w-[550px] h-[105px] mx-auto mt-5 overflow-hidden">
        <Slider {...settings2} ref={slider2Ref}>
          {productImages?.map((el, idx) => {
            return (
              <div key={idx} className={idx === activeSlide ? `border-primary-color border-2 rounded-sm` : ``}>
                <div
                  style={{ backgroundImage: `url(${el})` }}
                  onClick={() => {
                    setActiveSlide(idx);
                  }}
                  className="rounded-md  h-[90px] w-[90px] my-[5px] cursor-pointer mx-auto bg-no-repeat bg-center bg-contain "
                ></div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default SliderProduct;
