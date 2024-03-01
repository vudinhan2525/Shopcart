import {
  HomePage,
  OrderPage,
  ProductPage,
  ShopPage,
  ErrorPage,
  TypePage,
  CartPage,
  RegisterPage,
  SettingPage,
  SearchPage,
  AdminPage,
} from '../pages';
import { BlankLayout } from '../components/Layout';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/product/:id', component: ProductPage },
  { path: '/shop/:id', component: ShopPage },
  { path: '/type/:types', component: TypePage },
  { path: '/cart', component: CartPage },
  { path: '/search/:keyword', component: SearchPage },
  { path: '/register', component: RegisterPage, layout: BlankLayout },
  { path: '/register/:token', component: RegisterPage, layout: BlankLayout },
  { path: '*', component: ErrorPage },
];
const privateRoutes = [
  { path: '/setting/:settingOpt', component: SettingPage },
  { path: '/order', component: OrderPage },
  { path: '/admin/:adminOpt', component: AdminPage },
  { path: '/admin/shop/:shopId', component: AdminPage },
];
export { publicRoutes, privateRoutes };
