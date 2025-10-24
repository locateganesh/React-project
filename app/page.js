// import ClientDemo from '@/components/ClientDemo';
// import RSCDemo from '@/components/RSCDemo';
import fs from 'node:fs/promises';


import DataFetchingDemo from "@/components/DataFetchingDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import ServerActionsDemo2 from "@/components/ServerActionsDemo2";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";

export default async function Home() {
    const fetchPromiseUsers = new Promise((resolve, reject) => (
        setTimeout(async() => {
            const data = await fs.readFile('dummy-db.json', 'utf-8');
            const users = JSON.parse(data); 
            resolve(users);
            // reject(new Error('Failed to fetch users'));
        }, 3000) 
    )); // Simulate delay
      
  return (
    <main>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        {/* <ClientDemo>
            <RSCDemo />
        </ClientDemo> */}

        {/* Below RSC fetches data on server and sends html to client */}
        {/* This is not possble with Vite beause vite executes on client side. */}
        <DataFetchingDemo />
        <ServerActionsDemo />
        {/* client + server component */}
        <br />
        <h3>Client + Server Component</h3>
        <ServerActionsDemo2 />
        <h3>Use promise</h3>
        <Suspense fallback={<div>Loading users...</div>}>
            <UsePromiseDemo userPromise={fetchPromiseUsers} />
        </Suspense>
      </ErrorBoundary>
      
    </main>
  );
}