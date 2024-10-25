# dronyss

项目描述

## 功能

- 检测文件更新并更新 `package.json` 中的依赖

## 安装

```sh
yarn add my-new-library
# OR
npm install my-new-library
```

## 使用

### Webpack

> **注意：**
>
> 不要忘记关闭 ES 模块转译以启用 tree-shaking！
>
> - babel: `{"modules": false}`
> - typescript: `{"module": "esnext"}`

```ts
// main.ts or main.js
import { Greeter } from 'my-new-library'

const mountPoint = document.getElementById('app')
const App = () => {
  const greeter = new Greeter('Stranger')
  return `<h1>${greeter.greet()}</h1>`
}
const render = (Root: Function, where: HTMLElement) => {
  where.innerHTML = Root()
}

render(App, mountPoint)
```

```html
<!-- index.htm -->
<html>
  <head>
    <script src="bundle.js" async></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### UMD/ES2015 模块支持的浏览器（无打包器）

```html
<html>
  <head>
    <script type="module">
      import { Greeter } from './node_modules/my-lib/esm2015/index.js'

      const mountPoint = document.querySelector('#root')

      const App = () => {
        const greeter = new Greeter('Stranger')
        return `<h1>${greeter.greet()}</h1>`
      }

      const render = (Root, where) => {
        where.innerHTML = Root()
      }

      render(App, mountPoint)
    </script>
    <script
      nomodule
      src="node_modules/my-lib/bundles/my-new-library.umd.min.js"
    ></script>
    <script nomodule async>
      var Greeter = MyLib.Greeter

      var mountPoint = document.querySelector('#root')

      var App = function() {
        var greeter = new Greeter('Stranger')
        return '<h1>' + greeter.greet() + '</h1>'
      }

      var render = function(Root, where) {
        where.innerHTML = Root()
      }

      render(App, mountPoint)
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 检测文件更新并更新依赖

要使用检测文件更新并更新 `package.json` 中依赖的新功能，请按照以下步骤操作：

1. 确保在 `package.json` 文件中有必要的脚本：

```json
"scripts": {
  "detect-updates": "node scripts/detect-updates.js"
}
```

2. 创建一个新文件 `scripts/detect-updates.js`，内容如下：

```js
const { FileParser } = require('../src/file-parser');
const { DependencyAnalyzer } = require('../src/dependency-analyzer');
const { DataStorage } = require('../src/data-storage');
const { updatePackageJsonDependencies } = require('../src/update-package-json-dependencies');

function detectFileUpdates() {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(); // 实现此函数以获取项目中的所有文件路径

  filePaths.forEach(filePath => {
    const fileContent = fileParser.parseFile(filePath);
    const dependencies = fileParser.extractDependencies(fileContent);
    dataStorage.addFileMetadata(filePath, fileContent);
    dataStorage.addDependencyInfo(filePath, dependencies);
  });

  const projectDependencies = dependencyAnalyzer.analyzeProjectDependencies(filePaths);
  const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);

  updatePackageJsonDependencies(externalDependencies);
}

function getFilePaths() {
  // 实现此函数以获取项目中的所有文件路径
  // 您可以使用类似 'glob' 的库来获取所有文件路径
  return [];
}

detectFileUpdates();
```

3. 运行脚本以检测文件更新并更新依赖：

```sh
yarn detect-updates
# OR
npm run detect-updates
```
