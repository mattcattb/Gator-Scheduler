import { TextField, Button } from "@mui/material";
import "./profile.css"

function FriendRequester({friendID, setFriendID}) {
    function sendFriendRequest(friendID) {
        console.log(friendID)
        console.log("once we have an endpoint to add friend requests, we can do this.")
    }


    return(
        <div style={{marginBottom:"2rem"}}>
            <h2 style={{margin:'0', marginBottom:"2vh"}}>Add Friends</h2>
            <div style={{display:'flex', justifyContent:'space-between', gap:'1rem'}}>
                <TextField
                label="Type Your Friend's ID Here!"
                value={friendID}
                onChange={(event) => {
                    setFriendID(event.target.value)
                }}
                />
                <Button className="request-button" onClick={() => {sendFriendRequest(friendID)}}>+</Button>
            </div>
        </div>
    )
}

export default FriendRequester;