// 패키지, 미들웨어 불러오기
const express = require("express");
const dotenv = require("dotenv");

const jwtVerification = require("./src/middlewares/jwtVerification");
const errorMiddleware = require("./src/middlewares/error");
const {swaggerUI, specs} = require('./src/config/swagger');

// 몽고디비 커넥션 이벤트 불러오기
const dbConnect = require("./src/config/mongoose");

// 라우터 불러오기
const { authRouter } = require("./src/routes");

const app = express();
dotenv.config();

// DB 연결
dbConnect();

// 미들웨어 연결
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", jwtVerification, (req, res, next) => {
  res.send(req.userId);
});

// 라우터 연결
app.use("/api/auth", authRouter);

// swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// 에러처리 미들웨어
app.use(errorMiddleware);

// 서버 시작
app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT || 3001}`);
});
