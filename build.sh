curl -X POST http://localhost:3004/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "username": "johndoe", "password": "123456"}'

echo " "

curl -X POST http://localhost:3004/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "johndoe", "password": "123456"}'

echo " "