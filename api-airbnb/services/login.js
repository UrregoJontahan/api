const ModelUser = require("../models/user");

async function login(req, res) {
  const { name, celphone ,password } = req.body;

  try {
    const user = await ModelUser.findOne({ name, celphone ,password });
   console.log(user)
    if (!user) {
      console.log("No conozco esa gonorrea");
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    res.status(500).json({ message: 'Error de servidor' });
  }
}

module.exports = {
  login
};