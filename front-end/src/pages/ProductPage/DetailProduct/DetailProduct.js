import { ChevronDown } from '../../../utils/IconSVG';
const detailProd = [
  {
    attr: 'Screen size',
    detail: '6.1 inches',
  },
  {
    attr: 'Screen technology',
    detail: 'Super Retina XDR OLED',
  },

  {
    attr: 'Rear camera',
    detail: 'Wide-angle camera: 12MP, f/1.6 Ultra wide-angle camera: 12MP, ƒ/2.4',
  },
  {
    attr: 'Front camera',
    detail: '12MP, f/2.2',
  },
  {
    attr: 'Chipset',
    detail: 'Apple A15',
  },

  {
    attr: 'RAM capacity',
    detail: '4 GB',
  },
  {
    attr: 'Internal memory',
    detail: '128 GB',
  },
  {
    attr: 'The battery',
    detail: '3240mAh',
  },
  {
    attr: 'SIM',
    detail: '2 SIM (nano‑SIM and eSIM)',
  },
  {
    attr: 'Size',
    detail: '146.7 x 71.5 x 7.65mm',
  },
  {
    attr: 'Weight',
    detail: '174g',
  },
  {
    attr: 'Back material',
    detail: 'Glasses',
  },
];
function DetailProduct() {
  return (
    <div className="mt-9 py-6 px-8 pb-9 bg-[#F2F2F2] rounded-xl relative">
      <header className="text-lg font-bold mb-3">Detail Product</header>
      {detailProd.map((el, idx) => {
        return (
          <div
            key={idx}
            className={`flex rounded-md py-2 px-3 text-[15px] leading-[26px] ${
              idx % 2 === 0 ? 'bg-white' : 'bg-inherit'
            }`}
          >
            <div className="min-w-[45%] font-semibold">{el.attr}</div>
            <div>{el.detail}</div>
          </div>
        );
      })}
      <div className="absolute bottom-[-2px] cursor-pointer flex border-2 translate-x-[-50%] left-[50%] mx-auto w-[120px] text-center rounded-full bg-white ">
        <div className="flex items-center mx-auto">
          <div className="py-[6px]">More</div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
