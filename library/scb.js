var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbconfig = require('./db');

const signup  = (req,res) => {
    console.log(request.body)

    var id = request.body.id
    var fname = request.body.fname
    var lname = request.body.lname
    var phone = request.body.phone
    var mail = request.body.mail
    var pid = request.body.pid
    var type = request.body.type

    var connection = new Connection(dbconfig.config);
    var rowss = []

    // Attempt to connect and execute queries if connection goes through
    
    connection.on('connect', async function(err)
        {
            
            if (err)
            {
                console.log("AAAAAA")
            }
            else
            {
                  // Read all rows from table
                let request = new Request(
                    "INSERT INTO shoyuu VALUES(@id,@fname,@lname,@phone,@email,@pid,)",
                    function(err, rowCount, rows)
                    {
                        if(err){
                            console.log("AA")
                        }else{
                            connection.close()
                        }
                    }
                )
                
                
                
                request.addParameter('id',TYPES.VarChar ,id);  
                
                request.addParameter('fname',TYPES.VarChar ,fname);  
                
                request.addParameter('lname',TYPES.VarChar ,lname);  
                
                request.addParameter('phone',TYPES.VarChar ,phone);  
                
                request.addParameter('email',TYPES.VarChar ,mail);  
                
                request.addParameter('pid',TYPES.VarChar ,pid);  
                
                request.addParameter('type',TYPES.VarChar ,type);  


                    



                request.on('row', function (columns) {
                    var row = {};
                    columns.forEach(function (column) {
                        row[column.metadata.colName] = column.value;
                    });
                    rowss.push(row);
                });
                request.on('doneInProc', function () {
                    response.json(rowss);
                });

                connection.execSql(request);  
                
             
                
               
               
                    
            }
            
        }
    );
    
   
  }


module.exports = {signup}
                 
 