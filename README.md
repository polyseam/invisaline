# invisaline

A VS Code extension that visually aligns multi-line JavaScript and TypeScript
template literals to match their surrounding code indentation—without changing
your source file.

>![IMPORTANT]
> legally distinct and unrelated to the mouth technology "invisalign"

## Installation

### From the Marketplace

1. Open the Extensions view in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **invisaline** and click **Install**.

### Manual (VSIX)

1. Download the latest `.vsix` from the releases page.
2. Install it with:
   ```bash
   code --install-extension invisaline-<version>.vsix
   ```

## Usage

Simply open any JavaScript or TypeScript file containing a multi-line template
literal nested within indented code. For example:

```ts
function greet(name: string) {
    const message = `
Hello, ${name}!
Welcome to invisaline.
  `;
}
```

The lines inside the backticks will appear visually aligned under
`const message =`, preserving zero-indentation on disk.

```ts
function greet(name: string) {
    const message = `
      Hello, ${name}!
      Welcome to invisaline.
  `; // this code is visually indented, but contains no extra spaces
}
```

## Configuration

You can adjust the extra padding added before each line of the template literal
via your Settings (`settings.json`):

```jsonc
{
    // Number of additional spaces to pad before each template line (default: 2)
    "invisaline.extraPad": 2
}
```

Changes to this setting take effect immediately.

## Development

1. **Clone** the repository and install dependencies:
   ```bash
   git clone https://github.com/your-org/invisaline.git
   cd invisaline
   npm install
   ```
2. **Compile** the TypeScript source:
   ```bash
   npm run compile
   ```
3. **Run** in the Extension Development Host:
   - Press `F5` in VS Code to launch a new window with the extension loaded.
4. **Lint** and **Test**:
   ```bash
   npm run lint
   npm test
   ```

## Contributing

Contributions and feedback are welcome! Please open issues or pull requests on
GitHub to suggest new features or report bugs.

## License

[Apache 2.0](https://github.com/polyseam/invisaline/blob/main/LICENSE)
