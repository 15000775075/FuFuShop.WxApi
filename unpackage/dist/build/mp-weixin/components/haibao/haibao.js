(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/haibao/haibao"],{"1cdb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=c(n("a34a"));function c(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,c,s,o){try{var i=t[s](o),u=i.value}catch(r){return void n(r)}i.done?e(u):Promise.resolve(u).then(a,c)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(a,c){var o=t.apply(e,n);function i(t){s(o,a,c,i,u,"next",t)}function u(t){s(o,a,c,i,u,"throw",t)}i(void 0)}))}}var i={props:{},data:function(){return{canvasW:0,canvasH:0,ctx:null,isShow:!1,headerImg:"https://oss.zhangyubk.com/%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82.png",title:"草莓千层蛋糕",subTitle:"鲜嫩多汁的草莓融合香甜奶油",price:50,qrcode:"https://oss.zhangyubk.com/cmqrcode.jpg"}},methods:{showCanvas:function(){this.isShow=!0,this.__init()},__init:function(){var e=this;return o(a.default.mark((function n(){var c,s,o,i,u;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"正在生成中...",mask:!0}),e.ctx=t.createCanvasContext("my-canvas",e),e.canvasW=t.upx2px(550),e.canvasH=t.upx2px(800),e.ctx.setFillStyle("rgba(255, 255, 255, 0.5)"),e.ctx.fillRect(0,0,e.canvasW,e.canvasH),e.drawRoundRect(e.ctx,0,0,e.canvasW,e.canvasH,t.upx2px(18),"#FFFFFF"),n.next=9,e.getImageInfo(e.headerImg);case 9:return c=n.sent,s=t.upx2px(500),o=t.upx2px(320),e.drawRoundImg(e.ctx,c.path,(e.canvasW-s)/2,(e.canvasW-s)/2,s,o,8),e.ctx.setFontSize(18),e.ctx.setFillStyle("#333"),e.ctx.fillText(e.title,(e.canvasW-s)/2,(e.canvasW-s)/2+o+30),e.ctx.setFontSize(14),e.ctx.setFillStyle("#858585"),i=e.ctx.measureText(e.subTitle).width,i>s?e.ctx.fillText(e.subTitle.slice(0,19)+"...",(e.canvasW-s)/2,(e.canvasW-s)/2+o+55):e.ctx.fillText(e.subTitle,(e.canvasW-s)/2,(e.canvasW-s)/2+o+55),e.ctx.setFontSize(14),e.ctx.setFillStyle("#f54545"),e.ctx.fillText("￥",(e.canvasW-s)/2,(e.canvasW-s)/2+o+90),e.ctx.setFontSize(18),e.ctx.fillText(e.price,(e.canvasW-s)/2+18,(e.canvasW-s)/2+o+90),e.drawDashLine(e.ctx,10,(e.canvasW-s)/2+o+120,e.canvasW-10,(e.canvasW-s)/2+o+120,5),e.drawEmptyRound(e.ctx,0,(e.canvasW-s)/2+o+120,10),e.drawEmptyRound(e.ctx,e.canvasW,(e.canvasW-s)/2+o+120,10),e.ctx.setFontSize(12),e.ctx.setFillStyle("#858585"),e.ctx.fillText("长按识别小程序码进入",30,(e.canvasW-s)/2+o+170),n.next=33,e.getImageInfo(e.qrcode);case 33:u=n.sent,e.ctx.drawImage(u.path,180,(e.canvasW-s)/2+o+135,82,82),setTimeout((function(){e.ctx.draw(!0,(function(){t.hideLoading()}))}),500);case 36:case"end":return n.stop()}}),n)})))()},drawEmptyRound:function(t,e,n,a){t.save(),t.beginPath(),t.arc(e,n,a,0,2*Math.PI,!0),t.setFillStyle("rgba(0, 0, 0, .4)"),t.fill(),t.restore(),t.closePath()},drawDashLine:function(t,e,n,a,c,s){t.setStrokeStyle("#cccccc"),t.setLineWidth(1);for(var o=s,i=a-e,u=c-n,r=Math.floor(Math.sqrt(i*i+u*u)/o),l=0;l<r;l++)l%2===0?t.moveTo(e+i/r*l,n+u/r*l):t.lineTo(e+i/r*l,n+u/r*l);t.stroke()},drawRoundImg:function(t,e,n,a,c,s,o){t.beginPath(),t.save(),t.arc(n+o,a+o,o,Math.PI,1.5*Math.PI),t.arc(n+c-o,a+o,o,1.5*Math.PI,2*Math.PI),t.arc(n+c-o,a+s-o,o,0,.5*Math.PI),t.arc(n+o,a+s-o,o,.5*Math.PI,Math.PI),t.stroke(),t.clip(),t.drawImage(e,n,a,c,s),t.restore(),t.closePath()},drawRoundRect:function(t,e,n,a,c,s,o){t.save(),t.beginPath(),t.setFillStyle(o),t.setStrokeStyle(o),t.setLineJoin("round"),t.setLineWidth(s),t.strokeRect(e+s/2,n+s/2,a-s,c-s),t.fillRect(e+s,n+s,a-2*s,c-2*s),t.stroke(),t.closePath()},getImageInfo:function(e){return new Promise((function(n,a){t.getImageInfo({src:e,success:function(t){n(t)},fail:function(t){a(t),console.log("获取图片失败",t)}})}))},saveImage:function(){t.getSetting({success:function(e){console.log("获取用户权限",e.authSetting),Object.keys(e.authSetting).length>0&&(void 0==e.authSetting["scope.writePhotosAlbum"]?t.openSetting({success:function(t){console.log("设置权限",t.authSetting)}}):e.authSetting["scope.writePhotosAlbum"]||t.openSetting({success:function(t){console.log("设置权限",t.authSetting)}}))}});var e=this;t.canvasToTempFilePath({canvasId:"my-canvas",quality:1,complete:function(n){console.log("保存到相册",n),t.saveImageToPhotosAlbum({filePath:n.tempFilePath,success:function(n){t.showToast({title:"已保存到相册",icon:"success",duration:2e3}),setTimeout((function(){e.isShow=!1}),2e3)}})}},this)}}};e.default=i}).call(this,n("543d")["default"])},"29d8":function(t,e,n){"use strict";n.r(e);var a=n("1cdb"),c=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=c.a},"4dff":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}));var c=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){e.stopPropagation(),t.isShow=!1})},s=[]},"623c":function(t,e,n){"use strict";n.r(e);var a=n("4dff"),c=n("29d8");for(var s in c)"default"!==s&&function(t){n.d(e,t,(function(){return c[t]}))}(s);n("88a6");var o,i=n("f0c5"),u=Object(i["a"])(c["default"],a["b"],a["c"],!1,null,"789e906c",null,!1,a["a"],o);e["default"]=u.exports},"88a6":function(t,e,n){"use strict";var a=n("eeb5"),c=n.n(a);c.a},eeb5:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/haibao/haibao-create-component',
    {
        'components/haibao/haibao-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("623c"))
        })
    },
    [['components/haibao/haibao-create-component']]
]);
