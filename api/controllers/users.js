const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Email allready exists!'
                })
            }
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    })
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    password: hash
                });
                user.save().then((result) => {
                    console.log(result);
                    res.status(200).json({
                        message: 'User created'
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }

            const [user] = users;

            bcrypt.compare(password, user.password, (error, result) => {
                if (error || !result) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {
                    const token = jsonWebToken.sign(
                        { id: user._id, email: user.email },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        message: 'Auth succesful',
                        token: token
                    });
                }
            })
        });
    },
}