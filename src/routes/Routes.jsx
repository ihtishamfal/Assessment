// eslint-disable-next-line import/no-cycle
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Dashboard from '../containers/dashboard/Dashboard';

const SideBarRoutes = [
  {
    path: '/',
    name: 'Login',
    element: Login,
  },
  {
    path: '/login',
    name: 'Login',
    element: Login,
  },
  {
    path: '/register',
    name: 'Register',
    element: Register,
  },
];

const AuthRoutes = [
  {
    path: '/dashboard/:section',
    name: 'Dashboard',
    element: Dashboard,
  },
];
const RoutesObj = {
  SideBarRoutes,
  AuthRoutes,
};

export default RoutesObj;
