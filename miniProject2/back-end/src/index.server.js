/** @format */

const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes=require('./routes/admin/initialData')

//environment variables or you can say constants
env.config();

// mongodb connect

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.9fhxx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	)
	.then(() => {
		console.log("Database Connected!");
	})
	.catch((e) => {
		console.log(e);
	});
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

// app.get("/", (req, res, next) => {
// 	res.status(200).json({
// 		message: "hello from the server",
// 	});
// });
// app.post("/data", (req, res, next) => {
// 	res.status(200).json({
// 		message: req.body,
// 	});
// });
app.listen(process.env.PORT, () => {
	console.log(`Server is Running on port ${process.env.PORT}`);
});
