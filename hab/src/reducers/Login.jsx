const reducer = (state, action) => {
	switch (action.type) {
	  case "LOGIN_REQUEST":
	  case "REGISTER_REQUEST":
	  case "RETURN_REQUEST":
		return {
		  ...state,
		  loading: true,
		};
	  case "LOGIN":
	  case "REGISTER":
	  case "RETURN":
		return {
		  ...state,
		  userName: action.userName,
		  token: action.token,
		  loading: false,
		};
	  case "LOGOUT":
		return {
		  ...state,
		  userName: null,
		  token: null,
		  loading: false,
		}
	  case "RETURN_ERROR":
	  case "LOGIN_ERROR":
	  case "REGISTER_ERROR":
		  return{
			  ...state,
			  error: action.error,
			  loading: false,
		  }
	  default:
		return state;
	}
}

export default reducer;