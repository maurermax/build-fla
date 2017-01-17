# build-fla
Node module for building swf from SWF from .fla files programatically. Adobe Flash that is capable of JSFL is needed.

## how to use
```
const buildFla = require('build-fla');
buildFla({
	flaPath: "file:///C|/Users/user/input.fla",
	outputPath: "file:///C|/Users/user/input.fla"
}, function(err, output) {
	console.log('done building fla');
});
```

## config options
### required
* *flaPath:* the path as a file:// protocol to the .fla that should be build
* *outputPath:* the path to the destination swf file as a file:// protocol. The file will be overwritten.

### optional
* *flashExecutablePath:* the path to the flash executable on your system (needed to build the flash movie)

## return values
* *err:* will contain any compiler errors mentioned
* *output:* will contain stuff written to the output window during build
