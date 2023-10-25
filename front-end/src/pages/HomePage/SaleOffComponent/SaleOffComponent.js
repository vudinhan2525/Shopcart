import img1 from '../../../assets/img/categories/sofa.png';
import img2 from '../../../assets/img/categories/book.png';
import img3 from '../../../assets/img/categories/shirt.png';
import img4 from '../../../assets/img/categories/balo.png';
function SaleOffComponent() {
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold mt-12">Get Up To 70% Off</header>
      <div className="flex mt-8 gap-6">
        <div className="">
          <div className="bg-[#F2E4D9] px-6 py-6 rounded-t-xl">
            <header className="text-2xl text-gray-800 font-bold">Save</header>
            <div className="mt-4 text-5xl font-bold text-[#CB9917]">100$</div>
            <p className="mt-4 leading-[28px]">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <div className="h-[220px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="h-[220px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#F9DCDC] px-6 py-6 rounded-t-xl">
            <header className="text-2xl text-gray-800 font-bold">Save</header>
            <div className="mt-4 text-5xl font-bold text-[#961F1F]">29$</div>
            <p className="mt-4 leading-[28px]">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <div className="h-[220px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img2})` }}
              className="h-[220px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#F2E4D9] px-6 py-6 rounded-t-xl">
            <header className="text-2xl text-gray-800 font-bold">Save</header>
            <div className="mt-4 text-5xl font-bold text-[#94623C]">67$</div>
            <p className="mt-4 leading-[28px]">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <div className="h-[220px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img3})` }}
              className="h-[220px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#D2F7EC] px-6 py-6 rounded-t-xl">
            <header className="text-2xl text-gray-800 font-bold">Save</header>
            <div className="mt-4 text-5xl font-bold text-[#003D29]">59$</div>
            <p className="mt-4 leading-[28px]">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <div className="h-[220px] w-full overflow-hidden rounded-b-xl">
            <div
              style={{ backgroundImage: `url(${img4})` }}
              className="h-[220px]  w-full rounded-b-xl bg-no-repeat transition-all bg-center hover:scale-[1.2] bg-cover"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleOffComponent;
