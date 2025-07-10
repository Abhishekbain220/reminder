require("dotenv").config()
let db = require("./model/connect")
let express = require("express")
let cookieParser = require("cookie-parser")
let morgan = require("morgan")
let app = express()
let cors = require("cors")
const { errorHandler } = require("./middleware/errorHandler")
let userRouter = require("./Routes/userRouter")
let memberRouter = require("./Routes/memberRouter")
let PORT = process.env.PORT || 3000
let Member = require("./model/memberSchema")
const { messageSender } = require("./utils/messageSender")
const { sendMailCustomer } = require("./utils/mail")

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(cors({
    origin: true,
    credentials: true
}))


setInterval(async () => {
    try {

        let member = await Member.find()
        if (!member) {
            console.log("No Member Found")
            return
        }
        member.forEach((m) => {
            let now = new Date()


            let result = new Date(m.remind) - now
            console.log("result", result)

            if (result < 0) {
                messageSender(m.name,m.phone)
                sendMailCustomer(m)
                let date = new Date(m.remind)
                
                date.setMonth(date.getMonth() + m.month)
                if(date.getMonth() > 12){
                    date.setMonth(date.getMonth()-12)
                    date.setFullYear(date.getFullYear()+1)
                }
                m.remind=date.toISOString()
                
                m.save()
                console.log("newDate",m.remind,"Name",m.name)
            }
        })
        console.log("No Defaulter")
    } catch (error) {
        console.log(error)
    }
}, 60000);

// Routes
app.use("/user", userRouter)
app.use("/member", memberRouter)



app.use((req, res, next) => {
   res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// Gloabl ErrorHandler
app.use(errorHandler)

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})