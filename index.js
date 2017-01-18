const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const fileUrl = require('file-url');

var defaults = {
	flashExecutablePath: '"C:\\Program Files (x86)\\Adobe\\Adobe Flash CS3\\Flash.exe"',
	jflTmpName: 'tmp.jsfl',
	flaPath: undefined,
    logOutputFileName: 'Build_fla_output.log',
    logErrorFileName: 'Build_fla_error.log',
	outputPath: undefined
};

module.exports = function(config, cb) {
	config = _.defaults(config, defaults);
	if (fs.existsSync(config.jflTmpName)) {
		fs.unlinkSync(config.jflTmpName);
	}
	var s = 'fl.openDocument("'+config.flaPath+'");\n';
	s += 'fl.documents[0].exportSWF("'+config.outputPath+'", true);\n';
	s += 'fl.outputPanel.save("' + fileUrl(config.logOutputFileName) + '");';
    s += 'fl.compilerErrors.save("' + fileUrl(config.logErrorFileName) + '");';
	s += 'fl.documents[0].close(false);\n';
	s += 'fl.quit();\n';
	fs.writeFile(config.jflTmpName, s);
	exec(config.flashExecutablePath + " " + config.jflTmpName, function(error, stdout, stderr) {
        var output = null;
        if (fs.existsSync(config.logOutputFileName)) {
            output = fs.readFileSync(config.logOutputFileName).toString().replace(/^\s+|\s+$/g, '');
            fs.unlinkSync(config.logOutputFileName);
        }
        var error = null;
        if (fs.existsSync(config.logErrorFileName)) {
            error = fs.readFileSync(config.logErrorFileName).toString().replace(/^\s+|\s+$/g, '');
            fs.unlinkSync(config.logErrorFileName);
		}
		fs.unlinkSync(config.jflTmpName);
		return cb(error, output);
	});
}