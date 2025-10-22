
import { useRouter } from 'next/router';
import NewMettupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import Head from 'next/head';

function newMeetupPage() {
    const router = useRouter();
    const addMeetupHandler = async(enteredData) => {
        console.log(enteredData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    };
    return (
        <Fragment>
            <Head>
                <title>Add New React Meetup</title>
                <meta
                    name='description'
                    content='Add your own meetups and create amazing networking opportunities.'
                />
            </Head>
            <NewMettupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}
export default newMeetupPage;