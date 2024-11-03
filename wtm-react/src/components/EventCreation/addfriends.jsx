import React from 'react'
import { Box, Typography } from '@mui/material'

function AddFriends() {
  return (
    <Box className="section">
        <Typography >Add Friends</Typography>
        <select className="friend-selector">
            <option value="">Select Friends</option>
            {/* Static options for now */}
            <option value="friend1">Friend 1</option>
            <option value="friend2">Friend 2</option>
        </select>
    </Box>
  )
}

export default AddFriends