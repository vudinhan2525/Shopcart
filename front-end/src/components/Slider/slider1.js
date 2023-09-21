import img1 from '../../assets/img/slider/slider-01.jpg';
function Slider1() {
  return (
    <div
      key={1}
      style={{ backgroundImage: `url(${img1})` }}
      className="h-[500px] w-full  bg-cover bg-no-repeat bg-left "
    ></div>
  );
}

export default Slider1;
