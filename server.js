const express = require("express");
const Minio = require("minio");
const { endPoint, port, useSSL, accessKey, secretKey } = require("./config");

// Instantiate an `express` server and expose an endpoint called `/presignedUrl` as a `GET` request that
// accepts a filename through a query parameter called `name`. For the implementation of this endpoint,
// invoke [`presignedPutObject`](https://docs.min.io/docs/javascript-client-api-reference#presignedPutObject)
// on the `Minio.Client` instance to generate a pre-signed URL, and return that URL in the response:

const minioClient = new Minio.Client({
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey
  });

const server = express();

server.get("/presignedUrl", (req, res) => {
    minioClient.presignedPutObject("uploads", req.query.name, (err, url) => {
    if (err) throw err;
    res.end(url);
  });
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// serve static files
server.use(express.static(__dirname + "/static"));

server.listen(8080);
