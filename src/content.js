import { SUGGESTIONS } from './suggestions.js';

(function () {
const HOST_ID = 'edabit-ide-tools';
const COMPLETION_ID = 'edabit-ide-completion';
const GHOST_ID = 'edabit-ide-ghost';
const SETTINGS_KEY = 'edabitIdeSettings';

const snip = (label, body, detail) => ({ label, body, detail });

const SNIPPETS = {
  javascript: [
    snip('function', 'function ${1:name}(${2:args}) {\n  $0\n}', 'function name(args) { … }'),
    snip('arrow fn', 'const ${1:name} = (${2:args}) => {\n  $0\n};', 'const name = (args) => { … }'),
    snip('async fn', 'async function ${1:name}(${2:args}) {\n  $0\n}', 'async function name(args) { … }'),
    snip('if', 'if (${1:condition}) {\n  $0\n}', 'if (condition) { … }'),
    snip('if/else', 'if (${1:condition}) {\n  $0\n} else {\n  \n}', 'if (condition) { … } else { … }'),
    snip('if/else if/else', 'if (${1:condition}) {\n  $0\n} else if (${2:condition}) {\n  \n} else {\n  \n}', 'if / else if / else chain'),
    snip('for', 'for (let ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n  $0\n}', 'for (let i = 0; i < n; i++) { … }'),
    snip('for...of', 'for (const ${1:item} of ${2:items}) {\n  $0\n}', 'for (const item of items) { … }'),
    snip('for...in', 'for (const ${1:key} in ${2:object}) {\n  $0\n}', 'for (const key in object) { … }'),
    snip('while', 'while (${1:condition}) {\n  $0\n}', 'while (condition) { … }'),
    snip('do...while', 'do {\n  $0\n} while (${1:condition});', 'do { … } while (condition);'),
    snip('switch', 'switch (${1:value}) {\n  case ${2:match}:\n    $0\n    break;\n  default:\n    break;\n}', 'switch (value) { case … }'),
    snip('try/catch', 'try {\n  $0\n} catch (${1:error}) {\n  \n}', 'try { … } catch (error) { … }'),
    snip('class', 'class ${1:Name} {\n  constructor(${2:args}) {\n    $0\n  }\n}', 'class Name { constructor(args) { … } }'),
    snip('map', '${1:items}.map((${2:item}) => $0)', 'items.map(item => …)'),
    snip('filter', '${1:items}.filter((${2:item}) => $0)', 'items.filter(item => …)'),
    snip('reduce', '${1:items}.reduce((${2:acc}, ${3:item}) => $0, ${4:0})', 'items.reduce((acc, item) => …, 0)'),
    snip('console.log', 'console.log($0);', 'console.log(value);'),
    snip('setTimeout', 'setTimeout(() => {\n  $0\n}, ${1:delay});', 'setTimeout(() => { … }, delay)'),
  ],
  python: [
    snip('def', 'def ${1:name}(${2:args}):\n    $0', 'def name(args): …'),
    snip('if', 'if ${1:condition}:\n    $0', 'if condition: …'),
    snip('if/else', 'if ${1:condition}:\n    $0\nelse:\n    ', 'if condition: … else: …'),
    snip('if/elif/else', 'if ${1:condition}:\n    $0\nelif ${2:condition}:\n    \nelse:\n    ', 'if / elif / else chain'),
    snip('for', 'for ${1:item} in ${2:items}:\n    $0', 'for item in items: …'),
    snip('while', 'while ${1:condition}:\n    $0', 'while condition: …'),
    snip('try/except', 'try:\n    $0\nexcept ${1:Exception} as ${2:error}:\n    ', 'try: … except Exception as error: …'),
    snip('with', 'with open(${1:path}) as ${2:file}:\n    $0', 'with open(path) as file: …'),
    snip('class', 'class ${1:Name}:\n    def __init__(self, ${2:args}):\n        $0', 'class Name: def __init__ …'),
    snip('list comp', '[${1:expr} for ${2:item} in ${3:items}]', '[expr for item in items]'),
    snip('dict comp', '{${1:key}: ${2:value} for ${3:item} in ${4:items}}', '{key: value for item in items}'),
    snip('lambda', 'lambda ${1:args}: $0', 'lambda args: expression'),
    snip('main guard', 'if __name__ == "__main__":\n    $0', 'if __name__ == "__main__": …'),
    snip('print', 'print($0)', 'print(value)'),
  ],
  csharp: [
    snip('method', 'public static ${1:ReturnType} ${2:Name}(${3:args})\n{\n    $0\n}', 'public static ReturnType Name(args) { … }'),
    snip('if', 'if (${1:condition})\n{\n    $0\n}', 'if (condition) { … }'),
    snip('if/else', 'if (${1:condition})\n{\n    $0\n}\nelse\n{\n    \n}', 'if (condition) { … } else { … }'),
    snip('for', 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++)\n{\n    $0\n}', 'for (int i = 0; i < length; i++) { … }'),
    snip('foreach', 'foreach (var ${1:item} in ${2:items})\n{\n    $0\n}', 'foreach (var item in items) { … }'),
    snip('while', 'while (${1:condition})\n{\n    $0\n}', 'while (condition) { … }'),
    snip('switch', 'switch (${1:value})\n{\n    case ${2:match}:\n        $0\n        break;\n    default:\n        break;\n}', 'switch (value) { case … }'),
    snip('try/catch', 'try\n{\n    $0\n}\ncatch (${1:Exception} ex)\n{\n    \n}', 'try { … } catch (Exception ex) { … }'),
    snip('class', 'public class ${1:Name}\n{\n    $0\n}', 'public class Name { … }'),
    snip('linq', '${1:items}.Where(${2:item} => $0)', 'items.Where(item => …)'),
    snip('Console.WriteLine', 'Console.WriteLine($0);', 'Console.WriteLine(value);'),
  ],
  cpp: [
    snip('main', 'int main() {\n    $0\n    return 0;\n}', 'int main() { … }'),
    snip('function', '${1:int} ${2:name}(${3:args}) {\n    $0\n}', 'int name(args) { … }'),
    snip('if', 'if (${1:condition}) {\n    $0\n}', 'if (condition) { … }'),
    snip('if/else', 'if (${1:condition}) {\n    $0\n} else {\n    \n}', 'if (condition) { … } else { … }'),
    snip('for', 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n    $0\n}', 'for (int i = 0; i < n; ++i) { … }'),
    snip('range for', 'for (const auto& ${1:item} : ${2:items}) {\n    $0\n}', 'for (const auto& item : items) { … }'),
    snip('while', 'while (${1:condition}) {\n    $0\n}', 'while (condition) { … }'),
    snip('switch', 'switch (${1:value}) {\n    case ${2:match}:\n        $0\n        break;\n    default:\n        break;\n}', 'switch (value) { case … }'),
    snip('try/catch', 'try {\n    $0\n} catch (const ${1:std::exception}& ${2:e}) {\n    \n}', 'try { … } catch (const std::exception& e) { … }'),
    snip('class', 'class ${1:Name} {\npublic:\n    ${2:Name}(${3:args}) {\n        $0\n    }\n};', 'class Name { public: Name(args) { … } };'),
    snip('cout', 'cout << ${1:value} << endl;', 'cout << value << endl;'),
    snip('vector', 'vector<${1:int}> ${2:values};', 'vector<int> values;'),
  ],
  java: [
    snip('main', 'public static void main(String[] args) {\n    $0\n}', 'public static void main(String[] args) { … }'),
    snip('method', 'public static ${1:ReturnType} ${2:name}(${3:args}) {\n    $0\n}', 'public static ReturnType name(args) { … }'),
    snip('if', 'if (${1:condition}) {\n    $0\n}', 'if (condition) { … }'),
    snip('if/else', 'if (${1:condition}) {\n    $0\n} else {\n    \n}', 'if (condition) { … } else { … }'),
    snip('for', 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    $0\n}', 'for (int i = 0; i < n; i++) { … }'),
    snip('for-each', 'for (${1:Type} ${2:item} : ${3:items}) {\n    $0\n}', 'for (Type item : items) { … }'),
    snip('while', 'while (${1:condition}) {\n    $0\n}', 'while (condition) { … }'),
    snip('switch', 'switch (${1:value}) {\n    case ${2:match}:\n        $0\n        break;\n    default:\n        break;\n}', 'switch (value) { case … }'),
    snip('try/catch', 'try {\n    $0\n} catch (${1:Exception} ${2:e}) {\n    \n}', 'try { … } catch (Exception e) { … }'),
    snip('class', 'public class ${1:Name} {\n    public ${1:Name}(${2:args}) {\n        $0\n    }\n}', 'public class Name { public Name(args) { … } }'),
    snip('println', 'System.out.println($0);', 'System.out.println(value);'),
    snip('list', 'List<${1:String}> ${2:items} = new ArrayList<>();', 'List<String> items = new ArrayList<>();'),
  ],
  php: [
    snip('function', 'function ${1:name}(${2:args}) {\n    $0\n}', 'function name(args) { … }'),
    snip('if', 'if (${1:condition}) {\n    $0\n}', 'if (condition) { … }'),
    snip('if/else', 'if (${1:condition}) {\n    $0\n} else {\n    \n}', 'if (condition) { … } else { … }'),
    snip('for', 'for ($${1:i} = 0; $${1:i} < ${2:n}; $${1:i}++) {\n    $0\n}', 'for ($i = 0; $i < n; $i++) { … }'),
    snip('foreach', 'foreach ($${1:items} as $${2:item}) {\n    $0\n}', 'foreach ($items as $item) { … }'),
    snip('while', 'while (${1:condition}) {\n    $0\n}', 'while (condition) { … }'),
    snip('switch', 'switch ($${1:value}) {\n    case ${2:match}:\n        $0\n        break;\n    default:\n        break;\n}', 'switch ($value) { case … }'),
    snip('try/catch', 'try {\n    $0\n} catch (${1:Exception} $${2:e}) {\n    \n}', 'try { … } catch (Exception $e) { … }'),
    snip('class', 'class ${1:Name} {\n    public function ${2:method}($${3:args}) {\n        $0\n    }\n}', 'class Name { public function method($args) { … } }'),
    snip('echo', 'echo $${1:value};', 'echo $value;'),
  ],
  ruby: [
    snip('def', 'def ${1:name}(${2:args})\n  $0\nend', 'def name(args) … end'),
    snip('if', 'if ${1:condition}\n  $0\nend', 'if condition … end'),
    snip('if/else', 'if ${1:condition}\n  $0\nelse\n  \nend', 'if condition … else … end'),
    snip('if/elsif/else', 'if ${1:condition}\n  $0\nelsif ${2:condition}\n  \nelse\n  \nend', 'if / elsif / else chain'),
    snip('unless', 'unless ${1:condition}\n  $0\nend', 'unless condition … end'),
    snip('for', 'for ${1:item} in ${2:items}\n  $0\nend', 'for item in items … end'),
    snip('while', 'while ${1:condition}\n  $0\nend', 'while condition … end'),
    snip('each', '${1:items}.each do |${2:item}|\n  $0\nend', 'items.each do |item| … end'),
    snip('map', '${1:items}.map { |${2:item}| $0 }', 'items.map { |item| … }'),
    snip('case', 'case ${1:value}\nwhen ${2:match}\n  $0\nelse\n  \nend', 'case value when … end'),
    snip('begin/rescue', 'begin\n  $0\nrescue ${1:StandardError} => ${2:e}\n  \nend', 'begin … rescue StandardError => e … end'),
    snip('class', 'class ${1:Name}\n  def initialize(${2:args})\n    $0\n  end\nend', 'class Name … end'),
  ],
  swift: [
    snip('func', 'func ${1:name}(${2:args}) -> ${3:ReturnType} {\n    $0\n}', 'func name(args) -> ReturnType { … }'),
    snip('if', 'if ${1:condition} {\n    $0\n}', 'if condition { … }'),
    snip('if/else', 'if ${1:condition} {\n    $0\n} else {\n    \n}', 'if condition { … } else { … }'),
    snip('guard', 'guard let ${1:value} = ${2:optional} else {\n    return\n}\n$0', 'guard let value = optional else { return }'),
    snip('for', 'for ${1:item} in ${2:items} {\n    $0\n}', 'for item in items { … }'),
    snip('while', 'while ${1:condition} {\n    $0\n}', 'while condition { … }'),
    snip('switch', 'switch ${1:value} {\ncase ${2:match}:\n    $0\ndefault:\n    break\n}', 'switch value { case … }'),
    snip('do/catch', 'do {\n    $0\n} catch {\n    \n}', 'do { … } catch { … }'),
    snip('struct', 'struct ${1:Name} {\n    $0\n}', 'struct Name { … }'),
    snip('class', 'class ${1:Name} {\n    init(${2:args}) {\n        $0\n    }\n}', 'class Name { init(args) { … } }'),
  ],
};

const KIND_RANK = { snippet: 0, function: 1, method: 2, property: 3, class: 4, module: 5, variable: 6, keyword: 7 };
const KIND_BADGE = {
  function: 'ƒ',
  method: 'm',
  property: 'p',
  class: 'C',
  module: 'M',
  variable: 'v',
  keyword: 'k',
  snippet: 's',
};

const state = {
  theme: 'default',
  fontSize: 15,
  completions: true,
  smooth: true,
  open: false,
};

let view = null;
let editorEl = null;
let editorContent = null;
let language = 'javascript';
let appliedKey = '';
let host = null;
let panel = null;
let completionHost = null;
let completionList = null;
let completionDocs = null;
let completionItems = [];
let completionPrefix = '';
let completionIndex = 0;
let ghostHost = null;
let ghostText = null;
let snippetSession = null;
let paletteHost = null;
let paletteInput = null;
let paletteResults = null;
let paletteCommands = [];
let paletteIndex = 0;
let paletteMode = 'command';

function findEditor() {
  const content = document.querySelector('#challenge-code-editor .cm-content')
    || document.querySelector('.ed-challenge-code__editor-frame .cm-content')
    || document.querySelector('.cm-content');
  const foundView = content?.cmTile?.root?.view;
  if (!foundView) return null;
  return { view: foundView, content, editor: content.closest('.cm-editor') };
}

function detectLanguage() {
  const title = document.title;
  if (/c#|csharp/i.test(title)) return 'csharp';
  if (/c\+\+|cpp/i.test(title)) return 'cpp';
  if (/javascript/i.test(title)) return 'javascript';
  if (/python/i.test(title)) return 'python';
  if (/\bjava\b/i.test(title)) return 'java';
  if (/php/i.test(title)) return 'php';
  if (/ruby/i.test(title)) return 'ruby';
  if (/swift/i.test(title)) return 'swift';
  return 'javascript';
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
    if (saved) {
      if (saved.theme === 'dark' || saved.theme === 'default') state.theme = saved.theme;
      if (Number.isFinite(saved.fontSize)) state.fontSize = Math.min(24, Math.max(12, saved.fontSize));
      if (typeof saved.completions === 'boolean') state.completions = saved.completions;
      if (typeof saved.smooth === 'boolean') state.smooth = saved.smooth;
    }
  } catch {
    /* ignore unreadable settings */
  }
  syncControls();
  applySettings(true);
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      theme: state.theme,
      fontSize: state.fontSize,
      completions: state.completions,
      smooth: state.smooth,
    }));
  } catch {
    /* storage can be unavailable in private mode */
  }
}

function applySettings(force = false) {
  if (!view || !editorEl) return;
  const key = `${state.theme}|${state.fontSize}|${state.smooth}`;
  const changed = force || key !== appliedKey;
  editorEl.classList.add('edx-enhanced');
  editorEl.classList.toggle('edx-dark', state.theme === 'dark');
  editorEl.classList.toggle('edx-smooth', state.smooth);
  editorEl.style.setProperty('--edx-font-size', `${state.fontSize}px`);
  if (changed) {
    appliedKey = key;
    requestAnimationFrame(() => view?.requestMeasure?.());
  }
}

function parseSnippet(text) {
  let output = '';
  let cursor = -1;
  let hasCursor = false;
  const stops = [];
  let index = 0;
  while (index < text.length) {
    if (text.startsWith('$0', index)) {
      cursor = output.length;
      hasCursor = true;
      index += 2;
      continue;
    }
    if (text[index] === '$' && text[index + 1] === '{') {
      const end = text.indexOf('}', index + 2);
      if (end > -1) {
        const body = text.slice(index + 2, end);
        const colon = body.indexOf(':');
        const numberText = colon >= 0 ? body.slice(0, colon) : body;
        const number = Number(numberText);
        const value = colon >= 0 ? body.slice(colon + 1) : '';
        if (Number.isFinite(number) && String(number) === numberText.trim()) {
          if (number === 0) {
            cursor = output.length;
            hasCursor = true;
          } else {
            const from = output.length;
            output += value;
            const existing = stops.find((stop) => stop.index === number);
            if (existing) existing.mirrors.push({ from, to: output.length });
            else stops.push({ index: number, from, to: output.length, mirrors: [] });
          }
          index = end + 1;
          continue;
        }
      }
    }
    if (text[index] === '$' && /\d/.test(text[index + 1] || '')) {
      const number = Number(text[index + 1]);
      if (number === 0) {
        cursor = output.length;
        hasCursor = true;
      } else {
        const existing = stops.find((stop) => stop.index === number);
        if (existing) existing.mirrors.push({ from: output.length, to: output.length });
        else stops.push({ index: number, from: output.length, to: output.length, mirrors: [] });
      }
      index += 2;
      continue;
    }
    output += text[index];
    index += 1;
  }
  stops.sort((a, b) => a.index - b.index);
  if (hasCursor) stops.push({ index: Number.MAX_SAFE_INTEGER, from: cursor, to: cursor, mirrors: [], final: true });
  return { text: output, cursor: hasCursor ? cursor : output.length, stops };
}

function selectionFor(ranges) {
  try {
    const Selection = view.state.selection.constructor;
    if (ranges.length > 1) {
      return Selection.create(ranges.map((range) => Selection.range(range.from, range.to)));
    }
    return Selection.range(ranges[0].from, ranges[0].to);
  } catch {
    return { anchor: ranges[0].from, head: ranges[0].to };
  }
}

function absoluteStop(stop, offset) {
  return {
    final: Boolean(stop.final),
    ranges: [
      { from: offset + stop.from, to: offset + stop.to },
      ...stop.mirrors.map((mirror) => ({ from: offset + mirror.from, to: offset + mirror.to })),
    ],
  };
}

function applySnippet(from, to, body) {
  if (!view) return;
  const parsed = parseSnippet(body);
  const first = parsed.stops[0];
  const onlyCursor = Boolean(first && first.final);
  const anchor = from + (first ? first.from : parsed.cursor);
  const head = first ? from + first.to : anchor;
  const selection = first && !onlyCursor ? selectionFor(absoluteStop(first, from).ranges) : { anchor, head };
  view.dispatch({
    changes: { from, to, insert: parsed.text },
    selection,
  });
  if (first && !onlyCursor) {
    snippetSession = {
      stops: parsed.stops.map((stop) => absoluteStop(stop, from)),
      index: 0,
    };
  } else {
    snippetSession = null;
  }
}

function insertSnippet(text) {
  if (!view) return;
  hideCompletion();
  const selection = view.state.selection.main;
  applySnippet(selection.from, selection.to, text);
  view.focus();
}

function endSnippet() {
  snippetSession = null;
}

function advanceSnippet() {
  if (!snippetSession || !view) return false;
  const stops = snippetSession.stops;
  const current = stops[snippetSession.index];
  if (current) {
    const primary = current.ranges[0];
    const selection = view.state.selection.ranges[0];
    const oldLength = primary.to - primary.from;
    const typedLength = selection ? selection.head - primary.from : oldLength;
    const newLength = Math.max(0, typedLength);
    const growth = newLength - oldLength;
    for (const range of current.ranges) range.to = range.from + newLength;
    if (growth !== 0) {
      for (let i = snippetSession.index + 1; i < stops.length; i += 1) {
        for (const range of stops[i].ranges) {
          let shift = 0;
          for (const currentRange of current.ranges) {
            if (currentRange.from < range.from) shift += growth;
          }
          range.from = Math.max(0, range.from + shift);
          range.to = Math.max(0, range.to + shift);
        }
      }
    }
  }
  const nextIndex = snippetSession.index + 1;
  if (nextIndex >= stops.length) {
    snippetSession = null;
    return true;
  }
  snippetSession.index = nextIndex;
  const ranges = stops[nextIndex].ranges;
  const limit = view.state.doc.length;
  if (ranges.some((range) => range.from > limit || range.to > limit)) {
    snippetSession = null;
    return false;
  }
  view.dispatch({ selection: selectionFor(ranges) });
  if (stops[nextIndex].final) snippetSession = null;
  return true;
}

function createToolbar() {
  host = document.createElement('div');
  host.id = HOST_ID;
  host.hidden = true;
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      :host([hidden]) { display: none !important; }
      * { box-sizing: border-box; }
      .wrap { position: fixed; right: 22px; bottom: 22px; z-index: 2147483647; font: 13px/1.4 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #e8eef7; }
      .pill { display: inline-flex; align-items: center; gap: 7px; border: 1px solid #3d4a5f; border-radius: 999px; background: #1b2230; color: #e8eef7; padding: 9px 14px; cursor: pointer; font: inherit; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,.28); }
      .pill:hover { background: #242e40; border-color: #55647d; }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: #3fb950; box-shadow: 0 0 0 3px rgba(63,185,80,.18); }
      .panel { position: absolute; right: 0; bottom: 46px; width: 262px; padding: 12px; border: 1px solid #333d4d; border-radius: 12px; background: #151a23; box-shadow: 0 18px 50px rgba(0,0,0,.45); }
      .panel[hidden] { display: none; }
      .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
      .head b { font-size: 13px; letter-spacing: .01em; }
      .head small { color: #8a97ab; font-weight: 500; }
      .close { border: 0; background: transparent; color: #93a0b4; font-size: 18px; line-height: 1; cursor: pointer; padding: 2px 5px; border-radius: 6px; }
      .close:hover { background: #232c3a; color: #fff; }
      .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 0; color: #b9c4d4; }
      .seg { display: inline-flex; border: 1px solid #333d4d; border-radius: 8px; overflow: hidden; }
      .seg button { border: 0; background: transparent; color: #93a0b4; font: inherit; padding: 4px 9px; cursor: pointer; }
      .seg button.on { background: #2b3a2f; color: #b7f0bd; }
      .stepper { display: inline-flex; align-items: center; gap: 6px; }
      .stepper button { width: 24px; height: 24px; border: 1px solid #333d4d; border-radius: 6px; background: #1d2430; color: #dbe4f0; cursor: pointer; font: inherit; }
      .stepper button:hover { background: #273040; }
      .stepper output { min-width: 22px; text-align: center; color: #e8eef7; font-variant-numeric: tabular-nums; }
      .snippets { margin-top: 8px; padding-top: 10px; border-top: 1px solid #28313f; }
      .snippets > span { display: block; color: #8a97ab; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 7px; }
      .snippet-list { display: flex; flex-wrap: wrap; gap: 6px; max-height: 132px; overflow: auto; scrollbar-width: thin; }
      .snippet { border: 1px solid #333d4d; border-radius: 7px; background: #1b2230; color: #cfd9e6; font: inherit; font-size: 12px; padding: 4px 8px; cursor: pointer; }
      .snippet:hover { background: #263041; border-color: #4a5a72; color: #fff; }
      .hint { margin-top: 9px; color: #6f7d91; font-size: 11px; }
      .hint kbd { display: inline-block; padding: 1px 5px; border: 1px solid #333d4d; border-bottom-width: 2px; border-radius: 4px; background: #1d2430; color: #b9c4d4; font: 10px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
      .reset { width: 100%; margin-top: 10px; border: 1px solid #333d4d; border-radius: 8px; background: transparent; color: #93a0b4; font: inherit; padding: 6px; cursor: pointer; }
      .reset:hover { background: #232c3a; color: #e8eef7; }
      input[type="checkbox"] { accent-color: #3fb950; }
    </style>
    <div class="wrap">
      <section class="panel" hidden>
        <div class="head"><b>Editor+</b><small id="lang"></small><button class="close" type="button" title="Close">×</button></div>
        <div class="row"><span>Theme</span><div class="seg"><button type="button" data-theme="default">Edabit</button><button type="button" data-theme="dark">Midnight</button></div></div>
        <div class="row"><span>Font size</span><div class="stepper"><button type="button" data-step="-1">−</button><output id="size">15</output><button type="button" data-step="1">+</button></div></div>
        <label class="row"><span>Word completion</span><input id="completions" type="checkbox"></label>
        <label class="row"><span>Smooth typing</span><input id="smooth" type="checkbox"></label>
        <div class="snippets"><span>Snippets</span><div class="snippet-list" id="snippet-list"></div></div>
        <div class="hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> command palette</div>
        <button class="reset" type="button">Reset to default</button>
      </section>
      <button class="pill" type="button"><span class="dot"></span>Editor+</button>
    </div>`;

  panel = shadow.querySelector('.panel');
  const pill = shadow.querySelector('.pill');
  const langLabel = shadow.querySelector('#lang');
  const sizeOutput = shadow.querySelector('#size');
  const completionsInput = shadow.querySelector('#completions');
  const smoothInput = shadow.querySelector('#smooth');
  const snippetList = shadow.querySelector('#snippet-list');

  pill.addEventListener('click', () => togglePanel());
  shadow.querySelector('.close').addEventListener('click', () => togglePanel(false));

  shadow.querySelectorAll('[data-theme]').forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
  });

  shadow.querySelectorAll('[data-step]').forEach((button) => {
    button.addEventListener('click', () => stepFontSize(Number(button.dataset.step)));
  });

  completionsInput.addEventListener('change', () => setCompletions(completionsInput.checked));
  smoothInput.addEventListener('change', () => setSmooth(smoothInput.checked));

  shadow.querySelector('.reset').addEventListener('click', resetAll);

  host.__updateLanguage = (next) => {
    language = next;
    langLabel.textContent = SUGGESTIONS[language]?.label || '';
    snippetList.replaceChildren(...(SNIPPETS[language] || []).map(({ label, body, detail }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'snippet';
      button.textContent = label;
      button.title = detail || label;
      button.addEventListener('click', () => insertSnippet(body));
      return button;
    }));
  };
  host.__syncControls = () => {
    sizeOutput.textContent = String(state.fontSize);
    completionsInput.checked = state.completions;
    smoothInput.checked = state.smooth;
    shadow.querySelectorAll('[data-theme]').forEach((button) => {
      button.classList.toggle('on', button.dataset.theme === state.theme);
    });
  };

  document.documentElement.append(host);
}

function syncControls() {
  host?.__syncControls?.();
}

function setTheme(theme) {
  state.theme = theme;
  saveSettings();
  syncControls();
  applySettings(true);
}

function setFontSize(size) {
  state.fontSize = Math.min(24, Math.max(12, size));
  saveSettings();
  syncControls();
  applySettings(true);
}

function stepFontSize(delta) {
  setFontSize(state.fontSize + delta);
}

function setCompletions(enabled) {
  state.completions = enabled;
  if (!enabled) hideCompletion();
  saveSettings();
  syncControls();
}

function setSmooth(enabled) {
  state.smooth = enabled;
  saveSettings();
  syncControls();
  applySettings(true);
}

function resetAll() {
  state.theme = 'default';
  state.fontSize = 15;
  state.completions = true;
  state.smooth = true;
  saveSettings();
  syncControls();
  applySettings(true);
  hideCompletion();
  endSnippet();
}

function togglePanel(force) {
  state.open = typeof force === 'boolean' ? force : !state.open;
  if (!panel) return;
  panel.hidden = !state.open;
  if (state.open) syncControls();
}

function createCompletionHost() {
  completionHost = document.createElement('div');
  completionHost.id = COMPLETION_ID;
  completionHost.hidden = true;
  const shadow = completionHost.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host { all: initial; position: fixed; z-index: 2147483647; }
      :host([hidden]) { display: none !important; }
      * { box-sizing: border-box; }
      .list { width: 340px; max-width: min(380px, 90vw); padding: 5px; border: 1px solid #333d4d; border-radius: 10px; background: #151a23; box-shadow: 0 18px 48px rgba(0,0,0,.45); font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #dbe4f0; overflow: hidden; animation: edx-completion-in 90ms ease-out; }
      @keyframes edx-completion-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
      .rows { max-height: 232px; overflow: auto; scrollbar-width: thin; }
      .item { display: flex; align-items: center; gap: 8px; width: 100%; border: 0; border-radius: 6px; background: transparent; color: inherit; font: inherit; padding: 5px 7px; cursor: pointer; text-align: left; }
      .item[data-active="true"], .item:hover { background: #253145; color: #fff; }
      .kind { flex: 0 0 17px; height: 17px; display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 10px; font-weight: 700; }
      .kind-function { background: #173a2a; color: #6ee7a8; }
      .kind-method { background: #1a2f4a; color: #7cc4ff; }
      .kind-property { background: #14333a; color: #67e8f9; }
      .kind-class { background: #3a3218; color: #fbbf24; }
      .kind-module { background: #2a2140; color: #c4b5fd; }
      .kind-variable { background: #2a2f38; color: #cbd5e1; }
      .kind-keyword { background: #3a1f3a; color: #f0abfc; }
      .kind-snippet { background: #3a2718; color: #fdba74; }
      .label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .label .hit { color: #7ee787; font-weight: 700; }
      .detail { flex: 0 1 auto; max-width: 52%; color: #7f8da3; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .item[data-active="true"] .detail { color: #9fb0c8; }
      .docs { border-top: 1px solid #28313f; margin-top: 4px; padding: 7px 8px 3px; }
      .docs[hidden] { display: none; }
      .docs-title { color: #cfd9e6; font-size: 11px; line-height: 1.4; white-space: normal; word-break: break-word; }
      .docs-body { color: #8492a6; font-family: Inter, -apple-system, "Segoe UI", sans-serif; font-size: 11px; line-height: 1.45; margin-top: 2px; }
      .docs-body[hidden] { display: none; }
      .foot { display: flex; gap: 12px; padding: 6px 8px 2px; color: #6f7d91; font: 10px/1.4 Inter, -apple-system, "Segoe UI", sans-serif; }
      .foot b { color: #9fb0c8; font-weight: 600; }
    </style>
    <div class="list" role="listbox">
      <div class="rows"></div>
      <div class="docs" hidden><div class="docs-title"></div><div class="docs-body"></div></div>
      <div class="foot"><span><b>↑↓</b> navigate</span><span><b>⇥</b> accept</span><span><b>esc</b> dismiss</span></div>
    </div>`;
  const shadowList = shadow.querySelector('.list');
  completionList = shadow.querySelector('.rows');
  completionDocs = shadow.querySelector('.docs');
  shadowList.addEventListener('mousemove', (event) => {
    const item = event.target.closest('.item');
    if (!item) return;
    const index = Number(item.dataset.index);
    if (index !== completionIndex) setCompletionIndex(index, false);
  });
  shadowList.addEventListener('mousedown', (event) => {
    const item = event.target.closest('.item');
    if (!item) return;
    event.preventDefault();
    completionIndex = Number(item.dataset.index);
    acceptCompletion();
  });
  document.documentElement.append(completionHost);
}

function createGhostHost() {
  ghostHost = document.createElement('div');
  ghostHost.id = GHOST_ID;
  ghostHost.hidden = true;
  const shadow = ghostHost.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host { all: initial; position: fixed; z-index: 2147483646; pointer-events: none; }
      :host([hidden]) { display: none !important; }
      .ghost { color: rgba(148, 163, 184, .72); white-space: pre; }
    </style>
    <span class="ghost"></span>`;
  ghostText = shadow.querySelector('.ghost');
  document.documentElement.append(ghostHost);
}

function hideGhost() {
  if (ghostHost) ghostHost.hidden = true;
  if (ghostText) ghostText.textContent = '';
}

function positionGhost() {
  if (!view || !ghostHost || ghostHost.hidden) return;
  const coords = view.coordsAtPos(view.state.selection.main.head);
  if (!coords) {
    hideGhost();
    return;
  }
  const style = getComputedStyle(editorContent || view.contentDOM);
  ghostHost.style.left = `${coords.left}px`;
  ghostHost.style.top = `${coords.top}px`;
  ghostHost.style.fontFamily = style.fontFamily;
  ghostHost.style.fontSize = style.fontSize;
  ghostHost.style.lineHeight = `${coords.bottom - coords.top}px`;
  ghostHost.style.letterSpacing = style.letterSpacing;
}

function showGhost(text) {
  if (!text) {
    hideGhost();
    return;
  }
  if (!ghostHost) createGhostHost();
  ghostText.textContent = text;
  ghostHost.hidden = false;
  positionGhost();
}

function fuzzyScore(query, label) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const l = label.toLowerCase();
  if (l === q) return 2000;
  const index = l.indexOf(q);
  if (index === 0) return 1000 - label.length;
  if (index > 0) return 600 - index * 2 - label.length * 0.1;
  const firstIndex = l.indexOf(q[0]);
  if (firstIndex > 0) {
    const previous = l[firstIndex - 1];
    const camelBoundary = label[firstIndex] !== label[firstIndex].toLowerCase();
    if (!/[.\s_$-]/.test(previous) && !camelBoundary) return -1;
  }
  let score = 0;
  let pos = 0;
  let streak = 0;
  for (const ch of q) {
    const found = l.indexOf(ch, pos);
    if (found === -1) return -1;
    streak = found === pos ? streak + 1 : 0;
    score += 12 + streak * 6 - found * 0.4;
    pos = found + 1;
  }
  return score - label.length * 0.1;
}

const DOCUMENT_STOPWORDS = new Set(['the', 'and', 'for', 'not', 'you', 'with', 'this', 'that', 'from', 'are', 'was', 'but', 'have', 'has', 'can', 'will', 'your', 'into', 'out', 'all', 'any', 'use', 'its', 'our', 'their', 'then', 'than', 'when', 'what', 'how', 'why', 'who', 'which', 'while', 'else', 'each', 'some', 'such', 'only', 'also', 'more', 'most', 'very', 'just', 'like', 'make', 'made', 'over', 'under', 'after', 'before']);

function documentWords(prefix) {
  if (!view) return [];
  const known = new Set([
    ...(SUGGESTIONS[language]?.items || []).map((entry) => entry.label),
    ...(SNIPPETS[language] || []).map((snippet) => snippet.label),
  ]);
  const query = prefix.toLowerCase();
  const seen = new Set();
  const words = [];
  for (const match of view.state.doc.toString().matchAll(/[A-Za-z_$][A-Za-z0-9_$]{2,}/g)) {
    const word = match[0];
    const lower = word.toLowerCase();
    if (lower === query || known.has(word) || seen.has(word) || DOCUMENT_STOPWORDS.has(lower)) continue;
    seen.add(word);
    words.push({ label: word, kind: 'variable', detail: 'this file', doc: 'Word from this challenge.' });
    if (words.length >= 40) break;
  }
  return words;
}

const snippetItemCache = new Map();

function snippetCompletionItems() {
  if (snippetItemCache.has(language)) return snippetItemCache.get(language);
  const items = (SNIPPETS[language] || []).map(({ label, body, detail }) => ({
    label,
    kind: 'snippet',
    detail: detail || 'snippet',
    doc: 'Inserts a code template. Tab moves between placeholders.',
    insert: body,
  }));
  snippetItemCache.set(language, items);
  return items;
}

const STRING_METHODS = new Set([
  'charAt', 'charCodeAt', 'at', 'includes', 'endsWith', 'indexOf', 'lastIndexOf',
  'padEnd', 'padStart', 'repeat', 'replace', 'replaceAll', 'slice', 'split',
  'startsWith', 'substring', 'toLowerCase', 'toUpperCase', 'trim', 'trimEnd',
  'trimStart', 'match', 'matchAll', 'search',
]);

const ARRAY_METHODS = new Set([
  'at', 'concat', 'copyWithin', 'entries', 'every', 'fill', 'filter', 'find',
  'findIndex', 'findLast', 'findLastIndex', 'flat', 'flatMap', 'forEach',
  'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'map', 'pop', 'push',
  'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort',
  'splice', 'unshift', 'values',
]);

const ARRAY_NAMES = /^(arr|array|arrays|nums|numbers|list|items|values|elements|data|result|results|words|chars|letters|rows|entries)$/i;

function receiverOf(text) {
  const trimmed = text.replace(/\s+$/, '');
  if (/(?:'[^']*'|"[^"]*"|`[^`]*`)$/.test(trimmed)) return 'string';
  if (/\]$/.test(trimmed)) return 'array';
  if (/\}$/.test(trimmed)) return 'object';
  const name = trimmed.match(/([A-Za-z_$][A-Za-z0-9_$]*)$/);
  if (!name) return 'unknown';
  if (ARRAY_NAMES.test(name[1])) return 'array';
  return 'unknown';
}

function rankItems(prefix, member, receiver = 'unknown') {
  const all = [...snippetCompletionItems(), ...(SUGGESTIONS[language]?.items || []), ...documentWords(prefix)];
  const memberKinds = new Set(['method', 'property', 'function', 'class']);
  const pool = member ? all.filter((entry) => memberKinds.has(entry.kind)) : all;
  const scored = [];
  for (const entry of pool) {
    let score = fuzzyScore(prefix, entry.label);
    if (score < 0) continue;
    if (member) {
      if (entry.kind === 'method') score += 260;
      const tail = entry.label.slice(entry.label.lastIndexOf('.') + 1);
      if (prefix && tail.toLowerCase().startsWith(prefix.toLowerCase())) score += 900;
      if (receiver === 'string' && STRING_METHODS.has(tail)) score += 220;
      if (receiver === 'array' && ARRAY_METHODS.has(tail)) score += 220;
    }
    scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score
    || (KIND_RANK[a.entry.kind] ?? 9) - (KIND_RANK[b.entry.kind] ?? 9)
    || a.entry.label.length - b.entry.label.length);
  return scored.slice(0, 10).map((row) => row.entry);
}

function completionContext() {
  if (!view) return null;
  const selection = view.state.selection.main;
  if (!selection.empty) return null;
  const head = selection.head;
  const line = view.state.doc.lineAt(head);
  const before = view.state.doc.sliceString(line.from, head);
  const match = before.match(/[A-Za-z_$][A-Za-z0-9_$?!]*$/);
  const prefix = match ? match[0] : '';
  const member = !prefix && /\.\s*$/.test(before) || (!!prefix && /\.[A-Za-z_$][A-Za-z0-9_$?!]*$/.test(before));
  const target = member ? before.slice(0, before.length - prefix.length).replace(/\.\s*$/, '') : '';
  const receiver = member ? receiverOf(target) : 'unknown';
  return { head, prefix, member, receiver };
}

function updateCompletion(force = false) {
  if (!state.completions || !view || (snippetSession && !force)) {
    hideCompletion();
    return;
  }
  const context = completionContext();
  if (!context) {
    hideCompletion();
    return;
  }
  const { prefix, member, receiver } = context;
  if (!force && !member && prefix.length < 2) {
    hideCompletion();
    return;
  }
  const items = rankItems(prefix, member, receiver);
  if (!items.length) {
    hideCompletion();
    return;
  }
  showCompletion(prefix, items);
}

function updateGhost(prefix, entry) {
  if (!prefix || !entry || entry.kind === 'snippet') {
    hideGhost();
    return;
  }
  const lower = entry.label.toLowerCase();
  const query = prefix.toLowerCase();
  if (lower.startsWith(query) && entry.label.length > prefix.length) {
    showGhost(entry.label.slice(prefix.length));
  } else {
    hideGhost();
  }
}

function showCompletion(prefix, items) {
  if (!completionHost) createCompletionHost();
  completionItems = items;
  completionPrefix = prefix;
  completionIndex = 0;
  completionHost.hidden = false;
  renderCompletion();
  positionCompletion();
  updateGhost(prefix, items[0]);
}

function appendHighlighted(container, label, query) {
  if (!query) {
    container.textContent = label;
    return;
  }
  const lowerLabel = label.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const indices = [];
  let pos = 0;
  for (const ch of lowerQuery) {
    const found = lowerLabel.indexOf(ch, pos);
    if (found === -1) break;
    indices.push(found);
    pos = found + 1;
  }
  if (!indices.length) {
    container.textContent = label;
    return;
  }
  const hits = new Set(indices);
  let buffer = '';
  for (let i = 0; i < label.length; i += 1) {
    if (hits.has(i)) {
      if (buffer) {
        container.append(document.createTextNode(buffer));
        buffer = '';
      }
      const span = document.createElement('span');
      span.className = 'hit';
      span.textContent = label[i];
      container.append(span);
    } else {
      buffer += label[i];
    }
  }
  if (buffer) container.append(document.createTextNode(buffer));
}

function renderCompletion() {
  const rows = completionItems.map((entry, index) => {
    const row = document.createElement('div');
    row.className = 'item';
    row.dataset.index = String(index);
    row.dataset.active = String(index === completionIndex);
    row.setAttribute('role', 'option');
    row.setAttribute('aria-selected', String(index === completionIndex));

    const badge = document.createElement('span');
    badge.className = `kind kind-${entry.kind}`;
    badge.textContent = KIND_BADGE[entry.kind] || '•';
    badge.title = entry.kind;

    const label = document.createElement('span');
    label.className = 'label';
    appendHighlighted(label, entry.label, completionPrefix);

    const detail = document.createElement('span');
    detail.className = 'detail';
    detail.textContent = entry.detail || '';

    row.append(badge, label, detail);
    return row;
  });
  completionList.replaceChildren(...rows);
  renderDocs();
  completionList.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
}

function renderDocs() {
  const entry = completionItems[completionIndex];
  if (!entry || (!entry.detail && !entry.doc)) {
    completionDocs.hidden = true;
    return;
  }
  completionDocs.hidden = false;
  completionDocs.querySelector('.docs-title').textContent = entry.detail || entry.label;
  const body = completionDocs.querySelector('.docs-body');
  body.textContent = entry.doc || '';
  body.hidden = !entry.doc;
}

function setCompletionIndex(index, scroll = true) {
  if (!completionItems.length) return;
  completionIndex = (index + completionItems.length) % completionItems.length;
  completionList.querySelectorAll('.item').forEach((row, i) => {
    const active = i === completionIndex;
    row.dataset.active = String(active);
    row.setAttribute('aria-selected', String(active));
  });
  renderDocs();
  updateGhost(completionPrefix, completionItems[completionIndex]);
  if (scroll) completionList.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
}

function positionCompletion() {
  if (!view || !completionHost || completionHost.hidden) return;
  const coords = view.coordsAtPos(view.state.selection.main.head);
  if (!coords) return;
  const rect = completionHost.getBoundingClientRect();
  const width = rect.width || 340;
  const height = rect.height || 260;
  const left = Math.max(8, Math.min(coords.left, window.innerWidth - width - 8));
  let top = coords.bottom + 6;
  if (top + height > window.innerHeight - 8) top = Math.max(8, coords.top - height - 6);
  completionHost.style.left = `${left}px`;
  completionHost.style.top = `${top}px`;
}

function hideCompletion() {
  if (completionHost) completionHost.hidden = true;
  completionList?.replaceChildren();
  hideGhost();
  completionItems = [];
  completionPrefix = '';
  completionIndex = 0;
}

function acceptCompletion() {
  if (!view || !completionItems.length) return;
  const entry = completionItems[completionIndex];
  const selection = view.state.selection.main;
  const from = selection.head - completionPrefix.length;
  applySnippet(from, selection.head, entry.insert || entry.label);
  hideCompletion();
  view.focus();
}

function repositionOverlays() {
  if (completionHost && !completionHost.hidden) positionCompletion();
  if (ghostHost && !ghostHost.hidden) positionGhost();
}

function allCommands() {
  return [
    { label: 'Use Edabit theme', detail: 'Appearance', run: () => setTheme('default') },
    { label: 'Use Midnight theme', detail: 'Appearance', run: () => setTheme('dark') },
    { label: 'Increase font size', detail: `${state.fontSize}px`, run: () => stepFontSize(1) },
    { label: 'Decrease font size', detail: `${state.fontSize}px`, run: () => stepFontSize(-1) },
    { label: 'Reset font size', detail: '15px', run: () => setFontSize(15) },
    { label: state.completions ? 'Disable word completion' : 'Enable word completion', detail: state.completions ? 'On' : 'Off', run: () => setCompletions(!state.completions) },
    { label: state.smooth ? 'Disable smooth typing' : 'Enable smooth typing', detail: state.smooth ? 'On' : 'Off', run: () => setSmooth(!state.smooth) },
    { label: 'Go to line…', detail: 'Navigation', run: () => startGoto() },
    { label: 'Show snippets panel', detail: 'Editor', run: () => togglePanel(true) },
    { label: 'Reset all settings', detail: 'Editor', run: () => resetAll() },
  ];
}

function renderPalette(query) {
  if (!paletteResults) return;
  if (paletteMode === 'goto') {
    paletteCommands = [];
    paletteIndex = 0;
    const hint = document.createElement('div');
    hint.className = 'empty';
    hint.textContent = 'Type a line number and press Enter.';
    paletteResults.replaceChildren(hint);
    return;
  }
  const normalized = query.trim();
  const commands = allCommands();
  let entries;
  if (!normalized) {
    entries = commands.map((command) => ({ command, score: 1 }));
  } else {
    entries = [];
    for (const command of commands) {
      const labelScore = fuzzyScore(normalized, command.label);
      const detailScore = fuzzyScore(normalized, command.detail || '');
      const score = Math.max(labelScore, detailScore >= 0 ? detailScore * 0.35 : -1);
      if (score >= 0) entries.push({ command, score });
    }
    entries.sort((a, b) => b.score - a.score);
  }
  paletteCommands = entries.map((entry) => entry.command);
  if (paletteIndex >= paletteCommands.length) paletteIndex = Math.max(0, paletteCommands.length - 1);
  if (!paletteCommands.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No matching commands';
    paletteResults.replaceChildren(empty);
    return;
  }
  const rows = paletteCommands.map((command, index) => {
    const row = document.createElement('div');
    row.className = 'item';
    row.dataset.index = String(index);
    row.dataset.active = String(index === paletteIndex);
    row.setAttribute('role', 'option');
    row.setAttribute('aria-selected', String(index === paletteIndex));
    const label = document.createElement('span');
    label.className = 'label';
    appendHighlighted(label, command.label, normalized);
    const detail = document.createElement('span');
    detail.className = 'detail';
    detail.textContent = command.detail || '';
    row.append(label, detail);
    return row;
  });
  paletteResults.replaceChildren(...rows);
  paletteResults.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
}

function setPaletteIndex(index) {
  if (!paletteCommands.length) return;
  paletteIndex = (index + paletteCommands.length) % paletteCommands.length;
  paletteResults.querySelectorAll('.item').forEach((row, i) => {
    const active = i === paletteIndex;
    row.dataset.active = String(active);
    row.setAttribute('aria-selected', String(active));
  });
  paletteResults.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
}

function startGoto() {
  paletteHost.hidden = false;
  paletteMode = 'goto';
  paletteIndex = 0;
  paletteInput.value = '';
  paletteInput.placeholder = 'Go to line…';
  renderPalette('');
  requestAnimationFrame(() => paletteInput.focus());
}

function runPaletteSelection() {
  if (paletteMode === 'goto') {
    const lineNumber = Number.parseInt(paletteInput.value.trim(), 10);
    if (view && Number.isFinite(lineNumber)) {
      const line = view.state.doc.line(Math.min(Math.max(lineNumber, 1), view.state.doc.lines));
      view.dispatch({ selection: { anchor: line.from } });
    }
    togglePalette(false);
    return;
  }
  const command = paletteCommands[paletteIndex];
  togglePalette(false);
  command?.run();
}

function createPalette() {
  paletteHost = document.createElement('div');
  paletteHost.id = 'edabit-ide-palette';
  paletteHost.hidden = true;
  const shadow = paletteHost.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host { all: initial; position: fixed; inset: 0; z-index: 2147483647; }
      :host([hidden]) { display: none !important; }
      * { box-sizing: border-box; }
      .backdrop { position: absolute; inset: 0; background: rgba(2, 6, 12, .42); }
      .box { position: relative; width: min(560px, 92vw); margin: 12vh auto 0; border: 1px solid #333d4d; border-radius: 12px; background: #151a23; box-shadow: 0 24px 70px rgba(0,0,0,.55); overflow: hidden; animation: edx-palette-in 110ms ease-out; font: 13px/1.4 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #dbe4f0; }
      @keyframes edx-palette-in { from { opacity: 0; transform: translateY(-6px) scale(.99); } to { opacity: 1; transform: none; } }
      .input { display: block; width: 100%; border: 0; border-bottom: 1px solid #28313f; background: transparent; color: #e8eef7; font: 14px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; padding: 13px 15px; outline: none; }
      .input::placeholder { color: #6f7d91; }
      .results { max-height: 320px; overflow: auto; padding: 5px; scrollbar-width: thin; }
      .item { display: flex; align-items: center; gap: 10px; border-radius: 6px; padding: 7px 9px; cursor: pointer; }
      .item[data-active="true"], .item:hover { background: #253145; color: #fff; }
      .label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .label .hit { color: #7ee787; font-weight: 700; }
      .detail { flex: 0 0 auto; color: #7f8da3; font-size: 11px; }
      .empty { padding: 14px; color: #7f8da3; }
      .foot { display: flex; gap: 14px; border-top: 1px solid #28313f; padding: 7px 10px; color: #6f7d91; font-size: 10px; }
      .foot b { color: #9fb0c8; font-weight: 600; }
    </style>
    <div class="backdrop"></div>
    <div class="box">
      <input class="input" type="text" spellcheck="false" placeholder="Type a command…">
      <div class="results"></div>
      <div class="foot"><span><b>↑↓</b> navigate</span><span><b>↵</b> run</span><span><b>esc</b> close</span></div>
    </div>`;
  paletteInput = shadow.querySelector('.input');
  paletteResults = shadow.querySelector('.results');

  paletteInput.addEventListener('input', () => renderPalette(paletteInput.value));
  paletteInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      togglePalette(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      setPaletteIndex(paletteIndex + (event.key === 'ArrowDown' ? 1 : -1));
      return;
    }
    if (event.key === 'PageDown' || event.key === 'PageUp') {
      event.preventDefault();
      event.stopPropagation();
      setPaletteIndex(paletteIndex + (event.key === 'PageDown' ? 5 : -5));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      runPaletteSelection();
    }
  });
  shadow.querySelector('.backdrop').addEventListener('mousedown', (event) => {
    event.preventDefault();
    togglePalette(false);
  });
  paletteResults.addEventListener('mousemove', (event) => {
    const row = event.target.closest('.item');
    if (!row) return;
    const index = Number(row.dataset.index);
    if (index !== paletteIndex) setPaletteIndex(index);
  });
  paletteResults.addEventListener('mousedown', (event) => {
    const row = event.target.closest('.item');
    if (!row) return;
    event.preventDefault();
    paletteIndex = Number(row.dataset.index);
    runPaletteSelection();
  });
  document.documentElement.append(paletteHost);
}

function togglePalette(force) {
  if (!paletteHost) createPalette();
  const open = typeof force === 'boolean' ? force : paletteHost.hidden;
  paletteHost.hidden = !open;
  if (!open) {
    view?.focus();
    return;
  }
  hideCompletion();
  endSnippet();
  paletteMode = 'command';
  paletteIndex = 0;
  paletteInput.value = '';
  paletteInput.placeholder = 'Type a command…';
  renderPalette('');
  requestAnimationFrame(() => paletteInput.focus());
}

function onEditorKeyDown(event) {
  if (!event.target?.closest?.('.cm-content')) return;
  if (event.code === 'Space' && (event.ctrlKey || event.metaKey) && !event.altKey) {
    if (!view) return;
    event.preventDefault();
    event.stopPropagation();
    updateCompletion(true);
    return;
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    requestAnimationFrame(() => updateCompletion());
    return;
  }
  const completionOpen = completionHost && !completionHost.hidden && completionItems.length;
  if (!completionOpen) {
    if (event.key === 'Tab' && event.shiftKey) {
      endSnippet();
      return;
    }
    if (event.key === 'Tab' && advanceSnippet()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Escape'].includes(event.key)) {
      endSnippet();
    }
    return;
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    event.stopPropagation();
    setCompletionIndex(completionIndex + (event.key === 'ArrowDown' ? 1 : -1));
    return;
  }
  if (event.key === 'PageDown' || event.key === 'PageUp') {
    event.preventDefault();
    event.stopPropagation();
    setCompletionIndex(completionIndex + (event.key === 'PageDown' ? 5 : -5));
    return;
  }
  if (event.key === 'Enter' || event.key === 'Tab') {
    event.preventDefault();
    event.stopPropagation();
    acceptCompletion();
    return;
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    hideCompletion();
    return;
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
    hideCompletion();
    endSnippet();
  }
}

function refreshEditor(target) {
  const content = target?.closest?.('.cm-content');
  const foundView = content?.cmTile?.root?.view;
  if (!foundView) return null;
  view = foundView;
  editorEl = content.closest('.cm-editor');
  editorContent = content;
  return content;
}

function sync() {
  const found = findEditor();
  if (!found) {
    if (host) host.hidden = true;
    hideCompletion();
    view = null;
    editorEl = null;
    return;
  }

  const editorChanged = found.editor !== editorEl;
  view = found.view;
  editorEl = found.editor;
  editorContent = found.content;

  if (!host) createToolbar();
  host.hidden = false;

  const nextLanguage = detectLanguage();
  if (editorChanged || nextLanguage !== language) {
    host.__updateLanguage?.(nextLanguage);
    hideCompletion();
  }

  applySettings(editorChanged);
  if (state.open) syncControls();
}

document.addEventListener('input', (event) => {
  if (event.isComposing) return;
  if (!refreshEditor(event.target)) return;
  requestAnimationFrame(() => updateCompletion());
}, true);

document.addEventListener('compositionend', (event) => {
  if (!refreshEditor(event.target)) return;
  requestAnimationFrame(() => updateCompletion());
}, true);

document.addEventListener('beforeinput', (event) => {
  if (event.isComposing) return;
  if (!refreshEditor(event.target)) return;
  requestAnimationFrame(() => updateCompletion());
}, true);

document.addEventListener('keyup', (event) => {
  if (event.isComposing) return;
  const key = event.key;
  const undoOrRedo = (event.ctrlKey || event.metaKey) && ['z', 'y'].includes(key.toLowerCase());
  if (key !== 'Backspace' && key !== 'Delete' && !undoOrRedo) return;
  if (!refreshEditor(event.target)) return;
  if (undoOrRedo) endSnippet();
  requestAnimationFrame(() => updateCompletion());
}, true);

document.addEventListener('focusin', (event) => {
  if (!refreshEditor(event.target)) return;
  applySettings(true);
}, true);

document.addEventListener('mousedown', (event) => {
  if (event.target?.closest?.('.cm-content')) {
    hideCompletion();
    endSnippet();
  }
}, true);

window.addEventListener('keydown', (event) => {
  const mod = event.ctrlKey || event.metaKey;
  const letter = event.key.toLowerCase();
  if (mod && event.shiftKey && !event.altKey && letter === 'p') {
    if (!host || host.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    togglePalette();
    return;
  }
  if (mod && event.shiftKey && !event.altKey && letter === 'e') {
    if (!host || host.hidden) return;
    event.preventDefault();
    togglePanel();
    return;
  }
  if (paletteHost && !paletteHost.hidden) return;
  onEditorKeyDown(event);
}, true);

window.addEventListener('resize', repositionOverlays);
window.addEventListener('scroll', repositionOverlays, true);
window.addEventListener('blur', hideCompletion);
document.addEventListener('mousedown', (event) => {
  if (!completionHost || completionHost.hidden) return;
  const path = event.composedPath();
  if (path.includes(completionHost) || path.includes(editorContent)) return;
  hideCompletion();
}, true);

loadSettings();
sync();
setInterval(sync, 700);
})();
