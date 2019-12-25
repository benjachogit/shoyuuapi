var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbconfig = require('./db');
const azureStorage = require('azure-storage');
const getStream = require('into-stream');


const azureStorageConfig = {
    accountName: "noblesamplebot9711",
    accountKey: "FUzNXMNP0Jrx9gH8RHSg1GpU6kVMgOuTaP1S7VRFOeEtZdF1b0SjQAkdY6zAtKrW/ak4gIUO66RNhh5qm0wN1A==",
    blobURL: "https://noblesamplebot9711.core.windows.net",
    containerName: "acbnds"
};
//const blobServiceClient = BlobServiceClient.fromConnectionString('DefaultEndpointsProtocol=https;AccountName=noblesamplebot9711;AccountKey=FSZ4qYo2oIRBHul7wiA8c7lE/QRSonCkxhq1x5zP9jxSlMMu6novbt/KUVlv+P6kjAN35VfKPsWDVshXgKtK9A==;EndpointSuffix=core.windows.net');


 //const containerClient = blobServiceClient.getContainerClient('oneteam');

// // List the blob(s) in the container.
//  const main = async (req,res) => {
//  try{
//     const containerClient = await blobServiceClient.getContainerClient('acbnds');

//     // Create the container
//     const createContainerResponse = await containerClient.create();
//     console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

// } catch(err){
//     console.log(err)
// }
// }

 uploadFileToBlob = async (directoryPath, file) => {
    console.log(file)
    return new Promise((resolve, reject) => {
 
        //const blobName = getBlobName(file.originalname);
        const stream = getStream(file.buffer);
        const streamLength = file.buffer.length;
 
        const blobService = azureStorage.createBlobService("noblesamplebot9711", "FUzNXMNP0Jrx9gH8RHSg1GpU6kVMgOuTaP1S7VRFOeEtZdF1b0SjQAkdY6zAtKrW/ak4gIUO66RNhh5qm0wN1A=="); 
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/shoyuugif.gif`, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ filename: blobName, 
                    originalname: file.originalname, 
                    size: streamLength, 
                    path: `${azureStorageConfig.containerName}/${directoryPath}/shoyuugif.gif`,
                    url: `${azureStorageConfig.blobURL}/${azureStorageConfig.containerName}/${directoryPath}/shoyuugif.gif` });
            }
        });
 
    });
 
};


InsertPromo =  async (link,name) => {
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

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};



const imageUpload = async(req, res, next) => {
    try {
        console.log(req)
        const image = await uploadFileToBlob('images', req.body.image); // images is a directory in the Azure container
        const db = await InsertPromo(image.url,req.body.name);
        res.json(db)
    } catch (error) {
        next(error);
    }
}

module.exports = {imageUpload}
