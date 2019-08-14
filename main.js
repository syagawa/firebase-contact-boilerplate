import Vue from "vue";
import firebase from "firebase";

const makeContact = function(){
  global.app = new Vue({
    el: "#contact",
    data: {
      names: {
        name: "名前",
        ph_name: "名前",
        email: "メールアドレス",
        ph_email: "abc@example.com",
        contents: "内容",
        ph_contents: "お問い合わせ内容を入力してください"
      },
      messages: {
        do_you_send: "問い合わせを送信しますか？",
        complete: "お問い合わせありがとうございます。送信完了しました",
        error: "送信に失敗しました。時間をおいて再度お試しください",
        need_input: "項目を入力してください"
      },
      fbinit: "",
      name: "",
      email: "",
      contents: ""
    },
    computed: {

    },
    methods: {
      submitForm: function(){
        return false;
      },
      sendMail: function(){
        if(!this.email || !this.contents){
          global.alert(this.messages.need_input);
          return false;
        }

        const do_you_send = global.confirm(this.messages.do_you_send);

        if(!this.fbinit){
          this.fbinit = firebase.initializeApp({
            apiKey: 'set your api key',
            authDomain: 'set your auth domain',
            projectId: 'set your project id'
          });
        }
        const sendobj = {
          name: this.name,
          email: this.email,
          contents: this.contents
        };

        const mailer = firebase.functions().httpsCallable('sendMail');
        mailer(sendobj)
          .then(() => {
            global.alert(this.messages.complete);
          })
          .catch(err => {
            console.log(err);
            global.alert(this.messages.error);
          })
          .finally(() => {
            console.log("finally");
          });

      }

    },
    mounted: function(){

    }
  });

};
