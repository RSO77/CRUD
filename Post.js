import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true}, 
    sex: {type: String}
})

export default mongoose.model('Post', Post);