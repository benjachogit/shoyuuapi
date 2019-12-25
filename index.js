var express = require('express')
var cors = require('cors')
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

const getCrop = require('./library/cropimg')
const SCB = require('./library/scb')
const blob = require('./library/insertdb')
const shoyuupro = require('./library/updatedb')
const customer = require('./library/faceAPI')
const bodyParser = require('body-parser')

  app = express(),
  port = process.env.PORT || 1500;


app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
app.listen(port);

console.log('RESTful API server started on: ' + port);

app.get('/', getCrop.getCropIMG)

app.post('/signup', SCB.signup)
app.post('/blob', singleFileUpload.single('image'),blob.imageUpload)
app.get('/getpromo',shoyuupro.selectpro)
app.get('/getcustomer',customer.getCustomer)