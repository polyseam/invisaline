"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "invisaline" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('invisaline.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from invisaline!');
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
// In extension activation:
let indentDecorationType = vscode.window.createTextEditorDecorationType({});
function updateDecorations(editor) {
    const text = editor.document.getText();
    const decorations = [];
    // Example: find simple template literals with regex (for real use, a JS parser is better)
    const templateRegex = /`([^]*?)`/g;
    let match;
    while ((match = templateRegex.exec(text))) {
        const start = editor.document.positionAt(match.index);
        const end = editor.document.positionAt(match.index + match[0].length);
        if (start.line < end.line) {
            // Multi-line template found
            // Compute indent of start line
            const startLineText = editor.document.lineAt(start.line).text;
            const parentIndent = startLineText.search(/\S|$/);
            // Process each line of content inside the template
            for (let ln = start.line + 1; ln <= end.line; ln++) {
                const lineText = editor.document.lineAt(ln).text;
                const actualIndent = lineText.search(/\S|$/);
                const padCount = Math.max(0, parentIndent - actualIndent);
                if (padCount > 0) {
                    const padStr = '\u00A0'.repeat(padCount);
                    // Attach decoration at the first character (range must be non-empty)
                    const range = new vscode.Range(ln, actualIndent, ln, actualIndent + 1);
                    decorations.push({
                        range,
                        renderOptions: {
                            before: { contentText: padStr }
                        }
                    });
                }
            }
        }
    }
    editor.setDecorations(indentDecorationType, decorations);
}
// Hook into active editor changes and content changes
vscode.window.onDidChangeActiveTextEditor(e => {
    if (e) {
        updateDecorations(e);
    }
    ;
});
vscode.workspace.onDidChangeTextDocument(e => {
    if (vscode.window.activeTextEditor && e.document === vscode.window.activeTextEditor.document) {
        updateDecorations(vscode.window.activeTextEditor);
    }
});
//# sourceMappingURL=extension.js.map