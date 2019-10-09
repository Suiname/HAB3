const reducer = (state, action) => {
	switch (action.type) {
	  case "LOGIN":
	  case "REGISTER":
		return {
		  ...state,
		  userName: action.userName,
		  token: action.token,
		};
	  case "LOGOUT":
		return {
		  ...state,
		  userName: null,
		  token: null,
		}
	  default:
		return state;
	}
}

export default reducer;