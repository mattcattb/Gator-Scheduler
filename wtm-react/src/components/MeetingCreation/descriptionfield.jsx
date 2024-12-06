import React from 'react'
import {Box, TextField} from '@mui/material'

export default function DescriptionField({meetingName, meetingDescription, handleChange}) {
  // field for changing the meetings name or description. 
  return (
    <Box className="section" sx={{ margin: 2 }}>
      <TextField
        label="Meeting Name"
        name="meetingName"             
        variant="outlined"
        value={meetingName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Meeting Description"
        variant="outlined"
        name="meetingDescription"
        value={meetingDescription}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

    </Box>
  )
}
