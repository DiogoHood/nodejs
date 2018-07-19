'use strict';

const config = require('../config');
const sendMail = require('@sendgrid/mail');

exports.send = async (to, from, subject, text, html) => {
    sendMail.setApiKey(config.sendgridKey);
    sendMail.send({
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html
    });
}
