const express=require("express")
const app=express()
const dotenv = require("dotenv");
const userRoutes =  require("./routes/user")
const op1Routes = require("./routes/op1routes")
const database = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
dotenv.config();

database.connect();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/opone",op1Routes)
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});