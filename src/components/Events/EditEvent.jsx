import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const { id } = useParams();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({id, signal}),
  });

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async(data) => { // optimistic updates - means it updates UI meanwhile backgound API is still working. it API fails then it revert optimistic changes otherwise continue.
      const newEvent = data.event; // formData will be available as onMutate parameter.
      await queryClient.cancelQueries({queryKey: ['events', id]});
      const previousEvent = queryClient.getQueryData(['events', id]);
      queryClient.setQueryData(['events', id], newEvent);
      return {previousEvent} // returns previous data, useful when api fails.
    },
    onError: (error, data, context) => { // if api fails it will update previous data. context takes data from return {previousEvent} onMutate.
      queryClient.setQueryData(['events', id], context);
    },
    onSettled: () => { // Success or fail. this method returns.
      queryClient.invalidateQueries(['events', id]) // Fetch latest data after every edit, it's a better practice.
    }
  });

  const navigate = useNavigate();

  function handleSubmit(formData) {
    mutate({id, event: formData});
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }
  let content;
  if (isPending) {
    content = <div className='center'>
      <LoadingIndicator />
    </div>
  }
  if (isError) {
    content = <div className='center'>
      <ErrorBlock title="Failed to load event" message={error.info?.message || 'Failed to load events. Please try again later.'} />
      <div className='form-actions'>
        <Link to="../" className='button'>Okay</Link>
      </div>
    </div>
  }

  content = <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>

  return (
    <Modal onClose={handleClose}>
       {content}
    </Modal>
  );
}
