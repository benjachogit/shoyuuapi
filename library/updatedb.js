var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbconfig = require('./db');

const insertpro  = (request,response) => {
    console.log(request.body)

    var name = request.body.name
    var link = request.body.link
    var id = Math.floor(1000 + Math.random() * 9000);

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
                    "INSERT INTO shoyuupro VALUES(@id,@name,@link)",
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
                
                request.addParameter('name',TYPES.VarChar ,name);  
                
                request.addParameter('link',TYPES.VarChar ,link);  
                
                    



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

  const selectpro  = (request,response) => {
    console.log(request.body)

    
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
                    "SELECT * FROM shoyuupro",
                    function(err, rowCount, rows)
                    {
                        if(err){
                            console.log("AA")
                        }else{
                            connection.close()
                        }
                    }
                )
                    



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

module.exports = {insertpro,selectpro}
                 
 