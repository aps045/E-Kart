/** @format */
const Cart = require("../models/cart");
const user = require("../models/user");
exports.addItemToCart = (req, res) => {
	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		if (error) return res.status(400).json({ message: "cartAlreadyExist" });
		if (cart) {
			const product = req.body.cartItems.product;
			const item = cart.cartItems.find((c) => c.product == product);
			let condition, update;
			if (item) {
				condition = { user: req.user._id, "cartItems.product": product };
				update = {
					$set: {
						"cartItems.$": {
							...req.body.cartItems,
							quantity: item.quantity + req.body.cartItems.quantity,
						},
					},
				};
				// res.status(200).json({ message: cart });
			} else {
				condition = { user: req.user._id };
				update = { $push: { cartItems: req.body.cartItems } };
			}
			Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) res.status(201).json({ cart: _cart });
			});
		} else {
			const cart = new Cart({
				user: req.user._id,
				cartItems: [req.body.cartItems],
			});

			cart.save((error, cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) {
					res.status(201).json({ cart });
				}
			});
		}
	});
};
