module.exports = function(req, res, next) {
    const user = req.username || "[anónimo]";
    console.log(
        "El usuario %s pide la ruta %s",
        user, req.originalUrl); 
    next();
}