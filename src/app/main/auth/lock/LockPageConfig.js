import {FuseLoadable} from '@fuse';

export const LockPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/lock',
            component: FuseLoadable({
                loader: () => import('./LockPage')
            })
        }
    ]
};
