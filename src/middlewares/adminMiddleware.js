function adminMiddleware(req, res, next){
    if(!req.session.userLogged[0].role==1){
        return res.redirect('/')
    }
    next();
}

module.exports = adminMiddleware;