// domain.com/
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head';
const uri = process.env.MONGODB_USER_PASS;
// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First meetup',
//     image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltf84a3683a2c57441/670537404bf2abde14ca624c/iStock-1320142643-Header_Desktop.jpg?format=webp&auto=avif&quality=60&crop=16%3A9&width=1440',
//     address: 'Barcalone, Spain',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second meetup',
//     image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltf84a3683a2c57441/670537404bf2abde14ca624c/iStock-1320142643-Header_Desktop.jpg?format=webp&auto=avif&quality=60&crop=16%3A9&width=1440',
//     address: 'Paris, France',
//     description: 'This is a second meetup!'
//   }
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

// to fetch dynamic or api data.
// getStaticProps - this is reserve name.
// async is optional - if you're using promise

// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//     // revalidate - re-buils on server every 10 seconds when data chnages.
//     // This is called Incremental Static Regeneration (ISR).
//     revalidate: 10
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${uri}/meetups?retryWrites=true&w=majority&appName=Cluster0`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}

// Another alternative
// runs on server on every new request
// doens't require revalidate
// export function getSeverSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;