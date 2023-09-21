import img3 from '../../assets/img/slider/slider-03.jpeg';
function Slider3() {
  return (
    <div
      key={3}
      style={{ backgroundImage: `url(${img3})` }}
      className="h-full  bg-no-repeat bg-top bg-[length:100%_130%]  animate-slideRightIn transition-all"
    ></div>
  );
}

export default Slider3;
