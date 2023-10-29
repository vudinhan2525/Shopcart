import logo from '../../assets/img/logo';
import img1 from '../../assets/img/paymentsmethod/ApplePay.png';
import img2 from '../../assets/img/paymentsmethod/GooglePay.png';
import img3 from '../../assets/img/paymentsmethod/visa.png';
import img4 from '../../assets/img/paymentsmethod/stripe.png';
import img5 from '../../assets/img/paymentsmethod/Amazon.png';
import img6 from '../../assets/img/paymentsmethod/Mastercard.png';
function FooterComponent() {
  return (
    <>
      <div className=" mx-10 h-[1px] bg-gray-300  mt-8"></div>
      <div className="flex gap-5 px-10 mt-12 pb-11">
        <div className="basis-[35%] flex flex-col pr-8">
          <div className="w-28 h-16 relative">
            {logo()}
            <p className="absolute top-[50%] translate-y-[-50%] right-[-65%] font-bold text-2xl text-primary-color">
              ShopCart
            </p>
          </div>
          <div className="mt-6 text-sm text-gray-800">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit.
          </div>
          <header className="text-lg mt-8 mb-4 font-bold">Accepted Payments</header>
          <div className="flex flex-col gap-3">
            <div className=" flex gap-2">
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img1} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img2} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img3} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img4} alt="" />
              </div>
            </div>
            <div className=" flex gap-2">
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img5} alt="" />
              </div>
              <div className="border-[1px] py-5 border-gray-400 rounded-md w-[70px] h-[30px] flex items-center px-3">
                <img src={img6} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Department</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Furniture</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Hand Bag</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Books</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Tech</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Sneakers</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Travel</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Toys</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Sneakers</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Electronics & Gadget
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">About Us</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              About Shopcart
            </div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Careers</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              News & Blog
            </div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Help</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Shopcart Brands
            </div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Ideas & Guides
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Services</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Gift Card</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Shipping & Delivery
            </div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Mobile App</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Account Signup
            </div>
          </div>
        </div>
        <div className="basis-[16.25%]">
          <header className="text-lg font-bold">Help</header>
          <div className="mt-6 text-sm text-gray-800 flex flex-col gap-2">
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">
              Shopcart Help
            </div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Returns</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Contact Us</div>
            <div className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all">Feedback</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterComponent;
