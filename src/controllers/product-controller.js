'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/products-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Hit failure while processing request'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Hit failure while processing request'
        });
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Hit failure while processing request'
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Hit failure while processing request'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'The title must contain at least 3 character');
    contract.hasMinLen(req.body.slug, 3, 'The slug must contain at least 3 character');
    contract.hasMinLen(req.body.description, 3, 'The description must contain at least 3 character');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Product successfully registered!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to register product!',
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Product successfully updated!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to update product!',
            data: e
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Product successfully deleted!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to delete product!',
            data: e
        });
    }
};