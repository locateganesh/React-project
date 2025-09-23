import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventsPage = () => {
    const { events } = useLoaderData(); // it calls nearest data. It can be used inside EventsList components.
    // console.log("events", events);
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents.events} />}
            </Await>
        </Suspense>   
    )
}

export default EventsPage;


async function loadEvents() { 
    try {
        const reposnse = await fetch('http://localhost:8080/events');
        if (!reposnse.ok) {
            throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), { status: 500});
        } else {
            const resData = await reposnse.json();
            // console.log("resData", resData);
            return resData;
        }
    } catch (error) {
        console.log(error, error.message);
    }
}

export function loader() { 
    return {
        events: loadEvents()
    };
}


