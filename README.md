# RSC feature
    - React Server Components (RSC)
    - Server Actions
    - use() with promises

## Why is a special setup needed?
    - Some feature requires a server-side environment.
    - Code splits (by the build process / code bundler process)
        - Client-side Code
        - Non client-side Code

## Combining RSC & Client Components
    - RSC can directly include client-components in their JSX code.
    - Client-components Can't directly include RSC in their code - only as children

    `<SomeRSC />`                          
    -----------------------------
    |  <h2>I'm a RSC!</h2>      |   (works)
    |  <SomeClientComponent />  |   
    -----------------------------

    `<SomeClientComponents />`
    -------------------------------
    |  <h2>I'm a Client Cmp!</h2> |  (Doesn't works)
    |  <SomeRSC />                |  
    -------------------------------
    
    `<SomeClientComponents>
        <SomeRSC />
    </SomeClientComponents>
    `
    -------------------------------
    |  <h2>I'm a Client Cmp!</h2> |  (works)
    |  {children}                 |  
    -------------------------------

## use() For Promises & Data Fetching

    - The use() Hook can be used for gettin access to context
    - But it can also be used to await promises - in client-components
    - Works together with suspense to handle data fetching & loading fallbacks

    - Important:
        - use() for Promises required "special promises" 
        - Created via libraries that integrate with React's Suspense feature
        - Your promises, created in your components, can't be used!