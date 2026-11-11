# FastAPI contact API

A small Python API for the landing page contact form.

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

Interactive docs are available at `http://localhost:5000/docs`.

Test the contact endpoint:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","message":"Hello!"}'
```
