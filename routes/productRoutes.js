import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import {ok, fail} from '../config/result.js';
import camelcaseKeys from 'camelcase-keys'; // 对象键名转换为驼峰命名


// 获取所有产品
router.get('/queryList', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product');
    res.status(200).json({ ...ok(), total: rows.length, data: camelcaseKeys(rows, {deep: true}) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 新增产品
router.post('/addProduct', async (req, res) => {
  console.log(req.body)
  try {
    // 从请求体中获取数据
    const { productName, productPrice, productType, productNumber } = req.body;
    const [result] = await pool.query('insert into product (product_name, product_price, product_type, product_number) values (?, ?, ? ,?)',
        [productName, productPrice, productType, productNumber]);
    res.status(200).json({ ...ok(), message: '添加成功～' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 编辑产品
router.post('/changeProduct', async (req, res) => {
  try {
    // 从请求体中获取数据
    const { productName, productPrice, productType, productNumber, productId } = req.body;
    const [result] = await pool.query('update product set product_name = ?, product_price = ?, product_type = ?,product_number = ? where product_id = ?',
        [productName, productPrice, productType, productNumber, productId]);
    res.status(200).json({ ...ok(), message: '修改成功～' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除产品
router.post('/deleteProduct', async (req, res) => {
  try {
    // 从请求体中获取数据
    const { productId } = req.body;
    const [result] = await pool.query('delete from product where product_id = ?', [productId]);
    res.status(200).json({ ...ok(), message: '删除成功～' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
