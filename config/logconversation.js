var request=require('request');


 var logConversation = {
     get : function(req, res) {

       /* var texto = req.params.texto;
        console.log("paramentros"+req.params.full);

        if(typeof req.params.full == 'undefined'){
          full=false;
        }else full=JSON.parse(req.params.full);*/

        console.log("Buscando log");

        const workspacesId =  '7f576bfc-2d11-4de2-b985-98e8185e5664';
        const baseQuery = `/conversation/api/v1/workspaces/${workspacesId}/logs`;
        const version = 'version=2017-05-26';

        //curl -u "{username}":"{password}"
       // "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/bec28d8f-18c1-4e97-8d08-9c842c658b51/logs?version=2017-05-26"

        const username = 'd1df6c26-bedc-4965-9a79-e1339c0cff80';
        const password = '3lUqPxo4kNm2';
        const apiHostname = 'gateway.watsonplatform.net';

       // const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}&${query}`;

        const fullUrl = `https://${username}:${password}@${apiHostname}${baseQuery}?${version}`;
        console.log(fullUrl);

       request.get(fullUrl,function(err,resp,body){
              if(err){
                 console.log(" logConversation.get Error: "+JSON.parse(body));
              }
              //res.status(200).json(JSON.parse(body));
              res.status(200).json(JSON.parse(body));

        });

       /*
         var queryParams = {
           //query:texto,
           natural_language_query:texto,
         //  passages:true,
           environment_id: 'c5bd48f5-619e-4a74-9c84-ed9681f3a336',
           collection_id: '76764baf-0b3d-4bf0-87ba-74ad78d22eb9'     };

          if (full) {
                 queryParams.aggregations = [].concat(entities, sentiments, mentions);
          }

         console.log(queryParams);

         discoveryqueryParams.query(, function(error, data) {
             //console.log(JSON.stringify(data, null, 2));
             res.status(200).json(data);
      });*/
  }
}


module.exports = logConversation;