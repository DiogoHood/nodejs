'use strict';

const sendMail = require('@sendgrid/mail');

exports.send = async (to, from, subject, text, html) => {
    sendMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendMail.send({
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html
    });
}
