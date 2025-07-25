const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    items:[
        {
            productId: {type:String, required:true},
            name: {type: String, required:true},
            quantity:{type: Number, required:true},
            price: {type: Number, required:true},
        }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);