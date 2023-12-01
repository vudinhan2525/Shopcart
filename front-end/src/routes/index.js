import { HomePage, OrderPage, ProductPage, ErrorPage, TypePage, CartPage, RegisterPage, SettingPage } from '../pages';
import { LayoutNoHeader, BlankLayout } from '../components/Layout';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/product/:id', component: ProductPage },
  { path: '/type/:types', component: TypePage },
  { path: '/cart', component: CartPage },
  { path: '/register', component: RegisterPage, layout: BlankLayout },
  { path: '/register/:token', component: RegisterPage, layout: BlankLayout },
  { path: '/setting', component: SettingPage },
  { path: '/order', component: OrderPage },
  { path: '*', component: ErrorPage },
];
const privateRoutes = [
  { path: '/setting', component: SettingPage },
  { path: '/order', component: OrderPage },
  { path: '*', component: ErrorPage, layout: LayoutNoHeader },
];
export { publicRoutes, privateRoutes };
