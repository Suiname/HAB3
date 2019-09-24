const reducer = (state, action) => {
	console.log('reducer state: ', state);
	console.log('reducer action: ', action);
	switch (action.type) {
	  case "LOGIN":
		return {
		  ...state,
		  userName: action.userName,
		};
	  case "LOGOUT":
		return {
		  ...state,
		  userName: null,
		}
	  default:
		return state;
	}
}

export default reducer;