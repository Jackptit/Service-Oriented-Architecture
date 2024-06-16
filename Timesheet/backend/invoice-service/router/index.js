// import express  from "express";
// import { getAll, getDetail, create, fakeData, getMany } from "../controllers/invoice.controller.js";
// const router = express.Router();


// /**
//  * @swagger
//  * /invoice/get-all:
//  *   get:
//  *     summary: Lấy danh sách hóa đơn đang có trong database
//  *     description: Lấy các hóa đơn chưa được link đến bảng chấm công
//  */
// router.route('/get-all')
//   .get(getAll)

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Lấy thông tin hóa đơn đang có trong database.
//  *     description: Lấy hóa đơn theo mã hóa đơn
//  *     responses:
//  *       200:
//  *         description: A invoice.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id:
//  *                         type: integer
//  *                         description: The user ID.
//  *                         example: 0
//  *                       name:
//  *                         type: string
//  *                         description: The user's name.
//  *                         example: Leanne Graham
//  */
// router.route('/:id')
//   .get(getDetail)

// router.route('/fake-data').post(fakeData)

// router.route('/')
//   .post(create)

// router.route('/get-many')
//   .post(getMany)

// export const invoiceRoutes = router;

import express from "express";
import { getAll, getDetail, create, fakeData, getMany } from "../controllers/invoice.controller.js";
const router = express.Router();

/**
 * @swagger
 * /invoice/get-all:
 *   get:
 *     summary: Lấy danh sách hóa đơn đang có trong database
 *     description: Lấy các hóa đơn chưa được link đến bảng chấm công
 */
router.get('/get-all', getAll);

/**
 * @swagger
 * /invoice/{id}:
 *   get:
 *     summary: Lấy thông tin hóa đơn đang có trong database.
 *     description: Lấy hóa đơn theo mã hóa đơn
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của hóa đơn cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của hóa đơn.
 *       404:
 *         description: Không tìm thấy hóa đơn với ID cung cấp.
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /invoice/fake-data:
 *   post:
 *     summary: Tạo dữ liệu giả cho hóa đơn
 *     description: Tạo dữ liệu giả cho hóa đơn và lưu vào database
 */
router.post('/fake-data', fakeData);

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Tạo mới một hóa đơn
 *     description: Tạo một hóa đơn mới và lưu vào database
 */
router.post('/', create);

/**
 * @swagger
 * /invoice/get-many:
 *   post:
 *     summary: Lấy nhiều hóa đơn
 *     description: Lấy thông tin của nhiều hóa đơn cùng một lúc
 */
router.post('/get-many', getMany);

export const invoiceRoutes = router;
