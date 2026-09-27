// pour gerer mes erreurs
async function gestErr(err, req, res, next){
    console.error(err);
    res.status(500).json({ error: 'une erreur interne est survenue' });
}

module.exports = {
    gestErr,
} 