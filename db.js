const mongoose = require("mongoose")


const user = new mongoose.Schema({
    image: Buffer
})

const img = mongoose.model("view",user)
module.exports = img