import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true}, 
    sex: {type: String, required: true},
    flag: {type: String, required: true}
})

export default mongoose.model('Post', Post);