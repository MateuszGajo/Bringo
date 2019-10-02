const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.token
      };
   case "SIGNUP_SUCCESS":
      return{
        ...state
      }
    default:
      return state;
  }
};

export default authReducer;
