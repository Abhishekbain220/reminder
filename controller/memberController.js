let Member = require("../model/memberSchema")
const CustomError = require("../utils/customError")

module.exports.addMember = async (req, res, next) => {
    try {
        let { name, phone,email, month } = req.body
        month = parseInt(month)
        let newMember = await Member.create({ name, phone,email, month })

        let date = new Date(newMember.createdAt)
        date.setMonth(date.getMonth() + month)
        console.log(date.getMonth())
        if (date.getMonth() > 12) {
            date.setMonth(date.getMonth() - 12)
            console.log(date.getMonth())
            date.setFullYear(date.getFullYear() + 1)
            console.log(date)

        }
        newMember.remind = date.toISOString()
        let result = new Date(newMember.remind) - new Date()
        console.log(result)




        await newMember.save()



        res.status(200).json({
            message: "New Member Added Successfully",
            newMember
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}
module.exports.viewMember = async (req, res, next) => {
    try {
        let members = await Member.find()

        res.status(200).json({
            members
        })
    } catch (error) {
        console.log(error)
        next(CustomError(error, 500))
    }
}

module.exports.updateMember = async (req, res, next) => {
    try {
        let { id } = req.params
        let { name, phone,email, month } = req.body

        let member = await Member.findByIdAndUpdate(id, req.body, { new: true })
        if (!member) return next(new CustomError("Member not Found", 400))
        let date = new Date()

        console.log(date, month)

        date.setMonth(date.getMonth() + Number(month))

        if (date.getMonth() > 12) {
            date.setMonth(date.getMonth() - 12)
            date.setFullYear(date.getFullYear() + 1)
        }
        member.remind = date.toISOString()
        await member.save()
        res.status(200).json({
            message: "Member Updated Successfully",
            member
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.deleteMember = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleteMember = await Member.findByIdAndDelete(id)
        res.status(200).json({
            message: "Member Deleted Sucessfully"
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}
module.exports.viewOne = async (req, res, next) => {
    try {
        let { id } = req.params
        let member = await Member.findOne({_id: id })
        if (!member) return next(new CustomError("Member not Found", 400))
        res.status(200).json({
            message: "Member Found Successfully",
            member
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

