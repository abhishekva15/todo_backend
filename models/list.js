const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    status: {
        type: String,
        // enum: ['pending', 'completed'],
        default: 'pending',
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    updatedAt:{
        type:String,
        required:true,
        default:Date.now(),
    },
    userId :{
        type:String,
    }
    
})

module.exports = mongoose.model("List",listSchema )