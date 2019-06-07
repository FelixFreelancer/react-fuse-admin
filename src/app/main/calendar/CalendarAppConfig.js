import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';


export const CalendarAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.user,
    routes: [
        {
            path: '/calendar',
            component: FuseLoadable({
                loader: () => import('./CalendarApp')
            })
        }
    ]
};
