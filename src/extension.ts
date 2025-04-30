// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"invisaline" is now active!');

  // Register commands to toggle Invisaline
  context.subscriptions.push(
    vscode.commands.registerCommand('invisaline.enable', async () => {
      const config = vscode.workspace.getConfiguration('invisaline');
      const pick = await vscode.window.showQuickPick(
        [
          { label: 'Global', description: 'User settings' },
          { label: 'Workspace', description: 'This workspace' }
        ],
        {
          placeHolder: 'Apply Invisaline setting to:',
          ignoreFocusOut: true
        }
      );
      const target = pick?.label === 'Workspace'
        ? vscode.ConfigurationTarget.Workspace
        : vscode.ConfigurationTarget.Global;
      await config.update('enabled', true, target);
      updateDecorations(vscode.window.activeTextEditor);
      vscode.window.showInformationMessage('Invisaline indentation enabled.');
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('invisaline.disable', async () => {
      const config = vscode.workspace.getConfiguration('invisaline');
      const pick = await vscode.window.showQuickPick(
        [
          { label: 'Global', description: 'User settings' },
          { label: 'Workspace', description: 'This workspace' }
        ],
        {
          placeHolder: 'Apply Invisaline setting to:',
          ignoreFocusOut: true
        }
      );
      const target = pick?.label === 'Workspace'
        ? vscode.ConfigurationTarget.Workspace
        : vscode.ConfigurationTarget.Global;
      await config.update('enabled', false, target);
      updateDecorations(vscode.window.activeTextEditor);
      vscode.window.showInformationMessage('Invisaline indentation disabled.');
    })
  );

  // Create a decoration type for visual indent padding
  const indentDecorationType = vscode.window.createTextEditorDecorationType({});
  context.subscriptions.push(indentDecorationType);

  // Function to update template literal indent decorations
  function updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor) {
      return;
    }
    // Respect the enabled setting: clear decorations and exit if disabled
    const config = vscode.workspace.getConfiguration('invisaline', editor.document.uri);
    const enabled = config.get<boolean>('enabled', true);
    if (!enabled) {
      editor.setDecorations(indentDecorationType, []);
      return;
    }
    // Only apply to JS/TS files
    if (
      !["javascript", "javascriptreact", "typescript", "typescriptreact"]
        .includes(editor.document.languageId)
    ) {
      return;
    }
    const text = editor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];
    // Match all template literals (multi-line aware)
    const templateRegex = /`([\s\S]*?)`/g;
    let match: RegExpExecArray | null;
    while ((match = templateRegex.exec(text))) {
      const start = editor.document.positionAt(match.index);
      const end = editor.document.positionAt(match.index + match[0].length);
      if (start.line < end.line) {
        const parentIndent =
          editor.document.lineAt(start.line).firstNonWhitespaceCharacterIndex;
        for (let ln = start.line + 1; ln <= end.line; ln++) {
          const lineText = editor.document.lineAt(ln).text;
          const desiredIndent = parentIndent + 2;
          // Always apply visual indent to template lines
          const padStr = "\u00A0".repeat(desiredIndent);
          const range = new vscode.Range(ln, 0, ln, 0);
          decorations.push({
            range,
            renderOptions: { before: { contentText: padStr } },
          });
        }
      }
    }
    editor.setDecorations(indentDecorationType, decorations);
  }

  // Initial decoration pass
  updateDecorations(vscode.window.activeTextEditor);
  // Reapply on editor switch
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) =>
      updateDecorations(editor)
    ),
  );
  // Reapply on document edits
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        updateDecorations(vscode.window.activeTextEditor);
      }
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration('invisaline.enabled')
      ) {
        updateDecorations(vscode.window.activeTextEditor);
      }
    }),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
