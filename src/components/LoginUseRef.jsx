import { useRef } from "react";


export default function LoginUseRef() {
  const emailRef = useRef('');
  const passwordlRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailRef.current.value, passwordlRef.current.value);
  }
  
  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordlRef}  />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button type="submit" className="button">Login</button>
      </p>
    </form>
  );
}
