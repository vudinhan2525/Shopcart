import img1 from '../../assets/img/slider/slider-01.jpg';
function Slider1() {
  return (
    <div
      key={1}
      style={{ backgroundImage: `url(${img1})` }}
      className="relative h-[550px] w-full  bg-cover bg-no-repeat bg-left "
    >
      <div className="absolute w-[530px] h-[400px] top-0 py-14 px-12 rounded-3xl">
        <h1 className="text-primary-color text-5xl font-semibold">Grab Upto 50% Off On Selected Headphone</h1>
        <button className="mt-5 text-white py-3 px-6 rounded-full bg-primary-color  transition-all hover:opacity-70">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Slider1;
