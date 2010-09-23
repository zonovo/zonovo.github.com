if(typeof(AC)=="undefined"){AC={}}AC.OverlayScreen=Class.create();Object.extend(AC.OverlayScreen.prototype,Event.Listener);
Object.extend(AC.OverlayScreen.prototype,Event.Publisher);Object.extend(AC.OverlayScreen.prototype,{initialize:function(a){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
this.listenForEvent(a,"beforeClose",false,this.willClose)},screen:function(e){var b=$(document.documentElement);
var d=b.getDimensions();var c=d.width;if(document.body.clientWidth>c){c=document.body.clientWidth
}var a=d.height;if(document.body.clientHeight>a){a=document.body.clientHeight}this._screen=new Element("div",{id:"OverlayPanelScreen",className:"overlaypanelscreen",style:"position:absolute; display:none; top:0; left:0; width:"+c+"px; height:"+a+"px;"});
document.body.appendChild(this._screen);this._screen.observe("click",e.close.bindAsEventListener(e))
},escape:function(a){this._escape=Event.observe(window,"keyup",function(b){if(b.keyCode==Event.KEY_ESC){if(a.currentSection){a.close()
}}}.bind(a))},willShow:function(b){var c=b.event_data.data.sender;var a=b.event_data.data.incomingView;
if(c.overlay){if(!this._escape){this.escape(c)}if(a){if(!this._screen){this.screen(c)
}new Effect.Appear(this._screen,{duration:1,from:0,to:0.85})}}},willClose:function(b,c,a){var d=b.event_data.data;
if(d.overlay){new Effect.Fade(this._screen,{duration:0.3,afterFinish:function(e){e.element.setOpacity(0)
}})}}});Event.onDOMReady(function(){AC.OverlayPanel.overlayScreen=new AC.OverlayScreen(AC.OverlayPanel.overlay)
});
