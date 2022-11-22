# jekyll目录结构主要包含如下目录：
```
_posts 博客内容
_pages 其他需要生成的网页，如About页
_layouts 网页排版模板
_includes 被模板包含的HTML片段，可在_config.yml中修改位置
assets 辅助资源 css布局 js脚本 图片等
_data 动态数据
_sites 最终生成的静态网页
_config.yml 网站的一些配置信息
index.html 网站的入口
```
```
---
layout: post
title: "搭建Octopress"
tags: [Octopress]
categories: [Other]
---

---
theme :
  name : twitter
---
```
.
├── algorithms          # 算法
├── datastructures      # 数据结构
├── bases               # 计算机基础
├── distributed_systems # MIT 6.824 课程笔记
├── golang              # Go
├── php                 # PHP
├── pulsar              # pulsar MQ
├── libraries           # 一些轮子的设计文档
└── ...
## 1. 配置文件

在站点根目录中的_config.yml或_config.toml文件中指定
```
theme: jekyll-theme-cayman
baseurl: /blog5
permalink: /:year/:month/:day/:title
auto: true
markdown: rdiscount
```
默认配置
```
# Where things are
source              : .
destination         : ./_site
collections_dir     : .
plugins_dir         : _plugins
layouts_dir         : _layouts
data_dir            : _data
includes_dir        : _includes
sass:
  sass_dir: _sass
collections:
  posts:
    output          : true

# Handling Reading
safe                : false
include             : [".htaccess"]
exclude             : ["Gemfile", "Gemfile.lock", "node_modules", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/"]
keep_files          : [".git", ".svn"]
encoding            : "utf-8"
markdown_ext        : "markdown,mkdown,mkdn,mkd,md"
strict_front_matter : false

# Filtering Content
show_drafts         : null
limit_posts         : 0
future              : false
unpublished         : false

# Plugins
whitelist           : []
plugins             : []

# Conversion
markdown            : kramdown
highlighter         : rouge
lsi                 : false
excerpt_separator   : "\n\n"
incremental         : false

# Serving
detach              : false
port                : 4000
host                : 127.0.0.1
baseurl             : "" # does not include hostname
show_dir_listing    : false

# Outputting
permalink           : date
paginate_path       : /page:num
timezone            : null

quiet               : false
verbose             : false
defaults            : []

liquid:
  error_mode        : warn
  strict_filters    : false
  strict_variables  : false

# Markdown Processors
rdiscount:
  extensions        : []

redcarpet:
  extensions        : []

kramdown:
  auto_ids          : true
  entity_output     : as_char
  toc_levels        : [1, 2, 3, 4, 5, 6]
  smart_quotes      : lsquo,rsquo,ldquo,rdquo
  input             : GFM
  hard_wrap         : false
  footnote_nr       : 1
  show_warnings     : false
```
GitHub Pages网站的某些配置设置无法更改。
```
lsi: false
safe: true
source: [your repo's top level directory]
incremental: false
highlighter: rouge
gist:
  noscript: false
kramdown:
  math_engine: mathjax
  syntax_highlighter: rouge
```
默认情况下，Jekyll不会生成以下文件或文件夹：
```
位于名为/node_modules或的文件夹中/vendor
开始_，.或#
以 ~
被exclude配置文件中的设置排除
```
如果您希望Jekyll处理这些文件中的任何一个，则可以使用includes配置文件中的设置。

