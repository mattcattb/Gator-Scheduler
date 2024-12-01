import React from 'react';
import { Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';

import DaysToggleField from './daytogglefield';

export default function MeetingOptions({formData, handleChange}) {
  return (
    <Box>
      <DaysToggleField selectedDays={formData.selectedDays} handleChange={handleChange}/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box px={2} py={3}> 
          <TimePicker
            label="No sooner than"
            value={formData.startTime}
            onChange={(newValue) => handleChange({ target: { name: 'startTime', value: newValue }})}
          />
        </Box>
        <Box px={2} py={3}> 
          <TimePicker
            label="No later than"
            value={formData.endTime}
            onChange={(newValue) => handleChange({ target: { name: 'endTime', value: newValue }})}
          />
        </Box>
      </LocalizationProvider>
    </Box>  
  );
}