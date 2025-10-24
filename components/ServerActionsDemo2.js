'use client'; // `use server` won't work with use clinet. As a file can be a cient or server side. See ServerActionsDemo2
// if component is client side then server component can be put in another file.

import { saveUserAction } from '@/actions/users';

// user sever can be used inside action.
export default function ServerActionsDemo() {
  

  return (
    <div className='rsc'>
      <h2>Server Actions</h2>
      <p>
        A "Form Action" converted to a "Server Action" via{' '}
        <strong>"use server"</strong>.
      </p>
      <p>Can be defined in a server component or a separate file.</p>
      <p>Can be called from inside server component or client component.</p>
      <form action={saveUserAction}>
        <p>
          <label htmlFor='name'>User name</label>
          <input type='text' id='name' name='name' required />
        </p>
        <p>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' required />
        </p>
        <p>
          <button>Save User</button>
        </p>
      </form>
    </div>
  );
}
