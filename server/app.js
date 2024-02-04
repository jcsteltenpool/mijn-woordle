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
    service: "gmail",
    auth: {
        user: 'jsteltenpool@gmail.com',
        pass: "qcejnfwtejeuhodp",
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
        from: "jsteltenpool@gmail.com",
        to: "mail@jooststeltenpool.nl",
        subject: "Nieuwe woordsuggestie op raadhetwoord.nl",
        html: `<div>
        <p>Woordsuggestie:</p>
        <p>${word}</p>
        </div>`,
    };
    suggestionMail.sendMail(mail, (error) => {
        if (error) {
        res.json({ status: "ERROR" });
        } else {
        res.json({ status: "Message Sent" });
        }   
    })
})
