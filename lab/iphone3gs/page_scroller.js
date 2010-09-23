Effect.Transitions.customExponentialEaseOut=function(a){if(a==0){return 0}if(a==1){return 1
}return -Math.pow(2,-10*a)+1};AC.AnchorPageScroller=Class.create();Object.extend(AC.AnchorPageScroller.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.AnchorPageScroller.prototype,{triggerClassName:"scrollToAnchor",_triggerClicked:function(a){var c=a.element();
if(AC.Detector.isIEStrict()&&a.type==="mouseup"){if(c&&c.nodeName.toLowerCase()==="a"){c=c.down("."+this.triggerClassName)
}}else{while(c&&c.nodeName.toLowerCase()!="a"&&c.nodeName.toLowerCase()!="body"){c=c.parentNode
}}if(c&&c.href&&Element.Methods.hasClassName(c,this.triggerClassName)){var d=c.href.split("#");
if(d.length===2){Event.stop(a);this._onMouseScroll=this.cancelEffect.bind(this);
document.observe("mousewheel",this._onMouseScroll);document.observe("DOMMouseScroll",this._onMouseScroll);
this._onKeyDown=this.onKeyDown.bind(this);document.observe("keydown",this._onKeyDown);
this._currentDestination=d[1];var b={duration:0.375,transition:Effect.Transitions.customExponentialEaseOut,afterFinish:this.afterScroll.bind(this)};
this._scrollingEffect=new Effect.ScrollTo(this._currentDestination,b);this.trackClick()
}}},onKeyDown:function(a){if(a.keyCode==32||a.keyCode==33||a.keyCode==34||a.keyCode==35||a.keyCode==36||a.keyCode==37||a.keyCode==38||a.keyCode==39||a.keyCode==40){this.cancelEffect()
}},cancelEffect:function(a){if(this._scrollingEffect){this._scrollingEffect.cancel();
this._scrollingEffect=null}if(this._onMouseScroll){document.stopObserving("mousewheel",this._onMouseScroll);
document.stopObserving("DOMMouseScroll",this._onMouseScroll);this._onMouseScroll=null
}if(this._onKeyDown){document.stopObserving("keydown",this._onKeyDown);this._onKeyDown=null
}this.afterScroll()},afterScroll:function(){if(this._currentDestination){var a=window.location.href.split("#");
a[1]=this._currentDestination;window.location.href=(a[0]+"#"+a[1]);delete this._currentDestination
}},sectionWithId:function(a){return null},trackClick:function(){var a="Page Scroller - "+AC.Tracking.pageName()+" - "+this._currentDestination;
AC.Tracking.trackClick({prop3:a},this,"o",a)}});Event.onDOMReady(function(){AC.AnchorPageScroller.defaultAnchorScroller=new AC.AnchorPageScroller()
});