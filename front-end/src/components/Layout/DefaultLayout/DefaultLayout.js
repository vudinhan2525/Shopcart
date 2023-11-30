import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FooterComponent from '../../FooterComponent/FooterComponent';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import LoginModal from '../../Modals/LoginModal';
function DefaultLayout({ children }) {
  const { showLoginModal } = useContext(AuthContext);

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className="pt-[64px]"></div>
      {children}
      <FooterComponent />
      {showLoginModal === true && <LoginModal />}
    </div>
  );
}

export default DefaultLayout;
