import express from 'express';

const app = express();
const PORT = 3000;
 

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello, World!');
});



app.get('/api/v1/hello', (req, res) => {
  res.send({ message: 'Hello, World!' });
  res.status(200).json({ message: 'Hello, World!' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});