# 便利小二-供应商服务系统
## Project setup
```
npm install

如果报错：unable to resolve dependency tree则执行 npm i --legacy-peer-deps
```

如果速度过慢可以使用淘宝源下载：

```
npm install --registry=https://registry.npm.taobao.org
```

### 首次拉取子模块 submodules
```
git submodule update --init --recursive
```

### 更新子模块 (适用于git 1.8.2及以上版本)
```
git submodule update --recursive --remote
```

### 更新子模块(适用于git 1.7.3及以上版本)
```
git submodule update --recursive
```
或者
```
git pull --recurse-submodules
```

## 使用文档
https://gfn0s2.yuque.com/books/share/a6f7f79a-8c79-4bce-b7bc-b68f624ba02e

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
