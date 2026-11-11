# Backend Examples

The landing page is design-only, so its contact and booking forms don't send data anywhere.
These small examples show how to add a backend. Each one exposes the same two endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Validates `name`, `email` and `message`, then accepts the enquiry |

Request body:

```json
{ "name": "Asha", "email": "asha@example.com", "message": "Is the studio room available on 12 Dec?" }
```

Pick the stack you prefer:

| Folder | Stack | Run |
| --- | --- | --- |
| [`dotnet-api`](./dotnet-api) | C# / ASP.NET Core minimal API | `dotnet run` |
| [`python-api`](./python-api) | Python / FastAPI | `uvicorn main:app --reload` |
| [`node-api`](./node-api) | Node.js / Express | `npm start` |

All three allow requests from `http://localhost:5173` (the Vite dev server) and from the GitHub Pages demo.
They log the enquiry. Replace the `TODO` with your email service, database or CRM call.

## Calling it from the page

```js
const res = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```
