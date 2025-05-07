import { Component } from 'react';
// import Users from './components/Users';
import UserFinder from './components/UserFinder';
import UsersContext from './store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class App extends Component {
  

  render() {
    const usersContext = {
      users: DUMMY_USERS
    }
    return (
      <UsersContext.Provider value={usersContext}>
        <UserFinder /> 
        {/* <Users /> */}
      </UsersContext.Provider>
    )
  }
}

// function App() {
//   return (
//     <div>
//       <Users />
//     </div>
//   );
// }

export default App;
