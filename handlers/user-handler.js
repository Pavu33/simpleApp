const db = require('../dbconfig');
let md5 = require('md5');
const errors = require('../helpers/errors');

const signup = (data, callback) =>{
    try{
    let email = data.email;
    let password = md5(data.password);
    let first_name = data.first_name || '';
    let last_name = data.last_name || '';
    
    let selectQuery = "SELECT password FROM `users` WHERE email = '" + email + "'";
        db.query(selectQuery,(err, result) =>{
            if(err){
                console.log(err);
                return callback(errors.internalServer(true), null);
            }
            if(result.length > 0){
                return callback(errors.emailAlreadyExists(true),null);
            } else {
     
    let insertQuery = "INSERT INTO `users` ( email, password, first_name, last_name) VALUES ('" +
                              email + "', '" + password + "', '" + first_name + "', '" + last_name + "')";
        
        db.query(insertQuery,(err, result) =>{
                if(err){
                    console.log(err);
                    return callback(errors.internalServer(error), null);
                }
                else{
                    return callback(null, null);
                }
            });
            }
        });    
    }
    catch(exception){
        console.log(exception);
        return callback(errors.internalServer(true),null)
    }


}

const login = (data, callback) =>{

    try{
        let email = data.email;
        let password = md5(data.password);

        let query = "SELECT password FROM `users` WHERE email = '" + email + "'";
        db.query(query,(err, result) =>{
            if(err){
                console.log(err);
                return callback(errors.internalServer(error), null);
            }
             else{
                    if(result.length == 0){
                         return callback(errors.resourceNotFound(true), null);

                    }else if (result[0].password != password ){
                        
                         return callback(errors.invalidPassword(true),null);
                    
                    } else {
                        return callback(null, null);
                    }
                 
             }

    });    
}
catch(exception){
    console.log(exception);
}



}

module.exports= {
    signup : signup,
    login : login
}