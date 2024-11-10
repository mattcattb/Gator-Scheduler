// context/ContextProvider.js
import React from 'react';
import { UserProvider } from './UserProvider';
import { MeetingDetailsProvider } from './MeetingDetailsProvider';

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <MeetingDetailsProvider>
        {children}
      </MeetingDetailsProvider>
    </UserProvider>
  );
};

export default ContextProvider;