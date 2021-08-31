const { app, BrowserWindow, webContents, session } = require('electron');
const Path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: "#2F3136"
	});
	win.removeMenu();
	win.loadFile("index.html")
	win.webContents.on('before-input-event', (event, input) => {
		if (input.control && input.shift && input.key.toLowerCase() === 'i') {
			win.webContents.openDevTools()
		} //Why does electron not have devtools on a shortcut by default
	});
	let ses = win.webContents.session;
	ses.webRequest.onHeadersReceived(({ responseHeaders, url }, done) => {
		delete responseHeaders['content-security-policy']; //Cumcord (and other client mods, if I use them) requires removing CSP
		done({responseHeaders});
	});
	ses.loadExtension(Path.join(__dirname, 'CCExt'));
	return win;
}
app.whenReady().then(() => {
	let win = createWindow();
	app.on('window-all-closed', function () {
		app.quit();
	});
});
