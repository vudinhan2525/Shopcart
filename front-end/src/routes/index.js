import { HomePage, OrderPage, ProductPage, ErrorPage, TypePage, CartPage, RegisterPage, SettingPage } from '../pages';
import { LayoutNoHeader, BlankLayout } from '../components/Layout';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/order', component: OrderPage },
  { path: '/product', component: ProductPage },
  { path: '/type', component: TypePage },
  { path: '/cart', component: CartPage },
  { path: '/setting', component: SettingPage },
  { path: '/register', component: RegisterPage, layout: BlankLayout },
  { path: '/register/:token', component: RegisterPage, layout: BlankLayout },
  { path: '*', component: ErrorPage, layout: LayoutNoHeader },
];
export { publicRoutes };
