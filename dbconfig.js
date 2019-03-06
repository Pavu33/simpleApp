var mysql = require('mysql');




const query = (query, callback) => {

    var con = mysql.createPool({
        host: "remotemysql.com",
        user: "nIweJauZUa",
        password: "8OiJ15Oejb",
        Port: "3306",
        database:"nIweJauZUa"
      });
      
      con.getConnection((err,connection) => {
          if (err) {
              throw err;
          }
          console.log('Connected to database');
          connection.query(query, (err, result)=> {
            if(err){
                console.log('error', err);
                callback(err);
            } else {
                callback(null, result);
            }

          })
      
      });
      
    
}




module.exports = {
    query : query
};