
const template = 'patobeur'
window.onload = () => {
	// definitions
	const template = 'patobeur'
	const jsFilesList = [
		{ pathfile: 'js/' + template + '/config.js', idname: 'config-js' },
		{ pathfile: 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js', idname: 'phaser-js' },
		{ pathfile: 'js/phaserconfig.js', idname: 'phaserconfig-js' },
		{ pathfile: 'js/gamedatas/gamedatas.js', idname: 'datas-js' },
		{ pathfile: 'js/tools.js', idname: 'tools-js' },
		{ pathfile: 'js/Scenes/sceneMain.js', idname: 'sceneMain-js' },
		{ pathfile: 'js/Scenes/sceneOuterSpace.js', idname: 'sceneOuterSpace-js' },
		{ pathfile: 'js/main.js', idname: 'main-js' },
	];
	let isLoaderOpen = true
	// functions 
	addScriptsJs2Body = (scriptUrl, identity) => {
		// creation of a script tag, to add in <body>
		let script = document.createElement('script');
		script.type = "text/javascript"
		script.src = scriptUrl + "?v=" + new Date().getSeconds();
		script.id = identity
		document.body.appendChild(script);
		// asynchronous function
		return new Promise((good, bad) => {
			script.onload = function () { good(); }
			script.onerror = function () { bad(console.log('-----> ERROR <-----')); }
		});
	}
	switch_LoaderClass = (bool = false) => {
		if (
			// loader is Open and requeste is to remove loader
			isLoaderOpen === true && (bool && bool[0] === true)
			// loader is Close and requeste is to display loader
			|| isLoaderOpen === false && (bool && bool[0] === false)
			// loader is Close and switch bool is requested
			|| isLoaderOpen === false && bool === false
		) {
			isLoaderOpen = (bool)
				? bool[0]
				: !isLoaderOpen
		}
		isLoaderOpen
			? document.getElementById('loader').classList.remove('active')
			: document.getElementById('loader').classList.add('active')
	}
	mountScriptJs = (start = 0) => {
		// RECURSIVITY ON
		if (jsFilesList[start]) {
			addScriptsJs2Body(jsFilesList[start].pathfile, jsFilesList[start].idname)
				.then(() => {

					//refresh loader info 
					setLoaderInfoDone(jsFilesList[start].idname)

					// if start is not least
					if (start < jsFilesList.length) {
						start++
						mountScriptJs(start)
					}
					// if start is least
					switch_LoaderClass([(start === jsFilesList.length)])
				})
				.catch(() => {
					setLoaderInfoDone(jsFilesList[start].idname, true)
					console.error("Hum ! We'r inda mood !!! ");
				});
		}
	}
	setLoaderClass = (bool = false) => {
		if (bool) {
			isloader = true
		}
		isloader = !isloader
		isloader
			? document.getElementById('loader').classList.remove('active')
			: document.getElementById('loader').classList.add('active')
	}
	setLoaderInfoDone = (idname, error = false) => {
		let validationLoader = document.createElement('div')
		validationLoader.className = (error ? 'done error' : 'done')
		validationLoader.textContent = '[' + idname + ']' + (error ? '' : '')
		document.getElementById('doneload').appendChild(validationLoader)
	}
	//
	switch_LoaderClass()
	mountScriptJs();
}
