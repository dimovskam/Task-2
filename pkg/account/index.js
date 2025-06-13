const mongoose = require ("mongoose")

const accountSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const AccountModel = mongoose.model("Account", accountSchema, "accounts")

const getAccounts = async () => {
    return await AccountModel.find()
}

const getByEmial = async (email) => {
    return await AccountModel.findOne({email})
}

const createAccount = async (data) => {
    const newAccount = new AccountModel(data)
    return await newAccount.save()
}

const updateAccount = async (_id, data) => {
    return await AccountModel.updateOne({_id}, data)
}

const remoeAccount = async (_id) => {
    return await AccountModel.deleteOne({_id})
}

module.exports ={
    getAccounts,
    getByEmial,
    createAccount,
    updateAccount,
    remoeAccount
}