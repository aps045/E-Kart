/** @format */

const express = require("express");
const { adminMiddleware, requiresignin } = require("../common-middleware");
const router = express.Router();
const multer = require("multer");
const { createProduct,getProductsBySlug } = require("../controller/product");
const shortId = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (re, file, cb) {
		cb(null, path.join(path.dirname(__dirname), "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, shortId.generate() + "-" + file.originalname);
	},
});
const upload = multer({ storage });

router.post(
	"/product/create",
	requiresignin,
	adminMiddleware,
	upload.array("productPicture"),
	createProduct
);
router.get('/products/:slug',getProductsBySlug)
module.exports = router;
