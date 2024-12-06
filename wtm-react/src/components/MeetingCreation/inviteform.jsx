import React, { useState } from 'react';
import { Box, Typography, Chip, TextField } from '@mui/material';

function InviteForm({ invited_members, onMembersChange }) {
  // form to invite members to a meeting being created.

  const [newMemberId, setNewMemberId] = useState(''); // Store the ID of the member being typed in

  const handleInputChange = (e) => {
    // handle the editing of the memberId
    setNewMemberId(e.target.value);
  };

  const handleKeyPress = (e) => {
    // handle if the enter key is pressed, set new member to be invited
    if (e.key === 'Enter' && newMemberId.trim()) {
      // check if member exists from endpoint..?
      // TODO make this work!!!
      if (!invited_members.includes(newMemberId.trim())) {
        onMembersChange([...invited_members, newMemberId.trim()]);
      }
      setNewMemberId(''); // Clear the input field
      e.preventDefault(); // Prevent form submission
    }
  };

  const handleDelete = (idToRemove) => {
    // handles if you click the delete x next to a member
    onMembersChange(invited_members.filter((id) => id !== idToRemove));
  };

  return (
    <Box className="section" sx={{ margin: 2 }}>
      <Typography variant="h6">Add Friends by ID</Typography>

      <TextField
        label="Enter Friend ID"
        placeholder="Type friend ID and press Enter"
        variant="outlined"
        fullWidth
        value={newMemberId}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Add friend on Enter key press
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {invited_members.map((id, index) => (
          <Chip
            key={index}
            label={id}
            onDelete={() => handleDelete(id)} // Remove friend ID
          />
        ))}
      </Box>
    </Box>
  );
}

export default InviteForm;