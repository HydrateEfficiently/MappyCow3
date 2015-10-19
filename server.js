var http = require("http"),
	express = require("express"),
	expressLess = require("express-less");

var port = process.env.port || 8005;

var app = express();
app.use(express.static("."));
app.use("/assets/less-css", expressLess(__dirname + "/assets/less"));

app.get("/", function (request, response) {
	response.sendfile("index.html");
});

app.listen(port);

module.exports = app;