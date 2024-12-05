# Prettier 基本介绍

Prettier[https://prettier.io/docs/en/install] 是一款流行的代码格式化工具，旨在通过一致的代码风格提高代码可读性和开发效率。它支持多种编程语言和框架，提供无感知的自动化格式化功能。

1. Prettier 的特点
   1. 一致性
      无论团队中开发者的个人偏好如何，Prettier 确保代码的风格一致。
      它覆盖了 缩进、换行、分号、引号 等常见格式问题。
   2. 自动化
      Prettier 自动格式化代码，开发者无需手动调整格式。
      可集成到 Git Hooks、CI/CD 流程或 IDE 中，实现实时格式化。
   3. 无需配置
      开箱即用的默认配置，适用于大多数场景。
      同时支持通过 .prettierrc 文件自定义格式规则。
   4. 支持多种语言
      JavaScript / TypeScript
      CSS / SCSS / LESS
      HTML / Vue / Angular
      Markdown / JSON / YAML 等。
2. Prettier 的优缺点
   优点
   提高效率：开发者专注于编写逻辑，格式问题交给 Prettier。
   团队协作友好：消除团队成员之间的代码风格差异。
   自动修复：一键修复格式问题，无需手动调整。

   缺点
   限制灵活性：对格式化规则的定制支持有限。
   覆盖所有代码：无法仅格式化特定代码片段（必须格式化整个文件）。

## 配置 Prettier

1. 配置文件
   Prettier 支持多种配置文件格式：

- .prettierrc（JSON 或 YAML 格式）
- .prettierrc.js（JavaScript 文件）
- prettier.config.js（JavaScript 文件）
- package.json 中的 prettier 字段。

> 项目根目录下创建 **.prettierrc** 配置：

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

- 配置项说明

  | 配置项        | 默认值  | 说明                                        |
  | ------------- | ------- | ------------------------------------------- |
  | semi          | true    | 是否使用分号结尾。                          |
  | singleQuote   | false   | 是否使用单引号。                            |
  | printWidth    | 80      | 每行最大字符数，超出会自动换行。            |
  | tabWidth      | 2       | 缩进的空格数                                |
  | trailingComma | "none"  | 尾随逗号选项：none、es5、all。              |
  | arrowParens   | "avoid" | 箭头函数参数是否强制加括号：always、avoid。 |

```json
"scripts": {
        "format": "prettier --write ."
    },
```
