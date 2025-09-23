import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  // Form and Form maintains its own state internally. and it will not cause the component to re-render.
  // fetcher.Form will trigger an action but doens't cause route transition.
  // Useful for newsletter signup form or comment form where you don't want to navigate away from the current page.
  // when you want to call an action without without caring about from where action belong to comonent belong to.
  const fetcher = useFetcher();  
  const {data, state} = fetcher;  

  useEffect(()=> {  
    if (state === 'idle' && data && data.message) {
        window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newslatter" className={classes.newsletter}> 
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;