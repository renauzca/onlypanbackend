const { User } = require("../../db");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk({ where: { id: id } });

    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      user.update({
        isAvailable: false,
      });
      res.send("Usuario eliminado correctamente!");
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar", error });
  }
};

module.exports = { deleteUser };
