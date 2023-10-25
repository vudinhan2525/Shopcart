import img2 from '../../assets/img/slider/slider-02.jpg';
function Slider2() {
  return (
    <div
      key={2}
      style={{ backgroundImage: `url(${img2})` }}
      className="relative h-[550px] w-full  bg-no-repeat bg-[right_50%_bottom_72%] bg-cover "
    >
      <div className=" absolute w-[430px] h-[400px] bg-primary-color right-[7%] top-[50%] translate-y-[-50%] py-14 px-12 rounded-3xl">
        <h4 className="text-white text-5xl font-semibold mt-3"> Get 5% Cash Back On $200</h4>
        <p className="mt-5 text-white text-base">
          Shoping is a bit of relaxing hooby for me, which is sometimes troubling for the bank balance.
        </p>
        <button className="mt-5 text-white py-3 px-6 rounded-full border  transition-all border-white hover:bg-white hover:text-primary-color">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default Slider2;
