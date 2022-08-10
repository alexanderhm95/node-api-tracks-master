const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

//TODO: Login!
const loginCtrl = async(req, res) => {
    try {

        const mockUser = {
            name: 'Alexander',
            email: 'byron.herrera@unl.edu.ec',
            password: 'Unl2022.PSS',
            avatar: 'https://i.imgur.com/IVOIxqd.png'
        }

        const { email, password } = req.body


        if (mockUser.email !== 'byron.herrera@unl.edu.ec') {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = (mockUser.password === password)

        //TODO JWT 👉
        const tokenSession = await tokenSign(mockUser) //TODO: 2d2d2d2d2d2d2

        if (checkPassword) { //TODO Contraseña es correcta!
            res.send({
                data: mockUser,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

//TODO: Registramos usuario!
const registerCtrl = async(req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { loginCtrl, registerCtrl }