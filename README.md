<a name="zFQNE"></a>
## 简介
`medusa-router` 对官方接口进行了封装增强，让你能以更加优雅的方式读取和使用路由。它相较于官方接口 **更加容易记忆** 并且 **路由参数能够保持原有的数据类型**。 `medusa-router` 被设计为可以在各类小程序当中使用的 SDK，目前已经在微信、百度、支付宝、Taro、uni-app 框架上测试通过。
<a name="g31HU"></a>
## 快速上手
<a name="pFN0F"></a>
### 安装
在支持 npm 包管理工具的项目中，你可以通过以下命令下载 `medusa-router` 。如果你的项目不支持的话，请访问 [medusa-router](https://github.com/Oc-master/medusa-router) 将 dist 文件夹中的文件拷贝到你的项目中。
```shell
$ npm install @medusa/medusa-router
```
<a name="tp8sF"></a>
### 使用
`medusa-router` 被设计为单例模式，假设你在多个文件中做初始化操作时也不需要担心创建多个实例。为了方便使用我们可以将实例化对象赋值到 app 实例的属性上。
```javascript
/**
 * /app.js
 */
import Router from './utils/router';

App({
	ms: new Router(wx),
});
```
```javascript
/**
 * /pages/index/index.js or <script>
 *
 * 当前路径：/pages/index/index?id=1
 */
const app = getApp();

Page({
   onLoad() {
      const { fullPath, query } = app.ms.$route;
      console.log(fullPath, query); // '/pages/index/index' { id: 1 }
   },
   onClick() {
      app.ms.push({
         url: '/pages/logs/logs',
         query: {
            num: 0, // number
            bool: true, // boolean
         },
         success: () => {
      	   console.log('success');
         },
      });
   },
});
```
<a name="hmLwZ"></a>
## $route 对象
`ms.$route` 对象包含当前页面的信息，该对象包含 `getCurrentPages()` API 获取的页面栈中最顶层的页面信息和扩充属性 `fullPath` 和 `query` 。

- `{String} fullPath` - 页面完整路径，不包含参数
- `{Object} query` - 路由参数，其中的属性保留原有的数据类型
<a name="nIYxJ"></a>
## API 说明
<a name="KWALC"></a>
### getPage()

- 说明：获取当前页面信息，相当于使用 `getCurrentPages()` API 获取页面栈中最顶层的页面；
<a name="icqz2"></a>
### push(options)

- 参数
   - `{Object} options`
   - `{String} options.url` - 目标页面路径
   - `{Object} [options.query]` - 路由参数
   - `{Object} [options.events]` - 页面通信接口
   - `{Function} [options.success]` - 成功时回调函数
   - `{Function} [options.fail]` - 失败时回调函数
   - `{Function} [options.complete]` - 结束时回调函数
- 说明：
   - 跳转至目标页面，与小程序的 `navigateTo(...)` API 具有相同的功能；
<a name="YIxus"></a>
### replace(options)

- 参数
   - `{Object} options`
   - `{String} options.url` - 目标页面路径
   - `{Object} [options.query]` - 路由参数
   - `{Boolean} [options.closeAll = false]` - 控制是否关闭当前路由栈中存在的所有页面
   - `{Function} [options.success]` - 成功时回调函数
   - `{Function} [options.fail]` - 失败时回调函数
   - `{Function} [options.complete]` - 结束时回调函数
- 说明：
   - 跳转至目标页面并且关闭当前页面，与小程序的 `redirectTo(...)` API 具有相同的功能；
   - 当 `options.closeAll` 参数为 `true` 时，将跳转至目标页面并且关闭路由栈中所有页面，相当于小程序的 `reLaunch(...)` API 的功能；
<a name="jtXC1"></a>
### switchTab(options)

- 参数
   - `{Object} options`
   - `{String} options.url` - tabBar 页面路径
   - `{Function} [options.success]` - 成功时回调函数
   - `{Function} [options.fail]` - 失败时回调函数
   - `{Function} [options.complete]` - 结束时回调函数
- 说明：
   - 跳转至目标页面，与小程序的 `navigateTo(...)` API 具有相同的功能；
<a name="XPvWi"></a>
### goBack(options)

- 参数
   - `{Object} [options]`
   - `{String} options.delta = 1` - 返回几层页面，默认值为 1
   - `{Function} [options.success]` - 成功时回调函数
   - `{Function} [options.fail]` - 失败时回调函数
   - `{Function} [options.complete]` - 结束时回调函数
- 说明：
   - 页面回退功能，与小程序的 `navigateBack(...)` API 具有相同的功能。该函数的参数是可选的，当不传入参数时默认返回到上一级页面；
<a name="KF0DL"></a>
### goHome()

- 说明：回到首页功能，清空路由栈；
<a name="L1tKK"></a>
### decoding(options)

- 参数
   - `{Object} options` - onLoad 生命周期函数的参数 options
- 返回值
   - `{Object} query` - 路由参数对象
- 说明：使用 `medusa-router` 路由功能时，路由参数具有保真功能，需要使用 `decoding(options)` 解析得到参数；
<a name="iGLbs"></a>
## 增强功能说明
<a name="WvOnZ"></a>
### 路由参数保真功能

- `medusa-router` 中提供的跳转功能均支持原生的传参方式，使用该方式得到的路由参数的值均为字符串类型；
- 使用 `push` 和 `replace` 功能时，运用 `query` 属性传递参数能够 **保持原有的数据类型** 。在目标页面当中需使用 `$route.query` 对象或者调用 `decoding(options)` API 才能获取正确的路由参数；
<a name="si9BH"></a>
### API 传参简化

- 具有跳转功能的 API 如果不需要传递路由参数和回调函数时，可以 **直接传递目标页面路径字符串** 作为参数；
- `goBack(options)` 回退功能不需要使用回调函数时，可以直接将 **回退页面层级** 作为参数；
```javascript
/* 跳转功能 */
ms.push('/pages/logs/logs');

/* 回退功能 */
ms.goBack(2);
```
