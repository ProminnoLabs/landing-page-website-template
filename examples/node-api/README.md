# Express contact API

A small Node.js API for the landing page contact form.

```bash
npm install
npm start
```

The server runs on `http://localhost:5000`.

Test the contact endpoint:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","message":"Hello!"}'
```
