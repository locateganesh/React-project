'use client'

import { useState, use } from 'react';

export default function UsePromiseDemo({ userPromise }) {
    // if in any case you have to use useState, that means this component has to be a client component.
    // in this case `use` can be used, which wait for it to resolve and renders on client side.
  const users = use(userPromise);  
  const [count, setCount] = useState(0); // <- this is why it's a client component
  return (
    <div className='rsc'>
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <p>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button> <br/>
        <span>Count: {count}</span>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
