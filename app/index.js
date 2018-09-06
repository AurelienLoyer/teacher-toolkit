#!/usr/bin/env node

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const config = require('../config/config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');

const ngrok = require('ngrok');
const opn = require('opn');
const utils = require('./utils.js');

const port = config.port;
const filePath = config.file_path;
const fullLinksPath = `${path.join(__dirname, '/../', config.link_path)}/links.json`;
const fullFilesPath = path.join(__dirname, '/../', filePath);
const totalDownload = {};

// Get start parameter
const { formation, who, email, password, twitter, github } = utils.getAnswers();

server.listen(port);

if (process.argv && process.argv[2] === 'dev') {
    console.log(`A 🦄 say: Server Run / Mode ${env} / Port ${port}`);
}else {
    ngrok.connect({
        proto: config.ngrok_proto,
        auth: config.ngrok_auth,
        subdomain: config.ngrok_subdomain,
        addr: port,
    })
    .then((url) => {
        console.log(`Ngrok url 🎉 : ${url}`);
        opn(url)
            .then(()=> {
                console.log('Opening your favorite browser 👌')
            })
            .catch((err) => {
                console.log('Error during opening your favorite browser 😅')
                console.log('You can copy the Ngrok url to access it');
            })
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
}

app.use(express.static(path.join(__dirname, '/../', `front/`)));
app.use(bodyParser.json());
app.use(cors());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.get('/theme.css', function (req, res) {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(`
    :root {
      --main-theme-color: ${config.theme_color};
    }
  `);
    res.end();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../', `front/index.html`));
});

// Get items to share

if (!fs.existsSync(fullFilesPath)) {
    fs.mkdirSync(fullFilesPath);
}

if (!fs.existsSync(path.join(__dirname, '/../', config.link_path))) {
    fs.mkdirSync(path.join(__dirname, '/../', config.link_path));
    fs.writeFileSync(fullLinksPath, JSON.stringify([]));
}

let files = fs.readdirSync(fullFilesPath).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
let links = JSON.parse(fs.readFileSync(fullLinksPath, 'utf8'));    

app.get('/infos', function (req, res) {
    res.json({
        who,
        formation,
        email,
        twitter,
        github,
        color: config.theme_color,
    });
});

app.get('/files/:name', function (req, res) {
    const filename = req.params.name;

    const fullFilePath = path.join(fullFilesPath, filename);
    const stat = fs.statSync(fullFilePath);

    res.writeHead(200, {
        'content-type': 'application/zip',
        'content-length': stat.size,
        'content-disposition': 'attachment; filename=' + filename,
    });

    console.log(`+1 DL de ${filename}`);
    io.emit('download', filename);

    if (totalDownload[filename]) {
        totalDownload[filename] = totalDownload[filename] + 1;
    }
    else {
        totalDownload[filename] = 1;
    }
    io.emit('totalDownload', totalDownload);

    const readStream = fs.createReadStream(fullFilePath);
    readStream.pipe(res);

});

app.get('/files', function (req, res) {
    res.json(files);
});

app.get('/links', function (req, res) {
    res.json(links);
});

// ADMIN routes

app.post('/color', function (req, res) {
    if (req.query.password === password) {
        if (req.body.color) {
            config.theme_color = req.body.color;
        }
        res.sendStatus(200);
        io.emit('reload');
    }
    else {
        res.sendStatus(401);
    }
});

app.post('/links', function (req, res) {
    if (req.query.password === password) {
        fs.writeFileSync(fullLinksPath, JSON.stringify(req.body));
        res.json(links);
    }
    else {
        res.sendStatus(401);
    }
});

app.get('/openFolder', function (req, res) {
    if (req.query.password === password) {
        utils.openDirectory(fullFilesPath, (command, err) => {
            if (err) {
                console.log(`🛑 Error during executing command: ${command}`);
                console.log(err);
                res.sendStatus(500);
            }
            else {
                res.sendStatus(200);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
});

app.post('/password', function (req, res) {
    if (req.body.password === password) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});

// WATCH files

fs.watch(fullFilesPath, () => {
    files = fs.readdirSync(fullFilesPath)
        .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    io.emit('files', files);
});

fs.watch(fullLinksPath, () => {
    const data = fs.readFileSync(fullLinksPath, 'utf8');
    if (utils.isValidJsonString(data)) {
        links = JSON.parse(data);
        io.emit('links', links);
    }
});

// SOCKET part

io.on('connection', function () { });
