###一些常见的问题列表，持续积累
##### 1. UIButton 使用xib 创建，频繁改变tittle 时候闪烁。将Button的type改为 custom。[看这里](http://stackoverflow.com/questions/18946490/how-to-stop-unwanted-uibutton-animation-on-title-change)

##### 2. 有些下载过来的demo，方法使用事例在单元测试中，记得为单元测试添加Cocoa Touch Testing Bundle。[看这里](http://stackoverflow.com/questions/31794989/cant-add-unit-tests-to-existing-ios-app)

##### 3. 使用MathQuill渲染数学公式的问题。因为需要用到jquery，于是在html的头部使用了 Google的jquery cdn，然后在模拟器上运行没有问题，因为模拟器用了iMac的穿墙网络。放到真机上不行，因为真机没有用穿墙网络！所以换个cdn。问题上通过启用Safari 的微博检查发现 jquery资源没有加载成功。

##### 4.cocoapod 不更新本地的库，只更新新添加的库命令：    
`pod update --verbose --no-repo-update`