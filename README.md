# jcc_ipfs

接口文档：https://www.showdoc.cc/ipfs?page_id=4160536662548180 (key:ipfs.io)

    
## 流程概述
1. client端发出写文件请求，包含了请求用户SWTC的公钥，以及用用户私钥加密过的要保存的数据。
2. IPFS服务端根据公钥推出swtc账号，判断是否到指定账号充值，如无充值或者不够，返回lackMoney的标示。
3. 如果充值用户正确，则保存数据，并返回hashId，及success 标识


## 接口详细说明

**1.write 向IPFS写入数据**

**简要描述：** 

- 向IPFS写入数据

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|data 	  |是  |string |上传数据 |
|md5 |是  |string | 上传数据md5    |
|size     |是  |int | 文件大小    |
|name     |是  |string | 文件名称    |
|sign     |是  |string | 签名 sign的计算 sign(md5+size+name+timestamp,privatekey)   |
|timestamp     |是  |int | 时间戳    |
|publickey     |是  |string | 公钥    |

 **返回示例**

``` 
{
	"result": [
		{
            "transaction": "11111111111",
            "hash": "111111111111111111"
        }
    ],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|transaction |string   |返回在区块链上的交易哈希，当交易不存在时返回0哈希  |
|hash |string   |返回该token的唯一的哈希  |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述


**2.sync 判断数据同步**

**简要描述：** 

- 判断数据是否真正上传成功

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|hash 	  |是  |string |执行write返回的hash |

 **返回示例**

``` 
{
	"result": [
		{
            object    //交易内容
        }
    ],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|object |string   |返回在区块链上的交易 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

**3.read 根据hash读取IPFS数据**

**简要描述：** 

- 根据hash读取IPFS数据

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|hash 	  |是  |string |执行write返回的hash |

 **返回示例**

``` 
{
	"result": [
		{
            data:"1111",
			md5:"1111",
			size:0,
			name:"1111"
			sign:"",
			timestamp:123546897,
			publickey:"1111"
        }
    ],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|data 	  |是  |string |上传数据 |
|md5 |是  |string | 上传数据md5    |
|size     |是  |int | 文件大小    |
|name     |是  |string | 文件名称    |
|sign     |是  |string | 签名 sign的计算 sign(md5+size+name+timestamp,privatekey)   |
|timestamp     |是  |int | 时间戳    |
|publickey     |是  |string | 公钥    |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

**4.remove 根据hash删除IPFS数据**

**简要描述：** 

- 根据hash删除IPFS数据

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|hash 	  |是  |string |执行write返回的hash |

 **返回示例**

``` 
{
	"result": [
		"transaction": "11111111111",
	],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|transaction 	  |是  |string |返回在区块链上的交易哈希，当交易不存在时返回0哈希 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

**5.update 根据hash修改IPFS数据**

**简要描述：** 

- 根据hash修改IPFS数据

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|hash 	  |是  |string |执行write返回的hash |
|data 	  |是  |string |上传数据 |
|md5 |是  |string | 上传数据md5    |
|size     |是  |int | 文件大小    |
|name     |是  |string | 文件名称    |
|sign     |是  |string | 签名 sign的计算 sign(md5+size+name+timestamp,privatekey)   |
|timestamp     |是  |int | 时间戳    |
|publickey     |是  |string | 公钥    |
 **返回示例**

``` 
{
	"result": [
		"transaction": "11111111111",
	],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|transaction 	  |是  |string |返回在区块链上的交易哈希，当交易不存在时返回0哈希 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

**6.list 根据钱包地址查询IPFS所有数据**

**简要描述：** 

- 根据钱包地址查询IPFS所有数据

**请求URL：** 
- ` http://localhost:7545/v1/jsonrpc `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|address 	  |是  |string |钱包地址 |

 **返回示例**

``` 
{
	"result": [
        {
			data:"1111",
			md5:"1111",
			size:0,
			name:"1111"
			sign:"",
			timestamp:123546897,
			publickey:"1111",
		},
		...
    ],
    "status": "success"//分为：success:成功； lackoil ：缺少燃料；error: 未知错误
}
```

 **返回参数说明** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|list 	  |是  |string |上传数据集合 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述
