# 凤凰财经h5游戏-《狗年集福》


## 项目预览

![image.png](http://upload-images.jianshu.io/upload_images/1868855-2a00d3b08028ef2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
用手机微信扫一扫体验吧


## 项目需求
春节将至，类似于微信跳一跳集福的活动

## 项目跑起来
```
1. git clone https://github.com/dujuncheng/fenghuang-newyear-h5.git
2. cd newyear
3. npm install
4. npm run dev 
5. 浏览器手机模式打开 

```

## 项目难点
主要就是如何提高页面性能；
### 资源预加载

### 页面提升流畅性
具体可以参考我的笔记《让你的页面如此丝滑》
http://leanote.com/blog/post/59c25ce6ab64413a1c002349

其实就是使用 requestAnimateFrame（）来绘制下一帧，同时只修改元素的transform属性，增加will-change的css属性

