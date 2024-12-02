import { TextField, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import "../../styles/profile.css";

import { sendFriendRequestAPI } from "../../api/friendService";

function FriendRequester({ friendID, setFriendID }) {
    const { user } = useContext(UserContext);

    // on button press, send to backend to add this
    async function handleFriendAddPressed(){
        await sendFriendRequestAPI(user._id, friendID);
    }

    return (
        <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ margin: "0", marginBottom: "2vh" }}>Add Friends</h2>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <TextField
                    label="Type Your Friend's ID Here!"
                    value={friendID}
                    onChange={(event) => {
                        setFriendID(event.target.value);
                    }}
                />
                <Button
                    className="request-button"
                    onClick={() => {
                        handleFriendAddPressed();
                    }}
                >
                    +
                </Button>
            </div>
        </div>
    );
}

export default FriendRequester;
