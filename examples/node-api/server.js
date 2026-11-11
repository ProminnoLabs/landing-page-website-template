import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://prominnolabs.github.io'],
  }),
);
app.use(express.json({ limit: '10kb' }));

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate({ name, email, message } = {}) {
  const errors = {};
  if (typeof name !== 'string' || !name.trim() || name.length > 100) {
    errors.name = 'Name is required (max 100 characters).';
  }
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    errors.email = 'A valid email address is required.';
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    errors.message = 'Message is required (max 2000 characters).';
  }
  return errors;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contact', (req, res) => {
  const errors = validate(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // TODO: send an email, save to a database or push to your CRM here.
  console.log(`New enquiry from ${req.body.name} <${req.body.email}>`);

  res.json({ message: 'Thanks! We will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
