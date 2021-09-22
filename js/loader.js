
// import { monExport } from "https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js";
// Uncaught SyntaxError: import declarations may only appear at top level of a module

window.onload = () => {
	// definitions
	const template = 'patobeur'
	const jsFilesList = [
		{ pathfile: 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js', idname: 'phaser-js' },
		{ pathfile: 'js/' + template + '/config.js', idname: 'config-js' },
		{ pathfile: 'js/' + template + '/gamedatas.js', idname: 'datas-js' },
		{ pathfile: 'js/tools.js', idname: 'tools-js' },
		{ pathfile: 'js/Scenes/sceneMain.js', idname: 'sceneMain-js' },
		{ pathfile: 'js/Scenes/sceneOuterSpace.js', idname: 'sceneOuterSpace-js' },
		{ pathfile: 'js/main.js', idname: 'main-js' },
	];
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
					setLoaderClass((start === jsFilesList.length))
				})
				.catch(() => {
					setLoaderInfoDone(jsFilesList[start].idname, true)
					console.error("Hum ! We'r inda mood !!! ");
				});
		}
	}
	setLoaderClass = (bool = false) => {
		bool
			? document.getElementById('loader').classList.remove('active')
			: document.getElementById('loader').classList.add('active')
	}
	setLoaderInfoDone = (idname, error = false) => {
		let validationLoader = document.createElement('div')
		validationLoader.textContent = '[' + idname + ']' + (error ? 'On Error 🛑' : ' done ✔️')
		document.getElementById('doneload').appendChild(validationLoader)
	}
	//
	mountScriptJs();
}
