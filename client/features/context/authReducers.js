
const authReducer = (state, action) => {
  switch (action.type) {

    case "EMAIL_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          emailError: action.msg
        }
      };

    case "PASSWORD_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          passwordError: action.msg
        }
      };

    case "CONFIRMPASSWORD_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          confirmPasswordError: action.msg
        }
      };

    case "FIRSTNAME_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          firstNameError: action.msg
        }
      };

    case "LASTNAME_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          lastNameError: action.msg
        }
      };

    case "PHONENUMBER_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          phoneNumberError: action.msg
        }
      };

    case "REGISTER_CONNECTION_ERROR":
      return {
      ...state,
      registerErrors:{
        ...state.registerErrors,
        connectionError:action.msg
      }
    }

    case "REGISTER_SUCCESS":
      return{
        ...state,
        registerErrors:{}
      }

    case "LOGIN_EMAIL_ERROR":
        return{
          ...state,
          loginErrors:{
            emailError:action.msg
          }
        }

    case "LOGIN_PASSWORD_ERROR":
        return{
          ...state,
          loginErrors:{
            passwordError:action.msg
        }
      }

      case "LOGIN_CONNECTION_ERROR":
        return{
          ...state,
          loginErrors:{
            connectionError:action.msg
        }
      }

      case "LOGIN_SUCCESS":
        return{
          ...state,
          loginErrors:{}
        }
     
      case "LOGIN_ERROR":
        return {
        ...state
      }

    default:
      return state;
  }
  
};

export default authReducer;
