import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
function App() {
  return (
    <Router>
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
