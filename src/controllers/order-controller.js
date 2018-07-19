'use strict';
'use strict';

const repository = require('../repositories/order-repository');

exports.post = async (req, res, next) => {
    var data = req.body;
    // data.number = ;
    try {
        await repository.create(data);
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