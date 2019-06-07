export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const APPEND_NAVIGATION = '[NAVIGATION] APPEND NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';

export function getNavigation()
{
    return {
        type: GET_NAVIGATION
    }
}

export function setNavigation(navigation)
{   
    return {
        type: SET_NAVIGATION,
        navigation
    }
}

export function appendNavigationItem(navigation)
{   
    return {
        type: APPEND_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: RESET_NAVIGATION
    }
}
