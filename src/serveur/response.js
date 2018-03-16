var http = require('http');

http.ServerResponse.prototype.respond = function (content, status){
	if('undefined' == typeof status){ // Only one parameter found
		if('number' == typeof content || !isNan(parseInt(content))){
			status = parseInt(content)
			content = undefined
		}else{
			status = 200
		}

	}
	if(status != 200){
		content = {
			"code": status,
			"status": http.STATUS_CODE[status],
			"message": content && content.toString() || null
		};
	}
	if(typeof 'content' != 'object'){
		content = {"result":content};

	}
	this.send(JSON.stringify(content)+"\n", status);
}