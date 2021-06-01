const nodemailer = require("nodemailer")
let randomNumber = Math.floor((Math.random() * 100000) + 1)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'israr46ansari@gmail.com',
        pass: '03132535889'
    }
})

module.exports.conformationEmailSender = function (userEmail) {
    const mainOption = {
        from: 'israr46ansari@gmail.com',
        to: `${userEmail}`,
        subject: "Account Verification By CMS",
        html: `<div style="display: flex; justify-content: center;">
        <img src="https://images.squarespace-cdn.com/content/v1/553fca29e4b044e4d68d8278/1526586606787-3T60BKA0UDP1BZCBI4AE/ke17ZwdGBToddI8pDm48kAcRuYRwUM3quGC8CorSdoAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcVoK0YWjbLhD8RSeObOHbORDWpWpqIg9_6gAXTVAlZtYQrQtuqEIhP6EIreecnV2R/Thanks-for-Signing-Up.jpg?format=750w"
            alt="" width="700" height="500">
    </div>
    <div style="background-color: #1b1d1f; margin-top: 5px; border-radius: 20%;">
        <div style="display: flex; justify-content: center;">
            <h2 style='text-align: center; font-size: 50px; color: white; font-weight: 900;'> <span
                    style="font-size: 70px; color: #96e3e0; ">C</span>onformation <span
                    style="font-size: 70px; color: #96e3e0;">E</span>mail <span
                    style="font-size: 70px; color: #96e3e0;">B</span>y
                <span style="font-size: 70px; color: #96e3e0;">C</span>MS
            </h2> <br />
        </div>
    </div>
    <div style="display: flex; justify-content: center">
        <h1 style="text-decoration: underline; color: black; font-size: 40px; text-shadow: 5px 10px 10px white;"> Thanks
            for sign in </h1>
    </div>
    <div style="display: flex; justify-content: center;">
        <p style="text-align: center; font-size: 20px; letter-spacing: 2px; word-spacing: 2px; line-height: 40px;">
            First off, I’d like to extend a warm welcome and ‘thank you’ for subscribing to the Compus Management
            System. I recognize that your time is valuable and I’m seriously flattered that you chose to join us.

            The Compus Management System try to provide your desire job as well as desire Condidate, with actionable
            steps you can take to grow your business online and off. If we ever stray from that, just send me an email
            and I’ll do my damndest to get it straightened out.

            In the meantime, I’d love to hear from you about why you’ve subscribed to our list, and what you’re
            interested in learning about. So long as you reply to this email, I promise I will too.

            If you need anything, please feel free to give me a shout at israr46ansari@gmail.com.
        </p>
    </div>
    <div style="display: flex; justify-content: center;">
        <div style='height: 90px; background-color: #1b1d1f; display: flex; align-items: center; border-radius: 50px;'>
            <div style="padding: 20px; list-style: none;">
                <a href='http://localhost:3000/login/?verify=${randomNumber}' style=" text-decoration: none"> <span
                        style="font-size: 40px; color: white;">lets Login </span> </a>
            </div>
        </div>
    </div>`
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOption, (err, info) => {
            if (err) {
                console.log("Error in sending Mail ", err);
                reject(err);
            }
            resolve(true);
        })

    })
}