curl -X POST http://localhost:3004/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Jeff Mynameis", "username": "jeff", "password": "123456"}'

echo " "
echo " "

curl -X POST http://localhost:3004/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "johndoe", "password": "123456"}'

echo " "
echo " "

curl -X POST http://localhost:3004/api/meeting/create \
-H "Content-Type: application/json" \
-d @testmeeting.json \

echo " "
echo " "

curl -X GET http://localhost:3004/api/user/673926f419c1f2be83ca097b

echo "Get Got "

curl -X POST http://localhost:3004/api/friends/addFriend \
-H "Content-Type: application/json" \
-d '{"userId": "674780085c93bd43cf99c0e4", "friendId": "674780165c93bd43cf99c0ec"}'

echo " "