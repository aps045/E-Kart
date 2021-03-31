/** @format */
const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
	check("firstName").notEmpty().withMessage("FirstName is Required"),
	check("lastName").notEmpty().withMessage("LastName is Required"),
	check("email").isEmail().withMessage("Valid Email is Required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
exports.validateSigninRequest = [
	check("email").isEmail().withMessage("Valid Email is Required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
exports.isRequestValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.array().length > 0) {
		return res.status(400).json({ Error: errors.array()[0].msg });
	}
	next();
};
