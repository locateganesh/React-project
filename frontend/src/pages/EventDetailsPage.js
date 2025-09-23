import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from '../components/EventsList';


const EventDetailsPage = () => {
    const {event, events} = useRouteLoaderData('event-detail'); // it calls nearest data. It can be used inside EventsList components.
    return (
        <>
            <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents.events} />}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetailsPage;


async function loadEvent(id) { 
    // console.log("eventId", eventId);
    const reposnse = await fetch('http://localhost:8080/events/' + id);
    if (!reposnse.ok) {
        throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.' }), { status: 500});
    } else {
        const resData = await reposnse.json();
        return resData.event;
    }
}

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

export async function loader({params}) { 
    const id = params.eventId;
    return {
        event: await loadEvent(id),
        events: loadEvents()
    }
}

export async function action({request, params}) {
    const reposnse = await fetch('http://localhost:8080/events/' + params.eventId, {
        method: request.method
    });
    if (!reposnse.ok) {
        throw new Response(JSON.stringify({ message: 'Could not delete event.' }), { status: 500});
    } 
    return redirect('/events');
}