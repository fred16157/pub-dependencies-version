import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';
import PackageInfo from './package-info';

export function activate(context: vscode.ExtensionContext) {
	console.log('activated!');
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'yaml', scheme: 'file', pattern: '**/pubspec.yml' }, {
		async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			console.log('starting autocomplete');
			let items: vscode.CompletionItem[] = [];
			let line = document.lineAt(position.line);
			let dependencyName = line.text.split(':')[0];
			const pubServer = 'https://pub.dartlang.org';
			let res = await axios.get(`${pubServer}/api/packages/${dependencyName}`, { headers: [{ accept: "application/vnd.pub.v2+json" }] });
			const packageInfo = new PackageInfo(JSON.parse(res.data));
			for (let version of packageInfo.versions) {
				if (version === packageInfo.latest) {
					let item = new vscode.CompletionItem(`${version} (최신)`, vscode.CompletionItemKind.Constant);
					item.insertText = new vscode.SnippetString(version);
					items.push(item);
				}
				else {
					let item = new vscode.CompletionItem(`${version}`, vscode.CompletionItemKind.Constant);
					item.insertText = new vscode.SnippetString(version);
					items.push(item);
				}
			}
			return items;
		}
	}, ''));
}



export function deactivate() { }
