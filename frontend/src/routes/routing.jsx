import Starter from '../views/starter/starter.jsx';
// ui components
import Customer from '../views/ui-components/Customer.jsx';
import Employee from '../views/ui-components/Employee.jsx';
import Distributor from '../views/ui-components/Distributor.jsx';
import Sandwiches from '../views/ui-components/Sandwiches.jsx';
import Ingredients from '../views/ui-components/Ingredients.jsx';
import Supplier from '../views/ui-components/Supplier.jsx';
var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'ti-loop', 
    component: Starter 
  },
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
  {
    path: '/sandwich',
    name: 'Sandwiches',
    icon: 'mdi mdi-credit-card-multiple',
    component: Sandwiches
  },
  {
    path: '/ingredient',
    name: 'Ingredients',
    icon: 'mdi mdi-apps',
    component: Ingredients
  },
  {
    path: '/supplier',
    name: 'Supplier',
    icon: 'mdi mdi-priority-high',
    component: Supplier
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
