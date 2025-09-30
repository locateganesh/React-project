import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, deleteEvent, queryClient } from '../../util/http';

import Header from '../Header.jsx';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({id, signal}),
  });

  const { mutate, isPending: deleteLoading, isError: deleteIsError, error: deleteError} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none' // ['events'] will not re-trigged immidiatelly. 
      })
      navigate('/events');
    }
  });

  const deleteConfirmHandler = () => {
    setIsDeleting(true);
  };
  const deleteCancelHandler = () => {
    setIsDeleting(false);
  };

  const deleteHandler = () => {
    mutate({id});
  };

  let content = null;

  if (isPending) {
    content = (
      <div id="event-details-description" className='center'>
        <p>Fetching event data...</p>
      </div>
    )
  }
  if (isError) {
    content = (
    <div id="event-details-description" className='center'>
        <ErrorBlock title="Failed to fetch" message={error.info?.message || "failed to fetch data."} />
      </div>
    )
  }

  if (data) {
    const {title, image, location, date, time, description} = data;
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: "numeric"
    });
    content = (
      <>
        <header>
          <h1>{title}</h1>
          <nav>
            <button onClick={deleteConfirmHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${image}`} alt={title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {time}</time>
            </div>
            <p id="event-details-description">{description}</p>
          </div>
        </div>
      </>
    )
  }

  // console.log(data);
  return (
    <>
      {isDeleting && (
        <Modal onClose={deleteCancelHandler}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? Thiss action cannot be undone.</p>
          <div className='form-actions'>
            {deleteLoading ? (
              <p>Deleting, Please wait...</p>
            ) : (
              <>
                <button className='button-text' onClick={deleteCancelHandler} disabled={deleteLoading}>Cancel</button>
                <button className='button' onClick={deleteHandler} disabled={deleteLoading}>Delete</button>
              </>
            )}
            {deleteIsError && (
              <ErrorBlock title="Failed to delete" message={deleteError.info?.message || 'Unable to delete. Please try later.'} />
            )}
          </div>
        </Modal>
    )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
