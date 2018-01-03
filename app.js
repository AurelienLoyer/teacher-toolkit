const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const config = require('./config/config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');
const ngrok = require('ngrok');
const opn = require('opn');
const utils = require('./utils.js');

const port = config.port;
const filePath = config.file_path;

// Get start parameter
const formation = readlineSync.question(`Qu'elle est votre formation (${config.default_formation}) ?  `) || config.default_formation;
const who = readlineSync.question(`Qu'elle est votre nom (${config.default_who}) ?  `) || config.default_who;
const email = readlineSync.question(`Qu'elle est votre email (${config.default_email}) ?  `) || config.default_email;
const password = readlineSync.question(`Votre mot de passe pour la page admin (${config.admin_password}) ?  `) || config.admin_password;
const twitter = readlineSync.question(`Votre Twitter ? (${config.default_twitter}) `) || config.default_twitter;
const github = readlineSync.question(`Votre GitHub ? (${config.default_github}) `) || config.default_github;

server.listen(port);
console.log(`Server Run / Mode ${env} / Port ${port} 🎄`);

// If run expose launch ngrok
if (process.argv && process.argv[2] === 'ngrok') {
  ngrok.connect({
    proto: config.ngrok_proto,
    auth: config.ngrok_auth,
    subdomain: config.ngrok_subdomain,
    addr: port,
  }, function (err, url) {

    if (!err) {
      console.log(`Interface accessible depuis : ${url}`);
      opn(url);
    }
    else {
      console.log(err);
      exit();
    }
    
  });
}

app.use(express.static('front'));
app.use(bodyParser.json());
app.use(cors());

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res, next) {
  res.sendfile(`${__dirname}/front/index.html`);
  app.use(express.static(`${__dirname}/front`));
});

// Get items to share
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath);
}
if (!fs.existsSync(config.links_file)) {
  fs.writeFileSync(config.links_file, JSON.stringify([]));
}

let files = fs.readdirSync(filePath).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
let links = JSON.parse(fs.readFileSync(config.links_file, 'utf8'));

let totalDownload = {};

app.get('/infos', function (req, res) {
  res.json({
    who,
    formation,
    email,
    twitter,
    github,
  });
});

app.get('/files/:name', function (req, res) {
  let filename = req.params.name;

  let fullPath = path.join(__dirname + '/' + filePath, filename);
  let stat = fs.statSync(fullPath);

  res.writeHead(200, {
    'content-type': 'application/zip',
    'content-length': stat.size,
    'content-disposition': 'attachment; filename=' + filename
  });

  // TODO add front animation :)
  console.log(`+1 DL de ${filename}`);
  io.emit('download', filename);

  if (totalDownload[filename]) {
    totalDownload[filename] = totalDownload[filename] + 1
  }
  else {
    totalDownload[filename] = 1
  }
  io.emit('totalDownload', totalDownload);

  const readStream = fs.createReadStream(fullPath);
  readStream.pipe(res);

});

app.get('/files', function (req, res) {
  res.json(files);
});

app.get('/links', function (req, res) {
  res.json(links);
});

app.post('/links', function (req, res) {
  if (req.query.password === password) {
    fs.writeFileSync(config.links_file, JSON.stringify(req.body));
    res.json(links);
  }
  else {
    res.sendStatus(401);
  }
});

// ADMIN routes

app.post('/password', function (req, res) {
  if (req.body.password === password) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
});

fs.watch(filePath, () => {
  files = fs.readdirSync(filePath)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  io.emit('files', files);
});
fs.watch(config.links_file, () => {
  let data = fs.readFileSync(config.links_file, 'utf8');
  if (utils.isValidJsonString(data)) {
    links = JSON.parse(data);
    io.emit('links', links);
  }
});

io.on('connection', function (socket) {
  // do somethink on connection ?
});
