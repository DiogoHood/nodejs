'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'The name field must contain at least 3 character');
    contract.isEmail(req.body.email, 3, 'E-mail invalid!');
    contract.hasMinLen(req.body.password, 6, 'The password field must contain at least 3 character');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + process.env.JWT_SECRET_KEY)
        });

        await emailService.send(
            req.body.email,
            'diogorodrigues0801@gmail.com',
            'Welcome to the jungle',
            'Welcome to the jungle',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send({
            message: 'Customer successfully registered!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to register customer!',
            data: e
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + process.env.JWT_SECRET_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: 'Username or password is invalid'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to register customer!',
            data: e
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        // Recover Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decode Token
        const data = await authService.decodeToken(token);

        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + process.env.JWT_SECRET_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: 'Username not found'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        })

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to register customer!',
            data: e
        });
    }
};
