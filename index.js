const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;

var defaults = {
	flashExecutablePath: "\"C:\\Program Files (x86)\\Adobe\\Adobe Flash CS3\\Flash.exe\"",
	jflTmpName: "tmp.jsfl",
	flaPath: undefined,
	outputPath: undefined
}

module.exports = function(config, cb) {
	config = _.defaults(config, defaults);
	if (fs.existsSync(config.jflTmpName)) {
		fs.unlinkSync(config.jflTmpName);
	}
	var s = "fl.openDocument(\""+config.flaPath+"\");\n";
	s += "fl.documents[0].exportSWF(\""+config.outputPath+"\", true);\n";
	s += "fl.documents[0].close(false);\n";
	s += "fl.quit();\n"
	fs.writeFile(config.jflTmpName, s);
	exec(config.flashExecutablePath + " " + config.jflTmpName, function(error, stdout, stderr) {
		fs.unlinkSync(config.jflTmpName);
		return cb();
	});
}