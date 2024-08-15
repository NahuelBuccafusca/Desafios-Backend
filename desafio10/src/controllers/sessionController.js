const userDTO = require("../dao/DTOs/user.dto");
const { createHash } = require("../utils.js");
const nodemailer = require("nodemailer");
const { devLogger, prodLogger } = require("../middleware/logger.js");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const UserManager = require("../dao/classes/user.dao.js");
const TokenManager = require("../dao/classes/token.dao.js");
const userService = new UserManager();
const tokenService = new TokenManager();

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.usermail,
    pass: process.env.pass,
  },
});
exports.register = async (req, res) => {
  res.redirect("/userregistrade");
};
exports.failregister = async (req, res) => {
  res.render("register", {
    title: "Registro",
    error: "No se puede registar al usuario",
  });
};
exports.login = async (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", error: "Credenciales invalidas" });
  try {
    if (!req.user) return res.redirect("/register");
    req.session.user = {
      id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      cart: req.user.cart,
      rol: req.user.rol,
    };

    if (req.session.user.rol === "admin") {
      res.redirect("/productsManager");
    } else {
      res.redirect("/products");
    }
  } catch (err) {
    res.status(500).send("Error al iniciar sesión");
  }
};


exports.current =  async (req, res) => {
  try {
    if (req.session.user) {
      let user = new userDTO(req.session.user);
      res.render("profile", { user: user });
    } else {
      res.render("profile", {
        error: "No ha iniciado sesión",
      });
    }
  } catch (error) {
    prodLogger.warning("No ha iniciado sesión");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/login");
  });
};

exports.githubCallback = async (req, res) => {
  req.session.user = req.user;
  if (req.session.user.rol === "admin") {
    res.redirect("/productsManager");
  } else {
    res.redirect("/products");
  }
};


exports.changePasswordGet = async (req, res) => {
  res.render("changePassword");
};

exports.changePasswordPost = async (req, res) => {
  let correo = req.body.correo;
  let user = await userService.getUserByEmail(correo);
  let token = uuidv4();
  let expirationTime = Date.now() + 3600 * 1000;
  let newToken = {
    token: token,
    email: correo,
    expirationTime: expirationTime,
  };
  await tokenService.createToken(newToken);

  let mail = await transport.sendMail({
    from: "n.buccafusca@outlook.com.ar",
    to: correo,
    subject: "Restablecimiento de contraseña",
    html: `  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>RESTABLECIMIENTO DE CONTRASEÑA</h1>
    <p>Hola ${user.first_name}!</p>
    <div>
      <p>Ingresa al siguiente link:</p>
      <p>http://localhost:8080/reset_password?token=${token}</p>
    </div>
  </body>
  </html>
`,
  });
  let login = "/login";
  res.render("changePassword", {
    aviso: `Correo enviado a ${correo}`,
    link: login,
  });
};


exports.reset_password = async (req, res) => {
  const token = req.query.token;
  let existToken = await tokenService.getToken(token);
  let currentTime = Date.now();
  if (currentTime > existToken.expirationTime) {
    res.redirect("/changePassword");
  } else {
    res.render("resetPassword", { token: token, correo: existToken.email });
  }
};

exports.changePasswordPut = async (req, res) => {
  const { correo, password } = req.body;

  try {
    let user = await userService.getUserByEmail(correo);
    let isSamePassword = isValidPassword(user, password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ message: "No se puede utilizar la misma contraseña" });
    } else {
      let newPassword = createHash(password);
      let change = { password: newPassword };
      await userService.updateUser(correo, change);

      return res
        .status(200)
        .json({ message: "Contraseña actualizada correctamente" });
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};