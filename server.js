const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 10000;

// 中间件配置
app.use(cors());
app.use(express.json());

// 初始化 Firebase Admin
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully.');
  } else {
    console.warn('Warning: FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

// 健康检查路由
app.get('/', (req, res) => {
  res.send('AI Lead Backend is running!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});