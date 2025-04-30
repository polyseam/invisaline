import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate, deactivate } from '../../src/extension';

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

  test('deactivate does not throw', () => {
    assert.doesNotThrow(() => deactivate(), 'deactivate should not throw');
  });

  test('default extraPad setting is 2', () => {
    const config = vscode.workspace.getConfiguration('invisaline');
    const extraPad = config.get<number>('extraPad');
    assert.strictEqual(extraPad, 2, 'extraPad should default to 2');
  });
});
