'use strict'
const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: '765265609@qq.com',
        pass: 'dhllrxhydfscbfec' //这个是在QQ邮箱的设置界面，打开SMTP服务，生成的授权码，163邮箱也一样，并不是QQ邮箱的密码
    }
});

let mailOptions = {
    from: '765265609@qq.com', // sender address
    to: 'chao.zhang@jointwisdom.cn', // list of receivers   chao.zhang@jointwisdom.cn
    subject: 'redis错误预警', // Subject line
    html: '<b>Hello world ✔</b><br/><a href="https://www.baidu.com">点击</a>Embedded image: <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496326419686&di=4d94383f77cc66658282cfe1a6b91616&imgtype=0&src=http%3A%2F%2Fmvimg2.meitudata.com%2F5680b8019782e2655.jpg"/>', 
    attachments: [{
      filename: "发送的附件",
      path: path.join(__dirname + "/testmail.txt")
    }]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    debugger;
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});