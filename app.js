import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

// 中间件
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 请求体

// 路由
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/api', apiRoutes)

// 启动服务器
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
