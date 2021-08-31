const { app, BrowserWindow, webContents, session } = require('electron');
const fetch = require('node-fetch');
const Path = require('path')

const fetchCumcord = async () => {
	const response = await fetch("https://cors.bridged.cc/https://raw.githubusercontent.com/Cumcord/Cumcord/stable/dist/build.js");
	const text = await response.text()
	return text;
}

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: "#2F3136"
	});
	win.removeMenu();
	win.loadFile("index.html")
	//win.loadURL('https://discord.com/app')
	win.webContents.openDevTools()
	let ses = win.webContents.session;
	ses.webRequest.onHeadersReceived(({ responseHeaders, url }, done) => {
		delete responseHeaders['content-security-policy'];
		done({responseHeaders});
	})
	ses.loadExtension(Path.join(__dirname, 'CCExt'));
	return win;
}
app.whenReady().then(() => {
	let win = createWindow();
	app.on('window-all-closed', function () {
		app.quit();
	});
});
