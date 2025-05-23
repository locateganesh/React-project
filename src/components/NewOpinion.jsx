import { useActionState, use } from "react";
import { isNotEmpty, minLength, maxLength } from "../utils/validation.js";
import { OpinionsContext } from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext); 

  const opinionFrom = async (prevFormState, formData) => {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];

    if (!isNotEmpty(userName)) {
      errors.push('Please enter a valid name.');
    } 

    if (minLength(title, 5)) {
      errors.push('Title must be at least 5 charactors.');
    } 

    if (minLength(body, 10) || maxLength(body, 300)) {
      errors.push('Opinion must be between 10 to 300 charactors long.');
    } 

    console.log(formData);

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          userName,
          title,
          body
        }
      }
    }

    await addOpinion({userName, title, body});
    return { errors: null };

  }

  const [formState, opinionFromActions] = useActionState(opinionFrom, {errors: null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={opinionFromActions}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValue?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValue?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValue?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
