// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {exec} from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-dash" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.dash', () => {
		// The code you place here will be executed every time your command is executed

        var dash = new Dash();
        dash.lookUp();

        // var editor = vscode.window.activeTextEditor;
        // if (!editor) {
        //     return;
        // }

        // var selection = editor.selection;
        // var text = editor.document.getText(selection);
        // var doc = editor.document;
        // var config = vscode.workspace.getConfiguration('dash');

        // console.log(config['javascript']);
        // console.log('Selected text: ' + text);
        // console.log('Selected language: ' + doc.languageId);

        // exec("open -g 'dash-plugin://keys=JavaScript&query=" + text + "'");
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

export class Dash {

    public lookUp() {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        var selection = editor.selection;
        var query = editor.document.getText(selection);
        var languageId = editor.document.languageId;

        exec('open -g "' + this._getUri(query, languageId) + '"');
    }

    public _getKeys(languageId: string): string {
        let config = vscode.workspace.getConfiguration('dash');
        return config[languageId].join(',');
    }

    public _getUri(query, languageId) {
        var uri = 'dash-plugin://query=' + encodeURIComponent(query);

        if (languageId) {
            let keys = this._getKeys(languageId);
            uri += '&keys=' + keys;
        }
        
        return uri;
    }
}