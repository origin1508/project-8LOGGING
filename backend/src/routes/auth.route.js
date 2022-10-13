const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

const { authCtrl } = require("../controllers");

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.delete("/withdrawal", jwtVerification, authCtrl.withdrawUser);
router.post("/email", authCtrl.sendEmailAuthCode);
router.delete("/email", authCtrl.checkEmailAuthCode);


module.exports = router;


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    tags:
 *    - auth
 *    description: 회원 가입
 *    produces:
 *    - application/json
 *    parameters:
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     description: 게시글 조회
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "category"
 *       in: "query"
 *       description: "조회할 카테고리 id, 중첩 가능. ex) category=1&category=2&category=3"
 *       type: "string"
 *     - name: "query"
 *       in: "query"
 *       description: "검색어"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/

/**
 * @swagger
 * /posts:
 *   post:
 *     description: 게시물 생성
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Post"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/