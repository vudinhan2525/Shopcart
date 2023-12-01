import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import ScrollToTop from './utils/scrollToTop';
function App() {
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
    </Router>
  );
}

export default App;
