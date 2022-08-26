const { User } = require("../../db");

const deleteUser = async (req,res)=>{
    try {
        all = "funciona"
        res.send(all)
    } catch (error) {
        res.status(500).json({msg:"erorr al eliminar", error})
    }
   
}

module.exports = {deleteUser}