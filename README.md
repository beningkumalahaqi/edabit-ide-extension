# Edabit IDE — Enhanced Editor

A Chrome Manifest V3 extension that enhances Edabit's own code editor in place. It does not open a second editor or replace your workflow: suggestions, ghost text, snippets, and theming are applied directly to the CodeMirror 6 editor on the challenge page.

Supports Edabit's eight advertised languages: **C#, C++, Java, JavaScript, PHP, Python, Ruby and Swift**.

## Features

- **VS Code-style suggestions** with fuzzy matching, ranked results, kind badges, signatures and short documentation.
- **Structural snippets in the suggestion list**: functions, `if` / `else`, loops, `switch`, `try` / `catch`, classes and common library patterns for every supported language.
- **Snippet tab stops** with repeated placeholders linked together, so renaming a loop counter updates every occurrence.
- **Inline ghost text** that previews the top completion after the caret.
- **Keyboard-first flow**: `↑`/`↓` to navigate, `Tab` or `Enter` to accept, `Esc` to dismiss, `Ctrl+Space` to open suggestions manually.
- **Command palette** with fuzzy command search, theme and font commands, and go-to-line.
- **Live error and warning checks**: unbalanced brackets, unterminated strings, missing Python colons, TODO/FIXME comments, trailing whitespace and overly long lines, with inline squiggles and a Problems list.
- **Format document with Prettier** for JavaScript, using `Shift+Alt+F`, the command palette, or the Editor+ panel.
- **Smooth typing mode**: animated caret movement and soft active-line transitions.
- **Language-aware snippets panel** with one-click insertion.
- **In-place theming**: keep Edabit's theme or switch the editor to a neutral dark theme.
- **Font size control** from 12px to 24px.
- **Settings persist** locally through `localStorage`.
- **No telemetry, network calls, or submission automation.** The extension never presses Edabit's Check button.

## Completion behavior

- Suggestions appear after two typed characters.
- Typing `.` opens member suggestions for the current language, without statement snippets.
- Deleting characters updates or dismisses the popup immediately.
- Selecting a suggestion updates both the highlighted row and the inline ghost text.
- Structural snippets show a compact shape in the detail column, e.g. `for (let i = 0; i < n; i++) { … }`.
- While filling in a snippet, `Tab` jumps to the next placeholder and `Esc` leaves snippet mode. The final tab stop drops the caret where the template expects you to continue typing.
- Suggestions come from curated per-language dictionaries. They are not compiler-grade IntelliSense and do not provide semantic diagnostics or go-to-definition.
- Error checking runs locally in the page, about a third of a second after you stop typing. It catches structural mistakes and common style issues; it is not a full compiler.

## Problems

- Errors and warnings appear as colored squiggles under the affected text.
- The **Editor+** button shows counts for errors and warnings. Open the panel to see the Problems list.
- Click a problem to jump to its location, or press `F8` / `Shift+F8` to move between problems.
- Turn checking off with **Check errors & warnings** in the panel or from the command palette.

## Build and install

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run build
```

Then:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project folder (the one containing `manifest.json`).
5. Open an Edabit challenge. The **Editor+** control appears near the bottom-right corner.

## Usage

- Click **Editor+** to open the compact settings panel.
- Type in Edabit's editor as usual; suggestions appear at the caret.
- Use `Ctrl+Space` to request suggestions without typing a prefix.
- Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to open the command palette. Type to filter commands, then press `Enter` to run one.
- Press `Ctrl+Shift+E` (`Cmd+Shift+E` on macOS) to toggle the settings panel.
- Toggle **Smooth typing** in the panel (or from the palette) to animate caret movement.
- Use `F8` / `Shift+F8` to jump to the next or previous problem. Open the panel to review the full Problems list.
- Press `Shift+Alt+F` (`Shift+Option+F` on macOS) to format JavaScript with Prettier. The same action is in the command palette and the Editor+ panel.
- Choose a snippet from the panel to insert it at the cursor, or type a structure name such as `for`, `if`, or `switch` and accept it from the suggestion list.

## Development

Format the project with Prettier:

```bash
npm run format
npm run format:check
```

The in-editor formatter uses Prettier's JavaScript parser. Other Edabit languages still get suggestions and diagnostics, but not Prettier formatting.

## How it works

Edabit renders its editor with CodeMirror 6. The extension's content script runs in the page's main world so it can read the editor instance from the CodeMirror tile attached to `.cm-content`. It then reads and writes through the editor's public `dispatch` API, so changes go through Edabit's normal editor state.

## Troubleshooting

- If the **Editor+** control does not appear, confirm you are on a challenge page with a visible code editor and that `npm run build` completed.
- If suggestions stop after an Edabit update, inspect the challenge editor's DOM. The integration depends on the `.cm-content` element exposing `cmTile.root.view`.
- Reload the extension from `chrome://extensions` after rebuilding.
- Check the page console for errors from `dist/content.js`.

## Project layout

- `manifest.json`: Chrome extension manifest.
- `src/content.js`: editor detection, toolbar, completion UI, ghost text, and settings.
- `src/suggestions.js`: curated language data with signatures and documentation.
- `public/content.css`: in-place editor theme and typography overrides.
- `vite.config.js`: production bundling.
