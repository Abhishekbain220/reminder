let express=require("express")
const { addMember, viewMember, updateMember, deleteMember, viewOne } = require("../controller/memberController")
let router=express.Router()

router.post("/addMember",addMember)
router.get("/viewMember",viewMember)
router.put("/updateMember/:id",updateMember)
router.delete("/deleteMember/:id",deleteMember)
router.get("/viewOne/:id",viewOne)

module.exports=router