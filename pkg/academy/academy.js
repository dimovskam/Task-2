const mongoose = require ("mongoose")

const academySchema = mongoose.Schema ({
    name: String,
    description: String,
    adress: String
})

const academyModel = mongoose.model ("Academy", academySchema, "Academy")

