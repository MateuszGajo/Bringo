const authReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          emailError: action.msg
        }
      };
    case "PASSWORD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          passwordError: action.msg
        }
      };
    case "CONFIRMPASSWORD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          confirmPasswordError: action.msg
        }
      };
    case "FIRSTNAME_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          firstNameError: action.msg
        }
      };
    case "LASTNAME_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          lastNameError: action.msg
        }
      };
    case "PHONENUMBER_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          phoneNumberError: action.msg
        }
      };
      case "REGISTER_ERROR":
        return {
      ...state,
      errors:{
        ...state.errors,
        registerError:action.msg
      }
    }
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.token
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state
      };
      case "LOGIN_ERROR":
        return {
    ...state
      }
    default:
      return state;
  }
  
};

export default authReducer;
