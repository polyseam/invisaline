// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
export function deactivate() {}

// In extension activation:
let indentDecorationType = vscode.window.createTextEditorDecorationType({});

function updateDecorations(editor: vscode.TextEditor) {
  const text = editor.document.getText();
  const decorations: vscode.DecorationOptions[] = [];
  
  // Example: find simple template literals with regex (for real use, a JS parser is better)
  const templateRegex = /`([^]*?)`/g;
  let match: RegExpExecArray | null;
  while ((match = templateRegex.exec(text))) {
    const start = editor.document.positionAt(match.index);
    const end = editor.document.positionAt(match.index + match[0].length);
    if (start.line < end.line) {
      // Multi-line template found
      // Compute indent of start line
      const startLineText = editor.document.lineAt(start.line).text;
      const parentIndent = startLineText.search(/\S|$/);
      // Process each line of content inside the template
      for (let ln = start.line+1; ln <= end.line; ln++) {
        const lineText = editor.document.lineAt(ln).text;
        const actualIndent = lineText.search(/\S|$/);
        const padCount = Math.max(0, parentIndent - actualIndent);
        if (padCount > 0) {
          const padStr = '\u00A0'.repeat(padCount);
          // Attach decoration at the first character (range must be non-empty)
          const range = new vscode.Range(ln, actualIndent, ln, actualIndent+1);
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
  if (e) {updateDecorations(e);};
});

vscode.workspace.onDidChangeTextDocument(e => {
  if (vscode.window.activeTextEditor && e.document === vscode.window.activeTextEditor.document) {
    updateDecorations(vscode.window.activeTextEditor);
  }
});