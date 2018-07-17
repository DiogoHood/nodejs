'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product
        .find({ active: true }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'The title must contain at least 3 character');
    contract.hasMinLen(req.body.slug, 3, 'The slug must contain at least 3 character');
    contract.hasMinLen(req.body.description, 3, 'The description must contain at least 3 character');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
 
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Product successfully registered!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Failed to register product!',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({
                message: 'Product successfully updated!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Failed to update product!',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Product successfully deleted!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Failed to delete product!',
                data: e
            });
        });
};