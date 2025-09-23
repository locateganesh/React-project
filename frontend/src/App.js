// import { RouterProvider } from 'react-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage, {loader as loaderEvents} from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import EventDetailsPage, {loader as eventDetailsloader, action as deleteEventAction} from './pages/EventDetailsPage';
import RootLayout from './RootLayout';
import EventLayout from './EventLayout';
import ErrorPage from './pages/Error';
import NewsletterPage, {action as newslatterAction} from './pages/Newsletter';
import {action as manipulateEventAction} from './components/EventForm';
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  const router = createBrowserRouter([
    {
      path:'',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          // path: '/',
          index: true,
          element: <HomePage />
        },
        {
          path: 'events',
          element: <EventLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              // loader: async() => { // this code gets longer instead you can put loader function inside function only.
              //   const reposnse = await fetch('http://localhost:8080/events');
              //   if (!reposnse.ok) {
              //     return null;
              //   } else {
              //     const resData = await reposnse.json();
              //     return resData.events;
              //   }
              // }
              loader: loaderEvents
            },
            {
              path: ':eventId',
              id:"event-detail", // you can give any name to id. It is used to identify the route.
              loader: eventDetailsloader, // loader to load data.
              children: [
                {
                  index: true,
                  element: <EventDetailsPage />,
                  action: deleteEventAction // action to delete data.
                },
                {
                  path: 'edit',
                  element: <EditEventPage />,
                  action: manipulateEventAction // action to send data.
                }
              ]
            },
            
            {
              path: 'new',
              element: <NewEventPage />,
              action: manipulateEventAction // action to send data.
            },
            
          ]
        },
        {
          path: 'newslatter',
          element: <NewsletterPage />,
          action: newslatterAction
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
