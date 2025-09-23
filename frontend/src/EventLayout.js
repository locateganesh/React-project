import { Outlet } from 'react-router';
import EventsNavigation from './components/EventsNavigation'

const EventLayout = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>

    )
}

export default EventLayout;