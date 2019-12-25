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
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



const issue2options = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600
};

app.listen(port);

console.log('RESTful API server started on: ' + port);

app.get('/', cors(issue2options) ,getCrop.getCropIMG)

app.post('/signup', cors(issue2options) ,SCB.signup)
app.post('/blob', cors(issue2options) , singleFileUpload.single('image'),blob.imageUpload)
app.get('/getpromo', cors(issue2options) ,shoyuupro.selectpro)
app.get('/getcustomer', cors(issue2options) ,customer.getCustomer)
