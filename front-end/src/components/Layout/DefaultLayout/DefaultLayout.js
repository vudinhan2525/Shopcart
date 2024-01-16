import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FooterComponent from '../../FooterComponent/FooterComponent';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import LoginModal from '../../Modals/LoginModal';
import ShowDeleteSelect from '../../../pages/OrderPage/Modals/ShowDeleteSelect';
import http from '../../../utils/http';

function DefaultLayout({ children }) {
  const { showLoginModal, showLogoutModal, logout, setShowLogoutModal } = useContext(AuthContext);
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
      <HeaderComponent></HeaderComponent>
      <div className="pt-[64px] dark:bg-dark-ground"></div>
      {children}
      <FooterComponent />
      {showLoginModal === true && <LoginModal />}
      {showLogoutModal === true && (
        <ShowDeleteSelect
          setShowDeleteSelect={setShowLogoutModal}
          handleDelete={handleLogout}
          buttonContent={'Logout'}
          message={'Are you sure want to logout this account ??'}
          content={'Your account will be logged out!!'}
        />
      )}
    </div>
  );
}

export default DefaultLayout;
