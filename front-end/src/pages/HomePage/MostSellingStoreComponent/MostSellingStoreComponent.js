import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import img1 from '../../../assets/img/shop/introduce-shop.png';
import logo from '../../../assets/img/shop/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TagIcon } from '../../../utils/IconSVG';
function MostSellingStoreComponent() {
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold mt-12">Best Selling Store</header>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {['', '', '', ''].map((el, id) => {
          return (
            <div key={id}>
              <div className="">
                <div className="h-[250px] relative">
                  <div
                    style={{ backgroundImage: `url(${img1})` }}
                    className="h-[220px]  w-full rounded-xl bg-no-repeat transition-all bg-center bg-cover"
                  ></div>
                  <div className="absolute bottom-0 left-[10%] border-[2px] border-white rounded-full">
                    <div
                      style={{ backgroundImage: `url(${logo})` }}
                      className="h-[60px] w-[60px] rounded-full bg-no-repeat transition-all bg-center bg-contain"
                    ></div>
                  </div>
                </div>
                <div className="px-3">
                  <div className="flex items-center gap-2">
                    <header className="text-xl font-bold">ShopDunk Official Store</header>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-base text-[#20D5EC]" />
                  </div>
                  <p className="text-sm text-gray-800 mt-1">
                    Official store ShopDunk, sell everything about technology
                  </p>
                  <div className="mt-1 flex items-center">
                    <TagIcon height={'14px'} width={'14px'} />
                    <p className="text-xs text-gray-600">Technology,Phone</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MostSellingStoreComponent;
