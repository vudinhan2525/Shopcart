import slider from '../../components/Slider';
import Slider from 'react-slick';
function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>{slider[0]}</div>
      <div>{slider[1]}</div>
      <div>{slider[2]}</div>
    </Slider>
  );
}

export default SliderComponent;
