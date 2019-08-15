const functions = require("firebase-functions");
const mailer = require("nodemailer");
const account= functions.config().gmail.account;
const sec= functions.config().gmail.sec;
const dest_email = functions.config().destination.email;


const mailTransport = mailer.createTransport({
  service: "gmail",
  auth: {
    user: account,
    pass: sec
  }
});

const makeMailContent = function(data){
  return `お問い合わせを受けました。

  お名前:
  ${data.name}

  メールアドレス:
  ${data.email}

  内容:
  ${data.contents}
  `;
};

exports.sendMail = functions.https.onCall(function(data, condext){
  const mail = {
    from: account,
    to: dest_email,
    subject: "お問い合わせ",
    text: makeMailContent(data)
  };

  mailTransport.sendMail(mail, function(err, res){
    if(err){
      // return console.error(err);
    }
    return console.log("success");
  });
});
