var http = require('http');
var fs = require('fs');

var server =http.createServer(function(request,res){ //Client request initially comes here
	getTitles(res); // Control passed to getTitles
}).listen(8000);
console.log("Server running");

function getTitles(res) {
    fs.readFile('./titles.json', function(err, data) { //getTitles pulling data from titles.json
      if (err) {
      	hadError(err,res);
      }
      else {
      	getTemplate(JSON.parse(data.toString()),res);
		}
	})
}

function getTemplate(titles,res){ //getTemplate reads template file index.html
        fs.readFile('./index.html', function(err, data) {
          if (err) {
           	hadError(err,res); 
           }
          else {
          	formatHtml(titles,data.toString(),res);
          }
    });      
}

function formatHtml(titles,tmpl,res){ //formatHtml takes titles and template and render response
        var html = tmpl.replace('%', titles.join('</li><li>'));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);      
}

function hadError(err,res){ //error passed
	console.error(err);
	res.end('Something gone wrong, yes! its the server');
}
