<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <title>阿拉蕾专用index</title>
    <link rel="stylesheet" href="script/layui-v2.6.8/layui/css/layui.css">
    <link rel="stylesheet" href="base.css">
    <script src="script/jquery-1.9.1/jquery-1.9.1.min.js"></script>
    <script src="script/layui-v2.6.8/layui/layui.js"></script>
    <script src="base.js"></script>
    <style>
        a:hover {
            color: beige;
            background-color: beige;
        }
        #footer{position:absolute;bottom:0;width:100%;height:100px;background-color: #f0ad4e;}
    </style>
</head>
<body background="网站素材/图片1.png">
<div>
    <div id="header" style="background-color: blanchedalmond;">
        <div id="nav" class="flex fyc w1300 cbox">
            <ul class="flex" style="font-size: 25px;font-family: 幼圆 ">
                <li><a href="index.php" class="inlineblock p8 tc black">首页</a></li>
                <li><a href="知识名片.php" class="inlineblock p8 tc black">知识名片</a></li>
                <li><a href="搭配组合.php" class="inlineblock p8 tc black">搭配组合</a></li>
                <li><a href="我来百搭.php" class="inlineblock p8 tc black">我来百搭</a></li>
            </ul>
        </div>
    </div>
    <div class="mt200">
        <form id="fm" action="" class=" layui-form w550 cbox " enctype="multipart/form-data">

            <div class="flex mt50">
                <label class="fmlabel" style="font-size: 25px;">账号</label>
                <input type="text" class="flex1 fminput" name="xingming" placeholder="" autocomplete="off">
            </div>
            <div class="flex mt50">
                <label class="fmlabel" style="font-size: 25px;">密码</label>
                <input type="password" class="flex1 fminput" name="mima" placeholder="" autocomplete="off">
            </div>
            <div class="flex mt50">
                <button class="layui-btn layui-btn-warm w440" lay-submit lay-filter="*">登录</button>
            </div>
    </div>

    </form></div>
<div id="footer" class=" mt2 tc lh32 p10 fz12 gray00" style="background-color: #FBEC88 ">
    <p>
        版权来源
    </p>
    <p>
        <span>首页背景图片：站酷网（ZCOOL）用户“小草棚”
</span> <span class="ml10"></span> 电话其他背景图片：小红书用户“木每三少”
        <span>汉服知识图片来源：小红书用户“汉服小纸条”
</span>
    </p>
</div>
</body>