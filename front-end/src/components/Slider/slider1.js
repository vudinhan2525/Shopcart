import img1 from '../../assets/img/slider/slider-01.jpg';
function Slider1() {
  return (
    <div
      key={1}
      style={{ backgroundImage: `url(${img1})` }}
      className="h-full bg-cover bg-no-repeat bg-left animate-slideRightIn transition-all"
    >
      {' '}
    </div>
  );
}

export default Slider1;
