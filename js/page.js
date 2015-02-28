// JavaScript Document
/**
* @name		:名称
* @author	:作者
* @dependent:描述
*/
//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(113.248257,23.127617);//定义一个中心点坐标
    map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.disableScrollWheelZoom();//禁用地图滚轮放大缩小，默认禁用(可不写)
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
            //向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{title:"广州昊十洋移民咨询服务有限公司",content:"广州市荔湾区华贵路1号贵贤上品A5栋1504室",point:"113.248104|23.127352",isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}
	 ];
//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
		var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
		var iw = createInfoWindow(i);
		var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
		marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
		
		(function(){
			var index = i;
			var _iw = createInfoWindow(i);
			var _marker = marker;
			_marker.addEventListener("click",function(){
			    this.openInfoWindow(_iw);
		    });
		    _iw.addEventListener("open",function(){
			    _marker.getLabel().hide();
		    })
		    _iw.addEventListener("close",function(){
			    _marker.getLabel().show();
		    })
			label.addEventListener("click",function(){
			    _marker.openInfoWindow(_iw);
		    })
			if(!!json.isOpen){
				label.hide();
				_marker.openInfoWindow(_iw);
			}
		})()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}
/* @end **/


/**
* @name		:tabBox
* @author	:Nice
* @dependent:描述
*/
function tabBox(ID,time){
    var e=$("#"+ID);
    var menu=e.find('.menu');
    var menuLi=menu.find('.list');

    var info=e.find('.info');
    var infoLi=info.find('.list');

    //初始化
    

    menuLi.click(function(event) {
        var i=$(this).index();
        
        infoLi.stop().animate({
            opacity:0
        }, time)


        setTimeout(function(){
            infoLi.css({
                display: 'none'
            });

            $(infoLi[i]).css({
                display: 'block'
            });

            $(infoLi[i]).stop().animate({
                opacity:1
            }, time)
            console.log(infoLi[i]);
        },time);
        
    });
}
/* @end **/


/**
* @name     :tabBanner
* @author   :Nice
* @dependent:
*/
function tabBanner(ID,time,interval){
    var e=$("#"+ID);
    var tabContent=e.find('.tab_content');
    var imgWrap=e.find('.img_wrap');
    var imgLi=imgWrap.find('.list');
    var imgLiIMG=imgLi.find('.img');

    var tabContentW=tabContent.width();
    var imgL=imgLiIMG.length;

    var IMGI=0;


    //初始化

    //添加menu
    var menuLiHTML='';
    for (var i = 0; i <= imgL-1; i++) {
        menuLiHTML=menuLiHTML+'<li class="list"></li>';
    };
    e.append('<ul class="menu">'+menuLiHTML+'</ul>')

    imgWrap.width(imgL*tabContentW);
    imgLi.width(tabContentW);

    var menu=e.find('.menu');
    var menuLi=menu.find('.list');
    $(menuLi[0]).addClass('hover');

    setInterval(function(){
        IMGI=IMGI+1;
        if (IMGI>=imgL) {
            IMGI=0;
        }
        
        imgWrap.stop().animate({
            left:-IMGI*tabContentW
        }, time);

        menuLi.removeClass('hover');
        $(menuLi[IMGI]).addClass('hover');

        // console.log(IMGI);
    },interval);
    
    menuLi.click(function(event) {
        var IMGI=$(this).index();

        imgWrap.stop().animate({
            left:-IMGI*tabContentW
        }, time);

        menuLi.removeClass('hover');
        $(menuLi[IMGI]).addClass('hover');
    });






    // var menu=

}
/* @end **/




/**
* @name		:mianInit
* @author	:Nice
* @dependent:总初始化
*/
function mianInit(){
	
}
mianInit();
/* @end **/







/**
* @name		:名称
* @author	:作者
* @dependent:描述
*/

/* @end **/



/**
* @name		:
* @author	:Nice
* @version	:
* @type		:基类
* @explain	:
* @relating	:
* @dependent:
*/

/* @end **/