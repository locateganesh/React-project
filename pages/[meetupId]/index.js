import { MongoClient, ObjectId } from 'mongodb';
import classes from './index.module.css';
import { Fragment } from 'react';
import Head from 'next/head';
const uri = process.env.MONGODB_USER_PASS;

function MeetupDetails(props) {
    const { title, image, address, description } = props.meetupData
    return <Fragment>
        <Head>
            <title>React Meetups - {title}</title>
            <meta
                name='description'
                content={description}
            />
        </Head>
        <section className={classes.details}>
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    </Fragment>
}


// The getStaticPaths() function used to pre-generate static pages for dynamic routes.
// paths is an array that contains the value of the dynamic parameter of the pre-generated static pages.
// fallBack is a variable that controls the action when the user is trying to access a page whose dynamic parameter is not listed in the paths array.
export async function getStaticPaths() {

    const client = await MongoClient.connect(
        `mongodb+srv://${uri}/meetups?retryWrites=true&w=majority&appName=Cluster0`
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray(); // _id: 1 means only fetch from _id
    client.close();
    return {
        // fallback: false, // could be 404 if page is not cached or load immidiately on demand.
        // fallback: true, // generates or show a enprty page untill page data is loading.
        fallback: 'blocking', // Wait for page data to be loaded then it will show the page.
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))  
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        `mongodb+srv://${uri}/meetups?retryWrites=true&w=majority&appName=Cluster0`
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId)}); // _id: 1 means only fetch from _id
    client.close();
    
    return {
        props: {
            // meetupData: {
            //     id: meetupId,
            //     title: 'A First meetup',
            //     image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltf84a3683a2c57441/670537404bf2abde14ca624c/iStock-1320142643-Header_Desktop.jpg?format=webp&auto=avif&quality=60&crop=16%3A9&width=1440',
            //     address: 'Barcalone, Spain',
            //     description: 'This is a first meetup!'
            // }
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;