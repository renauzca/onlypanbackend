const { User } = require("../../db");

const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const {name , lastName,address,phone} = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      await User.update(
        {
          name: name,
          lastName: lastName,
          address: address,
          phone: phone,
        },
        {
          where: { id: id },
        }
      );
      res.send("Usuario modificado correctamente!");
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al modificar", error });
  }
};

module.exports = { updateUser };