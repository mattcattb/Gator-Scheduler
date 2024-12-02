import axios from './axios';


export const sendFriendRequestAPI = async (userId, friendId) => {
    if (!friendId) {
        alert("Please enter a friend's ID!");
        return;
    }

    if (!userId) {
        alert("You need to be logged in to send a friend request!");
        return;
    }

    try {
        console.log("sending friend request: userID: ", userId, ", friendID: ", friendId);
        const response = await axios.post("/api/friends/request", {
            userId: userId,
            friendId: friendId,
        });

        if (response.status === 200) {
            alert("Friend request sent successfully!");
            return response.data;
        }
    } catch (error) {
        console.error("Error with response: ", error);
        throw error;
    }
}