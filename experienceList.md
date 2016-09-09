###一些常见的问题列表，持续积累
##### 1. UIButton 使用xib 创建，频繁改变tittle 时候闪烁。将Button的type改为 custom。[看这里](http://stackoverflow.com/questions/18946490/how-to-stop-unwanted-uibutton-animation-on-title-change)

##### 2. 有些下载过来的demo，方法使用事例在单元测试中，记得为单元测试添加Cocoa Touch Testing Bundle。[看这里](http://stackoverflow.com/questions/31794989/cant-add-unit-tests-to-existing-ios-app)

##### 3. 使用MathQuill渲染数学公式的问题。因为需要用到jquery，于是在html的头部使用了 Google的jquery cdn，然后在模拟器上运行没有问题，因为模拟器用了iMac的穿墙网络。放到真机上不行，因为真机没有用穿墙网络！所以换个cdn。问题上通过启用Safari 的微博检查发现 jquery资源没有加载成功。

##### 4.cocoapod 不更新本地的库，只更新新添加的库命令：    
`pod update --verbose --no-repo-update`

##### 5. 使用AFNetworking 在做网络提交的时候，默认使用 form 方式提交，这样在请求体中，如果有数组会变成类似于这样的格式 
`book_name[]=一年级&book_name[]=上册`
如果数组中还包含有对象 例如 `data =[{questionId: 1467709995fckkjd, questionTypeId:1, subject:2}]` 将转换成 `data[][questionId]=1467709995fckkjd&data[][questionTypeId]=1&data[][subject]=2`   
而后台期望的方式却是json提交，所以这个问题解决方案就是改为json提交，上边转换后的格式就变成了类似的 ` "coursewares": [{
		"id": "1471939616ytscrb",
		"product_id": "1471940034afigyt"
	}]`    
	
##### 6.使用zsh作为shell终端时候，环境变量 .bash_profile 不会加载，而是会加载 .zshrc 这个配置文件，所以我们依然可以在 .bash_profile 配置环境变量，只是在 .zshrc 配置文件中使用 source命令，主动调用 . bash_profile ，使其设置的环境变量生效即可。

##### 7.使用Jenkins做自动集成，需要去掉“自动创建scheme”选项，因为Jenkins的Xcode插件并不会自动帮你创建，所以在构建过程中，出现scheme为空的情况

##### 8. 设置父视图透明而子视图不透明的处理
 `self.view.backgroundColor = [[UIColor whiteColor]colorWithAlphaComponent:0.7f];` 
 这句代码只是针对了view 的颜色给出了透明度，而不是针对view这个整体