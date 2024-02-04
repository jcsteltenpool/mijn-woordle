const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(4000, () => console.log("Server Running"));


const suggestionMail = nodemailer.createTransport({
    service: process.env.REACT_APP_MAIL_SERVICE,
    auth: {
        user: process.env.REACT_APP_MAIL_USERNAME,
        pass: process.env.REACT_APP_MAIL_PASSWORD,
    },
})

suggestionMail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
})

router.post("/suggestion", (req, res) => {
    const word = req.body.word;
    const mail = {
        from: process.env.REACT_APP_MAIL_FROM,
        to: process.env.REACT_APP_MAIL_TO,
        subject: "Nieuwe woordsuggestie op raadhetwoord.nl",
        html: `<div>
        <p>Woordsuggestie:</p>
        <p>${word}</p>
        </div>`,
    };
    suggestionMail.sendMail(mail, (error) => {
        if (error) {
        res.json({ status: "error" });
        } else {
        res.json({ status: "success" });
        }   
    })
})
