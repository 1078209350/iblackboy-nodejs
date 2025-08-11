import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import {ok, fail} from '../config/result.js';
import { generateMathCaptcha } from '../utils/captcha.js';

// 生成验证码图片
router.get('/captcha', async (req, res) => {
  try {
    const { equation, answer, dataUrl } = generateMathCaptcha();
    // 存储验证码答案（实际项目可用 Redis 替代）
    const captchaStore = {};
    // 生成唯一 ID 用于后续验证（这里用时间戳模拟）
    const captchaId = Date.now().toString();
    captchaStore[captchaId] = answer;
    // 返回验证码图片 + ID
    res.json({
      captchaId,
      equation,
      answer,
      image: dataUrl, // 前端可直接用 <img src="dataUrl">
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建用户
// router.post('/', async (req, res) => {
//   const { name, password } = req.body;
//   console.log(name);
//   console.log(password);
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO users (name, password) VALUES (?, ?)',
//       [name, password]
//     );
//     res.status(201).json({ id: result.insertId, name, password });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// 登录

// 密钥，实际开发中请保存在环境变量中
const SECRET_KEY = 'secret_key';

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const [result] = await pool.query(
      ' select * from `user` where name = ? and password = ?',
      [name, password]
    );
    console.log('登录结果为', result)
    if (result.length === 0) {
      res.status(200).json({ ...fail(), message: '用户名或密码错误' });
    } else {
      const token = jwt.sign({ id: result[0].id, name: result[0].name }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ ...ok(), data: { token, name, password } });
    }
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
});

// 通过token获取用户信息
router.get('/info', async (req, res) => {
  const token = req.headers['x-token'];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("token解析后的结果", decoded)
    const [result] = await pool.query('SELECT * FROM user WHERE id = ?', [decoded.id]);
    if (result.length === 0) {
      res.status(200).json({ ...fail(), message: '用户不存在' });
    } else {
      res.status(200).json({ ...ok(), data: { ...result[0] } });
    }
  } catch (err) {
    console.log(err)
    res.status(200).json({ ...fail(), message: '无效的token' });
  }
})

// 退出登录
router.post('/logout', async (req, res) => {
    res.json({ ...configResult.ok(), data: { msg: '退出成功' } });
  })

export default router;
