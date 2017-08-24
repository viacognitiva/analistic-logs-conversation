var request=require('request');
const workspacesId =  '257e3228-66e9-439a-84dd-f295fb4fd403';
const username = 'd1df6c26-bedc-4965-9a79-e1339c0cff80';
const password = '3lUqPxo4kNm2';
const apiHostname = 'gateway.watsonplatform.net';

 var logConversation = {
     get : function(req, res) {


        console.log("Buscando log");
       // const workspacesId =  '7f576bfc-2d11-4de2-b985-98e8185e5664';
        const baseQuery = `/conversation/api/v1/workspaces/${workspacesId}/logs`;
        const version = 'version=2017-05-26';

        const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}`;
        console.log(fullUrl);

       request.get(fullUrl,function(err,resp,body){
              if(err){
                 console.log(" logConversation.get Error: "+JSON.parse(body));
              }
              //res.status(200).json(JSON.parse(body));
              res.status(200).json(JSON.parse(body));

        });

  },
  getEntidades : function(req, res) {

             const baseQuery = `/conversation/api/v1/workspaces/${workspacesId}/entities`;
             const version = 'version=2017-05-26&export=false&include_count=false';

             const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}`;
             console.log(fullUrl);

            request.get(fullUrl,function(err,resp,body){
                   if(err){
                      console.log(" logConversation.getEntidades Error: "+JSON.parse(body));
                   }
                   //res.status(200).json(JSON.parse(body));
                   res.status(200).json(JSON.parse(body));

           });

  },
  getIntencoes : function(req, res) {

               const baseQuery = `/conversation/api/v1/workspaces/${workspacesId}/intents`;
               const version = 'version=2017-05-26&export=false&include_count=false';

               const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}`;
               console.log(fullUrl);
               request.get(fullUrl,function(err,resp,body){
                     if(err){
                        console.log(" logConversation.getIntencoes Error: "+JSON.parse(body));
                     }
                     //res.status(200).json(JSON.parse(body));
                     res.status(200).json(JSON.parse(body));

             });
    }

}


module.exports = logConversation;