import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { authRoles } from 'app/auth';

export const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/dashboard/',
      component: FuseLoadable({
        loader: () => import('./Dashboard')
      })
    }
  ]
};
