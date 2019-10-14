import { useStateValue } from '../state';

export const useLogoutAction = () => {
	const [, dispatch] = useStateValue();

	const logoutAction = async () => {
		try {
			localStorage.removeItem('token');
			dispatch({type: 'LOGOUT'});
		} catch (error) {
			dispatch({type: 'LOGOUT_ERROR', error});
		}
		
	}

	return {
		logoutAction
	}
}
