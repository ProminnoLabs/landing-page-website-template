# ASP.NET Core contact API

A minimal API (C#, .NET 10) for the landing page contact form.

```bash
dotnet run
```

Then open the URL printed in the console, for example `http://localhost:5000/api/health`.

Test the contact endpoint:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","message":"Hello!"}'
```
