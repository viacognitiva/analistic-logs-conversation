
/*
 * GET home page.
 */


module.exports = {
    index: function(req,res){
        res.render('index.html');
    },
    login : function(req,res){
            res.render('login.html');
    },
    textToSpeech : function(req,res){
                res.render('listaLogs.html');
     }
}

