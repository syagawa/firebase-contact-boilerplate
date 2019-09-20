import firebase from "firebase";

const makeContact = function(){
  if(!document.getElementById("contact")){
    return;
  }

  const messages = {
    do_you_send: "問い合わせを送信しますか？",
    complete: "お問い合わせありがとうございます。送信完了しました",
    error: "送信に失敗しました。時間をおいて再度お試しください",
    need_input: "項目を入力してください"
  };

  let fbinit = false;

  function sendMail(obj){

    if(!obj.email || !obj.contents){
      alert(messages.need_input);
      return false;
    }

    const do_you_send = confirm(messages.do_you_send);

    if(!fbinit){
      fbinit = firebase.initializeApp({
        apiKey: 'set you api key',
        authDomain: 'set you auth domain',
        projectId: 'set you project id'
      });
    }
    const sendobj = {
      name: obj.name,
      email: obj.email,
      contents: obj.contents
    };

    const mailer = firebase.functions().httpsCallable('sendMail');
    mailer(sendobj)
      .then(() => {
        global.alert(messages.complete);
      })
      .catch(err => {
        console.log(err);
        global.alert(messages.error);
      })
      .finally(() => {
        console.log("finally");
      });
  }


  document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();
    e.stopPropagation();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const contents = document.getElementById("input-contents").value;

    sendMail({name: name, email: email, contents: contents});

  });


};

makeContact();