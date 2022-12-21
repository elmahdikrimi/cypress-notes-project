
var fs = require('fs')
const dir = 'mochawesome-report'

fs.readdir(dir, (err, files) => {
	console.log(files)
	if (files) {
		fs.rmdir(dir, { recursive: true }, (err) => {
	if (err) {
		throw err
	}
	
				console.log(`${dir} is deleted!`)
			})
	} else {
		return console.error(err)
	}
})