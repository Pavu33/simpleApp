var express = require('express');
var router = express.Router();
var _ = require('underscore');
const userHandler = require('../handlers/user-handler');
const json = require('../utils/json-response');


router.post('/signup', (req, res) =>{

    if(!_.has(req.body,'email') || !_.has(req.body,'password')){ 

        console.log("No Proper body parameters",req.body);
        return json(res, error, null);

    }else
    {

       userHandler.signup(req.body,(error, data) =>{

        if(error){
           	
          return json(res, error, null);

         } 
        else{

           return json(res, null, data);

         }
       });

    }


});

router.post('/login', (req, res) =>{

  if(!_.has(req.body,'email') || !_.has(req.body,'password')){ 

      console.log("No Proper body parameters",req.body);

  }else
  {

     userHandler.login(req.body,(error, data) =>{

      if(error){
           
        return json(res, error, null);

       } 
      else{

         return json(res, null, data);

       }
     });

  }


});


module.exports = router;
