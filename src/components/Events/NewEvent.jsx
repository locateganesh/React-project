import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // useMutation - for updating data like post.

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import {queryClient} from '../../util/http'

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error} = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => { // when api post is successful. It return this function. Till then it will wait.
      // queryClient.invalidateQueries({query: ['events'], exact: true}); // it will invalidate the query so it can reload again. exact will invalid only events not events search params.
      queryClient.invalidateQueries({ query: ['events'] }); // it will invalidate the query so it can reload again. exact will invalid only events not events search params.
      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Failed to create event. Please check your input and try again later.'} /> }
    </Modal>
  );
}
