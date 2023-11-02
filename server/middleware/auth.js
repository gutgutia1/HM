const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User=require("../models/User")
dotenv.config();

exports.auth = async (req, res, next) => {
	// console.log(req.cookies)
	try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "")
			

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
			error:error
		});
	}
};

exports.isOP1 = async (req, res, next) => {
	try {
		// console.log(req.user)
		const userDetails = await User.findOne({ employeeId: req.user.employeeId });

		if (userDetails.accountType !== "Operator1") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Operator1",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
