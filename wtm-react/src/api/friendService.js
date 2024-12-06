import axios from './axios';


export const sendFriendRequestAPI = async (userId, friendId) => {
    // send friend request to API
    if (!friendId) {
        alert("Please enter a friend's ID!");
        return;
    }

    if (!userId) {
        alert("You need to be logged in to send a friend request!");
        return;
    }

    try {
        const response = await axios.post("/api/friends/request", {
            userId: userId,
            friendId: friendId,
        });

        if (response.status === 200) {
            alert("Friend request sent successfully!");
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}