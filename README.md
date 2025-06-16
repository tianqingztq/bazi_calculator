# 八字五行排盘工具 | Bazi (Eight Characters) Calculator

一个基于Vite的React应用的八字五行排盘工具，可以计算用户的八字、五行和十神。
A modern web application for calculating and analyzing Chinese Bazi (Eight Characters), Five Elements, and Ten Gods based on birth date and time.

网页链接 | Live Demo:
https://tubular-paprenjak-4af727.netlify.app/

_Tianqing's Vibe Coding Learning Journal._

## 功能特点 | Features

- 计算四柱八字（年柱、月柱、日柱、时柱）
  Calculate Four Pillars (Year, Month, Day, Hour Pillars)
- 显示天干地支对应的五行和阴阳属性
  Display Heavenly Stems and Earthly Branches with their corresponding Five Elements and Yin-Yang attributes
- 十神分析
  Ten Gods Analysis
- 五行统计及强弱分析
  Five Elements Statistics and Strength Analysis
- 易经智慧指南
  Comprehensive I Ching Wisdom Guide
  - 八字基础知识
    Bazi Basics
  - 五行相生相克关系
    Five Elements Relationships
  - 十神分析指南
    Ten Gods Analysis Guide
  - 取名推荐
    Naming Recommendations

## 技术栈 | Tech Stack

- 前端：React + TypeScript + Vite
  Frontend: React + TypeScript + Vite
- 样式：Tailwind CSS
  Styling: Tailwind CSS
- 八字计算：lunar-python
  Bazi Calculation: lunar-python
- 部署：Netlify
  Deployment: Netlify

## 本地安装和运行 | Local Development

```bash
# 安装依赖 | Install dependencies
npm install

# 启动开发服务器 | Start development server
npm run dev

# 构建项目 | Build for production
npm run build

# 预览构建后的项目 | Preview production build
npm run preview
```

## 项目结构 | Project Structure
bazi_calculator/
├── src/
│ ├── components/ # React components
│ ├── pages/ # Page components
│ ├── utils/ # Utility functions
│ └── types/ # TypeScript type definitions
├── public/ # Static assets
└── dist/ # Production build output

## 功能详解 | Features in Detail

### 八字计算 | Bazi Calculation
- 准确计算天干地支
  Accurate calculation of Heavenly Stems and Earthly Branches
- 支持公历和农历日期
  Support for both solar and lunar calendar dates
- 详细分析每个柱位
  Detailed analysis of each pillar

### 五行分析 | Five Elements Analysis
- 全面的五行统计
  Comprehensive Five Elements (Wu Xing) statistics
- 各元素强弱分析
  Strength analysis for each element
- 元素分布可视化
  Visual representation of element distribution

### 十神分析 | Ten Gods Analysis
- 详细的十神关系分析
  Detailed analysis of Ten Gods relationships
- 性格和人际关系洞察
  Personality and relationship insights
- 职业和人生道路指导
  Career and life path guidance

### 易经智慧指南 | I Ching Wisdom Guide
- 八字基础知识教育内容
  Educational content about Bazi basics
- 五行相生相克关系解释
  Five Elements relationships explanation
- 十神分析指南
  Ten Gods analysis guide
- 基于五行的取名推荐
  Naming recommendations based on Five Elements

## 贡献指南 | Contributing

欢迎贡献代码！请随时提交 Pull Request。
Contributions are welcome! Please feel free to submit a Pull Request.

## 许可证 | License

MIT License


## Reference

- [lunar-python](https://github.com/6tail/lunar-python) 用于八字计算 | for Bazi calculations
- [Tailwind CSS](https://tailwindcss.com) 用于样式设计 | for styling
- [Vite](https://vitejs.dev) 用于构建工具 | for build tooling



