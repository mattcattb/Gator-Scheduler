import FriendCard from "./FriendCard";

function FriendCardBay() {
    return(
        <div className="friends-card-group" style={{
            minWidth:'90vw',
            maxWidth:'90vw',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        }}>
            <h2>Current Friends</h2>
            <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(2, 1fr)',
                gap:'2rem',
            }}>
                <FriendCard id="2" username="jimmayy"/>
                <FriendCard id="1" username="stuff"/>
                <FriendCard id="5" username="whoknows"/>
                <FriendCard id="3" username="jason"/>
                <FriendCard id="3" username="ee"/>
                <FriendCard id="4" username="name"/>
                <FriendCard id="2" username="leaveamessage"/>
                <FriendCard id="1" username="jimmayy2"/>
                <FriendCard id="2" username="hoorah"/>
                <FriendCard id="5" username="yeet"/>
                <FriendCard id="4" username="phone"/>
            </div>
        </div>
        
    )
}

export default FriendCardBay;