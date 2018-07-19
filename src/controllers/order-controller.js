'use strict';
'use strict';

const repository = require('../repositories/order-repository');
const uuidv1 = require('uuid/v1');

exports.get = async (req, res, nest) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
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
