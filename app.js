const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = require('./config/config.'+env+'.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')
const path = require('path')

const port = config.PORT
const filePath = 'files';
const base_uri = config.BASE_URI

server.listen(port);
console.log('Server Run / Mode '+env+' / Port '+port);

app.use(express.static('front'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res,next) {
  res.sendfile(__dirname +'/front'+ '/index.html');
  app.use(express.static(__dirname + '/front'));
  //app.use('/front/',express.static(__dirname + './front'))
});

server.listen(3000);

//Lire les fichiers d'un dossier
let files = fs.readdirSync(filePath);

//recuperation des paremetres de lancement
const formation = process.argv[2] || 'Formation Node.js / VueJs';
const who = process.argv[3] || 'Aurélien Loyer';
const teacher = process.argv[4] || 'aurelien.loyer@zenika.com';

app.get('/infos', function (req, res) {
  res.json({
      who: who,
      formation: formation,
      teacher: teacher
  });
});

app.get('/files/:name', function (req, res) {
  let filename = req.params.name;

  let fullPath = path.join(__dirname+'/'+filePath, filename);
  let stat = fs.statSync(fullPath);

  res.writeHead(200, {
    'content-type': 'application/zip',
    'content-length': stat.size,
    'content-disposition':'attachment; filename=' + filename
  });

  console.log('+1 DL de '+filename);

  const readStream = fs.createReadStream(fullPath);
  readStream.pipe(res)

});

app.get('/files', function (req, res) {
  formatedList  = files.map(file => {
    let fullPath = path.join(__dirname+'/'+filePath, file);
    let stat = fs.statSync(fullPath);
    return {
      filename : file,
      stat : stat
    }
  })
  res.json(formatedList);
});

fs.watch(filePath, () => {
  files = fs.readdirSync(filePath);
  console.log(files);
});


//Partie communication temps réél !
io.on('connection', function (socket) {

  socket.emit('files', files);

  fs.watch(filePath, () => {
    socket.emit('files', files);
  })

});
