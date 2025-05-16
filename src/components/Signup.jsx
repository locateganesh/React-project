import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualsToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  // Form action is a React 19 above feature.
  // Form action - Every input should have name attributes that's why it targets selectors.

  const signUpAction = (prevFormState, formdata) => {
    const email = formdata.get("email");
    const password = formdata.get("password");
    const confirmPassword = formdata.get("confirm-password");
    const firstName = formdata.get("first-name");
    const lastName = formdata.get("last-name");
    const role = formdata.get("role");
    const acquisition = formdata.getAll("acquisition");
    const terms = formdata.get("terms");

    let errors = [];

    if (!isEmail(email)) {
      errors.push("Invalid Email address.");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password at least 6 charactors.");
    }

    if (!isEqualsToOtherValue(password, confirmPassword)) {
      errors.push("Password do not match.");
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push("Please provide both your first and last name.");
    }

    if (!isNotEmpty(role)) {
      errors.push("Please select a role.");
    }

    if (acquisition.length === 0) {
      errors.push("Please select at least 1 acquisition channel.");
    }

    if (!terms) {
      errors.push("You must agree to terms and conditions.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredvalue: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          role,
          acquisition,
          terms,
        },
      };
    }

    return { errors: null };
  };

  const [formState, formAction] = useActionState(signUpAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredvalue?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredvalue?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredvalue?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredvalue?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredvalue?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredvalue?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredvalue?.acquisition.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredvalue?.acquisition.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredvalue?.acquisition.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultValue={formState.enteredvalue?.terms} />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="control-error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
