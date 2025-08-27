import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import pool from '../config/db.js';
import {ok} from '../config/result.js';
import {exampleQuestion} from '../config/constant.js';
import camelcaseKeys from 'camelcase-keys'; // 对象键名转换为驼峰命名


// 获取模型信息
router.get('/modelList', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM model_ai');
    // 处理rows格式
    /** @type {Array<object>} */
    const list = camelcaseKeys(rows, {deep: true})
    console.log(list)

    list.forEach(item => {
      item.modelTipDesc = item.modelTipDesc.split('。').filter(item => Boolean(item.trim()))
      item.modelConfigTips = {
        title: item.modelTipTitle,
        items: item.modelTipDesc
      }
      item.modelConfigIntro = {
        prefix: item.modelIntrPrefix,
        suffix: item.modelIntrSuffix,
        showIcon: item.modelIntrShowIcon
      }
      // 删除不需要的字段
      const fieldsToDelete = [
        'modelTipTitle',
        'modelTipDesc',
        'modelIntrPrefix',
        'modelIntrSuffix',
        'modelIntrShowIcon'
      ];
      fieldsToDelete.forEach(field => delete item[field]);
    })
    res.status(200).json({ ...ok(), total: rows.length, data: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取事例问题
router.get('/getModelSampleProblem', async (req, res) => {
  try {
    res.status(200).json({ ...ok(), data: { ...exampleQuestion() } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
