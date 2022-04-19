const $$ = {};

/*克隆*/
$$.clone=function(arg){
    return JSON.parse(JSON.stringify(arg));
};

$$.eval=function(arg){
    return eval('('+arg+')');
};

$.ajaxSetup({
    type:'post',
    async:false,
    cache:false,
    traditional:true
});

/*可以上传文件*/
$$.formdata=function(url,formId,success,method='post'){
    return $.ajax(url,{
        type:method,
        data:new FormData(document.getElementById(formId)),
        processData : false,
        contentType : false,
        success:success
    });
};
/*
说明：在iframe标签下加上onload=iframeAutoFit(this)即可
@param{HTMLIFrameElement} iframeObj
*/
$$.iframeAutoFit=function(iframeObj){
    iframeObj.height = iframeObj.contentWindow.document.body.scrollHeight;
};

/*
 @param{Object} o
 @param{String,Number} key
*/
$$.hasOwnProperty=function(o,key){
    return o.hasOwnProperty(key);
};

/*
 @param{Object} o
 @param{String,Number} key
*/
$$.hasProperty=function(o,key){
    return key in o;
};

/*
@param{HTMLElement} htmlElem
@param{string} key
*/
$$.hasAttr=function(htmlElem,key){
    return $(htmlElem).attr(key)!==undefined;
};

/*
对话框是通常是单例，就封装成了一个modal名字空间
*/
$$.modal = {
    /*
    type 有三种类型枚举类型 WARNING,SUCCESS,ERROR
    */
    WARNING:0,
    SUCCESS:1,
    ERROR:2,
    icon(type) {
        let icon;
        if (type === this.WARNING||type === this.SUCCESS||type === this.ERROR) {
            icon=type;
        } else {
            icon = 3;
        }
        return icon;
    },
    /*
     content html内容
     type 可以是 $$.modal.WARNING,$$.modal.SUCCESS,$$.modal.ERROR
     */
    alert(content,type=this.SUCCESS) {
        layui.layer.alert(content, {
            icon: this.icon(type),
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary']
        });
    },

    alertError(content) {
        // 错误提示
        this.alert(content, this.ERROR);
    },

    alertSuccess(content) {
        // 成功提示
        this.alert(content, this.SUCCESS);
    },

    alertWarning(content) {
        // 警告提示
        this.alert(content, this.WARNING);
    },

    /*skin能添加css类改变外观*/
    msg(content) {
        layui.layer.msg(content,{skin:'bgred1 white',time:1000,anim:0});
    },

    msgError(content) {
        // 错误消息
        layui.layer.msg(content, {icon: this.icon(this.ERROR), time: 100000, anim: 0});
    },

    msgSuccess(content) {
        // 成功消息
        layui.layer.msg(content, {icon: this.icon(this.SUCCESS), time: 1000, anim: 0});
    },

    msgWarning:function (content) {
        // 警告消息
        layui.layer.msg(content, {icon: this.icon(this.WARNING), time: 1000, anim: 0});
     },
    /*
    若按确定则调用yesCallback，若按取消则不会调用yesCallback
    例子:
    $$.modal.confirm('内容1',
    function(index){
    //doSomething;
    layui.layer.close(index);
    });
     */
    confirm(content, yesCallback=(index)=>layui.layer.close(index)) {
        // 确认窗体
        layui.layer.confirm(content, {
            icon: 3,
            title: "系统提示",
            btn: ['确认', '取消'],
            btnclass: ['btn btn-primary', 'btn btn-danger'],
        }, yesCallback);
    },

    /*
      area  默认：'auto' layer是宽高都自适应的
            area: '500px' 高度仍然自适应的
            area: ['500px', '300px']
      offset 偏移量基于文档左上角
             offset: 'auto' 默认：垂直水平居中
             offset: '100px' 只定义top坐标，水平保持居中
             offset: ['100px', '50px'] 同时定义top、left坐标
             offset: 't'	快捷设置顶部坐标
             offset: 'r'	快捷设置右边缘坐标
             offset: 'b'	快捷设置底部坐标
             offset: 'l'	快捷设置左边缘坐标
             offset: 'lt'	快捷设置左上角
             offset: 'lb'	快捷设置左下角
             offset: 'rt'	快捷设置右上角
             offset: 'rb'	快捷设置右下角
     */
    open1({title, content, offset, area=[800+'px',($(window).height()-50)+'px'], yesCallback=(index)=>layui.layer.close(index)}={}){
        if($.type(offset)==='array'){
            offset=[parseInt(offset[0])+'px',parseInt(offset[1]+'px')];
        }
        if ($.type(area)==='array'){
            area=[parseInt(area[0])+'px',parseInt(area[1]+'px')];
        }else if ($.type(area) === 'number') {
            area=area+'px'
        }
        layui.layer.open({
            type: 1,//普通类型
            area,
            offset,
            fix: false,//不固定
            maxmin: true,
            shade: 0.3,
            title,
            content,
            btn: ['确定', '关闭'],
            shadeClose: true,
            yes: yesCallback
        });
    },
    /*
    area  默认：'auto' layer是宽高都自适应的
          area: '500px' 高度仍然自适应的
          area: ['500px', '300px']
    offset 偏移量基于文档左上角
           offset: 'auto' 默认：垂直水平居中
           offset: '100px' 只定义top坐标，水平保持居中
           offset: ['100px', '50px'] 同时定义top、left坐标
           offset: 't'	快捷设置顶部坐标
           offset: 'r'	快捷设置右边缘坐标
           offset: 'b'	快捷设置底部坐标
           offset: 'l'	快捷设置左边缘坐标
           offset: 'lt'	快捷设置左上角
           offset: 'lb'	快捷设置左下角
           offset: 'rt'	快捷设置右上角
           offset: 'rb'	快捷设置右下角
   */
    open2({title, src, offset, area=[800+'px',($(window).height()-50)+'px'], yesCallback=(index)=>layui.layer.close(index)}={}) {
        if($.type(offset)==='array'){
            offset=[parseInt(offset[0])+'px',parseInt(offset[1]+'px')];
        }
        if ($.type(area)==='array'){
            area=[parseInt(area[0])+'px',parseInt(area[1]+'px')];
        }else if ($.type(area) === 'number') {
            area=area+'px'
        }
        layui.layer.open({
            type: 2,//iframe类型
            area,
            offset,
            fix: false,//不固定
            maxmin: true,
            shade: 0.3,
            title,
            content: src,
            btn: ['确定', '关闭'],
            shadeClose: true,
            yes: yesCallback
        });

    },
    /*
    offset 偏移量基于文档左上角
           offset: 'auto' 默认：垂直水平居中
           offset: '100px' 只定义top坐标，水平保持居中
           offset: ['100px', '50px'] 同时定义top、left坐标
           offset: 't'	快捷设置顶部坐标
           offset: 'r'	快捷设置右边缘坐标
           offset: 'b'	快捷设置底部坐标
           offset: 'l'	快捷设置左边缘坐标
           offset: 'lt'	快捷设置左上角
           offset: 'lb'	快捷设置左下角
           offset: 'rt'	快捷设置右上角
           offset: 'rb'	快捷设置右下角
   */
    openFull1({title,content,offset,yesCallback=(index)=>layui.layer.close(index)}={}) {
        // 弹出层全屏
        let left, top, width, height;
        if ($.type(offset)==='array'){
            left= parseInt(offset[0]);
            top= parseInt(offset[1]);
            if (left>0&&left<$(window).width()){
                width=$(window).width()-left;
            }else{
                width=$(window).width();
            }
            if (top>0&&top<$(window).height()){
                height=$(window).height()-top;
            }else{
                height=$(window).height();
            }
            offset=[left+'px',top+'px']
        }else{
            width=$(window).width();
            height=$(window).height();
        }
        const index = layui.layer.open({
            type: 1,//普通类型
            offset,
            area: [width + 'px', height + 'px'],
            fix: false,//不固定
            maxmin: true,
            shade: 0.3,
            title,
            content,
            btn: ['确定', '关闭'],
            shadeClose: true,
            yes: yesCallback,
        });
        // layer.full(index);

    },
    /*
    offset 偏移量基于文档左上角
           offset: 'auto' 默认：垂直水平居中
           offset: '100px' 只定义top坐标，水平保持居中
           offset: ['100px', '50px'] 同时定义top、left坐标
           offset: 't'	快捷设置顶部坐标
           offset: 'r'	快捷设置右边缘坐标
           offset: 'b'	快捷设置底部坐标
           offset: 'l'	快捷设置左边缘坐标
           offset: 'lt'	快捷设置左上角
           offset: 'lb'	快捷设置左下角
           offset: 'rt'	快捷设置右上角
           offset: 'rb'	快捷设置右下角
   */
    openFull2({title,src,offset,yesCallback=(index)=>layui.layer.close(index)}={}) {
        // 弹出层全屏
        let left, top, width, height;
        if ($.type(offset)==='array'){
            left= parseInt(offset[0]);
            top= parseInt(offset[1]);
            if (left>0&&left<$(window).width()){
                width=$(window).width()-left;
            }else{
                width=$(window).width();
            }
            if (top>0&&top<$(window).height()){
                height=$(window).height()-top;
            }else{
                height=$(window).height();
            }
            offset=[left+'px',top+'px']
        }else{
            width=$(window).width();
            height=$(window).height();
        }
        const index = layui.layer.open({
            type: 2,//iframe类型
            offset,
            area: [width + 'px', height + 'px'],
            fix: false,//不固定
            maxmin: true,
            shade: 0.3,
            title,
            content: src,
            btn: ['确定', '关闭'],
            shadeClose: true,
            yes: yesCallback,
        });
        // layer.full(index);

    }

};
/*
 功能：渲染成Layui格式的form
 css 补充类：
 html 例子:
<form id="fm" action="" class="flexv layui-form w1200 cbox">
    <div class="flex">
        <label class="fmlabel">姓名</label>
        <input type="text" class="flex1 fminput" name="xingming" placeholder="请输入" autocomplete="off" >
    </div>
    <div class="flex">
        <label class="fmlabel">密码</label>
        <input type="password" class="flex1 fminput" name="mima" placeholder="请输入" autocomplete="off" >
    </div>

    <div class="flex fyc">
        <label class="fmlabel">性别</label>
        <input type="radio" name="sex" title="男" value="男">
        <input type="radio" name="sex" title="女" value="女" checked="">
    </div>
    <!--
    若要弹出日期选择对话框需要手工加载laydate如下
    layui.laydate.render({elem:'#birth'});
    -->
    <div class="flex">
        <label class="fmlabel">出生日期</label>
        <input class="fminput" type="text" name="birth" placeholder="yyyy-MM-dd" autocomplete="off">
    </div>
    <!--若是多选下拉框可采用 easyui的combobox 例子如下-->
    <!--
    <div class="flex">
        <label class="fmlabel">单行选择框</label>
        <input class="easyui-combobox flex1" name="interest" style="height: 38px;" data-options="
                    data:[{text:'应用数学',value:'应用数学'},{text:'统计学',value:'统计学'},{text:'大数据',value:'大数据'}
                    ,{text:'基础数学',value:'基础数学'},{text:'计算数学',value:'计算数学'}],
                    value:[统计学,大数据],
                    multiple:true,
                    panelHeight:'auto',
                    ">
    </div>
    -->
    <div class="flex">
        <label class="fmlabel">专业</label>
        <select class="flex1" name="zhuanye" lay-filter="zhuanye">
            <option value="应用数学">应用数学</option>
            <option value="统计学">统计学</option>
            <option value="大数据">大数据</option>
            <option value="基础数学">基础数学</option>
            <option value="计算数学">计算数学</option>
        </select>
    </div>

    <div class="flex fyc">
        <label class="fmlabel">爱好</label>
        <input type="checkbox" name="aihao" title="写作" value="写作" lay-skin="primary">
        <input type="checkbox" name="aihao" title="阅读" value="阅读" lay-skin="primary">
    </div>
    <div class="flex">
        <label class="fmlabel">备注</label>
        <textarea class="fmtextarea" name="remark"  placeholder="请输入" cols="30" rows="10"></textarea>
    </div>
    <div class="flex fyc">
        <label class="fmlabel">上传文件</label>
        <input type="file" name="file" autocomplete="off">
    </div>

    <div class="flex">
        <button class="layui-btn" lay-submit lay-filter="*">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
</form>
 @param{string} formId
 */
$$.Form=class{
    constructor(formId){
        this.formElem=document.getElementById(formId);
    }
    getFullData(){
        let that=this;
        let formElem=that.formElem;

        let formData=new FormData(formElem);
        let arr = [];
        for (let key of formData.keys()) {
            if (!arr.includes(key)){
                arr.push(key);
            }
        }

        let data={};
        for (let key of arr){
            data[key]=that.getData(key);
        }
        return data;
    }
    getData(name){
        let formElem=this.formElem;
        let formData=new FormData(formElem);
        let data=formData.getAll(name);
        if (data.length===0){
            return '';
        }else if (data.length === 1) {
            return data[0];
        }else {
            return data;
        }
    }
    setData(name,value){
        let formElem=this.formElem;
        if ($(formElem[name]).is(':checkbox')){
            if ($.type(value)==='array'){
                if(value.length>0){
                    for (let i = 0; i < value.length; i++) {

                        $.each(formElem[name],function (k,v) {
                            if (''+v.value===''+value[i]){
                                $(':checkbox').prop('checked',true);
                            }
                        });
                    }
                }
            }else{
                $.each(formElem[name],function (k,v) {
                    if (''+v.value===''+value){
                        $(v).prop('checked',true);
                    }
                });
            }
        }else if($(formElem[name]).is(':radio')){
            $.each(formElem[name],function (k,v) {
                if (''+v.value===''+value){
                    $(v).prop('checked',true);
                }
            });
        }else if($(formElem[name]).is(':file')){
            if ($(formElem[name]).length!==1){
                return
            }

            if (value===''||value===undefined||value===null){
                formElem[name].value='';
            }else{
                $(formElem[name]).trigger('click');
            }
        }/*若是被easyui-combobox渲染的input*/
        else if($(formElem[name]).closest('.flex').find('.easyui-combobox').length){
            /*取得原始有easyui-combobox的input*/
            let obj=$(formElem[name]).closest('div').find('.easyui-combobox');
            if ($.type(value)==='array'){
                obj.combobox('setValues',value);
            }else{
                obj.combobox('setValue',value);
            }
        }else{
            formElem[name].value=value;
        }

        /*若form是.layui-form,则设置form元素值后要调用layui.form.render();才能看到效果*/
        if($(this.formElem).hasClass('layui-form')){
            layui.form.render();
        }
    }
};


/*
html:
注意：图标中分别用了layui，font-awesome，alibaba的，给出了示例
<div id="tab1" lay-filter="tab1" class="layui-tab flexv flex1 layui-tab-brief" lay-allowClose="true">
<ul class="layui-tab-title">
    <li class="layui-this"><i class="layui-icon layui-icon-ok"></i>网站设置</li>
    <li><i class="fa fa-check-circle-o"></i>用户管理</li>
    <li><i class="iconfont icon-ok"></i>权限分配</li>
</ul>
<div class="layui-tab-content flexv flex1">
    <div class="layui-tab-item flexv flex1 layui-show"><iframe src="xxx1.jsp" class="flex1" frameborder="0"></iframe></div>
    <div class="layui-tab-item flexv flex1 "><iframe src="xxx2.jsp" class="flex1" frameborder="0"></iframe></div>
    <div class="layui-tab-item flexv flex1 "><iframe src="xxx3.jsp" class="flex1" frameborder="0"></iframe></div>
</div>
</div>
css:
.layui-tab-item{display: none!important;}
.layui-show{display:flex!important;}
使用：
let tab1=new $$.Tab('tab1');
tab1.tabAdd({title:'标题1',content:'内容1',id:'t4'})
*/
$$.Tab=class{
    constructor(layFilter){
        this.layFilter=layFilter;
    }
    /*
    说明：动态的给Tab的添加选项卡页
     element.tabAdd(filter, options);
      element.tabAdd('demo', {
      title: '标题' //支持传入html    <b>标题</b>
      ,content: '内容' //支持传入html <iframe src="xxx4.jsp" class="flex1" frameborder="0"/>
      ,id: 'lay-id属性值'  //'t4'
     });
     */
    tabAdd({title='选项卡',content='选项卡内容',layId}={}){
        layui.element.tabAdd(this.layFilter,{title,content,id:layId});
        $('.layui-tab-item:last').addClass('flex1');
    }
    tabDelete(layId){
        layui.element.tabDelete(this.layFilter,layId);
    }
};

/*
es6的语法：与解构赋值默认值结合使用 参见https://es6.ruanyifeng.com/#docs/function#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC
html:
<video id="video1" class="" controls preload="none" width="640" height="auto"
    poster="http://vjs.zencdn.net/v/oceans.png" src="http://vjs.zencdn.net/v/oceans.mp4">
</video>
使用例子:
$$.setVideo('video1',{src:"http://vjs.zencdn.net/v/oceans.mp4",width:400});
*/
$$.setVideo=function(videoId,{src,poster,width=400,height='auto'}={}){
    let videoElem=document.getElementById(videoId);
    if (src!==undefined){
        $(videoElem).attr('src',src);
    }
    if (poster!==undefined){
        $(videoElem).attr('poster',poster);
    }
    $(videoElem).attr('width',width);
    $(videoElem).attr('height',height);
};

/*
html:
<div id="demo" lay-filter="demo"></div>
<script type="text/html" id="toolbarDemo">
   <div class="layui-btn-container">
       <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
       <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
       <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
   </div>
</script>
<script type="text/html" id="barDemo">
 <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
 <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>
script:
//数据表整体属性设置说明
height  不填写	默认情况。高度随数据列表而适应，表格容器不会出现纵向滚动条
        固定值	设定一个数字，用于定义容器高度，当容器中的内容超出了该高度时，会自动出现纵向滚动条	height: 315
        full-差值	高度将始终铺满，无论浏览器尺寸如何。这是一个特定的语法格式，其中 full 是固定的，而 差值 则是一个数值，这需要你来预估，比如：表格容器距离浏览器顶部和底部的距离“和”
toolbar '#toolbarDemo' //指向自定义工具栏模板选择器
        '<div>xxx</div>' //直接传入工具栏模板字符
        true //仅开启工具栏，不显示左侧模板
        'default' //让工具栏左侧显示默认的内置模板
        false //这是默认值，不开启工具栏，此时顶端工具栏右侧的defaultToolbar就不能显示了
*/
$$.LayuiTable=class{
    constructor({tableId,url,width,height,limit=200,limits=[50,100,200,500],
                    page={layout: ['prev','page','next','skip','count','limit']/*自定义分页布局*/,
                        groups: 5/*显示 5 个连续页码*/},toolbar=false}={},method='get'){
        this.elem='#'+tableId;
        this.url = url;
        this.width=width;
        this.height=height;
        this.limit=limit;
        this.limits=limits;
        this.toolbar=toolbar;
        this.page=page;
        this.method=method;
    }
    /*
    //数据表列属性设置说明
    //cols  重要属性
    field   设定字段名。非常重要，且是表格数据列的唯一标识
    title   设定标题名称
    width   设定列宽，若不填写，则自动分配；若填写，则支持值为：数字、百分比。
            请结合实际情况，对不同列做不同设定。
    minWidth    局部定义当前常规单元格的最小宽度（默认：60），一般用于列宽自动分配的情况。其优先级高于基础参数中的 cellMinWidth
    type    设定列类型。可选值有：
            normal（常规列，无需设定）
            checkbox（复选框列）
            radio（单选框列，layui 2.4.0 新增）
            numbers（序号列）
            space（空列）
    LAY_CHECKED 是否全选状态（默认：false）。必须复选框列开启后才有效，如果设置 true，则表示复选框默认全部选中。
    fixed   固定列。可选值有：left（固定在左）、right（固定在右）。一旦设定，对应的列将会被固定在左或右，不随滚动条而滚动。
            注意： 如果是固定在左，该列必须放在表头最前面；如果是固定在右，该列必须放在表头最后面。
    hide    是否初始隐藏列，默认：false。layui 2.4.0 新增
    sort    是否允许排序（默认：false）。如果设置 true，则在对应的表头显示排序icon，从而对列开启排序功能。
            注意：不推荐对值同时存在“数字和普通字符”的列开启排序，因为会进入字典序比对。比如：'贤心' > '2' > '100'，这可能并不是你想要的结果，但字典序排列算法（ASCII码比对）就是如此。
    edit    单元格编辑类型（默认不开启）目前只支持：text（输入框）
    style   自定义单元格样式。即传入 CSS 样式
    templet templet 提供了三种使用方式，请结合实际场景选择最合适的一种：
            如果自定义模版的字符量太大，我们推荐你采用【方式一】；
            方式一：绑定模版选择器。
                templet:'#tpl1'
                <script type="text/html" id="tpl1">
                    <a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a>
                </script>
            如果自定义模板的字符量适中，或者想更方便地调用外部方法，我们推荐你采用【方式二】；
            方式二：函数转义。
                templet: function(d){
                        console.log(d.LAY_INDEX); //得到序号。一般不常用
                        console.log(d.LAY_COL); //得到当前列表头配置信息（layui 2.6.8 新增）。一般不常用
                        //得到当前行数据，并拼接成自定义模板
                        return 'ID：'+ d.id +'，标题：<span style="color: #c00;">'+ d.title +'</span>'
                        }
            如果自定义模板的字符量很小，我们推荐你采用【方式三】
            方式三：直接赋值模版字符。
            templet: `<div><a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a></div>`
            注意：这里一定要被一层 <div></div> 包裹，否则无法读取到模板，对于大段的html用es6的反引号模板字符串更好。

    align   单元格排列方式。可选值有：left（默认）、center（居中）、right（居右）
    toolbar 绑定工具条模板。可在每行对应的列中出现一些自定义的操作性按钮
            若采用templet方式一的形式，则
            toolbar:'#barDemo'
            <script type="text/html" id="barDemo">
                <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
                <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                {{#if(d.auth > 2){ }}
                    <a class="layui-btn layui-btn-xs" lay-event="check">审核</a>
                {{#} }}
            </script>
            //注意：属性 lay-event="" 是模板的关键所在，值可随意定义。
            //工具条事件
            layui.table.on('tool(demo)', function(obj){ //注：tool 是工具条事件名，demo 是 table 原始容器的属性 lay-filter="对应的值"
              let data = obj.data; //获得当前行数据
              let layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
              let tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
              if(layEvent === 'detail'){ //查看
                //do somehing
              } else if(layEvent === 'del'){ //删除
                layui.layer.confirm('真的删除行么', function(index){
                  obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layui.layer.close(index);
                  //向服务端发送删除指令
                });
              } else if(layEvent === 'edit'){ //编辑
                //do something
                //同步更新缓存对应的值
                obj.update({
                  username: '123'
                  ,title: 'xxx'
                });
              } else if(layEvent === 'LAYTABLE_TIPS'){
                layui.layer.alert('Hi，头部工具栏扩展的右侧图标。');
              }
            });

    //例子：
    cols: [[ //表头
     {fixed: 'left',field: 'id', title: 'ID', width:80, sort: true}
     ,{field: 'username', title: '用户名', width:80}
     ,{field: 'sex', title: '性别', width:80, sort: true}
     ,{field: 'city', title: '城市', width:80}
     ,{field: 'sign', title: '签名', width: 177}
     ,{field: 'experience', title: '积分', width: 80, sort: true}
     ,{field: 'score', title: '评分', width: 80, sort: true}
     ,{field: 'classify', title: '职业', width: 80}
     ,{field: 'wealth', title: '财富', width: 135, sort: true}
     ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
     ]]
     */
    setCols(cols){
        this.cols = cols;
    }
    /*功能设置容器高度自适应
    使用条件：1、数据表不能设置具体的高度值
            2、数据表的容器要有类flev
            3、函数的调用必须在this.render()函数调用之后
    */
    setHeightAutotFit(){
        $(this.elem).next().addClass('flexv flex1').find('>.layui-table-box').addClass('flex1');
    }

    render(){
        layui.table.render({
            elem: this.elem
            ,width:this.width
            ,height: this.height
            ,method:this.method
            ,url:this.url //数据接口
            // ,toolbar:'#toolbarDemo'
            ,toolbar:this.toolbar
            ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '提示'
                ,layEvent: 'LAYTABLE_TIPS'
                ,icon: 'layui-icon-tips'
            }]
            ,limit:this.limit
            ,limits:this.limits
            ,even:true
            // ,page: true //开启分页
            ,page:this.page
            ,cols:this.cols
        });
    }
};

/*@param {string} fmt
  @param {Date} date
  @return {string}
 */
$$.dateFormat=function (fmt, date) {
    //格式化日期
    const o = {
        "M+": date.getMonth() + 1,     //月份
        "d+": date.getDate(),     //日
        "h+": date.getHours(),     //小时
        "m+": date.getMinutes(),     //分
        "s+": date.getSeconds(),     //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()    //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/*
  返回[min,max]范围内的随机整数
  @param {Number} min
  @param {Number} max
  @return {Number}
 */
$$.rnd=function (min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
};
/*
  @param {Number} len
  @return {String}
 */
$$.uuid=function (len=8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    const radix = chars.length;
    for (let i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
    }
    const str = $$.dateFormat('yyyyMMddhhmmss', new Date());
    return uuid.join('')+str;
};

/*n:0-35
  @param {Number} n
  @return {String}
 */
$$.int2char=function(n){
    if(n>=0&&n<=9){
        return ''+n;
    }
    if (n >= 10 && n <= 35) {
        return String.fromCharCode('a'.charCodeAt(0) + (n - 10));
    }
};
/*c:0-9a-z
  @param {String} c
  @return {Number}
  36进制
 */
$$.char2int=function(c){
    if(c>='0'&&c<='9'){
        return parseInt(c)%10;
    }
    if (c>='a'&&c<='z'){
        return c.charCodeAt(0)-'a'.charCodeAt(0)+10;
    }
};

/*
  说明：
  模板中的else必须是{{# }else{ }}不允许的是{{#else{ }}
  例子
  <script type="text/html" id="tpl1">
    <h3>{{ d.title }}</h3>
    <ul>
        {{#  layui.each(d.list, function(index, item){ }}
        <li>
            <span>{{ item.modname }}</span>
            <span>{{ item.alias }}：</span>
            <span>{{ item.site || '' }}</span>
        </li>
        {{#  }); }}

        {{#  if(d.list.length === 0){ }}
        无数据
        {{#  } }}
    </ul>
</script>
//调用
let data={
        "title": "Layui常用模块"
        ,"list": [
        {
            "modname": "弹层"
            ,"alias": "layer"
            ,"site": "layer.layui.com"
        }
        ,{
            "modname": "表单"
            ,"alias": "form"
        }
        ,{
            "modname": "分页"
            ,"alias": "laypage"
        }
        ,{
            "modname": "日期"
            ,"alias": "laydate"
        }
        ,{
            "modname": "上传"
            ,"alias": "upload"
        }
    ]
    };
$$.tpl1('tpl1',data);
 */
$$.tpl1=function (scriptId,data={}) {
    const tpl = $.trim(document.getElementById(scriptId).innerHTML);
    return layui.laytpl(tpl).render(data);
};
/*
let data={
        "title": "Layui常用模块"
        ,"list": [
        {
            "modname": "弹层"
            ,"alias": "layer"
            ,"site": "layer.layui.com"
        }
        ,{
            "modname": "表单"
            ,"alias": "form"
        }
        ,{
            "modname": "分页"
            ,"alias": "laypage"
        }
        ,{
            "modname": "日期"
            ,"alias": "laydate"
        }
        ,{
            "modname": "上传"
            ,"alias": "upload"
        }
    ]
    };
let tpl=`<h3>{{ d.title }}</h3>
    <ul>
    {{#  layui.each(d.list, function(index, item){ }}
    <li>
    <span>{{ item.modname }}</span>
    <span>{{ item.alias }}：</span>
    <span>{{ item.site || '' }}</span>
    </li>
    {{#  }); }}

    {{#  if(d.list.length === 0){ }}
        无数据
        {{#  } }}
    </ul>`;
调用$$.tpl2(tpl,data);
*/
$$.tpl2=function (tpl,data={}) {
    tpl=$.trim(tpl);
    return layui.laytpl(tpl).render(data);
};

$$.ajaxSuccess=function (jsonResult) {
    if ($.type(jsonResult)!=='object'){
        return;
    }
    if (!jsonResult.code) {
        $$.modal.alertSuccess(jsonResult.msg);
    } else {
        $$.modal.alertError(jsonResult.msg);
    }
};
/*误区：之前一直以为，同一个窗口，只要会话还没有过期，不同标签页之间，相同域名下的sessionStorage是一样的。
 正确答案：刷新当前页面，或者通过location.href、window.open、或者通过带target="_blank"的a标签打开新标签，之前的sessionStorage还在，但是如果你是主动打开一个新窗口或者新标签，对不起，打开F12你会发现，sessionStorage空空如也。
  也就是说，sessionStorage的session仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。
  注意：value必须是是字符串类型
 */
$$.getSessionData=function (attrName) {
    return window.sessionStorage.getItem(attrName);
};
$$.setSessionData=function (attr, value) {
    window.sessionStorage.setItem(attr, value);
};
$$.removeSessionData=function (attr) {
    window.sessionStorage.removeItem(attr);
};

$$.tree={
    /*
    在fromNode节点及fromNode的子节点下查找属性名是key，属性值是value的节点
     */
    findNodeByKeyValue(fromNode,key,value) {
        if (fromNode[key] == value) return fromNode;
        if (fromNode.children){
            for (let item of fromNode.children){
                const retNode = this.findNodeByKeyValue(item, key, value);
                if (retNode){
                    return retNode;
                }
            }
        }
        return null;
    },
    /*
      从fromNode开始查找孩子集合中有node的节点
     */
    findParentByNode(node,fromNode){
        if (fromNode.children){
            for (let item of fromNode.children){
                if(fromNode.children[i]===node){
                    return fromNode;
                }
                const retNode = this.findParentByNode(node, item);
                if (retNode){
                    return retNode;
                }

            }
            return null;
        }
        return null;
    },

    findIt(root,key,value) {
        if ($.type(root)==='object'){
            return this.findNodeByKeyValue(root,key,value);
        }else{
            for (let item of root){
                const retNode = this.findNodeByKeyValue(item, key, value);
                if (retNode){
                    return retNode;
                }
            }
            return null;
        }
    }
};
$(function () {

    /*对layui-form里的<input type=file>进行改造*/
    let $o=$('.layui-form [type=file]');
    $o.addClass('none')
        .after(`<div>
<button type="button" class="layui-btn layui-btn-primary"><i class="layui-icon layui-icon-upload"></i>文件上传</button>
<span class="layui-inline layui-upload-choose"></span>
</div>`);
    $o.next().find('>.layui-btn').click(function () {
        $(this).closest('div').prev().trigger('click');
    });
    $o.change(function () {
        let tmpStr=this.value.replaceAll(/\\/g,'/');
        let fileName=this.value.substring(tmpStr.lastIndexOf('/')+1);
        $(this).next().find('>.layui-btn+.layui-upload-choose').html(fileName);
    });

    /*若使用的easyui组件combobox设置了flex1类，则给渲染元素添加flex1，*/
    let $o1=$('.easyui-combobox');
    $o1.next().addClass('bdr2');
    $o1.next().css({border:'1px solid #eee'});

    $o1.next().find('input:eq(0)').addClass('fz16');
    if ($o1.hasClass('flex1')){
        $o1.next().addClass('flex1 flex');
        $o1.next().find('input:eq(0)').addClass('flex1');
    }
});