import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import LoginModal from './components/Modals/LoginModal';
import { AuthContext } from './components/AuthProvider/AuthProvider';
import { useContext } from 'react';
import ScrollToTop from './utils/scrollToTop';
function App() {
  const { showLoginModal } = useContext(AuthContext);
  return (
    <Router>
      <ScrollToTop />
      <div spellCheck={false} className="font-OpenSans text-base overflow-hidden font-medium bg-white ">
        <Routes>
          {publicRoutes.map((el, idx) => {
            const Layout = el.layout || DefaultLayout;
            return (
              <Route
                key={idx}
                path={el.path}
                element={
                  <Layout>
                    <el.component></el.component>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <div></div>
      </div>
      {showLoginModal === true && <LoginModal />}
    </Router>
  );
}

export default App;
