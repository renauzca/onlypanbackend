const { User } = require("../../db");

const allUser = async (req,res)=>{
    try {
        let all = await User.findAll()
        res.send(all)
    } catch (error) {
        res.status(500).json({msg:"error en el llamado de usuarios", error})
    }
   
}

module.exports = {allUser}