import TransactionSuccess from '../../../assets/animationJson/transactionSuccess.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
function SuccessTransaction({ setShowSuccess }) {
  const handleTurnOffMessage = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowSuccess(false);
    }
  };
  return (
    <div
      onClick={(e) => handleTurnOffMessage(e)}
      className="modal fixed top-0 right-0 left-0 bottom-0  bg-black/30 z-[51]"
    >
      <div className="absolute top-[50%] translate-y-[-50%] overflow-hidden right-[50%] pb-7 rounded-3xl w-[500px] translate-x-[50%] bg-white">
        <div className="bg-transactionsuccess-ct relative">
          <div className="backdrop-blur-md bg-white/20">
            <div className="w-[240px] h-[330px] mx-auto pt-12">
              <Lottie animationData={TransactionSuccess} loop={true} />
            </div>
            <div className="bottom-[-2px] absolute linear-ct w-full h-[30px] "></div>
          </div>
        </div>
        <div className="mt-2 mx-auto text-center text-2xl font-semibold max-w-[60%]">Your order have been accepted</div>
        <div className="mt-2 text-center text-gray-700 text-sm">Transection ID: 898452132</div>
        <Link
          to={'/'}
          className="block mt-4 text-center text-sm font-semibold cursor-pointer select-none mx-auto w-[200px] bg-orange-600 hover:bg-orange-400 transition-all text-white py-3 rounded-full"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default SuccessTransaction;
