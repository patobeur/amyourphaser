const version = 'v3'
console.log(version)
const LOGON = false
const TEMPLATE = 'default'
const THEMEPATH = 'themes/' + TEMPLATE + '/'
const THEMEPATHIMG = 'themes/' + TEMPLATE + '/assets/img/'
window.onload = () => {
	// definitions
	const jsFilesList = [
		{ pathfile: THEMEPATH + 'config.js', idname: 'config-js' },
		// local phaser script
		{ pathfile: '../phaser/phaser.3.55.2.min.js', idname: 'phaser-js' },
		// distant phaser script
		//{ pathfile: 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js', idname: 'phaser-js' },
		{ pathfile: 'js/gamedatas/gamedatas.js', idname: 'gamedatas-js' },
		{ pathfile: 'js/gamedatas/phaserconfig.js', idname: 'phaserconfig-js' },
		{ pathfile: 'js/gamedatas/playerFactory.js', idname: 'playerFactory-js' },
		{ pathfile: 'js/gamedatas/tools.js', idname: 'tools-js' },
		{ pathfile: 'js/gamedatas/Scenes/sceneMain.js', idname: 'sceneMain-js' },
		// { pathfile: 'js/gamedatas/Scenes/sceneOuterSpace.js', idname: 'sceneOuterSpace-js' },
		{ pathfile: 'js/gamedatas/main.js', idname: 'main-js' },
	];
	let isLoaderOpen = true
	// functions 
	mountScriptJs = (start = 0) => {
		// RECURSIVITY ON
		if (jsFilesList[start]) {
			addScriptsJs2Body(jsFilesList[start].pathfile, jsFilesList[start].idname)
				.then(() => {
					// if start is not least
					if (start < jsFilesList.length) {
						start++
						mountScriptJs(start)
					}
					// if start is least
					// WE ARE DONE
					if ((start === jsFilesList.length)) {
						setTimeout(switch_LoaderDisplay, 1000, [false])
					}
				})
				.catch(() => {
					console.error("Hum ! We'r in'da mood !!! ");
				});
		}
	}
	addScriptsJs2Body = (scriptUrl, identity) => {
		// creation of a script tag, to add in <body>
		let script = document.createElement('script');
		script.type = "text/javascript"
		script.src = scriptUrl + '?' + version + '=' + new Date().getSeconds();
		script.id = identity
		document.body.appendChild(script);
		// asynchronous function
		return new Promise((good, bad) => {
			script.onload = function () { good(); }
			script.onerror = function () { bad(console.log('-----> ERROR <-----', scriptUrl)); }
		});
	}
	switch_LoaderDisplay = (bool = false) => {
		if (
			// loader is Open and requeste is to remove loader
			isLoaderOpen === true && (bool && bool[0] === true)
			// loader is Close and requeste is to display loader
			|| isLoaderOpen === false && (bool && bool[0] === false)
			// loader is Close and switch bool is requested
			|| isLoaderOpen === false && bool === false
		) {
			isLoaderOpen = bool
				? bool[0]
				: !isLoaderOpen
		}
		isLoaderOpen
			? document.getElementById('loader').classList.remove('active')
			: document.getElementById('loader').classList.add('active')
	}
	set_LoaderDisplay = (bool = false) => {
		if (bool) {
			isloader = true
		}
		isloader = !isloader
		isloader
			? document.getElementById('loader').classList.remove('active')
			: document.getElementById('loader').classList.add('active')
	}
	//
	mountScriptJs();
}
