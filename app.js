const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = require('./config/config.'+env+'.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const ngrok = require('ngrok')

const port = config.PORT
const filePath = 'files'
const base_uri = config.BASE_URI

server.listen(port)
console.log(`Server Run / Mode ${env} / Port ${port}`)

app.use(express.static('front'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res,next) {
  res.sendfile(`${__dirname}/front/index.html`);
  app.use(express.static(`${__dirname}/front`));
});

server.listen(3000);

// Get files to share
if (!fs.existsSync(filePath)){
  fs.mkdirSync(filePath);
}
let files = fs.readdirSync(filePath);

// Get start parameter
const formation = readlineSync.question('Qu\'elle est votre formation (Node.js) ?  ') || 'Node.js';
const who = readlineSync.question('Qu\'elle est votre nom (Aurélien Loyer) ?  ') || 'Aurélien Loyer';
const teacher = readlineSync.question('Qu\'elle est votre email (aurelien.loyer@zenika.com) ?  ') || 'aurelien.loyer@zenika.com';
const twitter_url = readlineSync.question('Votre Twitter ?  ');
const github_url = readlineSync.question('Votre GitHub ?  ');

// If run expose launch ngrok
if (process.argv[2] === 'ngrok') {
  ngrok.connect({
    proto: config.ngrok_proto,
    auth: config.ngrok_auth,
    subdomain: config.ngrok_subdomain,
    addr: port,
  }, function (err, url) {
    if (!err)
      console.log(`Interface accessible depuis : ${url}`)
    else {
      console.log(err)
      exit()
    }
  });
}

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

  // TODO add front animation :)
  console.log(`+1 DL de ${filename}`)

  const readStream = fs.createReadStream(fullPath)
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
});

// Side live connexion :° !
io.on('connection', function (socket) {
  socket.emit('files', files);
});

fs.watch(filePath, () => {
  io.emit('files', files);
})
