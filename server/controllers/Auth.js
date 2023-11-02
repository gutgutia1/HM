const bcrypt = require("bcrypt")
const User=require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            employeeId,
          } = req.body
          if (
            !firstName ||
            !lastName ||
            !accountType ||
            !password ||
            !confirmPassword||
            !employeeId
          ) {
            return res.status(403).send({
              success: false,
              message: "All Fields are required",
            })
          }
          if (password !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message:
                "Password and Confirm Password do not match. Please try again.",
            })
          }
          const existingUser = await User.findOne({ employeeId })
        if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue .",
        })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            employeeId
          })
          return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
          })
        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
          })
        }
      }

exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { employeeId, password } = req.body

    // Check if email or password is missing
    if (!employeeId || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(403).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Find user with provided email
    const user = await User.findOne({ employeeId })

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { employeeId: user.employeeId, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}