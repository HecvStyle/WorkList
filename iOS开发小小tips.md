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
 
##### 9.storyboard 自定义cell问题。
在**storyboard** 中对collectioncell做自定义，在cell中设置 Identifier 后不需要在对cell注册，以下代码不再需要  `self.collectionView!.registerClass(StudentShowcaseCell.self, forCellWithReuseIdentifier: reuseIdentifier)`，否则将无法按照storyboard中设计的样式来初始化，因为你用的是 Class 注册啊

##### 10.关于线程取消的问题
调用NSOperation 或者thread的 cancel方法， 并不是严格意义上的线程的取消，只是把该线程的cannelled属性标记为YES状态来表示该线程即将要退出。要实现取消功能，我们需要在线程的main函数中定期检查isCancelled状态来判断是否需要退出，当isCancelled为YES的时候，我们手动退出，如果我们没有在main中检查isCancelled状态，那么调用-(void)cancel;方法将毫无意义。NSOperation 是抽象类！！！

##### 11. 使用storyboard 搭建UI连接 action的时候，出现 “Could not insert new outlet connection: Could not find any information for the class named”问题    
可以clear 一下工程，然后去删掉Derived Data，或者删除对应类在项目中的引用，然后重新添加类文件。

##### 12.[即使使用atomic 也是不安全的](http://mrpeak.cn/blog/ios-thread-safety/)
在属性中使用atomic 进行修饰，启示只是修饰了 对应的get 和 set方法。而在多线程中，但线程的执行并不一定会按照代码的书写逻辑，不如有连着的两个for 循环，其中一个写，另一个读，就完成可能造成数据不一致。如果要保证一直，应该对执行代码做锁操作保证执行顺序。

##### 13、弱引用实现原理
弱引用的实现原理是这样，系统对于每一个有弱引用的对象，都维护一个表来记录它所有的弱引用的指针地址。这样，当一个对象的引用计数为 0 时，系统就通过这张表，找到所有的弱引用指针，继而把它们都置成 nil。这意味着有系统的开销，不可盲目使用，不然对象对象创建后就销毁了，不利于重用。

##### 14、pod私有库制作问题
1、所有spec 文件应该在一个公有仓库，需要同步到 repo 中去，这样在执行 pod install & update 时候才能拉到最新tag 的源码。   
2、开发状态可以通过主项目的podfile 配置不同的分支，或者指定本地环境，等稳定之后同步源码到私有仓库，并修改和同步对应的 spec到 公共仓库   
3、使用subspec 指定私有库等文件组织结构，可以参考AFNetworking

##### 15、[NSUserDefaults的 synchronize 方法调用问题](http://stackoverflow.com/questions/37485109/is-it-mandatory-to-call-nsuserdefaults-synchronize-method)    
简单说了就是如果考虑到一些特殊情况下的app退出，这个时候本来还在进行plist文件的写入，那么如果不调用s ynchronize（） 方法，可能出现的问题就是这部分写入的数据丢失。如果调用了，那么就可以保证写入的成功。所以**大多数情况**下，即使没有调用synchronize 方法，也没问题。BTW，NSUserDefaults本身是提供了锁处理，排除上面因素，我们可以直接调用读写操作并保证线程安全。
