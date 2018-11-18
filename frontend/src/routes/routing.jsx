import Starter from '../views/starter/starter.jsx';
// ui components
import Customer from '../views/ui-components/Customer.jsx';
import Employee from '../views/ui-components/Employee.jsx';
import Distributor from '../views/ui-components/Distributor.jsx';
   var ThemeRoutes = [
  {
    path: '/customer',
    name: 'Customer',
    icon: 'mdi mdi-comment-processing-outline',
    component: Customer
  },
  {
    path: '/employee',
    name: 'Employee',
    icon: 'mdi mdi-arrange-send-backward',
    component: Employee
  },
  {
    path: '/Distributor',
    name: 'Distributor',
    icon: 'mdi mdi-toggle-switch',
    component: Distributor
  },
  { path: '/', pathTo: '/customer', name: 'Customer', redirect: true }
];
export default ThemeRoutes;
