import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList({meetups}) {
  console.log("meetups===>", meetups);
  return (
    <ul className={classes.list}>
      {meetups && meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
