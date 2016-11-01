var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Company = require('./company');
var uniqueValidator = require('mongoose-unique-validator');

var LocalStoreSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },    
    storeName: {
        type: String, 
        required: true
    },
    company_id:{
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    city_id:{
        type: ObjectId,
        ref: 'City',
        required: true
    },    
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    representative:{
        type: ObjectId,
        ref: 'User',
        required: true
    }, 
    startdate:{
        type: Date,
        default: Date.now,
        required: true
    },
});

LocalStoreSchema.plugin(uniqueValidator);
var LocalStore = module.exports = mongoose.model('Store', LocalStoreSchema);