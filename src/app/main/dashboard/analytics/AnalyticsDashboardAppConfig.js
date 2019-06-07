import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';

export const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/dashboard',
      component: FuseLoadable({
        loader: () => import('./AnalyticsDashboardApp')
      })
    }
  ]
};
