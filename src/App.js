import React from 'react';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>User Profiles</h1>
        <UserProfile name="Alice" age={25} location="New York" />
        <UserProfile name="Bobby" age={30} location="Los Angeles" />
        <UserProfile name="Raju" age={35} location="Chicago" />
        {/* This will use default props */}
        <UserProfile />
      </div>
    );
  }
}

export default App;