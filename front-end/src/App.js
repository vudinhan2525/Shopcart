import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import ScrollToTop from './utils/scrollToTop';
import PrivateRoute from './routes/PrivateRoute';
import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  useEffect(() => {
    const appjs = document.getElementById('appjs');
    if (localStorage.getItem('config') !== null) {
      const obj = JSON.parse(localStorage.getItem('config'));

      if (obj.mode === 'dark') {
        appjs.classList.add('dark');
      }
    } else {
      localStorage.setItem('config', JSON.stringify({ mode: 'light' }));
    }
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        position="top-right"
        closeButton={false}
        closeOnClick
        draggable={false}
        toastClassName={() => 'relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'}
        bodyClassName={() => 'text-sm font-white font-med block'}
        style={{ width: '400px' }}
      />
      <div spellCheck={false} id="appjs" className=" font-OpenSans text-base overflow-hidden font-medium bg-white  ">
        <Routes>
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((el, idx) => {
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
          </Route>
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
      </div>
    </Router>
  );
}

export default App;
