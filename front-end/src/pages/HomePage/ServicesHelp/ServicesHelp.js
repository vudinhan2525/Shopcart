import img1 from '../../../assets/img/categories/faq1.png';
import img2 from '../../../assets/img/categories/faq2.png';
import img3 from '../../../assets/img/categories/faq3.png';
function ServicesHelp() {
  return (
    <div className="pb-[100px]">
      <header className="text-[26px] leading-[32px] font-bold mt-12">Get Up To 70% Off</header>
      <div className="grid grid-cols-3 mt-8 gap-6">
        <div className="">
          <div className="bg-[#F5F6F6] dark:bg-dark-flat px-10 py-10 rounded-t-xl">
            <header className="text-[22px] dark:text-dark-text leading-[30px] w-[70%] text-gray-800 font-bold">
              Frequently Asked Questions
            </header>
            <p className="mt-4 leading-[28px] dark:text-gray-500 w-[70%]">Updates on safe Shopping in our Stores</p>
          </div>
          <div className="h-[250px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="h-[250px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#F5F6F6] dark:bg-dark-flat px-10 py-10 rounded-t-xl">
            <header className="text-[22px] dark:text-dark-text leading-[30px] w-[70%] text-gray-800 font-bold">
              Online Payment Process
            </header>
            <p className="mt-4 leading-[28px] dark:text-gray-500 w-[70%]">Updates on safe Shopping in our Stores</p>
          </div>
          <div className="h-[250px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img2})` }}
              className="h-[250px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#F5F6F6] dark:bg-dark-flat px-10 py-10 rounded-t-xl">
            <header className="text-[22px] dark:text-dark-text leading-[30px] w-[70%] text-gray-800 font-bold">
              Home Delivery Options
            </header>
            <p className="mt-4 leading-[28px] dark:text-gray-500 w-[70%]">Updates on safe Shopping in our Stores</p>
          </div>
          <div className="h-[250px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img3})` }}
              className="h-[250px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesHelp;
