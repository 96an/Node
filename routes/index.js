exports.index = function(req, res){
    res.render('index', {
        title: 'Welcome to Quantum Foundation!'
    });
};