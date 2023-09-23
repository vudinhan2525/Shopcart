import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
function App() {
  return (
    <Router>
      <div className="font-OpenSans text-base font-medium">
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
