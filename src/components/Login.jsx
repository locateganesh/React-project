import { useState } from "react";
import Input from "./Input.jsx";
import { useInput } from "../hooks/useInput.js";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: emailChange,
    HandleInputBlur: emailBlur,
    hasError: emailError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: passValue,
    handleInputChange: passChange,
    HandleInputBlur: passBlur,
    hasError: passError,
  } = useInput("", (value) => hasMinLength(value, 6));

  // const [userInput, setUserInput] = useState(INITIAL_VALUE);
  // const [isValid, setIsValid] = useState({
  //   email: false,
  //   password: false
  // });

  // const emailValidation = userInput.email.length > 0 && !userInput.email.includes('@');

  // const inputHandler = (event) => {
  //   setUserInput(prevState => ({
  //     ...prevState,
  //     [event.target.name]: event.target.value
  //   }));
  //   setIsValid(prevState => ({
  //     ...prevState,
  //     [event.target.name]: false
  //   }))
  // }

  // const blurHandler = (event) => {
  //   console.log(emailValidation);
  //   setIsValid(prevState => ({
  //     ...prevState,
  //     [event.target.name]: emailValidation
  //   }));
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(userInput.email, userInput.password);
    if (emailError || passError) {
      return;
    }
    console.log(emailValue, passValue);
  };

  // console.log("emailError", emailError, passError);

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          error={emailError && "Please enter a valid email!"}
          value={emailValue}
          onChange={emailChange}
          onBlur={emailBlur}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          error={passError && "Please enter a valid password!"}
          value={passValue}
          onChange={passChange}
          onBlur={passBlur}
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
