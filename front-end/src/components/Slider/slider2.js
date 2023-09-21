import img2 from '../../assets/img/slider/slider-02.jpg';
function Slider2() {
  return (
    <div
      key={2}
      style={{ backgroundImage: `url(${img2})` }}
      className="h-[500px] w-full  bg-no-repeat bg-[right_50%_bottom_72%] bg-cover "
    ></div>
  );
}

export default Slider2;
