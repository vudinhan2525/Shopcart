import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FooterComponent from '../../FooterComponent/FooterComponent';
function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className="pt-[64px]"></div>
      {children}
      <FooterComponent />
    </div>
  );
}

export default DefaultLayout;
