const { User } = require("../../db");

const updateUserbyAdmin = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findOne({
          where: {
              id: id
          }
      });

    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      await user.update(
        {
          rol: user.rol === "user" ? "admin" : "user",
        },
        );
        await user.save()
      res.send("Usuario modificado correctamente!");
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al modificar", error });
  }
};

module.exports = { updateUserbyAdmin };