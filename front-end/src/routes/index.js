import { HomePage, OrderPage, ProductPage, ErrorPage,TypePage } from '../pages';
import { LayoutNoHeader } from '../components/Layout';
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/order', component: OrderPage },
  { path: '/product', component: ProductPage },
  { path: '/type', component: TypePage },
  { path: '*', component: ErrorPage, layout: LayoutNoHeader },
];
export { publicRoutes };
