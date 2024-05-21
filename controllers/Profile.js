const asyncHandle = require('../middleware/asyncHandle.js')
const { Profile } = require('../models')


exports.updateOrCreateProfile = asyncHandle(async (req, res) => {

    let { age, address, gender } = req.body

    const idUser = req.user.id
    const userData = await Profile.findOne({
        where: { userId: idUser }
    })
    let message = ""
    if (userData) {
        //updateProfile
        await Profile.update({
            age: age || userData.age,
            address: address || userData.address,
            gender: gender || userData.gender
        }, {
            where: {
                userId: idUser
            }
        })
        message = "profile berhasil di update"
    }
    else {
        //create Profile
        await Profile.create({
            age, address, gender, userId: idUser
        }
        )
        message = "profile berhasil dibuat"
    }
    return res.status(200).json({
        message: message
    })
})