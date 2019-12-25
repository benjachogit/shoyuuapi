var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbconfig = require('./db');

const getCropIMG = (request, response) => {

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
                    "SELECT * FROM kioskdata WHERE datet > @date",
                    function(err, rowCount, rows)
                    {
                        if(err){
                            console.log("AA")
                        }else{
                            connection.close()
                        }
                    }
                )
                
                
                
                request.addParameter('date',TYPES.Date ,'2019-09-23');  
                    



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


module.exports = {getCropIMG}
                 
