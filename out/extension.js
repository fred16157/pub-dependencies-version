"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
const package_info_1 = require("./package-info");
function activate(context) {
    console.log('activated!');
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'yaml', scheme: 'file', pattern: '**/pubspec.yml' }, {
        provideCompletionItems(document, position) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('starting autocomplete');
                let items = [];
                let line = document.lineAt(position.line);
                let dependencyName = line.text.split(':')[0];
                const pubServer = 'https://pub.dartlang.org';
                let res = yield axios_1.default.get(`${pubServer}/api/packages/${dependencyName}`, { headers: [{ accept: "application/vnd.pub.v2+json" }] });
                const packageInfo = new package_info_1.default(JSON.parse(res.data));
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
            });
        }
    }, ''));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map