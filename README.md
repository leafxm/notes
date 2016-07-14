# 生成便签页

示例：[http://leafxm.com/notes/](http://leafxm.com/notes/)

使用方法：

1. 引入notes.js文件
2. 使用new Note(target,text,color,className,keyObj,key);

参数解释：

1. target是生成的note元素的父元素，text是便签内容，color是便签颜色，className是给便签加的类名
2. key作为便签id，并作为localstorage的key值保存了便签的颜色和内容项，而keyObj报错了页面所存在的便签页的key值并存入localstorage。
3. 使用时可参考gh-pages分支的代码，如果不需要存入localstorage最后两项不传参。
