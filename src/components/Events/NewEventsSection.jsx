
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }], // Unique identifier to fetching and caching data.
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // tan satck query doensn't do fetch call, instead you should your own fetch function or axios.
    staleTime: 5000, // is time what is gap between each fetch you want. For example if you go to another tab and come it will call fetch immidiatly, if you keep it 5000 that means if you away for tab for 5 or more sceonds, then it will call fetch event.
    //gcTime: 30000 // Garbage collection time is how much you want to put data in cache. (30000 - half minute)
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
