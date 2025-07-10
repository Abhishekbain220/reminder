let express=require("express")
const { currentUser, signup, login, logout, updateProfile, checkAdmin } = require("../controller/userController")
const { authenticateAdmin } = require("../middleware/adminMiddleware")
let router=express.Router()

router.get("/currentUser",authenticateAdmin,currentUser)
router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",authenticateAdmin,logout)
router.put("/updateProfile",authenticateAdmin,updateProfile)
router.get("/checkAdmin",checkAdmin)

module.exports=router