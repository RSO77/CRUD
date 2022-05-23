import mongoose from "mongoose";

const Users = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true}, 
    sex: {type: String, required: true},
    friends_id:{type: Array},
    request_id:{type: Array}
})

export default mongoose.model('Users', Users);