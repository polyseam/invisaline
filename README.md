# invisaline

A VS Code extension that visually aligns multi-line JavaScript and TypeScript
template literals to match their surrounding code indentation — without changing
your source file.

> [!IMPORTANT]
> legally distinct from and unrelated to the mouth technology "invisalign"

## Installation

### From the Marketplace

1. Open the Extensions view in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **invisaline** and click **Install**.

## The Problem

When writing multi-line template literals, the content is pushed all the way to
the left margin of the editor, which can make it hard to read and it just
appears messy.

```ts
function greet(name: string) {
   const message = `Hello, ${name}!
Welcome to invisaline.
  `;
}
```

## The Solution

Invisaline automatically aligns the content of multi-line template literals with
the surrounding code indentation, making it easier to read and more visually
consistent. This is purely a visual change and does not modify the source file.

```ts
function greet(name: string) {
   const message = `Hello, ${name}!
     Welcome to invisaline.`; // this code is visually indented, but will contain no extra spaces
}
```

> [!TIP]
> Invisaline works even better when coupled with a
> [indent-rainbow](https://marketplace.visualstudio.com/items/?itemName=oderwat.indent-rainbow)
> which makes it easy to see real whitespace.

## Development

1. **Clone** the repository and install dependencies:
   ```bash
   git clone https://github.com/polyseam/invisaline.git
   cd invisaline
   npm install
   ```
2. **Compile** the TypeScript source:
   ```bash
   npm run compile
   ```
3. **Run** in the Extension Development Host:
   - Click **Run and Debug** in the sidebar then select **Run Extension**.
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
