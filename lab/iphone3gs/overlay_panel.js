AC.OverlayPanel=Class.create();Object.extend(AC.OverlayPanel.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.OverlayPanel.prototype,Event.Listener);Object.extend(AC.OverlayPanel.prototype,Event.Publisher);
Object.extend(AC.OverlayPanel.prototype,{closeBtn:null,overlay:null,overlayShadow:null,overlayId:"",overlayClasses:"",overlayContents:"",overlayShadowId:"",overlayShadowClasses:"",_overlayShadowSrc:null,_defaultOverlayShadowSrc:"./global/elements/overlay/overlay_panel_default.png",defaultOverlayShadowSrc:function(){var b=document.getElementsByTagName("base")[0],c=b?b.href:"",a=this._defaultOverlayShadowSrc;
if(!c||(c&&c.lastIndexOf("/")!==(c.length-1))){a="/"+a}return c+a},order:0,setOverlayShadowImageSrc:function(a){this._overlayShadowSrc=(a)?a:this.defaultOverlayShadowSrc();
this.overlayshadowImage.src=this._overlayShadowSrc;if(this.isIE7()){this.overlayshadowImage.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._overlayShadowSrc+"',sizingMethod='scale')";
this.overlayshadowImage.src="http://images.apple.com/global/elements/blank.gif"}},overlayShadowImageSrc:function(){return(this._overlayShadowSrc)?this._overlayShadowSrc:this.defaultOverlayShadowSrc()
},initialize:function(c,a,d,b){this.overlayId="OverlayPanel";this.overlayShadowId="OverlayPanelShadow";
this.createOverlay();if(typeof(b)=="undefined"){b={}}if(b.silentTriggers==null){b.silentTriggers=true
}d=d||"OverlayPanel";AC.ViewMaster.Viewer.prototype.initialize.call(this,null,this.swapViewElement,d,b);
this.options.shouldAnimateContentChange=false;this.bindPositionOverlay=this.positionOverlay.bind(this)
},createOverlay:function(){this.closeBtnContainer=document.createElement("div");
this.closeBtnContainer.className="closeButtonContainer";this.closeBtn=document.createElement("a");
this.closeBtn.href="#close";this.closeBtn.className="close";this.closeBtn.appendChild(document.createTextNode("Close"));
this.closeBtnContainer.appendChild(this.closeBtn);Event.observe(this.closeBtn,"click",this.close.bindAsEventListener(this),false);
this.swapViewElement=Builder.node("div",{"class":"overlayPanelContent"});this.overlayshadowImage=Builder.node("img",{src:this.overlayShadowImageSrc(),alt:"",border:0,"class":"overlayPanelShadowImage"});
if(this.isIE7()){this.overlayshadowImage.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.overlayShadowImageSrc()+"',sizingMethod='scale')";
this.overlayshadowImage.src="http://images.apple.com/global/elements/blank.gif"}this.overlayshadow=Builder.node("div",{id:this.overlayShadowId,"class":"overlaypanelshadow "+this.overlayShadowClasses},[this.overlayshadowImage,this.swapViewElement]);
this.overlay=$(Builder.node("div",{id:this.overlayId,"class":"overlaypanel "+this.overlayClasses,style:"left:-99999px; top:0;"},[this.closeBtnContainer,this.overlayshadowImage,this.swapViewElement]))
},isIE7:function(){return(AC.Detector.isIEStrict()&&navigator.appVersion.indexOf("MSIE 6.0")>=0)
},setDefaults:function(){this.defaultWidth=this.overlay.offsetWidth;this.padleft=parseInt(Element.getStyle(this.overlay,"marginLeft").replace(/px/i,""));
this.padright=parseInt(Element.getStyle(this.overlay,"marginRight").replace(/px/i,""));
this.defaultHeight=this.overlay.offsetHeight;this.padtop=parseInt(Element.getStyle(this.overlay,"marginTop").replace(/px/,""));
this.padbottom=parseInt(Element.getStyle(this.overlay,"marginBottom").replace(/px/,""))
},setItemAttributes:function(){},registerOverlay:function(){Event.observe(document,"click",this.onClick.bindAsEventListener(this),false)
},isContentLoaded:function(b,a){return false},superContentDidLoad:AC.ViewMaster.Viewer.prototype.contentDidLoad,contentDidLoad:function(c,b){document.body.appendChild(this.overlay);
this.superContentDidLoad(c,b);c.content.show();c.content.style.visibility="hidden";
c.content.removeClassName("overlaydescription");this.overlay.addClassName(c.id);
this.setOriginFromEvent(this.currentSectionEvent);this.setDefaults();var a=this;
this._isDisplaying=true;setTimeout(function(){a._display(c)},100)},_isDisplaying:false,_display:function(b){this.setDefaults();
this.setDimensions(this.currentSectionEvent,b.content);var a=this;return this.pop(this.defaultWidth,this.popPosition().top,this.defaultHeight,this.popPosition().left)
},superWillShow:AC.ViewMaster.Viewer.prototype.willShow,willShow:function(b,c,a){return this.superWillShow(b,c,a)
},superTriggerClicked:AC.ViewMaster.Viewer.prototype.triggerClicked,triggerClicked:function(a,b){if(a){Event.stop(a)
}this.superTriggerClicked(a,b);if(this._isDisplaying){return}this.setOverlayShadowImageSrc(null);
this._popPosition=null;this.currentSectionEvent=a},superShouldAnimateContentChange:AC.ViewMaster.Viewer.prototype.shouldAnimateContentChange,shouldAnimateContentChange:function(c,b,a){if(AC.Detector.isiPhone()){return false
}return this.superShouldAnimateContentChange(c,b,a)},willAnimate:function(b,c,a,d){},setOriginFromEvent:function(a){if(!a){return
}this.left=a.pageX||a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);
this.top=a.pageY||a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)
},setDimensions:function(b,c){this._width=(c.offsetWidth>80)?80:c.offsetWidth;this.defaultWidth=c.offsetWidth;
var a=null;if(b){a=Element.cumulativeOffset(b.element())}if(a){this.left=a.left
}this.left=this.left||document.body.getDimensions().width/2;this.defaultHeight=c.offsetHeight;
this._height=Math.round((this._width*this.defaultHeight)/this.defaultWidth);if(a){this.top=a.top
}this.top=this.top||document.body.getDimensions().height/2;this.padleft=parseInt(Element.getStyle(c,"marginLeft").replace(/px/i,""));
this.padright=parseInt(Element.getStyle(c,"marginRight").replace(/px/i,""));this.padtop=parseInt(Element.getStyle(c,"marginTop").replace(/px/,""));
this.padbottom=parseInt(Element.getStyle(c,"marginBottom").replace(/px/,""))},windowSize:function(){var c=document.clientWidth||(document.documentElement.clientWidth||document.body.clientWidth);
var b=document.clientHeight||(document.documentElement.clientHeight||document.body.clientHeight);
var a=window.pageXOffset||(window.document.documentElement.scrollLeft||window.document.body.scrollLeft);
var d=window.pageYOffset||(window.document.documentElement.scrollTop||window.document.body.scrollTop);
if(AC.Detector.isiPhone()){c=parseInt(980);b=parseInt(1212)}return{width:c,height:b,x:a,y:d}
},popPosition:function(b){if(!this._popPosition||b){var d,c=null;var a=this.windowSize();
d=a.x+(a.width-this.defaultWidth-this.padleft-this.padright)/2;if(a.width<this.defaultWidth+this.padleft+this.padright){d=a.x-(this.padtop-this.closeBtnContainer.offsetWidth)
}c=(a.y+(a.height-this.defaultHeight-this.padtop-this.padbottom)/2);if(a.height<this.defaultHeight+this.padtop+this.padbottom){c=a.y-(this.padtop-this.closeBtnContainer.offsetHeight)
}if(c<0||c<20){c=20}this._popPosition={left:d,top:c}}return this._popPosition},setWidth:function(a){this.defaultWidth=a;
this.overlay.style.width=a+"px"},width:function(){return this.defaultWidth},setHeight:function(a){this.defaultHeight=a;
this.overlay.style.height=a+"px"},height:function(){return this.defaultHeight},prepPop:function(){},beforePop:function(){Element.addClassName(this.overlay,"isanim");
Element.addClassName(this.overlayshadow,"isanim");Element.addClassName(this.overlay,"popped");
Element.addClassName(this.overlayshadow,"popped");if(AC.Detector.isIEStrict()){}this.dispatchEvent("beforePop",this)
},pop:function(b,f,a,e,d){Element.setOpacity(this.overlay,0);Element.setOpacity(this.overlayshadow,0);
this._height=this._width*a/b;this.overlay.style.width=this._width+"px";this.overlay.style.height=this._height+"px";
this.overlay.style.left=this.left-this.padleft+"px";this.overlay.style.top=this.top-this.padtop+"px";
this.overlay.style.display="";var c=(100*b)/this._width;new Effect.Parallel([new Effect.MoveBy(this.overlay,f-this.top+this.padtop,e-this.left+this.padleft,{sync:true}),new Effect.Scale(this.overlay,c,{sync:true,scaleContent:false,scaleMode:{originalWidth:this._width,originalHeight:this._height}}),new Effect.Appear(this.overlay,{sync:true})],{duration:0.3,beforeStart:this.beforePop.bind(this),afterFinish:this.afterPop.bind(this)})
},afterPop:function(b,a){this.closeBtnContainer.style.display="block";this.currentSection.content.style.visibility="visible";
this.setPoppedClass();Event.observe((document.onresize?document:window),"resize",this.bindPositionOverlay);
this.dispatchEvent("afterPop",this)},positionOverlay:function(){var a=this.popPosition(true);
this.overlay.setStyle({top:a.top+"px",left:a.left+"px"})},superWillClose:AC.ViewMaster.Viewer.prototype.willClose,willClose:function(){this.dispatchEvent("beforeClose",this);
this.superWillClose(this,this.currentSection);if(this.currentSection){this.currentSection.willClose()
}},resetOverlay:function(){this.overlay.style.width="";this.overlay.style.height="";
this.overlay.setOpacity("")},setPoppedClass:function(){Element.removeClassName(this.overlay,"isanim");
Element.removeClassName(this.overlayshadow,"isanim");Element.addClassName(this.overlay,"popped");
Element.addClassName(this.overlayshadow,"popped")},setIsanimClass:function(){Element.addClassName(this.overlay,"isanim");
Element.addClassName(this.overlayshadow,"isanim");Element.removeClassName(this.overlay,"popped");
Element.removeClassName(this.overlayshadow,"popped")},close:function(b){if(b){Event.stop(b)
}var c=this.defaultWidth;var e=this.overlay.offsetLeft;var a=this.defaultHeight;
var d=this.overlay.offsetTop;if(e>=0&&d>=0){this.willClose(this);setTimeout(this._closeOpenOverlay.bind(this,c,e,a,d),10)
}},_closeOpenOverlay:function(b,e,a,d){if(!AC.Detector.isiPhone()){var c=(100*this._width)/b;
new Effect.Parallel([new Effect.MoveBy(this.overlay,this.top-this.padtop-d,this.left-this.padleft-e,{sync:true}),new Effect.Scale(this.overlay,c,{sync:true,scaleContent:false,scaleMode:{originalWidth:b,originalHeight:a}}),new Effect.Fade(this.overlay,{sync:true})],{duration:0.3,afterFinish:this.afterClose.bind(this)});
Event.stopObserving((document.onresize?document:window),"resize",this.bindPositionOverlay)
}else{this.afterClose()}},afterClose:function(){Element.removeClassName(this.overlay,"isanim");
Element.removeClassName(this.overlayshadow,"isanim");Element.removeClassName(this.overlay,"popped");
Element.removeClassName(this.overlayshadow,"popped");this.overlay.removeClassName(this.currentSection.id);
this.setOverlayShadowImageSrc(null);this.overlay.style.width="";this.overlayshadow.style.width="";
this.overlay.style.height="";this.overlayshadow.style.height="";this.overlay.style.left="-99999px";
this.overlayshadow.style.left="";this.overlay.style.top="0";this.overlayshadow.style.top="";
this.overlay.style.display="";this.overlayshadow.style.display="";this.dispatchEvent("afterClose",this);
if(AC.Detector.isWebKit()){this.fixSafarisScrollBars()}this.show(null,true);document.body.removeChild(this.overlay);
this._isDisplaying=false},fixSafarisScrollBars:function(){var a=1;var b=this.windowSize();
window.scroll(b.x+a,b.y+a);window.scroll(b.x,b.y)}});Event.onDOMReady(function(){AC.OverlayPanel.overlay=new AC.OverlayPanel()
});
