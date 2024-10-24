import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

function iconIdToPath(id){
    const map = new Map([
      ["1", "/user_icons/user_icon_1.png"],
      ["2", "/user_icons/user_icon_2.png"],
      ["3", "/user_icons/user_icon_3.png"],
      ["4", "/user_icons/user_icon_4.png"],
      ["5", "/user_icons/user_icon_5.png"],
    ])
    return map.get(id);
}

function FriendCard({id, username}) {
    return(
        <Card sx={{
            display:'flex',
            flexDirection:'column',
            alignContent:'center',
            maxWidth: {
                xs: '100%',
                sm: '100%',
                md: '100%'
            },
            minWidth:{
                xs: '40%',
                sm: '30%',
                md: '10vw'
            }
        }}>
            <CardActionArea>
            <CardMedia
                component="img"
                sx = {{
                    height:"8vh",
                    width:"8vh",
                    justifySelf:'center',
                    alignSelf:'center',
                    margin:'0.5rem'
                }}
                image={iconIdToPath(id)}
                alt="friend icon"
            />
            <CardContent>
                <h2 style={{margin:'0', justifySelf:'center', overflow:'hidden'}}>{username}</h2>
            </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default FriendCard;