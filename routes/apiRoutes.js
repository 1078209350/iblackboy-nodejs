import express from 'express';
const router = express.Router();


router.post('/processDataAndSave', (req, res) => {
  const fakeData = req.body;
  console.log('正在清洗数据:', fakeData);

  // 模拟保存操作
  res.json({ success: true });

});

router.post('/update', (req, res) => {
  const data = req.body;
  console.log('英文数据更新到数据库:' + JSON.stringify(data));

  // 模拟保存操作
  const success = Math.random() > 0.5; // 随机返回 true 或 false
  if (success) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.get('/getDataByMongo', (req, res) => {
  // 返回假数据列表
  const fakeDataList = [
    { _id: '1', title: '今天天气怎么样', content: '今天局部地区有阵雨', english: 0 },
    { _id: '2', title: '明天天气怎么样', content: '明天是个晴天', english: 0 },
    { _id: '3', title: 'What is the weather like the day after tomorrow', content: 'It will snow heavily the day after tomorrow', english: 1 }
  ];

  res.setHeader('Content-Type', 'application/json');  // 设置响应头
  res.json({data: fakeDataList});
})


export default router;
