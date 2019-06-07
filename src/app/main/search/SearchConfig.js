import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { authRoles } from 'app/auth';

export const SearchConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.user,
    routes: [
        {
            path: '/search',
            component: FuseLoadable({
                loader: () => import('./Search')
            })
        }
    ]
};