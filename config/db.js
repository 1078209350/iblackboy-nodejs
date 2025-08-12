import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.ping(); // 发送心跳包
    console.log('✅ 数据库连接成功');
    await connection.end();
    return true;
  } catch (err) {
    console.error('❌ 连接失败:', err.message);
    return false;
  }
}

// 调用测试
testConnection();

export default pool;
