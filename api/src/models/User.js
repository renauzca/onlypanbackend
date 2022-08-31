const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: {
            msg: "El nombre solo puede contener letras"
          },
          len: {
            args: [4, 100],
            msg: "El nombre tiene que ser minimamente de dos caracters"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://th.bing.com/th?q=User+Jpg&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
         validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido"
        }
      }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rol: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: true,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
