/** @format */

const express = require("express");
const { adminMiddleware, requiresignin } = require("../common-middleware");
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controller/category");
const multer = require("multer");
const router = express.Router();
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
	"/category/create",
	requiresignin,
	adminMiddleware,
	upload.single("categoryImage"),
	addCategory
);
router.get("/category/getcategory", getCategories);
router.post(
	"/category/update",
	upload.array("categoryImage"),
	updateCategories
);
router.post(
	"/category/delete",
	deleteCategories
);
module.exports = router;
