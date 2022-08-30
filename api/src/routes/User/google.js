const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

const google =async (req,res, next)=>{
    try {
        const { email, name } = req.body;
        let user = await User.findOne({ where: { email: email } });
        if(!user){
            user = await User.create({ email, name, password : undefined });
            if (!user) return res.status(400).json({ error: "Error al crear la cuenta!" });
        }
        let token = jwt.sign({ user: user }, auth.secret, {
            expiresIn: auth.expires,
        });
        res.json({
            user: user,
            token
          });
    } catch (error) {
        next(error)
    }
}

module.exports = {google}