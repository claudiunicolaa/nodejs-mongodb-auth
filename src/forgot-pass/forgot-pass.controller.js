const express = require("express");

const forgotPasswordService = require('./forgot-pass.service');

const router = express.Router();
module.exports = router;

router.post("/forgot", sendForgotPasswordEmail);
router.post("/reset", resetPassword);

function sendForgotPasswordEmail(req, res, next) {
    forgotPasswordService.sendForgotPasswordEmail(req.query.email)
        .then(() => {
            res.json({
                message: `sent to ${req.query.email}`
            })
        }, err => {
            next(err);
        });
}

function resetPassword(req, res, next) {
    forgotPasswordService.resetPassword(req.query.token, req.body.newPassword)
        .then(() => {
            res.json({
                message: 'success'
            })
        }, err => {
            next(err);
        })
}