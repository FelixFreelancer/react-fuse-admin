import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { authRoles } from 'app/auth';

export const PatientConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.user,
    routes: [
        {
            path: '/patient/:patientId',
            component: FuseLoadable({
                loader: () => import('./Patient')
            })
        }
    ]
};