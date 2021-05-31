import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';
import PackageInfo from './package-info';

export function activate(context: vscode.ExtensionContext) {
	console.log('activated!');
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'yaml', scheme: 'file' }, {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			let items: vscode.CompletionItem[] = [];
			let line = document.lineAt(position.line);
			let dependencyName = line.text.split(':')[0].trim();
			const pubServer = 'https://pub.dartlang.org';
			return new Promise(async (resolve, reject) => {
				let res = await axios.get(`${pubServer}/api/packages/${dependencyName}`);
				const packageInfo = new PackageInfo(res.data);
				for (let version of packageInfo.versions) {
					if (version === packageInfo.latest) {
						let item = new vscode.CompletionItem(`${version} (latest)`, vscode.CompletionItemKind.Constant);
						item.insertText = new vscode.SnippetString(version);
						items.push(item);
					}
					else {
						let item = new vscode.CompletionItem(`${version}`, vscode.CompletionItemKind.Constant);
						item.insertText = new vscode.SnippetString(version);
						items.push(item);
					}
				}
				resolve(items);
			});
		}
	}, ''));
}



export function deactivate() { }
