const reducer = (state, action) => {
	switch (action.type) {
	  case "FETCH_ME_REQUEST":
	  case "FETCH_ME_LOADING":
		return {
		  ...state,
		  loading: true,
		};
	  case "FETCH_ME":
		return {
		  ...state,
		  profile: action.profile,
		  loading: false,
		};
	  case "FETCH_ERROR":
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