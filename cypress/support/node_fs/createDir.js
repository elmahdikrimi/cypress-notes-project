var fs = require('fs')

fs.mkdir('mochawesome-report', (err) => {
	if (err) {
		return console.error(err)
	}
	fs.mkdir('mochawesome-report', (err) => {
		if (err) {
			return console.error(err)
		}
	})
})