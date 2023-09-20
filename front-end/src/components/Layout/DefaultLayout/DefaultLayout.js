import HeaderComponent from '../../HeaderComponent/HeaderComponent';
function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      {children}
    </div>
  );
}

export default DefaultLayout;
