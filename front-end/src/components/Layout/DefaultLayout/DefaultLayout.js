import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FooterComponent from '../../FooterComponent/FooterComponent';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import LoginModal from '../../Modals/LoginModal';
import http from '../../../utils/http';
import Dialog from '../../Modals/Dialog';
import { useLocation } from 'react-router-dom';

function DefaultLayout({ children }) {
  const { showLoginModal, showLogoutModal, logout, setShowLogoutModal } = useContext(AuthContext);
  const location = useLocation();
  const handleLogout = async () => {
    try {
      const response = await http.get(`users/logout`, { withCredentials: true });
      if (response.data.status === 'success') {
        logout();
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div>
      <HeaderComponent isAdminPage={location.pathname.split('/')[1] === 'admin'}></HeaderComponent>
      <div className="pt-[64px] dark:bg-dark-ground"></div>
      {children}
      {location.pathname.split('/')[1] !== 'admin' && <FooterComponent />}
      {showLoginModal === true && <LoginModal />}
      {showLogoutModal === true && (
        <Dialog
          onClose={() => {
            setShowLogoutModal(false);
          }}
          onYes={() => {
            handleLogout();
            setShowLogoutModal(false);
          }}
          buttonContent={'Logout'}
          message={'Are you sure want to logout this account ??'}
          content={'Your account will be logged out!!'}
        />
      )}
    </div>
  );
}

export default DefaultLayout;
