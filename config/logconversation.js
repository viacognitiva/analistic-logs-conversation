var request=require('request');


 var logConversation = {
     get : function(req, res) {


        console.log("Buscando log");

       // const workspacesId =  '7f576bfc-2d11-4de2-b985-98e8185e5664';
       const workspacesId =  '257e3228-66e9-439a-84dd-f295fb4fd403';
        const baseQuery = `/conversation/api/v1/workspaces/${workspacesId}/logs`;
        const version = 'version=2017-05-26';

        const username = 'd1df6c26-bedc-4965-9a79-e1339c0cff80';
        const password = '3lUqPxo4kNm2';
        const apiHostname = 'gateway.watsonplatform.net';


        const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}`;
        console.log(fullUrl);

       request.get(fullUrl,function(err,resp,body){
              if(err){
                 console.log(" logConversation.get Error: "+JSON.parse(body));
              }
              //res.status(200).json(JSON.parse(body));
              res.status(200).json(JSON.parse(body));

        });

  }
}


module.exports = logConversation;