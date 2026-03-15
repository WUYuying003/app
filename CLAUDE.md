# Project: Claude ↔ Figma Webpage Builder

## 构想概述

一个双向工作流，让 Claude 和 Figma 协同完成网页设计与开发：

```
Claude 生成 HTML → 导入 Figma 细化设计 → 导出回 Claude → 生成最终网页
```

---

## 工作流步骤

### 第一步：Claude 生成初始 HTML
- 用户描述页面需求
- Claude 生成结构化的 HTML + CSS 原型
- 输出干净、语义化的 HTML 文件

### 第二步：HTML → Figma
- 使用 **HTML to Figma** 插件（或 Anima 插件）将 HTML 导入 Figma
- 在 Figma 中调整颜色、字体、间距、组件等视觉细节

### 第三步：Figma → Claude
- 从 Figma 导出修改后的设计（截图 / JSON / token）
- 将设计稿或 Figma token 提供给 Claude
- Claude 根据更新后的设计重新生成最终 HTML/CSS

---

## 推荐工具

| 工具 | 用途 |
|------|------|
| [HTML to Figma](https://www.figma.com/community/plugin/851183094275736358) | 将 HTML 页面导入 Figma |
| [Anima](https://www.animaapp.com/) | HTML ↔ Figma 双向转换 |
| [Figma Tokens](https://tokens.studio/) | 导出设计 token 给 Claude |
| [Figma Dev Mode](https://www.figma.com/dev-mode/) | 导出 CSS 代码给 Claude |

---

## 开发规范

- HTML 输出使用语义化标签
- CSS 使用 CSS 变量方便 token 替换
- 保持组件结构清晰，便于 Figma 映射
