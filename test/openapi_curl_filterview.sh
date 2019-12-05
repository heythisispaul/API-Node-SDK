curl -X POST \
  'https://qa3.qa.xvia.com/xvia/openapi/views/3/filter?user_key=12345' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: cc6af603-c80e-4e57-bd92-aaaad0c1d6a5' \
  -H 'cache-control: no-cache' \
  -d '{
    "fields": [
        { "name": "Link to Relate", "operator": "=", "value": 1, "invertOperator": false }
    ],
    "operator": "OR"
}'

