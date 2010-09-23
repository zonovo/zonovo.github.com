if(typeof(AC)==="undefined"){AC={}}if(typeof(document.event)==="undefined"){document.event={}
}if(Event.Publisher){Object.extend(document.event,Event.Publisher)}AC.SwapView=Class.create({_view:null,currentContent:null,delegate:null,initialize:function(a){if(typeof a==="string"){this._viewId=a
}else{this._view=$(a);this._resetView()}},view:function(){if(!this._view){this._view=$(this._viewId);
this._resetView()}return this._view},_resetView:function(){if(!this._view){return
}var b=this._view.childNodes,a;while(a=b[0]){this._view.removeChild(a)}this._view.addClassName("swapView")
},setDelegate:function(a){this.delegate=a},setContent:function(a){if(a===this.currentContent){return
}if(this.currentContent&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.currentContent)
}if(a&&typeof(this.delegate.isContentLoaded)==="function"){if(!this.delegate.isContentLoaded(this,a)){if(typeof(this.delegate.loadContent)==="function"){this.delegate.loadContent(this,a);
return}}}this.setLoadedContent(a)},setLoadedContent:function(b){if(typeof(this.delegate.willShow)==="function"){b=this.delegate.willShow(this,this.currentContent,b)
}var a=true,c;if(typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.currentContent,b)
}if(a&&typeof(this.delegate.willAnimate)==="function"){this.didAnimate=true;if(this.view()&&b&&this.currentContent!==b){this.view().appendChild(b)
}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}c=this.delegate.willAnimate(this,this.currentContent,b,this.didShow.bind(this,b))
}else{this.didAnimate=false;if(this.currentContent!==b){if(this.currentContent&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(b){this.view().appendChild(b)}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}}if(b){$(b).setOpacity(1)}this.didShow(b)}},didShow:function(a){if(this.currentContent&&(this.currentContent!==a)&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.currentContent,a)
}this.currentContent=a}});if(typeof(AC.ViewMaster)==="undefined"){AC.ViewMaster={}
}AC.ViewMaster.Viewer=Class.create({view:null,triggerClassName:null,currentSection:null,requestedSection:null,sections:null,orderedSections:null,_locked:false,_didShowInitial:false,options:null,initialize:function(e,k,g,n){if(g){this.triggerClassName=g
}this.sections=$H();this.orderedSections=[];this.options=n||{};this.silentPreviousSelection(this.options.silentPreviousSelection);
this.silentFirstSection(this.options.silentFirstSection);this.triggerEvent=this.options.triggerEvent||"click";
var d=null,l,h;if(e){for(h=0;h<e.length;h++){l=this.addSection(e.item(h));if(!d){d=l
}}}this.view=new AC.SwapView(k);this.view.setDelegate(this);var a=document.location.hash,f,c;
this.sectionRegExp=this.options.sectionRegExp||new RegExp(/#(.*)$/);c=a.match(this.sectionRegExp);
if(c&&c[1]){a=c[1]}if(a!==this.view._viewId){var j=document.getElementsByClassName(this.triggerClassName),b;
for(h=0,b;(b=j[h]);h++){if(b.getAttribute("href").match(new RegExp("#"+a+"(?![_w-])"))){f=this.sectionWithId(a);
if(f){d=f}break}}}if(!f&&typeof this.options.initialId==="string"&&this.options.initialId.length>0){d=this.sectionWithId(this.options.initialId)
}this.show(d);this._boundTriggerClicked=this._triggerClicked.bindAsEventListener(this);
if(typeof this.triggerEvent==="object"){for(var h=0,m;m=this.triggerEvent[h];h++){Event.observe(document,m,this._boundTriggerClicked)
}}else{Event.observe(document,this.triggerEvent,this._boundTriggerClicked)}if(AC.Detector.isIEStrict()){Event.observe(document,"mouseup",this._boundTriggerClicked)
}if(this.options.useKeyboardNav===true){this._boundKeyDown=this._keyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this._boundKeyDown)}if(typeof(this.listenForEvent)==="function"){this.selectSectionFromEventHandler=this.selectSectionFromEvent.bind(this);
this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.stopMovieIfItsPlaying);
this.listenForEvent(document.event,"replayMovie",false,this.stopMovieIfItsPlaying.bind(this));
if(this.options.parentSectionId){this.listenForEvent(AC.ViewMaster,"ViewMasterWillCloseNotification",false,function(o){var p=o.event_data.data;
if(this===p.sender){return}if(p.outgoingView&&p.outgoingView.id===this.options.parentSectionId){this.willClose(this.view,this.currentSection)
}})}}},initialSectionFromId:function(a){return this.sectionWithId(a)},sectionWithId:function(c){if(!c){return null
}var d=null;if(c&&this.sections.get(c)){d=this.sections.get(c)}if(d){return d}var b,a=null;
b=document.getElementById(c);if(b===this.view._view){b=null}if(!b){b=document.body.down("a."+this.triggerClassName+"[href*=#"+c+"]")
}if(!b){a=document.getElementsByName(c);if(a&&a.length>0){b=a[0]}if(b===this.view._view){b=null
}}if(b){if(b.tagName.toLowerCase()==="a"){if(Element.hasClassName(b,this.triggerClassName)){d=this.addSection(b)
}}else{d=this.addSection(b)}}return d},indexOfSection:function(a){return this.orderedSections.indexOf(a.id)
},selectSectionFromEvent:function(a){if(a.event_data.data.sender===this){return
}if(a.event_data.data.parentTriggerClassName!==this.triggerClassName){return}this.selectSectionWithIdEvent(a.event_data.data.parentSectionId,a.event_data.data.event)
},selectSectionWithIdEvent:function(f,e){var a=this.sectionWithId(f),d=null,b,c,g=false;
if(a){d=a.triggers();if(d&&d.length>0){for(b=0;(c=d[b]);b++){if(Element.Methods.hasClassName(c,this.triggerClassName)){g=true;
break}}}if(!g){c=document.createElement("a");c.className=this.triggerClassName;
c.href="#"+f;c.style.display="none";document.body.appendChild(c);a._triggers.push(c)
}this.triggerClicked(e,$(c))}},setDelegate:function(a){this.delegate=a;if(this.delegate&&typeof(this.delegate.didShow)==="function"&&this.currentSection&&this.currentSection.isContentLoaded()){this.delegate.didShow(this,this.previousSection,this.currentSection)
}},createSectionForContent:function(a){return new AC.ViewMaster.Section(a,this)
},addSection:function(a){var b=this.createSectionForContent(a);this.sections.set(b.id,b);
this.orderedSections.push(b.id);return b},silentPreviousSelection:function(a){if(typeof(a)=="boolean"){this._silentPreviousSelection=a
}return this._silentPreviousSelection},silentFirstSection:function(a){if(typeof(a)=="boolean"){this._silentFirstSection=a
}return this._silentFirstSection},currentTrigger:function(){return this._currentTrigger
},triggerClicked:function(a,b){b.addClassName("active");this._currentTrigger=b;
if(a&&this.options.silentTriggers){Event.stop(a)}var d=null,e;if(!!b.href.match(/#previous/)){d=this.getPreviousSection();
if(!d){return}}else{if(!!b.href.match(/#next/)){d=this.getNextSection();if(!d){return
}}else{var c=b.href.match(this.sectionRegExp);if(c){e=c[1]}else{e=b.name}d=this.sections.get(e)
}}if(!d){d=this.addSection(b)}if(d.isContentRemote()){if(d.isContentLoaded()){d.clearTrigger(b)
}if(a){Event.stop(a)}}if(d===this.currentSection){if(a){Event.stop(a)}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:b})
}return}else{if(!d){return}}this._didShowInitial=true;setTimeout(this.show.bind(this,d),1)
},_triggerClicked:function(a){if(this.options.passive){return}var c=a.element();
if(AC.Detector.isIEStrict()&&a.type==="mouseup"){if(c&&c.nodeName.toUpperCase()==="A"){c=c.down("."+this.triggerClassName)
}}else{while(c&&c.nodeName.toUpperCase()!=="A"&&c.nodeName.toUpperCase()!=="BODY"){c=c.parentNode
}}if(this._silentPreviousSelection!==true&&this._silentFirstSection!==true&&!this._locked){if(c&&c.href&&((previousSelection=c.href.toString().match(/SwapViewPreviousSelection$/))||c.href.toString().match(/SwapViewFirstSection$/))){c=$(c);
if(c.hasClassName(this.triggerClassName)||c.descendantOf(this.view.view())){Event.stop(a);
if(previousSelection){this.showPreviousSelection()}else{this.showFirst()}return
}}}if(c&&c.href&&Element.Methods.hasClassName(c,this.triggerClassName)){if(this._locked){Event.stop(a);
return}if(this.options.parentSectionId&&(typeof(this.stopListeningForEvent)==="function")&&(typeof(this.listenForEvent)==="function")&&(typeof(AC.ViewMaster.dispatchEvent)==="function")){var b=this;
Event.stop(a);this.stopListeningForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,function(d){this.stopListeningForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,arguments.callee);
b.triggerClicked(d,c);this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler)
});AC.ViewMaster.dispatchEvent("ViewMasterSelectSectionWithIdNotification",{sender:this,parentSectionId:this.options.parentSectionId,parentTriggerClassName:this.options.parentTriggerClassName,event:a,trigger:c})
}else{this.triggerClicked(a,c)}}},_keyDown:function(d){if(d.keyCode!==Event.KEY_LEFT&&d.keyCode!==Event.KEY_RIGHT){return
}var c=document.viewport.getScrollOffsets(),e=document.viewport.getHeight(),f=this.view.view(),b=f.getHeight(),a=f.cumulativeOffset()[1];
if(a>=c[1]&&Math.round(a+(b/2))<(c[1]+e)){if(d.keyCode===Event.KEY_LEFT){this.showPrevious()
}else{if(d.keyCode===Event.KEY_RIGHT){this.showNext()}}this.view.view().fire("AC.ViewMaster.Slideshow:stop",d.keyCode===Event.KEY_LEFT?"previous":"next")
}},isContentLoaded:function(b,a){return a.isContentLoaded()},loadContent:function(b,a){if(a){a.loadContent()
}},_showContentDidLoad:false,contentDidLoad:function(c,b,a){if(b&&b.firstChild){this._showContentDidLoad=true
}this.view.setLoadedContent(c);AC.loadRemoteContent.insertScriptFragment(b);this.scrollSectionToVisible(c);
if(this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}this._showContentDidLoad=false},show:function(c,b){if(this._locked||(!c&&!b)){return
}if(!this.options.alwaysShowSection&&c===this.currentSection){return}this._locked=true;
if(this.delegate&&typeof(this.delegate.willShowSection)==="function"){var a=this.delegate.willShowSection(this,this.previousSection,c);
if(a instanceof AC.ViewMaster.Section){c=a}}this.previousSection=this.currentSection;
this.currentSection=c;this.view.setContent(c);if(this.options.discontinuousPreviousNext){this.disablePreviousNextIfNeeded()
}this.scrollSectionToVisible(c)},disablePreviousNextIfNeeded:function(){var b=this.indexOfSection(this.currentSection),a=this.orderedSections.length-1;
this.previousTriggers=$$("."+this.triggerClassName+'[href="#previous"]');this.previousTriggers.each(function(c){if(b===0){c.addClassName("disabled")
}else{c.removeClassName("disabled")}});this.nextTriggers=$$("."+this.triggerClassName+'[href="#next"]');
this.nextTriggers.each(function(c){if(b===a){c.addClassName("disabled")}else{c.removeClassName("disabled")
}})},scrollSectionToVisible:function(a){if(typeof this.options.ensureInView==="boolean"&&this.options.ensureInView){if(this._didShowInitial){if(a._isContentLoaded){var b=a.content.viewportOffset()[1];
if(b<0||b>(document.viewport.getHeight()*0.75)){new Effect.ScrollTo(a.content,{duration:0.3})
}}}else{$(document.body).scrollTo()}return true}return false},showFirst:function(){this.show(this.getFirstSection())
},getFirstSection:function(){return this.sections.get(this.orderedSections[0])},showNext:function(){this.show(this.getNextSection())
},getNextSection:function(){var b=this.indexOfSection(this.currentSection);if(this.options.discontinuousPreviousNext===true&&b===this.orderedSections.length-1){return false
}else{var a=(this.orderedSections.length-1)===b?0:b+1;return this.sections.get(this.orderedSections[a])
}},showPrevious:function(){this.show(this.getPreviousSection())},getPreviousSection:function(){var a=this.indexOfSection(this.currentSection);
if(this.options.discontinuousPreviousNext===true&&a===0){return false}else{var b=0===a?this.orderedSections.length-1:a-1;
return this.sections.get(this.orderedSections[b])}},showPreviousSelection:function(){this.show(this.getPreviousSelection())
},getPreviousSelection:function(){if(this.previousSection){return this.previousSection
}var a=this.orderedSections.length;for(i=0;i<a;i++){if(this.orderedSections[i]!=this.currentSection.id){return this.sections.get(this.orderedSections[i])
}}return false},willShow:function(b,c,a){if(this.delegate&&typeof(this.delegate.willShow)==="function"){this.delegate.willShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection})
}this._repaintTriggers(this.previousSection,this.currentSection);if(this._didShowInitial&&a&&a!=this.previousSection){$(a.content).setOpacity(0);
$(a.content).removeClassName("hidden")}if(a){return a.willShow(this)}return null
},willClose:function(a,b){if(this.delegate&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillCloseNotification",{sender:this,outgoingView:b})
}if(this.previousSection){this.previousSection.willClose(this)}},shouldAnimateContentChange:function(d,c,b){var a=true;
if(this.delegate&&typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.previousSection,this.currentSection)
}else{a=(typeof this.options.shouldAnimateContentChange==="boolean")?this.options.shouldAnimateContentChange:true
}return(typeof a==="boolean")?a:true},willAnimate:function(b,c,a,e){var f=this.options.animationDuration||0.4;
var d=Math.random()+"Queue";if(!this._didShowInitial&&typeof(e)=="function"){e();
return}if(this.delegate&&typeof this.delegate.willAnimate=="function"){return this.delegate.willAnimate(this,c,a,e,d,f)
}if(this.options.shouldAnimateOpacityAndHeight){return this._animationPlusHeight(b,c,a,e,d,f)
}else{return this._animation(b,c,a,e,d,f)}},_animation:function(f,e,c,b,j,d){var h=f.view();
if(h){h.style.position="relative"}if(e){e.style.position="absolute"}if(c){c.style.position="absolute"
}var a=function(){if(h){h.style.position=""}if(e){e.style.position=""}if(c){c.style.position=""
}b()};if(AC.Detector.isCSSAvailable("transition")){c.setOpacity(0);c.setVendorPrefixStyle("transition","opacity "+d+"s");
if(e){e.setOpacity(1);e.setVendorPrefixStyle("transition","opacity "+d+"s")}window.setTimeout(function(){c.setOpacity(1);
e.setOpacity(0)},100);var g=function(k){if(k.target==c&&k.propertyName=="opacity"){c.removeVendorEventListener("transitionEnd",g,false);
a()}};c.addVendorEventListener("transitionEnd",g,false)}else{if(e){return new Effect.Parallel([new Effect.Opacity(e,{sync:true,from:1,to:0}),new Effect.Opacity(c,{sync:true,from:0,to:1})],{duration:d,afterFinish:a,queue:{scope:j}})
}else{return new Effect.Opacity(c,{from:0,to:1,duration:d,afterFinish:a,queue:{scope:j}})
}}},_animationPlusHeight:function(j,g,e,d,m,f){var l=j.view(),a=e.offsetHeight||0,c=l.offsetHeight||0,h=(a/c)*100;
if(l){l.style.position="relative"}if(g){g.style.position="absolute"}if(e){e.style.position="absolute"
}var b=function(){if(l){l.style.position=""}if(g){g.style.position=""}if(e){e.style.position=""
}d()};if(AC.Detector.isCSSAvailable("transition")){e.setOpacity(0);e.setVendorPrefixStyle("transition","opacity "+f+"s");
if(g){g.setOpacity(0)}window.setTimeout(function(){e.setOpacity(1)},100);if(!(AC.Detector.isiPad()||AC.Detector.isMobile())){l.setVendorPrefixStyle("transition","height "+f+"s")
}l.style.height=a+"px";var k=function(n){if(n.target==e&&n.propertyName=="opacity"){e.removeVendorEventListener("transitionEnd",k,false);
b()}};e.addVendorEventListener("transitionEnd",k,false)}else{if(g){return new Effect.Parallel([new Effect.Opacity(g,{sync:true,from:1,to:0}),new Effect.Opacity(e,{sync:true,from:0,to:1}),new Effect.Scale(l,h,{scaleMode:{originalHeight:c,originalWidth:l.offsetWidth},sync:true,scaleX:false,scaleContent:false})],{duration:f,afterFinish:b,queue:{scope:m}})
}else{return new Effect.Parallel([new Effect.Opacity(e,{sync:true,from:0,to:1}),new Effect.Scale(l,h,{scaleMode:{originalHeight:c,originalWidth:l.offsetWidth},sync:true,scaleX:false,scaleContent:false})],{duration:f,afterFinish:b,queue:{scope:m}})
}}},didAppendContent:function(a,b){if(this.delegate&&typeof this.delegate.didAppendContent==="function"){this.delegate.didAppendContent(this,b)
}},hideSwapViewLinks:function(c){var d=this.getPreviousSelection();if(!d||this._silentPreviousSelection===true){var a=c.select('a[href$="SwapViewPreviousSelection"]');
if(a.length>0){if(!this._previousSectionLinks){this._previousSectionLinks=[]}for(var b=a.length-1;
b>=0;b--){a[b].style.display="none";this._previousSectionLinks.push(a[b])}}}if(d&&this._silentPreviousSelection!==true&&this._previousSectionLinks&&this._previousSectionLinks.length>0){for(var b=this._previousSectionLinks.length-1;
b>=0;b--){this._previousSectionLinks[b].style.display="";this._previousSectionLinks.splice(b,1)
}}var d=this.getFirstSection();if(!d||d==this.currentSection||this._silentFirstSection===true){var a=c.select('a[href$="SwapViewFirstSection"]');
if(a.length>0){if(!this._firstSectionLinks){this._firstSectionLinks=[]}for(var b=a.length-1;
b>=0;b--){a[b].style.display="none";this._firstSectionLinks.push(a[b])}}}if(d&&d!==this.currentSection&&this._silentFirstSection!==true&&this._firstSectionLinks&&this._firstSectionLinks.length>0){for(var b=this._firstSectionLinks.length-1;
b>=0;b--){this._firstSectionLinks[b].style.display="";this._firstSectionLinks.splice(b,1)
}}},stopMovieIfItsPlaying:function(c){if(AC.ViewMaster.Viewer.allowMultipleVideos()!==true){if(c.event_data.data.incomingView){var b=c.event_data.data.sender,a=c.event_data.data.incomingView,d=false
}else{var b=this,a=c.event_data.data,d=true}if(b!=this||d){if(a&&this.currentSection&&((typeof(a.hasMovie)=="function"&&a.hasMovie())||(a.content&&a.content.getElementsByClassName("movieLink")[0]))&&this.currentSection.isMoviePlaying()){if(this.options.showPreviousOnStopMovie&&this.getPreviousSection()){this.showPreviousSelection()
}else{if(this.options.showFirstOnStopMovie&&this.getFirstSection()){this.showFirst()
}else{this.currentSection.stopMovie()}}}}}},didShow:function(b,c,a){if(a){this.hideSwapViewLinks(a)
}if(this.currentSection){this.currentSection.didShow(this)}this._didShowInitial=true;
this._locked=false;if(this.options.shouldAnimateOpacityAndHeight){window.setTimeout(function(){var d=b.view(),e=a.offsetHeight||0;
d.style.height=e+"px"},35)}if(!this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)=="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)=="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:this._currentTrigger})
}},_repaintTriggers:function(f,a){if(f){var e=f.triggers();for(var b=0,c;(c=e[b]);
b++){c.removeClassName("active")}e=f.relatedElements();for(var b=0,c;(c=e[b]);b++){c.removeClassName("active")
}}if(a){var d=a.triggers();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")
}d=a.relatedElements();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")}}}});
AC.ViewMaster.Viewer.allowMultipleVideos=function(a){if(typeof(a)=="boolean"){this._allowMultipleVideos=a
}return this._allowMultipleVideos};if(Event.Publisher){Object.extend(AC.ViewMaster,Event.Publisher)
}if(Event.Listener){Object.extend(AC.ViewMaster.Viewer.prototype,Event.Listener)
}AC.ViewMaster.Section=Class.create({content:null,moviePanel:null,controllerPanel:null,movie:null,_movieController:null,movieLink:null,endState:null,hasShown:false,_isContentRemote:false,isContentRemote:function(){return this._isContentRemote
},_isContentLoaded:true,isContentLoaded:function(){return this._isContentLoaded
},_onMoviePlayable:Prototype.EmptyFunction,_onMovieFinished:Prototype.EmptyFunction,id:null,triggers:function(){if(!this._triggers){this._triggers=[];
var e=new RegExp("#"+this.id+"$");if(this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp){e=this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp;
e=e.toString().replace(/^\//,"").replace(/\/$/,"");e=new RegExp(e.replace("(.*)",this.id))
}var d=document.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(d[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}var a=this.content.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(a[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}}return this._triggers},relatedElements:function(){if(!this._relatedElements){this._relatedElements=document.getElementsByClassName(this.id)
}return this._relatedElements},initialize:function(j,k){this.content=$(j);if(this.content.tagName.toLowerCase()==="a"){var c=this.content.getAttribute("href");
var e=c.split("#");this._contentURL=e[0];var f=window.location.href.split("#");
var d=j.className;var g=document.getElementsByTagName("base")[0];var a=g?g.href:null;
if(e.length===2){this.id=e[1]}if(this._contentURL.length>0&&(!a||this._contentURL!=a)&&(this._contentURL!==f[0])&&(!this._contentURL.startsWith("#")||this._contentURL!==c)){this._isContentRemote=true;
this._isContentLoaded=false}else{var h=$(this.id)||$("MASKED-"+this.id);if(h){this.content=h
}}if(!this.id){this.id=this.content.name}}else{this.id=j.id}if(!this._isContentRemote||this._isContentLoaded){this.content.setAttribute("id","MASKED-"+this.id)
}if(k){this.viewMaster=k}if(!this._isContentRemote&&this._isContentLoaded&&!this.content.hasClassName("content")){var b=this.content.getElementsByClassName("content")[0];
if(b){this.content=b}}this.isMobile=AC.Detector.isMobile()},clearTrigger:function(a){if(a.href===("#"+this.id)){return
}a.href="#"+this.id;a.removeAttribute("id");a.removeAttribute("name");if(!this.viewMaster.options.silentTriggers){document.location.hash=this.id
}},remoteContentDidLoad:function(a,b){this.clearTrigger(this.content);this.content=$(a);
this.content.setAttribute("id","MASKED-"+this.id);this._isContentLoaded=true;this.viewMaster.contentDidLoad(this,b)
},loadContent:function(){if(this._isContentLoaded){var b=this;b.viewMaster.contentDidLoad(b,null)
}else{if(this.content.className.indexOf("imageLink")!==-1){var a=document.createElement("div");
a.appendChild(this.content.cloneNode(true));this.remoteContentDidLoad(a)}else{if((this.content.className.indexOf("movieLink")!==-1)||(this.content.className.indexOf("audioLink")!==-1)){var a=document.createElement("div");
a.appendChild(this.content.cloneNode(true));this.remoteContentDidLoad(a)}else{AC.loadRemoteContent(this._contentURL,true,true,this.remoteContentDidLoad.bind(this),null,this)
}}}},shouldImportScriptForContentURL:function(h,g,c){var f=false;if(h.hasAttribute){f=h.hasAttribute("src")
}else{src=h.getAttribute("src");f=((src!=null)&&(src!==""))}if(!f){var b=navigator.userAgent.toLowerCase(),d=(b.indexOf("applewebkit")!=-1),e=parseInt(parseFloat(b.substring(b.lastIndexOf("safari/")+7))),j=(d&&e>=419),a;
if(j){a=h.innerHTML}else{a=h.text}if(a.search(/.*\.location\.replace\(.*\).*/)!==-1){return false
}return true}else{return true}},mediaType:function(){return this.movieLink?"video/quicktime":"text/html"
},willShow:function(){if(!this.hasShown){this.hasShown=true;var a=this.content.getElementsByClassName("imageLink");
for(var b=0;b<a.length;b++){this._loadImage(a[b])}if(!this.moviePanel){this.movieLink=this.content.getElementsByClassName("movieLink")[0];
this.posterLink=this.content.getElementsByClassName("posterLink")[0];if(this.movieLink){this._loadMovie()
}}}return this.content},_loadImage:function(b){var a=document.createElement("img");
if(b.protocol==="about:"){b.href="/"+b.pathname;b.href=b.href.replace(/^\/blank/,"")
}a.setAttribute("src",b.href);a.setAttribute("alt",b.title);b.parentNode.replaceChild(a,b)
},_loadMovie:function(){var a=this.isACMediaAvailable();this.moviePanel=$(document.createElement("div"));
this.moviePanel.addClassName("moviePanel");this.movieLink.parentNode.replaceChild(this.moviePanel,this.movieLink);
this.controllerPanel=$(document.createElement("div"));this.controllerPanel.addClassName("controllerPanel");
if(a===false){}else{this.moviePanel.appendChild(this.controllerPanel)}if(a===false){this.moviePanel.parentNode.insertBefore(this.controllerPanel,this.moviePanel.nextSibling)
}else{this.moviePanel.appendChild(this.controllerPanel)}this.endState=$(this.content.getElementsByClassName("endState")[0]);
if(this.endState){this.endState.parentNode.removeChild(this.endState);var b=$(this.endState.getElementsByClassName("replay")[0]);
if(b){b.observe("click",function(c){Event.stop(c);this.replayMovie()}.bindAsEventListener(this))
}}},_forceACQuicktime:false,isACMediaAvailable:function(){return(typeof(Media)!="undefined"&&this._forceACQuicktime===false)
},setShouldForceACQuicktime:function(a){this._forceACQuicktime=a},newMovieController:function(){if(this.isACMediaAvailable()){return this._movieControls||new Media.ControlsWidget(this.controllerPanel)
}else{return new AC.QuicktimeController()}},movieControls:function(){return this._movieControls
},didShow:function(c){var a=this.hasMovie()&&!this.isMobile,b=this.isACMediaAvailable();
if(b){if(a){this._movieControls=this.newMovieController();this._playMovie();if(this._movieController){this._movieController.setControlPanel(this._movieControls);
this.onMovieFinished=this.didFinishMovie.bind(this);this._movieController.setDelegate(this)
}else{this.controllerPanel.innerHTML=""}}else{this._playMovie()}}else{if(a){this._movieController=this.newMovieController();
this.controllerPanel.innerHTML="";this.controllerPanel.appendChild(this._movieController.render())
}this._playMovie();if(a){this._onMoviePlayable=this._movieController.monitorMovie.bind(this._movieController);
this._onMovieFinished=this.didFinishMovie.bind(this);this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}}},willClose:function(a){this._closeController();this._closeMovie()},_closeMovie:function(){if(this.movie&&this.moviePanel){if(!this.isACMediaAvailable()){this.moviePanel.removeChild(this.movie);
this.movie=null;this.moviePanel.innerHTML=""}else{if(AC.Detector.isIEStrict()){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}else{this.moviePanel.innerHTML=""}this.movie=null}}},_closeController:function(){if(this.isACMediaAvailable()){if(this._movieController&&this.hasMovie()&&!this.isMobile){this._movieController.stop();
this._movieController.setControlPanel(null);if(AC.Detector.isIEStrict()){this.controllerPanel.hide()
}this.controllerPanel.addClassName("inactive")}}else{if(this._movieController&&this._movieController.movie&&this.hasMovie()&&!this.isMobile){this._movieController.Stop();
this._movieController.detachFromMovie();this.controllerPanel.addClassName("inactive");
this._movieController.replay=this.replayMovie.bind(this);this.controllerPanel.observe("click",this._movieController.replay)
}}},hasMovie:function(){return !!this.movieLink},isMoviePlaying:function(){if(this._movieController){if(typeof(this._movieController.playing)==="function"){return this._movieController.playing()
}if(typeof(this._movieController.playing)==="boolean"){return this._movieController.playing
}}return false},stopMovie:function(){if(!this.hasMovie()){return}this._closeController();
this._closeMovie();if(this.endState){this.moviePanel.appendChild(this.endState)
}else{this.stopMovieWithNoEndState()}},stopMovieWithNoEndState:function(){var a=this;
setTimeout(function(){a.viewMaster.showPreviousSelection()},0)},didFinishMovie:function(){if(!this.hasMovie()){return
}this.stopMovie();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didFinishMovie",this)
}},defaultMovieWidth:function(){return 640},defaultMovieHeight:function(){return 480
},defaultOptions:function(){return{width:this.defaultMovieWidth(),height:this.defaultMovieHeight(),controller:false,posterFrame:null,showlogo:false,autostart:true,cache:true,bgcolor:"white",aggressiveCleanup:false}
},_playMovie:function(){if(this.movieLink&&this.moviePanel){var d=this.isACMediaAvailable();
if(!d){this.moviePanel.innerHTML=""}else{if(this.movie&&this.movie.parentNode==this.moviePanel){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}if(this.endState&&this.endState.parentNode==this.moviePanel){this.moviePanel.removeChild(this.endState)
}if(this.controllerPanel&&Element.hasClassName(this.controllerPanel,"inactive")){this.controllerPanel.show();
Element.removeClassName(this.controllerPanel,"inactive")}}if(this.posterLink&&this.posterLink.href){var b=this.posterLink.href
}var e=this.movieLink.getAttribute("href",2).toQueryParams(),a=this.defaultOptions(),c;
a.posterFrame=b;c=Object.extend(a,e);if(d===true){this._movieController=Media.create(this.moviePanel,this.movieLink.getAttribute("href",2),c);
if(this._movieController){this.movie=this._movieController.video().object()}}else{this.movie=AC.Quicktime.packageMovie(this.movieLink.id+"movieId",this.movieLink.getAttribute("href",2),c,this.moviePanel);
if(!AC.Quicktime.movieIsFlash){this.moviePanel.appendChild(this.movie)}}if(d===true&&!this.isMobile&&this.movie){this._movieControls.reset();
this.moviePanel.appendChild(this.controllerPanel)}if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}}},replayMovie:function(){var a=this.isACMediaAvailable();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("replayMovie",this)
}if(a){if(this.moviePanel&&this.endState){this.moviePanel.removeChild(this.endState)
}}this._playMovie();if(a){this.controllerPanel.show()}this.controllerPanel.removeClassName("inactive");
if(a){this._movieController.setControlPanel(this._movieControls);this._movieController.setDelegate(this)
}else{this.controllerPanel.stopObserving("click",this._movieController.replay);
this._movieController.replay=null;this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}}});AC.ViewMaster.SlideshowViewer=Class.create();Object.extend(AC.ViewMaster.SlideshowViewer.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.ViewMaster.SlideshowViewer.prototype,{_superInitialize:AC.ViewMaster.Viewer.prototype.initialize,initialize:function(d,a,e,c,b){this._superInitialize(d,a,e,b);
this.slideshow=new AC.ViewMaster.Slideshow(this,c,b)},setDelegate:function(a){this.delegate=a
},start:function(){this.slideshow.start()},stop:function(){this.slideshow.stop()
},reset:function(){if(this._isLocked){this._needsReset=true}else{this.slideshow.reset()
}},superDidShow:AC.ViewMaster.Viewer.prototype.didShow,didShow:function(b,c,a){this.superDidShow(b,c,a);
if(this._needsReset){this._needsReset=false;this.slideshow.reset()}},next:function(){this.slideshow.next()
},previous:function(){this.slideshow.previous()}});AC.ViewMaster.Slideshow=Class.create();
if(Event.Listener){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Listener)
}if(Event.Publisher){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Publisher)
}Object.extend(AC.ViewMaster.Slideshow.prototype,{contentController:null,animationTimeout:null,options:null,_playing:false,_active:false,_progress:0,setProgress:function(a){this._progress=a
},progress:function(){return this._progress},initialize:function(a,d,b){this.contentController=a;
this.triggerClassName=d;this.options=b||{};if(!this.options.addNoListeners){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.willShow);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",true,this.didShow)
}if(this.options.autoplay){this.start()}Event.observe(document,"click",this._triggerHandler.bindAsEventListener(this));
if(this.contentController.options.useKeyboardNav===true){var c=this.contentController.view.view();
Event.observe(c,"AC.ViewMaster.Slideshow:play",this.play.bindAsEventListener(this));
Event.observe(c,"AC.ViewMaster.Slideshow:stop",this.stop.bindAsEventListener(this))
}},start:function(){if(this._active){return}this._active=true;if(this.options.wipeProgress=="always"||this.options.wipeProgress=="on start"){this._progress=0
}this.play(true);this._repaintTriggers();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}},stop:function(){this._active=false;this.pause();this._repaintTriggers();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didEnd",this)
}},play:function(a){if(!this._active){return}if(this.options.wipeProgress=="always"||(this.options.wipeProgress=="on play"&&!a)){this._progress=0
}this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay());
this._playing=true},_update:function(){if(typeof(this.options.onProgress)=="function"){this.options.onProgress(this._progress,this.delay())
}if(this._progress>=this.delay()){this._progress=0;this.next()}else{this._progress+=this._heartbeatDelay();
this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay())
}},delay:function(){return this.options.delay||5000},_heartbeatDelay:function(){return this.options.heartbeatDelay||100
},pause:function(){clearTimeout(this.animationTimeout);this._playing=false},next:function(){if(this.options.willEnd&&(this.contentController.getNextSection()==this.contentController.getFirstSection())){if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didEnd",this)
}return}if(this.contentController.options.discontinuousPreviousNext===true){this.viewId=false;
var a=true}this.contentController.showNext();if(a===true){this.contentController.options.discontinuousPreviousNext=true;
this.contentController.disablePreviousNextIfNeeded()}},previous:function(){this.contentController.showPrevious()
},reset:function(){this.contentController.showFirst();this.setProgress(0)},willShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.pause()},didShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.play()},_triggerHandler:function(a){var b=a.element();if(this.options.stopOnContentTriggerClick&&(link=a.findElement("a"))&&link.hasClassName(this.contentController.triggerClassName)&&link.href.search(this.contentController.currentSection.id)==-1){this.stop();
return}if(b.hasClassName(this.triggerClassName)&&b.href.match(/#slideshow-toggle/)){Event.stop(a);
if(this._active){this.stop()}else{this.start()}}},_repaintTriggers:function(){if(!this.triggerClassName){return
}var b=document.getElementsByClassName(this.triggerClassName);for(var a=b.length-1;
a>=0;a--){this._repaintTrigger(b[a])}},_repaintTrigger:function(a){var b=$(a);if(this._active){b.addClassName("playing")
}else{b.removeClassName("playing")}}});AC.SlideView=Class.create(AC.SwapView,{_resetView:function(){if(!this._view){return
}this._view.addClassName("swapView")},setLoadedContent:function(b){if(typeof(this.delegate.willShow)==="function"){b=this.delegate.willShow(this,this.currentContent,b)
}var a=true,c;if(typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.currentContent,b)
}if(a&&typeof(this.delegate.willAnimate)==="function"){this.didAnimate=true;if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}c=this.delegate.willAnimate(this,this.currentContent,b,this.didShow.bind(this,b))
}else{this.didAnimate=false;if(this.currentContent!==b){if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}}if(b){$(b).setOpacity(1)}this.didShow(b)}},didShow:function(a){if(typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.currentContent,a)
}this.currentContent=a}});AC.ViewMaster.SlideViewer=Class.create(AC.ViewMaster.Viewer,{initialize:function(e,k,g,o){if(g){this.triggerClassName=g
}this.sections=$H();this.orderedSections=[];this.options=o||{};this.silentPreviousSelection(this.options.silentPreviousSelection);
this.silentFirstSection(this.options.silentFirstSection);this.triggerEvent=this.options.triggerEvent||"click";
var d=null,m,h;if(e){for(h=0;h<e.length;h++){m=this.addSection(e.item(h));if(!d){d=m
}}}this.view=new AC.SlideView(k);this.view.setDelegate(this);var a=document.location.hash,f,c;
this.sectionRegExp=this.options.sectionRegExp||new RegExp(/#(.*)$/);c=a.match(this.sectionRegExp);
if(c&&c[1]){a=c[1]}if(a!==this.view._viewId){var j=document.getElementsByClassName(this.triggerClassName),b;
for(h=0,b;(b=j[h]);h++){if(b.getAttribute("href").match(new RegExp("#"+a+"(?![_w-])"))){f=this.sectionWithId(a);
if(f){d=f}break}}}if(!f&&typeof this.options.initialId==="string"&&this.options.initialId.length>0){d=this.sectionWithId(this.options.initialId)
}this.show(d);this._boundTriggerClicked=this._triggerClicked.bindAsEventListener(this);
if(typeof this.triggerEvent==="object"){for(var h=0,n;n=this.triggerEvent[h];h++){Event.observe(document,n,this._boundTriggerClicked)
}}else{Event.observe(document,this.triggerEvent,this._boundTriggerClicked)}if(AC.Detector.isIEStrict()){Event.observe(document,"mouseup",this._boundTriggerClicked)
}if(this.options.useKeyboardNav===true){this._boundKeyDown=this._keyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this._boundKeyDown)}if(this.options.useTouchEvents===true){var l=this.view.view();
l.observe("touchstart",this._dragStart.bind(this));l.observe("touchmove",this._dragUpdate.bind(this));
l.observe("touchend",this._dragEnd.bind(this))}if(typeof(this.listenForEvent)==="function"){this.selectSectionFromEventHandler=this.selectSectionFromEvent.bind(this);
this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.stopMovieIfItsPlaying);
this.listenForEvent(document.event,"replayMovie",false,this.stopMovieIfItsPlaying.bind(this));
if(this.options.parentSectionId){this.listenForEvent(AC.ViewMaster,"ViewMasterWillCloseNotification",false,function(p){var q=p.event_data.data;
if(this===q.sender){return}if(q.outgoingView&&q.outgoingView.id===this.options.parentSectionId){this.willClose(this.view,this.currentSection)
}})}}},getNextSection:function($super){if(this.options.continuous){this._shouldBeContinuous=true
}return $super()},getPreviousSection:function($super){if(this.options.continuous){this._shouldBeContinuous=true
}return $super()},willShow:function($super,b,c,a){if(this.options.shouldAddActiveClassToContent===true){if(c){c.removeClassName("active")
}if(a){a.content.addClassName("active")}}return $super(b,c,a)},_currentDragPos:{},_dragStart:function(a){if(a.touches&&a.touches.length>1){return
}if(this._locked){this._wasLocked=true;return}this._dragging=true;var b=this.view.view();
this._currentViewContentOffset=b.getAttribute("left")||b.offsetLeft||0;this._currentDragPos.start=(a.touches)?a.touches[0].clientX:a.clientX;
this._currentDragPos.end=false;if(this.delegate&&typeof(this.delegate.willDrag)==="function"){this.delegate.willDrag(this,a)
}},_dragUpdate:function(a){if(a.touches&&a.touches.length>1){return}if(this._locked||this._wasLocked){return
}if(this._dragging){a.stop()}this._dragging=true;var b=(a.touches)?a.touches[0].clientX:a.clientX;
this._currentDragPos.end=this._currentDragPos.start-b;this._animate(this._currentViewContentOffset-this._currentDragPos.end,0);
if(this.delegate&&typeof(this.delegate.dragging)==="function"){this.delegate.dragging(this,a)
}},_dragEnd:function(a){if(a.touches&&a.touches.length>1){return}if(this._locked||this._wasLocked){this._wasLocked=false;
return}if((this.indexOfSection(this.currentSection)==0&&this._currentDragPos.end<0)||(this.indexOfSection(this.currentSection)==this.orderedSections.length-1&&this._currentDragPos.end>0)){this._animate(this._currentViewContentOffset,".3")
}else{if(this._currentDragPos.end>0){this.showNext()}else{if(this._currentDragPos.end<0){this.showPrevious()
}}}this._currentDragPos.start=false;this._currentDragPos.end=false;this._currentViewContentOffset=false;
this._dragging=false;if(this.delegate&&typeof(this.delegate.didDrag)==="function"){this.delegate.didDrag(this,a)
}},_animate:function(c,b){var a=this.view.view();if(b==0){a.setVendorPrefixStyle("transition","none")
}else{a.setVendorPrefixStyle("transition","-webkit-transform "+b+"s ease-out")}a.setAttribute("left",c);
if(AC.Detector.supportsThreeD()){a.setVendorPrefixStyle("transform","translate3d("+c+"px, 0, 0)")
}else{a.setVendorPrefixStyle("transform","translate("+c+"px, 0)")}},_animation:function(j,g,d,c,o,e){var m=j.view(),b=m.offsetLeft||0,l=-d.offsetLeft||0;
d.setOpacity(1);if(this._shouldBeContinuous){var f=this.indexOfSection(j.delegate.currentSection),h=this.indexOfSection(j.delegate.previousSection);
var a=l;if((f===0)&&(h===this.orderedSections.length-1)){l=(g.positionedOffset()[0]+g.getWidth())*-1;
this._continuousCloneElement=this._continuousClone(j,d,l)}else{if((f===this.orderedSections.length-1)&&(h===0)){l=(g.positionedOffset()[0]-g.getWidth())*-1;
this._continuousCloneElement=this._continuousClone(j,d,l)}}}var n=this;if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this._animate(l,e);
var k=function(p){if(p.target==m&&p.propertyName.match(/transform$/i)){m.removeVendorEventListener("transitionEnd",k,false);
n._continuousReset(a,j);c()}};m.addVendorEventListener("transitionEnd",k,false)
}else{return new Effect.Move(m,{x:l-b,y:0,duration:e,afterFinish:function(){n._continuousReset(a,j);
c()},queue:{scope:o}})}},_continuousClone:function(b,a,c){if(this._shouldBeContinuous){var d=a.cloneNode(true);
d.id=d.id+"-clone";d.innerHTML=a.innerHTML;d.setStyle("position: absolute; top: 0; left:"+(c*-1)+"px");
b._view.insert(d);return d}else{return false}},_continuousReset:function(b,a){if(this._shouldBeContinuous){a._view.setAttribute("left",b);
if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){a._view.setVendorPrefixStyle("transition","none");
if(AC.Detector.supportsThreeD()){a._view.setVendorPrefixStyle("transform","translate3d("+b+"px, 0, 0)")
}else{a._view.setVendorPrefixStyle("transform","translate("+b+"px, 0)")}}else{a._view.setStyle("left:"+b+"px")
}delete this._shouldBeContinuous}if(this._continuousCloneElement){if(this._removeContinuousCloneElement){this._continuousCloneElement.remove();
delete this._continuousCloneElement;delete this._removeContinuousCloneElement}else{this._removeContinuousCloneElement=true
}}}});AC.ViewMaster.CarouselViewer=Class.create(AC.ViewMaster.SlideViewer,{initialize:function($super,e,b,f,c,a,d){$super(e,b,f,c);
this.options.scaleControllerOptions=typeof a==="object"?a:{};this.options.videoControllerOptions=typeof d==="object"?d:{};
this._scaleController=new AC.ViewMaster.CarouselViewer.ScaleController(this,this.options.scaleControllerOptions)
},willShow:function($super,b,c,a){if(typeof this.videoController!=="undefined"){if(this.videoController.videoIsPlaying===true){this.videoController.stop()
}}return $super(b,c,a)},didShow:function($super,a){if(typeof this.videoController!=="undefined"){if(this.options.playVideoOnSectionSwap){var b=this.videoController.hasVideo(this.currentSection);
if(b!==false){this.videoController.play(b)}}}return $super(a)},_animate:function(c,b){var a=this.view.view();
if(b==0){a.setVendorPrefixStyle("transition","none")}else{a.setVendorPrefixStyle("transition","-webkit-transform "+b+"s linear")
}a.setAttribute("left",c);if(AC.Detector.supportsThreeD()){a.setVendorPrefixStyle("transform","translate3d("+c+"px, 0, 0)")
}else{a.setVendorPrefixStyle("transform","translate("+c+"px, 0)")}},_animation:function(g,d,b,a,k,c){var j=g._view;
this.currentLeft=this.newLeft||d.offsetLeft||0;this.newLeft=-b.offsetLeft;b.setOpacity(1);
var e=this.indexOfSection(g.delegate.currentSection),f=this.indexOfSection(g.delegate.previousSection);
if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this._animate(this.newLeft,c);
g._view.fire("ScaleController:Start",{incomingIndex:e,outgoingIndex:f});var h=function(l){if(l.target==j&&l.propertyName.match(/transform$/i)){j.removeVendorEventListener("transitionEnd",h,false);
g._view.fire("ScaleController:Stop");a()}};j.addVendorEventListener("transitionEnd",h,false)
}else{g._view.fire("ScaleController:Start",{incomingIndex:e,outgoingIndex:f});return new Effect.Move(j,{x:this.newLeft-this.currentLeft,y:0,duration:c,afterFinish:function(){g._view.fire("ScaleController:Stop");
a()},queue:{scope:k}})}}});AC.ViewMaster.CarouselViewer.VideoController=Class.create({defaultOptions:{createCloseButton:true,closeButtonHref:"#SwapViewFirstSection"},initialize:function(a,b){this.options=Object.extend(b||{},Object.clone(this.defaultOptions));
this.parent=a;this.parentContent=this.parent.view.view();this.viewId=this.parentContent.id;
this.videos=[];this.videoCanBeInline=(AC.Detector.isMobile())?false:true;if(this.videoCanBeInline){this.container=this._createContainer();
this.parentContent.insert({after:this.container});this.blankFirstSection=this._createBlankFirstSection();
this.view=new AC.ViewMaster.Viewer([this.blankFirstSection],this.container,this.viewId+"-trigger",{silentTriggers:true,shouldAnimateContentChange:false,showPreviousOnStopMovie:true});
this._boundTespondToKeyPress=this._respondToKeyPress.bindAsEventListener(this);
document.observe("keypress",this._boundTespondToKeyPress);this.view.setDelegate(this)
}},hasVideo:function(a){return this.view.sectionWithId(a.id+"-video")||false},play:function(a,b){if(this.videoIsPlaying){return false
}if(b!==true){this.view.show(a)}this.parent.view.view().fire("AC.ViewMaster.Slideshow:stop")
},stop:function(a){if(!this.videoIsPlaying){return false}if(a!==true){this.view.showFirst()
}},addSection:function(c,b){var a={};a.section=c;a.movieLink=b;a.baseId=a.section.id;
a.clickToPlaySection=this._createClickToPlay(a);a.movieLink.insert({after:a.clickToPlaySection});
if(this.videoCanBeInline){a.videoSection=this._createVideoSection(a);if(this.options.createCloseButton){a.videoSection.insert({top:this._createCloseButton(a)})
}}this.videos.push(a);if(this.videoCanBeInline){a.SwapViewSection=this.view.addSection(a.videoSection)
}if(this.videoCanBeInline){a.movieLink.addClassName("movieLink")}else{a.movieLink.remove()
}return a},willShow:function(a,c,b){if(b.id===this.viewId+"-video-controller"){this.container.removeClassName("videoIsPlaying");
this.parentContent.removeClassName("videoIsPlaying");this.videoIsPlaying=false}else{this.container.addClassName("videoIsPlaying");
this.parentContent.addClassName("videoIsPlaying");this.videoIsPlaying=true}},isInView:function(d){var c=document.viewport.getScrollOffsets(),e=document.viewport.getHeight(),f=this.view.view.view(),b=f.getHeight(),a=f.cumulativeOffset()[1];
return(a>=c[1]&&Math.round(a+(b/2))<(c[1]+e))},_respondToKeyPress:function(a){if(this.isInView()){if(a.keyCode===32){var b=this.hasVideo(this.parent.currentSection);
if(this.parent.options.playVideoOnSpacebarPress===true&&b!==false){a.stop();this.play(b)
}}}},_createContainer:function(){return new Element("div",{})},_createBlankFirstSection:function(){return new Element("div",{id:this.viewId+"-video-controller"})
},_createClickToPlay:function(b){var a=new Element("a",{"class":"pillbutton "+this.viewId+"-trigger",href:"#"+b.baseId+"-video"}).update("<span>Click to Play</span><b>&gt;</b>");
if(this.videoCanBeInline){a.observe("click",function(c){this.play(b.section,true)
}.bind(this))}else{a.href=b.movieLink.href}return a},_createVideoSection:function(a){var b=new Element("div",{"class":"movie-view",id:a.baseId+"-video"});
b.insert(a.movieLink);return b},_createCloseButton:function(b){var a=new Element("a",{"class":"close "+b.baseId+"-trigger",href:this.options.closeButtonHref}).update("close");
a.observe("click",function(c){this.stop(true)}.bind(this));return a}});AC.ViewMaster.CarouselViewer.ScaleController=Class.create({defaultOptions:{min:0.8,max:1},initialize:function(a,b){if(!b){b={}
}this.options=Object.clone(this.defaultOptions);Object.extend(this.options,b);this.view=a;
this.viewContent=this.view.view.view();this._useCSS3=AC.Detector.isCSSAvailable("transform")&&AC.Detector.isCSSAvailable("transition");
this._use3D=AC.Detector.supportsThreeD();if(this.view&&this.viewContent){this._setupSections();
this._boundStart=this.start.bindAsEventListener(this);this.viewContent.observe("ScaleController:Start",this._boundStart);
this._boundStop=this.stop.bindAsEventListener(this);this.viewContent.observe("ScaleController:Stop",this._boundStop);
this._boundInterval=this.set.bindAsEventListener(this);this.viewContent.observe("ScaleController:Set",this._boundInterval)
}},_setupSections:function(){this.sections=this.view.sections._object;this.sectionsContent=[];
this.view.orderedSections.each(this._setupSection.bind(this))},_setupSection:function(d){var c=this.sections[d];
var b=c===this.view.currentSection?true:false;c.dimensions=c.content.getDimensions();
c.dimensions.fontSize=parseFloat(c.content.getStyle("font-size"));this.sectionsContent.push(c.content);
if(b){this.set(c.content,this.options.max)}else{this.set(c.content,this.options.min)
}var a=c.content.down("a.carouselMovieLink");if(typeof a!=="undefined"){if(!this.view.videoController){this.view.videoController=new AC.ViewMaster.CarouselViewer.VideoController(this.view,this.view.options.videoControllerOptions)
}this.view.videoController.addSection(c,a)}if(this.view.options.shouldGotoSectionOnClick){c._boundGoToSectionOnClick=this._goToSectionOnClick.bindAsEventListener(c);
c.content.observe("click",c._boundGoToSectionOnClick)}},set:function(d,c,a){if(!a){a=false
}if(this._useCSS3){if(!a){d.setVendorPrefixStyle("transition",".01s -webkit-transform linear")
}if(this._use3D){d.setVendorPrefixStyle("transform","scale3d("+c+","+c+","+c+")")
}else{d.setVendorPrefixStyle("transform","scale("+c+")")}}else{var b=this._getProps(d,c,(c===this.options.max));
d.setStyle("width: "+b.width+"px;height: "+b.height+"px;padding-left: "+b["padding-left"]+"px;padding-right: "+b["padding-left"]+"px;padding-top: "+b["padding-top"]+"px;font-size: "+b["font-size"]+"px;");
d.setAttribute("scale",c)}},_goToSectionOnClick:function(a){if(this.viewMaster.currentSection!==this){this.viewMaster.show(this);
this.viewMaster.view.view().fire("AC.ViewMaster.Slideshow:stop")}},_getProps:function(b,d,c){if(!c){c=false
}var e=b.id.replace("MASKED-","");var a={width:Math.round(this.sections[e].dimensions.width*d),height:Math.round(this.sections[e].dimensions.height*d),"padding-left":Math.round(c?0:(this.sections[e].dimensions.width-(this.sections[e].dimensions.width*d))/2),"padding-top":Math.round(c?0:(this.sections[e].dimensions.height-(this.sections[e].dimensions.height*d))/2),"font-size":Math.round(this.sections[e].dimensions.fontSize*d*1000)/1000};
return a},_getDistanceBetween:function(c,a){var d=this.sectionsContent[a].offsetLeft,b=this.sectionsContent[c].offsetLeft;
return Math.abs(d-b)},start:function(b){this._data=b.memo;var d=0;var a=this._getDistanceBetween(this._data.outgoingIndex,this._data.incomingIndex);
var c=this;var f=function(h){var l=c._getDistanceBetween(h+g,h);var j=l/a;var k=j*c.view.options.animationDuration;
c.scaleInOut.delay(d,c,h,g,k);d+=k};if(this._data.outgoingIndex<this._data.incomingIndex){var g=-1;
for(var e=this._data.outgoingIndex-g;e<=this._data.incomingIndex;e+=1){f(e)}}else{var g=1;
for(var e=this._data.outgoingIndex-g;e>=this._data.incomingIndex;e-=1){f(e)}}},scaleInOut:function(a,b,d,c){a._animate(a.sectionsContent[b+(1*d)],a.options.min,c,0);
a._animate(a.sectionsContent[b],a.options.max,c,0)},stop:function(){delete this._data
},_animate:function(c,b,d){if(this._useCSS3){c.setVendorPrefixStyle("transition",d+"s -webkit-transform linear");
if(this._use3D){c.setVendorPrefixStyle("transform","scale3d("+b+","+b+","+b+")")
}else{c.setVendorPrefixStyle("transform","scale("+b+")")}}else{var a=this._getProps(c,b,(b===this.options.max));
new Effect.Morph(c,{style:"width: "+a.width+"px;height: "+a.height+"px;padding-left: "+a["padding-left"]+"px;padding-right: "+a["padding-left"]+"px;padding-top: "+a["padding-top"]+"px;font-size: "+a["font-size"]+"px;",duration:d});
c.setAttribute("scale",b)}}});AC.loadRemoteContent=function(g,j,c,h,a,e){if(typeof g!=="string"){return
}if(typeof j!=="boolean"){j=true}if(typeof c!=="boolean"){c=true}var f=arguments.callee;
var d=f._loadArgumentsByUrl[g];if(!d){f._loadArgumentsByUrl[g]={contentURL:g,importScripts:j,importCSS:c,callback:h,context:a,delegate:e};
var b={method:"get",onSuccess:arguments.callee.loadTemplateHTMLFromRequest,onFailure:arguments.callee.failedToadTemplateHTMLFromRequest,onException:function(k,l){throw (l)
}};if(!g.match(/\.json$/)){b.requestHeaders={Accept:"text/xml"};b.onCreate=function(k){k.request.overrideMimeType("text/xml")
}}new Ajax.Request(g,b)}};AC.loadRemoteContent._loadArgumentsByUrl={};AC.loadRemoteContent.loadTemplateHTMLFromRequest=function(b){var d=b.request.url;
var m=arguments.callee;var h=AC.loadRemoteContent._loadArgumentsByUrl[d];var q=window.document;
var k=b.responseXMLValue().documentElement;if(AC.Detector.isIEStrict()){k=k.ownerDocument
}var q=window.document;var l=document.createDocumentFragment();if(h.importScripts){AC.loadRemoteContent.importScriptsFromXMLDocument(k,l,h)
}if(h.importCSS){AC.loadRemoteContent.importCssFromXMLDocumentAtLocation(k,d,h)
}var r=null;var a=null;var g=k.getElementsByTagName("body")[0];if(!g){return}g.normalize();
var a=Element.Methods.childNodeWithNodeTypeAtIndex(g,Node.ELEMENT_NODE,0);var f=AC.Detector.isSafari2();
if(a){if(f){r=q._importNode(a,true)}else{r=q.importNode(a,true)}if(r.cleanSpaces){r.cleanSpaces(true)
}}else{if(g.cleanSpaces){g.cleanSpaces(true)}else{if(typeof g.normalize==="function"){g.normalize()
}}var j=g.childNodes;r=q.createDocumentFragment();var n=/\S/;for(var e=0,c=0;(c=j[e]);
e++){var o=(f)?q._importNode(c,true):q.importNode(c,true);r.appendChild(o)}}var p=h.callback;
p(r,l,h.context)};AC.loadRemoteContent.javascriptTypeValueRegExp=new RegExp("text/javascript","i");
AC.loadRemoteContent.javascriptLanguageValueRegExp=new RegExp("javascript","i");
AC.loadRemoteContent.documentScriptsBySrc=function(){if(!AC.loadRemoteContent._documentScriptsBySrc){AC.loadRemoteContent._documentScriptsBySrc={};
var b=document.getElementsByTagName("script");if(!b||b.length===0){return AC.loadRemoteContent._documentScriptsBySrc
}for(var c=0,a=null;(a=b[c]);c++){var d=a.getAttribute("type");var f=null;var g=a.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(d)&&!this.javascriptLanguageValueRegExp.test(g)){continue
}if(a.hasAttribute){var e=a.hasAttribute("src")}else{var e=Element.Methods.hasAttribute(a,"src")
}if(e){var f=a.getAttribute("src");AC.loadRemoteContent._documentScriptsBySrc[f]=f
}}}return AC.loadRemoteContent._documentScriptsBySrc};AC.loadRemoteContent.importScriptsFromXMLDocument=function(o,c,v){var f=o.getElementsByTagName("script"),g,j,q,w,d=v.contentURL,u=v.delegate,e=v.context,b=(u&&typeof u.shouldImportScriptForContentURL==="function"),k=true;
if(!c){c=document.createDocumentFragment()}var m=AC.loadRemoteContent.documentScriptsBySrc();
for(var s=0,n=null;(n=f[s]);s++){g=n.getAttribute("type");j=null;k=true;q=n.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(g)&&!this.javascriptLanguageValueRegExp.test(q)){continue
}if(n.hasAttribute){w=n.hasAttribute("src");j=n.getAttribute("src")}else{j=n.getAttribute("src");
w=((j!=null)&&(j!==""))}if(n.getAttribute("id")==="Redirect"||(b&&!u.shouldImportScriptForContentURL(n,d,e))){continue
}if(w){if(!m.hasOwnProperty(j)){var p=document.createElement("script");p.setAttribute("type","text/javascript");
if(AC.Detector.isIEStrict()){p.tmp_src=j;p.onreadystatechange=function(){var x=window.event.srcElement,y;
if(!x.isLoaded&&((x.readyState=="complete")||(x.readyState=="loaded"))){y=x.tmp_src;
if(y){x.tmp_src=null;x.src=y;x.isLoaded=false}else{x.onreadystatechange=null;x.isLoaded=true
}}}}else{p.src=j}AC.loadRemoteContent._documentScriptsBySrc[j]=j;c.appendChild(p)
}}else{var p=document.createElement("script");p.setAttribute("type","text/javascript");
if(AC.Detector.isIEStrict()){var l=new Function(n.text);p.onreadystatechange=function(){var x=window.event.srcElement;
if(!x.isLoaded&&((x.readyState=="complete")||(x.readyState=="loaded"))){x.onreadystatechange=null;
x.isLoaded=true;l()}}}else{var r=navigator.userAgent.toLowerCase();var a=(r.indexOf("applewebkit")!=-1);
var h=parseInt(parseFloat(r.substring(r.lastIndexOf("safari/")+7)));var t=(a&&h>=419);
if(t){p.innerHTML=n.innerHTML}else{p.text=n.text}}AC.loadRemoteContent._documentScriptsBySrc[j]=j;
c.appendChild(p)}}return c};AC.loadRemoteContent.insertScriptFragment=function(e){if(!e){return
}AC.isDomReady=false;Event._domReady.done=false;var d=document.getElementsByTagName("head")[0],g=e.childNodes,b,c,a=function(){var h;
if(!window.event||((h=window.event.srcElement)&&(h.isLoaded||((typeof h.isLoaded==="undefined")&&((h.readyState=="complete")||(h.readyState=="loaded")))))){arguments.callee.loadedCount++;
if(h&&!h.isLoaded){h.onreadystatechange=null;h.isLoaded=true}if(arguments.callee.loadedCount===arguments.callee.loadingCount){Event._domReady()
}}};a.loadedCount=0;a.loadingCount=e.childNodes.length;for(c=0;(b=g[c]);c++){if(b.addEventListener){b.addEventListener("load",a,false)
}else{if(typeof b.onreadystatechange==="function"){var f=b.onreadystatechange;b.onreadystatechange=function(h){var j=window.event.srcElement;
f.call(j);a()}}else{b.onreadystatechange=a}}}d.appendChild(e);d=null};AC.loadRemoteContent.documentLinksByHref=function(){if(!AC.loadRemoteContent._documentLinksByHref){AC.loadRemoteContent._documentLinksByHref={};
var b=document.getElementsByTagName("link");if(!b||b.length===0){return AC.loadRemoteContent._documentLinksByHref
}for(var c=0,e=null;(e=b[c]);c++){var d=e.getAttribute("type");if(e.type.toLowerCase()!=="text/css"){continue
}var f=null;if(e.hasAttribute){var a=e.hasAttribute("href")}else{var a=Element.hasAttribute(e,"href")
}if(a){var f=e.getAttribute("href");AC.loadRemoteContent._documentLinksByHref[f]=f
}}}return AC.loadRemoteContent._documentLinksByHref};AC.loadRemoteContent.__importCssElementInHeadFromLocation=function(e,g,b){var d=(e.tagName.toUpperCase()==="LINK");
if(d){var f=e.getAttribute("type");if(!f||f&&f.toLowerCase()!=="text/css"){return
}var c=e.getAttribute("href");if(!c.startsWith("http")&&!c.startsWith("/")){var j=c;
if(b.pathExtension().length>0){b=b.stringByDeletingLastPathComponent()}c=b.stringByAppendingPathComponent(j)
}if(AC.Detector.isIEStrict()){var a=window.document.createStyleSheet(c,1)}else{var h=window.document.importNode(e,true);
h.href=c}AC.loadRemoteContent.documentLinksByHref()[c]=c}if(!AC.Detector.isIEStrict()||(AC.Detector.isIEStrict()&&!d)){g.insertBefore(h,g.firstChild)
}};AC.loadRemoteContent.importCssFromXMLDocumentAtLocation=function(h,b,g){var j=window.document.getElementsByTagName("head")[0];
var c=[];c.addObjectsFromArray(h.getElementsByTagName("style"));c.addObjectsFromArray(h.getElementsByTagName("link"));
if(c){var d=AC.loadRemoteContent.documentLinksByHref();for(var e=0,f=null;(f=c[e]);
e++){var a=f.getAttribute("href");if(d.hasOwnProperty(a)){continue}this.__importCssElementInHeadFromLocation(f,j,b)
}}};Ajax.Request.prototype._overrideMimeType=null;Ajax.Request.prototype.overrideMimeType=function(a){this._overrideMimeType=a;
if(this.transport.overrideMimeType){this.transport.overrideMimeType(a)}};Ajax.Request.prototype._doesOverrideXMLMimeType=function(){return(this._overrideMimeType==="text/xml")
};Ajax.Response.prototype.responseXMLValue=function(){if(AC.Detector.isIEStrict()){var a=this.transport.responseXML.documentElement;
if(!a&&this.request._doesOverrideXMLMimeType()){this.transport.responseXML.loadXML(this.transport.responseText)
}}return this.transport.responseXML};