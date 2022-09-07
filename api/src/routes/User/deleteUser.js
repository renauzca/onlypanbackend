const { User } = require("../../db");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      await user.update(
        {
          isAvailable: user.isAvailable === true ? false : true ,
        },
      );
      await user.save();
      res.send("Usuario eliminado correctamente!");
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar", error });
  }
};

module.exports = { deleteUser };
