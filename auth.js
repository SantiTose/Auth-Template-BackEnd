function requireLogin(req, res, next){
    if (!req.session.userId){
        return res.status(401).json({message: 'Not authorized'});
    } // Si no hay session no pasa
    next(); // Si hay session pasa
}

module.export = requireLogin;