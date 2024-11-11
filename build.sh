curl -X POST http://localhost:3004/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Jeff Mynameis", "username": "jeff", "password": "123456"}'

echo " "

curl -X POST http://localhost:3004/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "johndoe", "password": "123456"}'

echo " "

curl -X POST http://localhost:3004/api/meeting/create \
-H "Content-Type: application/json" \
-d @testmeeting.json \

echo " "
