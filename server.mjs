import express from 'express';
import productRouter from './src/router/product-route.mjs';
import userRouter from './src/router/user-route.mjs';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
