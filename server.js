const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const globalConfig = require('./global-config')
const fs = require('fs')

 const app = new (require('express'))()

 // const key = fs.readFileSync('/etc/ssl/mtn.cdn.persiangig.com.key')
 // const cert = fs.readFileSync('/etc/ssl/certificate.crt')
 // const ca = fs.readFileSync('/etc/ssl/ca_bundle.crt')
 // const chain = fs.readFileSync('/etc/ssl/cert_chain.pem')
 //const app = module.exports = express.createServer({ca:ca, key: key, cert: cert});


const port = globalConfig.port
console.log(port)
const serverAddress = '0.0.0.0' //globalConfig.serverName
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}))


// Dependencies
const express = require("express"),
  https = require('https'),
  //fs = require("fs"),
  cookieParser = require('cookie-parser'),
  rimraf = require("rimraf"),
  mkdirp = require("mkdirp"),
  multiparty = require('multiparty'),
  path = require('path'),
  request = require('request'),
  cors = require('cors'),

  // paths/constants
  fileInputName = process.env.FILE_INPUT_NAME || "qqfile",
  publicDir = process.env.PUBLIC_DIR || './',
  nodeModulesDir = process.env.NODE_MODULES_DIR || './node_modules',
  uploadedFilesPath = process.env.UPLOADED_FILES_DIR || __dirname + '/uploads/',
  chunkDirName = "chunks",
  maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited

request.debug = false /*process.env.NODE_ENV == 'development'*/ // Debug only on development

//Config
const _config = {
  baseUrL: globalConfig.hostname,
  getUser: '/cfs/rest/users/currentUser',
  getBusinessUser: (id) => `/cfs/rest/planGroupUsers/getUserPlanGroup?userId=${id}`,
  serverDelete: '/cfs/rest/documents/trash',
  serverUpload: '/cfs/rest/upload/binary'
}

// routes
//app.use(cors({ origin: false, credentials: false }))
app.use(cookieParser())
app.use('/', express.static(publicDir));
app.use("/node_modules", express.static(nodeModulesDir));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', globalConfig.baseProtocol + '://' + globalConfig.serverName)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Cache-Control, X-Requested-With, Accept, token, clienToken')
  res.header('Access-Control-Allow-Credentials', 'true')


  next()
});

process.on('uncaughtException', function (err) {
  console.error(err);
});

app.post("/uploads", onUpload);
app.post("/server_upload", serverUpload);
app.put("/server_delete", serverDelete);

app.delete("/uploads/:uuid", onDeleteFile);

app.get('/get_user', getCurrentUser);

app.get('/get_plans', function(req, res) {
  fs.readFile(__dirname + '/plans.json', 'utf-8', function(err, data) {
    if (err) res.status(400).json({ error: true, message: 'Could not read plans' })
    else res.status(200).json({ error: false, plans: JSON.parse(data).plans })
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//---------------
// ** HTTPS :
// let sslOptions = {
//   key: key,
//   //cert: cert,
//   //ca: ca
//   cert: chain
// };
// https.createServer(sslOptions, app).listen(port, serverAddress);
// ** HTTP :
const srv = app.listen(port, serverAddress)
//---------------

let files = {};


function onUpload(req, res) {
  const form = new multiparty.Form({
    uploadDir: uploadedFilesPath + 'tmp'
  });

  form.parse(req, function (err, fields, files) {
    const partIndex = fields.qqpartindex;

    // text/plain is required to ensure support for IE9 and older
    res.set("Content-Type", "text/plain");
    res.set('Content-Length', fields.qqtotalfilesize[0])

    if (partIndex == null) {
      onSimpleUpload(fields, files[fileInputName][0], res);
    }
    else {
      onChunkedUpload(fields, files[fileInputName][0], res);
    }
  });
}

function onSimpleUpload(fields, file, res) {
  const uuid = fields.qquuid,
    responseData = {
      success: false
    };

  file.name = fields.qqfilename;

  if (isValid(file.size)) {
    moveUploadedFile(file, uuid, function () {
        responseData.success = true;
        fs.unlink(file.path)
        res.send(responseData);
      },
      function () {
        responseData.error = "Problem copying the file!";
        fs.unlink(file.path)
        res.send(responseData);
      });
  }
  else {
    fs.unlink(file.path)
    failWithTooBigFile(responseData, res);
  }
}

function onChunkedUpload(fields, file, res) {
  const size = parseInt(fields.qqtotalfilesize),
    uuid = fields.qquuid,
    index = fields.qqpartindex,
    totalParts = parseInt(fields.qqtotalparts),
    responseData = {
      success: false
    };

  file.name = fields.qqfilename;

  if (isValid(size)) {
    storeChunk(file, uuid, index, totalParts, function () {
        if (index < totalParts - 1) {
          responseData.success = true;
          fs.unlink(file.path)
          res.send(responseData);
        }
        else {
          combineChunks(file, uuid, function () {
              responseData.success = true;
              fs.unlink(file.path)
              res.send(responseData);
            },
            function () {
              responseData.error = "Problem combining the chunks!";
              fs.unlink(file.path)
              res.send(responseData);
            });
        }
      },
      function (reset) {
        responseData.error = "Problem storing the chunk!";
        fs.unlink(file.path)
        res.send(responseData);
      });
  }
  else {
    fs.unlink(file.path)
    failWithTooBigFile(responseData, res);
  }
}

function failWithTooBigFile(responseData, res) {
  responseData.error = "Too big!";
  responseData.preventRetry = true;
  res.send(responseData);
}

function onDeleteFile(req, res) {
  const uuid = req.params.uuid,
    dirToDelete = uploadedFilesPath + uuid;

  rimraf(dirToDelete, function (error) {
    if (error) {
      console.error("Problem deleting file! " + error);
      res.status(500);
    }

    res.send();
  });
}

function isValid(size) {
  return maxFileSize === 0 || size < maxFileSize;
}

function fileExistence(path, callback) {
  fs.stat(path, callback)
}

function moveFile(destinationDir, sourceFile, destinationFile, success, failure) {
  mkdirp(destinationDir, function (error) {
    let sourceStream, destStream;

    if (error) {
      console.error("Problem creating directory " + destinationDir + ": " + error);
      failure();
    }
    else {
      sourceStream = fs.createReadStream(sourceFile);
      destStream = fs.createWriteStream(destinationFile);

      sourceStream
        .on("error", function (error) {
          console.error("Problem copying file: " + error.stack);
          destStream.end();
          failure();
        })
        .on("end", function () {
          destStream.end();
          success();
        })
        .pipe(destStream);
    }
  });
}

function moveUploadedFile(file, uuid, success, failure) {
  const destinationDir = uploadedFilesPath + uuid + "/",
    fileDestination = destinationDir + file.name;

  moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function storeChunk(file, uuid, index, numChunks, success, failure) {
  const destinationDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
    chunkFilename = getChunkFilename(index, numChunks),
    fileDestination = destinationDir + chunkFilename;

  moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function combineChunks(file, uuid, success, failure) {
  const chunksDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
    destinationDir = uploadedFilesPath + uuid + "/",
    fileDestination = destinationDir + file.name;


  fs.readdir(chunksDir, function (err, fileNames) {
    let destFileStream;

    if (err) {
      console.error("Problem listing chunks! " + err);
      failure();
    }
    else {
      fileNames.sort();
      destFileStream = fs.createWriteStream(fileDestination, {flags: "a"});

      appendToStream(destFileStream, chunksDir, fileNames, 0, function () {
          rimraf(chunksDir, function (rimrafError) {
            if (rimrafError) {
              console.log("Problem deleting chunks dir! " + rimrafError);
            }
          });
          success();
        },
        failure);
    }
  });
}

function appendToStream(destStream, srcDir, srcFilesnames, index, success, failure) {
  if (index < srcFilesnames.length) {
    fs.createReadStream(srcDir + srcFilesnames[index])
      .on("end", function () {
        appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
      })
      .on("error", function (error) {
        console.error("Problem appending chunk! " + error);
        destStream.end();
        failure();
      })
      .pipe(destStream, {end: false});
  }
  else {
    /* This is the end, file is completely uploaded */
    destStream.end();
    success();
  }
}

function serverUpload(req, res) {

  console.log(`Uploading ${req.query.name} to server`);

  const query = req.query;

  const options = {
    url: `${_config.baseUrL + _config.serverUpload}?path-id=${query.pathId}&name=${encodeURIComponent(query.name)}&size=${query.size}&dlc=false&subdomain=${query.subdomain}`,
    headers: {
      'content-type': '*/*',
      'content-length': `${query.size}`,
      token: req.headers.token,
      cookie: req.headers.cookie,
    }
  };

  const fileDir = path.join(__dirname, '/uploads/' + query.uuid + '/' + query.name),
    pathDir = path.join(__dirname, '/uploads/' + query.uuid + '/')

  fs.createReadStream(fileDir).pipe(request.post(options, function (err, reqRes, body) {

    let _trials = 0;

    function removeFile() {
      fileExistence(pathDir, function(exErr, stat) {
        if (exErr == null) {

          // File Exists
          console.log(`removing file ${query.name}`)

          rimraf(pathDir, function (rimrafError) {
            if (rimrafError) {
              if (_trials < 3 && _trials > 0) {
                removeFile();
                _trials++;
              } else {
                console.log('Trials finished, could not remove directory')
              }
            }
          });
        } else {
          console.error('File Exist Error', exErr.code)
        }
      })
    }

    try {
      removeFile();
    } catch (e) {
      console.log(e.message);
    }

    if (reqRes.statusCode == 200) {
      files[query.id] = JSON.parse(body).id;
      // console.log(`Added file as ${JSON.parse(body).id}`, files)
    }
    else {
      console.log(`Could not upload ${req.query.name}`, body)
    }

    res.status(reqRes.statusCode).send(body || JSON.stringify({success: true}));

  }).on('error', function(er) {
    console.log('Pipe Error', err)
    })
  )

}

function serverDelete(req, res) {

  const options = {
    url: `${_config.baseUrL + _config.serverDelete}?ids=${files[req.query.id]}`,
    headers: {
      token: req.headers.token,
      cookie: req.headers.cookie,
    }
  };

  request.put(options, function (err, reqRes, body) {

    if (reqRes.statusCode == 200) delete files[req.query.id];

    res.set({'content-type': 'application/json; charset=utf-8'});

    res.status(reqRes.statusCode);
    res.end(body ? body : 'No Specific Response');

  });

}

function getCurrentUser(req, res) {

  console.log('Requesting Current User');
  console.log('globalConfig', globalConfig);
  const {userId} = req.query

  const options = {
    url: `${_config.baseUrL + (userId ? _config.getBusinessUser(userId) : _config.getUser)}`,
    //rejectUnauthorized: false,
    //ciphers: 'DES-CBC3-SHA',
    //secureOptions: constants.SSL_OP_NO_TLSv1_2,
    headers: {
      token: req.headers.token,
      cookie: req.headers.cookie,
    }
  };

  request.get(options, function (err, reqRes, body) {
    res.set({'content-type': 'application/json; charset=utf-8'});
    res.status(reqRes.statusCode);
    res.end(body ? body : 'No Specific Response');
  });

}

function getChunkFilename(index, count) {
  const digits = new String(count).length,
    zeros = new Array(digits + 1).join("0");

  return (zeros + index).slice(-digits);
}
