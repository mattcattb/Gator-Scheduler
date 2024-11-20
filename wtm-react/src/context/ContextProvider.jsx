// context/ContextProvider.js
import React from 'react';
import { UserProvider } from './UserProvider';
import { MeetingDetailsProvider } from './MeetingDetailsProvider';
import { MeetingContextProvider } from './MeetingProvider';

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <MeetingContextProvider>
        <MeetingDetailsProvider>
          {children}
        </MeetingDetailsProvider>
      </MeetingContextProvider>
    </UserProvider>
  );
};

export default ContextProvider;