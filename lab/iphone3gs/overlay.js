if(typeof(tracker)=="undefined"){tracker=false}iPhoneOverlays={};Object.extend(iPhoneOverlays,Event.Listener);
Object.extend(iPhoneOverlays,{initialize:function(a){Event.observe(document,"click",this._triggerClicked.bindAsEventListener(this));
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
this.listenForEvent(AC.OverlayPanel.overlay,"afterClose",false,this.afterClose)
},_triggerClicked:function(a){var b=a.findElement("a");if(!b||!b.hasClassName("OverlayPanel")){return
}if(b.target){this.initialId=b.target.replace(/.*#/,"")}},willShow:function(a){var b=a.event_data.data.sender;
var c=a.event_data.data.incomingView;if(typeof(AC.OverlayPanel.overlay.slideshows)!="undefined"&&c&&c.id){if(c.id.match("hasslideshow")){AC.OverlayPanel.overlay.slideshows.each(function(d){d.start()
})}else{if(!c.id.match("slideshow")){AC.OverlayPanel.overlay.slideshows.each(function(d){d.stop();
d.contentController.show(d.contentController.sectionWithId(d.contentController.orderedSections[0]))
})}}}if(b.overlayId=="OverlayPanel"){this.overlay=b;if(c&&c.id){if(c.id.match("gallery")){this.gallery(c)
}else{if(c.id.match("howto")){this.howTo(c)}else{if(c.id=="install"){this.overlay.overlay.addClassName("installoverlay");
this.overlay.setOverlayShadowImageSrc("http://images.apple.com/iphone/images/overlay-install-bg-20090619.png")
}}}}}this.initialId=null},gallery:function(d){this.overlay.overlay.addClassName("galleryoverlay");
this.overlay.setOverlayShadowImageSrc("http://images.apple.com/iphone/images/overlay-gallery-bg-20090608.png");
if(!d.gallery){d.content.addClassName("galleryoverlay");var c=d.content.select("a");
c.each(function(e){e.addClassName(d.id+"Trigger")});var b=document.createElement("div");
b.id=d.id+"SwapView";b.className="gallerySwapView";d.content.appendChild(b);if(!this.initialId){this.initialId=c[0].href.replace(/.*#/,"")
}d.gallery=new AC.ViewMaster.Viewer(c,d.id+"SwapView",d.id+"Trigger",{initialId:this.initialId,silentTriggers:true,shouldAnimateContentChange:!(AC.Detector.isIE())})
}else{if(this.initialId){var a=d.gallery.sectionWithId(this.initialId);d.gallery.show(a,true);
a.replayMovie()}}},howTo:function(b){this.preloadScrollbarImages();this.overlay.overlay.addClassName("howtooverlay");
this.overlay.setOverlayShadowImageSrc("http://images.apple.com/iphone/images/overlay-howto-bg-20090608.png");
if(!b.howto){b.content.addClassName("howtooverlay");var a=b.content.down("div");
a.addClassName("overflow");var c=document.createElement("div");c.className="footer";
c.innerHTML='<a class="more" href="/iphone/how-to/">View all iPhone How-tos</a>';
b.content.appendChild(c);b.howto=true}},preloadScrollbarImages:function(b){if(!this.imagesHaveBeenPreloaded){var a=["http://images.apple.com/iphone/images/scrollbar-handle-20090608.png","http://images.apple.com/iphone/images/scrollbar-handle-hover-20090608.png","http://images.apple.com/iphone/images/scrollbar-handle-active-20090608.png","http://images.apple.com/iphone/images/scrollbar-20090608.png","http://images.apple.com/iphone/images/scrollbar-hover-20090608.png","http://images.apple.com/iphone/images/scrollbar-active-20090608.png"];
a.each(function(c){(new Image()).src=c});this.imagesHaveBeenPreloaded=true}},afterClose:function(a){var b=a.event_data.data;
b.overlay.removeClassName("howtooverlay");b.overlay.removeClassName("galleryoverlay");
if(typeof(AC.OverlayPanel.overlay.slideshows)!="undefined"){AC.OverlayPanel.overlay.slideshows.each(function(c){c.stop()
})}b.setOverlayShadowImageSrc(null)}});Event.onDOMReady(function(){iPhoneOverlays.initialize();
if(tracker==false){tracker=new AC.ViewMaster.Tracker("click")}});
