/** @format */
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const shortid=require('shortid');
exports.signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec(async(error, user) => {
		if (user)
			return res.status(400).json({
				message: "Admin already Registered!",
			});
		const { firstName, lastName, email, password } = req.body;

		const hash_password=await bcrypt.hash(password,10);
		const _user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate(),
			role: "admin",
		});
		_user.save((error, data) => {
			if (error) {
				console.log(error);
				return res.status(400).json({
					message: "Something went wrong",
				});
			}
			if (data) {
				return res.status(201).json({
					// user: data,
					message: "Admin created Successfully..!",
				});
			}
		});
	});
};
exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).exec((error, user) => {
		if (error) return res.status(400).json({ error });
		if (user) {
			if (user.authenticate(req.body.password) && user.role === "admin") {
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWT_SECRET,
					{
						expiresIn: "60000",
					}
				);
				const { _id, firstName, lastName, email, role, fullName } = user;
				res.cookie('token',token,{expiresIn:'1h'});
				res.status(200).json({
					token,
					user: {
						_id,
						firstName,
						lastName,
						email,
						role,
						fullName,
					},
				});
			} else {
				return res.status(400).json({
					message: "Invalid password Or You are not a Admin",
				});
			}
		} else {
			res.status(400).json({ message: "Something went wrong" });
		}
	});
};

exports.signout=(req,res)=>{
res.clearCookie('token');
res.status(200).json({message:"Signout Successfully...!"})
}