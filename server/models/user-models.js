const { Schema, model } = require('mongoose');

const UserScheme = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});

model.export = model('User', UserScheme);