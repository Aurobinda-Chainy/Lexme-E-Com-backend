const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    created_by: {type:String, required:true},
    created_at: {type: Date, default: Date.now},
    updated_by: { type: String, default: null},
    updated_at: {type:Date, default:null},
}, {_id: false});

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email_id: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    audit: auditSchema,
    status: {type:Number, enum:[1,0], default:1},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);