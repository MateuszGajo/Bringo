export const RegisterFormValidation = ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  phoneNumber,
  dispatch
}) => {
  let emailMessage = "";
  let passwordMessage = "";
  let confirmPasswordMessage = "";
  let firstNameMessage = "";
  let lastNameMessage = "";
  let phoneNumberMessage = "";
  let isValid = true;

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  const numberRegex = /[\d]{9}/;

  if (!email) {
    emailMessage = "uzupełnij adres e-mail";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailMessage = "Niepoprawny adres e-mail";
    isValid = false;
  }

  if (password <= 6) {
    passwordMessage = "Niepoprawne hasło";
    isValid = false;
  }

  if (confirmPassword !== password) {
    confirmPasswordMessage = "Hasła są różne";
    isValid = false;
  }

  if (!firstName) {
    firstNameMessage = "Wpisz swoję imię";
    isValid = false;
  }

  if (!lastName) {
    lastNameMessage = "Wpisz nazwisko";
    isValid = false;
  }

  if (!numberRegex.test(phoneNumber)) {
    phoneNumberMessage = "Number musi składać się z 9 cyfr";
    isValid = false;
  }

  dispatch({ type: "EMAIL_ERROR", msg: emailMessage });
  dispatch({ type: "PASSWORD_ERROR", msg: passwordMessage });
  dispatch({ type: "CONFIRMPASSWORD_ERROR", msg: confirmPasswordMessage });
  dispatch({ type: "FIRSTNAME_ERROR", msg: firstNameMessage });
  dispatch({ type: "LASTNAME_ERROR", msg: lastNameMessage });
  dispatch({ type: "PHONENUMBER_ERROR", msg: phoneNumberMessage });
  isValid && dispatch({ type: "VALIDED_FIELDS" });
  return isValid;
};
