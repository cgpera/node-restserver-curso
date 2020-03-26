// -----------------------------------------------
// Verificar tokens
// -----------------------------------------------

const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token'); // Lee el token desde el Header de la petición en la ruta que quiera chequear la identidad ("el token")

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token inválido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })

}

// -----------------------------------------------
// Verificar ADMIN_ROLE
// -----------------------------------------------

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Usuario no tiene privilegios para hacer cambios'
            }
        })
    }

    next();

}

// -----------------------------------------------
// Verifica token para imagen
// -----------------------------------------------

let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token inválido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })

}

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
};