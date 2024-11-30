import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import "./profile.css";

function FriendRequester({ friendID, setFriendID }) {
    const { user } = useContext(UserContext);

    async function sendFriendRequest(friendID) {
        if (!friendID) {
            alert("Please enter a friend's ID!");
            return;
        }

        if (!user || !user._id) {
            alert("You need to be logged in to send a friend request!");
            return;
        }

        try {
            const response = await axios.post("/api/friends/request", {
                userId: user._id,
                friendId: friendID,
            });

            if (response.status === 200) {
                alert("Friend request sent successfully!");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "An error occurred.");
            } else {
                console.error(error);
                alert("Could not connect to the server. Please try again later.");
            }
        }
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
                        sendFriendRequest(friendID);
                    }}
                >
                    +
                </Button>
            </div>
        </div>
    );
}

export default FriendRequester;
