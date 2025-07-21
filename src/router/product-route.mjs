import { Router } from "express";

const productRouter = Router();

productRouter.get('/', (req, res) => {
  res.send('Product Home Page');
});

productRouter.post('/create', (req, res) => {
  const productData = req.body; // Assuming body-parser middleware is used
  res.status(201).json({ message: 'Product created successfully', data: productData });
});

export default productRouter;
