import HeaderComponent from '../../HeaderComponent/HeaderComponent';
function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className="pt-[72px]"></div>
      {children}
    </div>
  );
}

export default DefaultLayout;
