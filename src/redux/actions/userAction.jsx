import { toast } from "react-toastify";
import { loginApi } from '../../services/UserService';

export const USER_LOGOUT = 'USER_LOGOUT';

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const USER_REFRESH = 'USER_REFRESH';


//dispatch thao tác giữa react và redux
export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem('token' ,res.token)
            localStorage.setItem('email' ,email)
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: {email: email, token: res.token}
            });
        } else {
            // Error handling
            if (res && res.status === 400) {
                toast.error(res.data.error);

            }
            dispatch({
                type: FETCH_USER_ERROR
            });
        }
    }
}


export const handleLogoutRedux =() =>{
    return (dispatch, getState)=>{

        dispatch({
            type: USER_LOGOUT
        })

    }
}


export const handleRefresh =() =>{
    return (dispatch, getState)=>{

        dispatch({
            type: USER_REFRESH
        })

    }
}