import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate, deactivate } from '../extension';

suite('invisaline Extension Test Suite', () => {
  test('activate and deactivate exports exist', () => {
    assert.strictEqual(typeof activate, 'function');
    assert.strictEqual(typeof deactivate, 'function');
  });

  test('activate registers some subscriptions without throwing', () => {
    const context = { subscriptions: [] } as unknown as vscode.ExtensionContext;
    assert.doesNotThrow(() => activate(context), 'activate should not throw');
    assert.ok(
      context.subscriptions.length > 0,
      'activate should register at least one subscription'
    );
  });

  test('activate registers enable/disable commands', () => {
    const commands: string[] = [];
    // Monkey-patch registerCommand to capture command IDs
    const origRegister = vscode.commands.registerCommand;
    (vscode.commands.registerCommand as unknown) = ((id: string, callback: Function) => {
      commands.push(id);
      return { dispose: () => {} } as vscode.Disposable;
    }) as typeof vscode.commands.registerCommand;
    const context = { subscriptions: [] } as unknown as vscode.ExtensionContext;
    activate(context);
    assert.ok(
      commands.includes('invisaline.enable'),
      'should register enable command'
    );
    assert.ok(
      commands.includes('invisaline.disable'),
      'should register disable command'
    );
    // Restore the original registerCommand
    (vscode.commands.registerCommand as unknown) = origRegister;
  });

  test('deactivate does not throw', () => {
    assert.doesNotThrow(() => deactivate(), 'deactivate should not throw');
  });
});
