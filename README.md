# nuxt-example

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

>assets 下边的文件不能够相互引入但是在 nuxt.config.js 文件里边有先后顺序，下边的可以执行上边的文件

### css配置公共资源（本项目使用scss）
> `nuxt.config.js` 下 `styleResources` 可配置 `asset` 全局样式。 如：
```
styleResources: {
    scss: [
      './assets/css/fun.scss', // 配置主题色
      './assets/css/resetVuetify.scss', // 重置框架Vuetify颜色
      './assets/css/color.scss', // 声明的颜色class
      './assets/css/font.scss', // 声明的字体大小 class
      './assets/css/space.scss', // 声明的间距class 如 margin padding line-height等
      './assets/css/common.scss', // 初始通用css如 html,body,input等修改浏览器默认样式
      './assets/css/main.scss' // 项目中用到的通用的css文件
    ]
  }

以上配置文件有执行顺序，执行顺序乱，则css编译出错
```
> 路由之间跳转逻辑处理可以以中间件配置实现。如：
```
 router: {
    middleware: ['device']
  }
```
> plugins/index.js 在本项目中用途类似单页面Vue项目中的main.js，其他用法自行百度。 插件配置。 如：
```
plugins: [
    '~/plugins/index.js'
  ]
```

>rem配置需要先安装 `postcss-px2rem` 然后下载 [flexible.js](http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js) 放在static文件下边:
```
head: {
    script: [
      { src: '/rem/flexible.js', type: 'text/javascript', charset: 'utf-8' }
    ]
  }

build: {
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
```
>全局配置文件处理，使用插件 `@nuxtjs/dotenv` 和 `cross-env`
>然后在nuxt.config.js文件里边配置 `dotenv`：
```$xslt
const env = require('dotenv').config({ path: '.env.' + process.env.BASE })
export default {
  env: env.parsed
}


然后在
package.json 打包和本地运行的时候添加  cross-env BASE=文件名字
.env.dev 为开发环境配置
.env.prod 为生产配置

就会自动配置本地配置文件如：
BASE=dev
则执行
.env.dev 配置文件
```

>store, axios 文件配置请参考nuxt官方文档本项目引入在 `plugins/index.js` 使用


### 服务器打包之后的配置 （参考）

#### nuxt.js 服务端部署
>1，我会上传 .nuxt static .env.dev .env.prod nuxt.config.js package.json 这些文件

>2，安装node，一般node安装好之后，会有npm ，如果感觉npm资源很慢，可以执行下面这个命令：npm install -g cnpm --registry=https://registry.npm.taobao.org（推荐）

>3，进入根目录 ，执行 cnpm/npm install

>4,部署nginx 反向代理

```
upstream nodenuxt {
    server 127.0.0.1:3000; #nuxt项目 监听端口
    keepalive 64;
}

server {
    listen 80;
    server_name  www.171tiyu.com;
    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://nodenuxt; #反向代理
    }
}
```
>5，在根目录执行npm run start 此时打开网址 就能够看到网站内容了

>6，但是根据第5步的操作，不能关闭命令行，关闭命令行网站就打不开了 所以需要做一个进程守护，官方推荐pm2

>7，如果使用pm2 需要在根目录下执行 pm2 start npm --name "sports-v-2" -- run start

### 注意点
>1.如果启用不了服务，有可能是启用ip的问题，nuxt默认启用的是127.0.0.1这个ip在本地没问题，但是在服务器上有可能就不太灵了，可以把ip换成0.0.0.0，这个ip会自动启用服务器真实ip。

>2.如果安装不了依赖，有可能是node版本问题，可以在服务器上通过node版本管理工具来切换node版本试试。

>3.这样部署的服务只能通过根域名来访问，既类似于127.0.0.1 类似于这样的访问路径，如果服务器根路径被占用的话就需要部署在二级路径，类似于 127.0.0.1/web/ 这样的访问方式，如果需要这样访问的话就需要在项目中配置baseurl

>[www.gxshuke.com](https://www.gxshuke.com) 这个是通过nuxt 方式部署的官网，点击可以查看详情





