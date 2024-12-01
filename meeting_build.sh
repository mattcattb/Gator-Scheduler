curl -X POST http://localhost:3004/api/friends/addFriend \
-H "Content-Type: application/json" \
-d '{"userId": "6747930750722ad59cf299d2", "friendname": "evilnick"}'

echo " "
echo " "

curl -X PUT http://localhost:3004/api/meeting/leave \
-H "Content-Type: application/json" \
-d '{"userId": "674a1fe795cd9f20507d57cc", "meetingId": "674a20b095cd9f20507d57de"}'

echo " "
echo " "
