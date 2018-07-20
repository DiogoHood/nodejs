'use strict';

const repository = require('../repositories/order-repository');
const uuidv1 = require('uuid/v1');
const authService = require('../services/auth-service');

exports.get = async (req, res, nest) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request!'
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        // Recover Token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decode Token
        var data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: uuidv1(),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Order successfully registered!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to register your order!',
            data: e
        });
    }
};
