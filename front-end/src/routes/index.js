import { HomePage, OrderPage, ProductPage, ErrorPage } from '../pages';
import { LayoutNoHeader } from '../components/Layout';
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/order', component: OrderPage },
  { path: '/product', component: ProductPage },
  { path: '*', component: ErrorPage, layout: LayoutNoHeader },
];
export { publicRoutes };
