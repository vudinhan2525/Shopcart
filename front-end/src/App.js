import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import ScrollToTop from './utils/scrollToTop';
import PrivateRoute from './routes/PrivateRoute';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div spellCheck={false} className="font-OpenSans text-base overflow-hidden font-medium bg-white ">
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
