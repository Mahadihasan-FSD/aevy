const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

if (!admin.apps.length) {

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });

}

const db = admin.firestore();

exports.handler = async (event) => {

  try {

    const data = JSON.parse(event.body);

    const email = data.email;
    const message = data.message;

    await db.collection("messages").add({
      email,
      message,
      createdAt: new Date()
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "contract.aevy@gmail.com",
      subject: "New AEVY Contact",
      html: `
        <h2>New Message</h2>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };

  }

};
