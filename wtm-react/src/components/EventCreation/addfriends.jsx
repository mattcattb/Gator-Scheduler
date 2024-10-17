import React from 'react'

function AddFriends() {
  return (
    <div className="section">
        <h2>Add Friends</h2>
        <select className="friend-selector">
            <option value="">Select Friends</option>
            {/* Static options for now */}
            <option value="friend1">Friend 1</option>
            <option value="friend2">Friend 2</option>
        </select>
    </div>
  )
}

export default AddFriends