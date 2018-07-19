'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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
        await repository.create(req.body);
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