const bcryptjs = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const {getSection} = require("../pkg/config")
const validateSchema = require ("../helper/validareSchema")
const { AccountLogin, AccountRegister } = require("../pkg/account/validate")
const { getByEmial, createAccount } = require("../pkg/account")

const login = async (req, res) => {
    try{
        await validateSchema(req.body, AccountLogin)
        const {email, password} = req.body
        const account = await getByEmial(email)
        if(!account){
            return res.status(404).send("Accoount not found!")
        }
        if (!bcryptjs.compareSync(password, account.password)){
            return res.status(400).send("Wrong password!")
        }

        const payload = {
            username: account.username,
            email: account.email,
            id: account._id,
            exp: new Date() / 1000 + 7 * 24 * 60 * 60
        }

        const token = jwt.sign(payload, getSection("development").jwt_secret)
        return res.status(200).send({token})

    }catch(err) {
        console.log(err)
        return res.status(500).send("Invalid Server Error!")
    }
}

const register  = async (req, res) => {
    try{
        await validateSchema(req.body, AccountRegister)
        const {username, email, password, confirmPassword} = req.body

        const userExist = await getByEmial(email);

        if (userExist){
            return res.status(400).send("Account with this email already exists!")
        }

if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match!")
}

const data = {
    username,
    email,
    password:bcryptjs.hashSync(password)
}

const account = await createAccount(data)
return res.status(200).send(account)
    }catch(err){
        console.log(err)
        return res.status(500).send("Invalid Server Error!")
    }
}

module.exports = {
    login,
    register
}