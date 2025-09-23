
import { useRouteLoaderData } from "react-router";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
    const data = useRouteLoaderData('event-detail'); // it calls nearest data. It can be used inside EventsList components.
    return (
        <EventForm method="PATCH" event={data} />
    )
}

export default EditEventPage;