var existingVideo=false,existingVideoSrc=false,playExistingVideo=false,ac_media_language=false;
var MediaLanguage={translationDictionary:{en:"en.json","en-US":"en-US.json","en-CA":"en-CA.json","en-KR":"en-KR.json",es:"es.json","es-LA":"es-LA.json","es-MX":"es-MX.json",fr:"fr.json","fr-CA":"fr-CA.json",ja:"ja.json","ja-JP":"ja-JP.json",pt:"pt.json","pt-BR":"pt-BR.json",zh:"zh.json","zh-CN":"zh-CN.json","zh-HK":"zh-HK.json","zh-TW":"zh-TW.json"},getLangFromAttr:function(a){if(!a){return"en-US"
}switch(a.toLowerCase()){case"en-us":return"en-US";case"en-ca":return"en-CA";case"en-kr":return"en-KR";
case"ja-jp":return"ja-JP";case"pt":case"pt-br":return"pt-BR";case"es-419":case"es-la":return"es-LA";
case"es-mx":return"es-MX";case"fr-ca":return"fr-CA";case"ja-jp":return"ja-JP";case"zh-cn":return"zh-CN";
case"zh-hk":return"zh-HK";case"zh-tw":return"zh-TW";default:return a}},getTranslations:function(){var b=document.getElementsByTagName("html").item(0),a=b.getAttribute("lang"),d=this.getLangFromAttr(a),c=this.langDictionary(d);
new Ajax.Request("/global/scripts/ac_media_languages/"+c,{method:"get",requestHeaders:{Accept:"application/json"},onSuccess:function(e){ac_media_language=new Function("return "+e.responseText)()
}.bind(this),evalJS:false})},langDictionary:function(a){var c=a.toLowerCase().split("-")[0],b=this.translationDictionary[a]||false;
if(!b){b=this.translationDictionary[c]}if(!b){b=this.translationDictionary.en}return b
}};MediaLanguage.getTranslations();var Media={VERSION:"3.5",MIN_QUICKTIME_VERSION:"7.4",CAPTIONS_NS:"http://www.w3.org/2006/04/ttaf1",create:function(b,a,m){var e,l,j,f,c=true,k=true,d=true,i=AC.Detector.isiPad();
switch(true){case Media.Detection.Firefox():Element.addClassName(b,"mozilla");break;
case Media.Detection.Opera():Element.addClassName(b,"opera");break;case Media.Detection.IE():Media._createEventSource();
break;default:break}if(m.target==="quicktimeplayer"){m.spec="qt"}if(m.spec){switch(m.spec){case"qt":c=false;
d=false;break;case"video":case"audio":k=false;d=false;break;case"sbvdp":c=false;
k=false;break;default:break}}var g=(Media.Detection.Mobile())?Media.Detection.iPhoneOSVersion():null;
if(g&&g[0]<3){c=false;k=true}switch(true){case (i||(c&&Media._isHTML5VideoAvailable()&&!Media.Detection.Firefox()&&!Media.Detection.Mobile()&&!Media.Detection.Chrome()&&!Media.Detection.Opera())):if(m.audio==true&&typeof Media.Spec.Audio!==undefined){return h(Media.Spec.Audio)
}return h(Media.Spec.Video);break;case (k&&Media._isQuickTimeAvailable(Media.MIN_QUICKTIME_VERSION)):case Media.Detection.Mobile():return h(Media.Spec.QuickTime);
break;case (d&&Media._isSBVDPAvailable(Media.MIN_SBVDP_VERSION)):return h(Media.Spec.SBVDP);
break;case Media._shouldShowDownloadPrompt():default:Media.createDownloadPrompt(b,a,m);
break}function h(r){f=Media.Controller(b);e=r.create(b,a,m);l=Media.VideoInterface(e,f);
if(i&&(m.autoplay===true||m.autostart===true)){e.forcePlay()}var n=r.eventsToRegister;
for(var q in n){var o=n[q].name||n[q],p=n[q].callback;l.registerEvent(q,o,p)}if(r.pollForChanges){l.pollForChanges(r.pollForChanges)
}if(r.interfaceMethods){l.override(r.interfaceMethods)}l.setup();f.setVideo(l);
f.setVideoSrc(a);f.container=b;f.movieLoadingPanelClass="movie-loading-panel";if(typeof m.width!="undefined"&&typeof m.height!="undefined"){if(typeof f.currentWidth=="undefined"&&typeof f.currentHeight=="undefined"){f.currentWidth=m.width;
f.currentHeight=m.height}f.movieLoadingPanelClass="movie-loading-panel_"+m.width+"x"+m.height
}Element.addClassName(b,f.movieLoadingPanelClass);return f}return false},createDownloadPrompt:function(a,h,d){Element2.Methods.removeAllChildNodes(a);
var e=document.createElement("a"),f=document.createElement("span"),g=document.createElement("span"),c=document.createElement("span"),b=d.downloadUrl||ac_media_language.downloadquicktimeurl||"http://www.apple.com/quicktime/download/";
Element.addClassName(e,"quicktime-download");if(typeof d.width!=="undefined"&&typeof d.height!=="undefined"){Element.addClassName(e,"size"+d.width+"x"+d.height)
}e.setAttribute("href",b);Element.addClassName(f,"quicktime-download-title");Element.addClassName(g,"quicktime-download-text");
Element.addClassName(c,"quicktime-download-button");f.innerHTML=d.downloadTitle||ac_media_language.downloadquicktimetitle||"Get QuickTime.";
g.innerHTML=d.downloadText||ac_media_language.downloadquicktimetext||"Download QuickTime to view this video.<br />QuickTime is free for Mac + PC.";
c.innerHTML=d.downloadButton||ac_media_language.downloadquicktimebutton||"Download";
e.appendChild(f);e.appendChild(g);e.appendChild(c);a.appendChild(e);if("fire" in Element){Element.fire(document.body,"QuickTime:noCompatibleQTAvailable",{controller:this,minVersion:Media.MIN_QUICKTIME_VERSION})
}return e},_isHTML5VideoAvailable:function(){return Media.Detection.HTML5()},_isQuickTimeAvailable:function(){return Media.Detection.QuickTime(Media.MIN_QUICKTIME_VERSION)
},_isSBVDPAvailable:function(){return Media.Detection.SBVDP(Media.MIN_SBVDP_VERSION)
},_shouldShowDownloadPrompt:function(){return !Media.Detection.Mobile()},_createEventSource:function(){var c="qt_event_source",b,a;
if(document.getElementById(c)){return}b=document.createElement("object");b.id=c;
b.setAttribute("clsid","CB927D12-4FF7-4a9e-A169-56E4B8A75598");a=document.getElementsByTagName("head")[0];
a.appendChild(b)}};Media.Detection={HTML5:function(){if(!("HTMLMediaElement" in window)){return false
}var a=document.createElement("video");return(a.canPlayType&&a.canPlayType("video/mp4")!=="")
},QuickTime:function(a){return AC.Detector.isValidQTAvailable(a)},SBVDP:function(a){return AC.Detector.isSBVDPAvailable(a)
},Mobile:function(){return(AC.Detector.isiPad())?true:AC.Detector.isMobile()},iPhoneOSVersion:function(){return AC.Detector.iPhoneOSVersion()
},iPad:function(){return AC.Detector.isiPad()},Safari:function(){return AC.Detector.isSafari2()
},IE:function(){return AC.Detector.isIEStrict()},Firefox:function(){return AC.Detector.isFirefox()
},Opera:function(){return AC.Detector.isOpera()},Chrome:function(){return AC.Detector.isChrome()
},SnowLeopard:function(){return AC.Detector.isSnowLeopard()},SnowLeopard1062:function(){var c=AC.Detector.getAgent(),b=c.match(/mac\sos\sx\D*([\.\w]*)/i),a=false;
if(b&&b[1]){a=b[1]}return(AC.Detector.isWebKit()&&(a==="10_6_2"||a==="10_6_1"||a==="10_6"))
},CSSTransitions:function(){try{var a=document.createElement("div").style;a.setProperty("-webkit-transition","inherit",null);
a.setProperty("-moz-transition","inherit",null);a.setProperty("-o-transition","inherit",null);
a.setProperty("transition","inherit",null);return(a.getPropertyValue("-webkit-transition")=="inherit"||a.getPropertyValue("-moz-transition")=="inherit"||a.getPropertyValue("-o-transition")=="inherit"||a.getPropertyValue("transition")=="inherit")
}catch(b){return false}},CSSBorderRadius:function(){try{var a=document.createElement("div").style;
a.setProperty("-webkit-border-radius","inherit",null);a.setProperty("-moz-border-radius","inherit",null);
a.setProperty("-o-border-radius","inherit",null);a.setProperty("border-radius","inherit",null);
return(a.getPropertyValue("-webkit-border-radius").match("inherit")||a.getPropertyValue("-moz-border-radius").match("inherit")||a.getPropertyValue("-o-border-radius").match("inherit")||a.getPropertyValue("border-radius").match("inherit"))
}catch(b){return false}}};Media.Spec={Video:{create:function(b,a,l){var e=(l&&l.audio)?"audio":"video",d,i=(a.indexOf("?")>0)?a.substring(0,a.lastIndexOf("?")):a,h,k=i.lastIndexOf("."),j=(k>0)?i.substring(k+1,a.length):null,g="video/mp4";
if(j){j=j.split("#")[0];g=e+"/"+j}if(!AC.Detector.isiPad()&&existingVideo!=false){if(existingVideoSrc==i){d=existingVideo;
b.appendChild(d);playExistingVideo=true;return d}else{existingVideoSrc=false}}d=document.createElement(e);
h=document.createElement("source");d.playerType=e;if((d.playerType==="video"&&(d.canPlayType("video/mp4")||d.canPlayType("application/x-mpegURL")))||(d.playerType==="audio"&&(((AC.Detector.isWebKit()||AC.Detector.isMobile()||AC.Detector.isiPad())&&j==="mov")||d.canPlayType(g)))){if(d.playerType==="video"){g="video/mp4"
}var c=l.id||(b.id?b.id+"_video":""),f=(a.indexOf("?")>0)?a.substring(a.lastIndexOf("."),a.lastIndexOf("?")):a.substring(a.lastIndexOf("."),a.length);
d.setAttribute("id",c);Element.addClassName(d,d.playerType);if(d.playerType==="video"){h.setAttribute("src",i);
switch(f){case".m3u8":d.setAttribute("src",a);break;default:h.setAttribute("type",g);
d.appendChild(h);break}}else{d.setAttribute("src",a)}this._configure(d,i,l);Event.observe(window,"unload",function(){try{d.stop()
}catch(m){}d.style.display="none";d=null});b.appendChild(d);existingVideoSrc=i;
existingVideo=d}else{d=this._createFallback(b,a,l)}return d},eventsToRegister:{load:"load",loadedmetadata:"loadedmetadata",timeupdate:"timeupdate",durationchange:"durationchange",progress:"progress",playing:"playing",play:"play",pause:"pause",ended:"ended"},_captions:null,interfaceMethods:{readystate:function(){return this.readyState
},autoplay:function(){return this.autoplay},duration:function(){return this.duration
},time:function(){if(!this.webkitClosedCaptionsVisible&&this._captionsEnabled===true){if(typeof Media.Spec.Video._captions!=="undefined"){var k=Media.Spec.Video._captions.getElementsByTagName("p");
if(k.length>0){var m="";function g(q){var p=0;if(q){var n=q.split(":");switch(n.length){case 3:for(var o=0;
o<3;o++){p=p*60+parseFloat(n[o].replace(",","."))}break;case 4:for(var o=0;o<3;
o++){p=p*60+parseFloat(n[o].replace(",","."))}break;default:break}}return p}for(var j=0,a;
a=k[j];j++){var e=g(a.getAttribute("begin")),f=g(a.getAttribute("end"));if(this.currentTime<e){break
}if(this.currentTime>=e&&this.currentTime<f){m=a}}if(typeof m!="undefined"&&m!=this.currentCaption){this.currentCaption=m;
var d=m.childNodes,c=(typeof d!="undefined")?d.length:0,l="";for(var h=0;h<c;h++){var b=d.item(h);
if(b.nodeType==3){l+="<span>"+b.nodeValue+"</span>"}}if(l===""){this.trackTextSpan.style.display="none"
}else{this.trackTextSpan.style.display="inline-block";this.trackTextSpan.innerHTML=l
}}}}}return this.currentTime},setTime:function(a){this.currentTime=a},volume:function(){return this.volume
},setVolume:function(a){this.volume=a},muted:function(){return this.muted},setMuted:function(a){this.muted=a
},rate:function(){return this.playbackRate},setRate:function(a){this.playbackRate=a
},defaultRate:function(){return this.defaultPlaybackRate},src:function(){return this.src
},setSrc:function(a){this.src=a},status:function(){return this.status},percentLoaded:function(){var a=0;
try{a=this.buffered.end(0)/this.duration}catch(b){}return a},pause:function(){this.pause()
},play:function(){this.play()},paused:function(){return this.paused},ended:function(){return this.ended
},timeScale:function(){return 2997},movieType:function(){return"Video"},getContainer:function(){return this.parentNode
},setTrackTextSpan:function(a){this.trackTextSpan=a},setCaptionsAvailable:function(b,a){if((typeof Media.Spec.Video._captions!="undefined"&&Media.Spec.Video._captions!=null)||typeof this.webkitClosedCaptionsVisible!="undefined"){b();
return}var c;if(a.match(/\w+:\/\//i)){a=a.replace(/\w+:\/\/[^\/]+/i,"")}new Ajax.checkURL(a,b);
c=document.createElement("text");c.setAttribute("type","application/ttaf+xml");
c.setAttribute("src",a);this.appendChild(c);new Ajax.Request(a,{method:"get",requestHeaders:{Accept:"application/ttaf+xml"},onSuccess:function(d){var e=d.responseXMLValue().documentElement;
if(AC.Detector.isIEStrict()){e=e.ownerDocument}var f=e.getAttribute("xml:lang");
c.setAttribute("lang",f);Media.Spec.Video._captions=e.getElementsByTagNameNS(Media.CAPTIONS_NS,"body").item(0);
Media.Spec.Video._captions.currentIndex=0}.bind(this),onFailure:function(){},onException:function(){},onCreate:function(d){d.request.overrideMimeType("application/ttaf+xml")
}})},enableCaptions:function(){var a=this._videoClosedCaptionsEnabled;try{if(this._videoClosedCaptionsEnabled===true){this.webkitClosedCaptionsVisible=true
}}catch(b){}this._captionsEnabled=true},disableCaptions:function(){try{if(this._videoClosedCaptionsEnabled===true){this.webkitClosedCaptionsVisible=false
}}catch(a){}if(""!=this.currentCaption){this.currentCaption=this.trackTextSpan.innerHTML=""
}this._captionsEnabled=false},_videoClosedCaptionsEnabled:false,videoClosedCaptionsEnabled:function(){this._videoClosedCaptionsEnabled=(typeof this.webkitClosedCaptionsVisible!="undefined")?true:false;
return this._videoClosedCaptionsEnabled}},_configure:function(c,e,b){if(!b){return
}var d,a;for(d in b){if(b.hasOwnProperty(d)){if(typeof b[d]==undefined){continue
}a=d.toLowerCase();switch(a){case"type":case"src":case"data":case"classid":case"name":case"id":case"postdomevents":case"saveembedtags":case"factory":case"aggressiveCleanup":case"innerId":case"cache":case"aggressivecleanup":case"showlogo":break;
case ("class"):Element.addClassName(c,b[d]);break;case ("controller"):if(b[d]||(Media.Detection.iPad()&&c.tagName==="VIDEO")){c.setAttribute("controls","controls")
}break;case ("autoplay"):case ("autostart"):if(b[d]){c.setAttribute("autoplay","autoplay")
}break;case ("posterframe"):if(b[d]){c.setAttribute("poster",b[d])}break;default:if(typeof b[d]!=="undefined"){c.setAttribute(a,b[d])
}break}}}},_createFallback:function(a,c,b){if(Media._isQuickTimeAvailable()){return Media.Spec.QuickTime.create(a,c,b)
}if(Media._isSBVDPAvailable()){return Media.Spec.SBVDP.create(a,c,b)}if(Media._shouldShowDownloadPrompt()){return Media.createDownloadPrompt(a,c,b)
}return false}},QuickTime:{create:function(b,d,c){var f=this._createObject(d,c),a=null,e=c.id||(b.id?b.id+"_video":"");
f.setAttribute("id",e);if(!Media.Detection.IE()&&!Media.Detection.Mobile()){if(c.target==="quicktimeplayer"){a=this._innerObject=this._createInnerObject(d,c)
}else{a=this._embed=this._createEmbed(d,c)}f.appendChild(a)}else{f.style.behavior="url(#qt_event_source)";
if(c.aggressiveCleanup!==false){Event.observe(window,"unload",function(){try{f.Stop()
}catch(g){}f.style.display="none";f=null})}}this._configure(a,f,c);f.setAttribute("classid","clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B");
Element.addClassName(f,(f.playerType="quicktime"));b.appendChild(f);return a||f
},pollForChanges:["load","timeupdate","durationchange","progress","playing","play","pause","ended"],_captions:null,interfaceMethods:{setup:function(){},duration:function(){var b=0;
try{b=this.GetDuration()/this.GetTimeScale()}catch(a){}return b||0},time:function(){var b=0;
try{b=this.GetTime()/this.GetTimeScale()}catch(a){}return b||0},setTime:function(a){try{this.SetTime(a*this.GetTimeScale())
}catch(b){}},volume:function(){return this.GetVolume()/255},setVolume:function(a){this.SetVolume(a*255)
},muted:function(){return this.GetMute()},setMuted:function(a){this.SetMute(a)},rate:function(){var a;
try{a=this.GetRate()}catch(b){}return a||1},setRate:function(a){this.SetRate(a)
},status:function(){this.GetPluginStatus()},percentLoaded:function(){var a=0;try{a=this.GetMaxBytesLoaded()/this.GetMovieSize()
}catch(b){}return a},pause:function(){try{this.Stop()}catch(a){}},play:function(){try{this.Play()
}catch(a){}},paused:function(){try{return this.GetRate()===0}catch(a){}},ended:function(){return this.ended
},src:function(){var b;try{b=this.GetURL()}catch(a){}return b||""},setSrc:function(a){this.SetURL(a);
this.SetControllerVisible(false);if(typeof this._embed!="undefined"){this._embed.SetControllerVisible(false)
}},timeScale:function(){return this.GetTimeScale()},movieType:function(){return"QuickTime"
},getContainer:function(){return this._container},setTrackTextSpan:function(a){},setCaptionsAvailable:function(d,b){try{var a=this.GetTrackCount(),c;
for(c=1;c<=a;c++){if("Closed Caption"===this.GetTrackType(c)){Media.Spec.QuickTime._captions=c;
if(typeof d!="undefined"){d()}}}}catch(f){}},enableCaptions:function(){try{if(Media.Spec.QuickTime._captions==="undefined"){this.setCaptionsAvailable()
}this.SetTrackEnabled(Media.Spec.QuickTime._captions,true);this._captionsEnabled=true
}catch(a){}},disableCaptions:function(){try{this.SetTrackEnabled(Media.Spec.QuickTime._captions,false);
this._captionsEnabled=false}catch(a){}},videoClosedCaptionsEnabled:function(){return false
}},_configure:function(a,e,c){if(!c){return}var d=null,b=null;for(d in c){if(c.hasOwnProperty(d)){if(typeof c[d]==undefined){continue
}b=d.toLowerCase();switch(b){case ("type"):case ("src"):case ("data"):case ("classid"):case ("name"):case ("id"):case ("postdomevents"):case ("saveembedtags"):case ("factory"):case ("aggressiveCleanup"):break;
case ("class"):Element.addClassName(e,c[d]);break;case ("innerId"):if(a){a.setAttribute("id",c[d])
}break;case ("autoplay"):this._addParameter(e,"autostart",c[d]);this._addParameter(a,"autostart",c[d]);
break;case ("width"):case ("height"):e.setAttribute(b,c[d]);if(a){a.setAttribute(b,c[d])
}break;default:this._addParameter(e,b,c[d]);this._addParameter(a,b,c[d]);break}}}},_addParameter:function(b,a,c){if(!b){return
}var d=document.createElement("param");d.setAttribute("value",c);d.setAttribute("name",a);
b.appendChild(d);d=null},_createEmbed:function(b,a){var c=document.createElement("embed");
c.setAttribute("src",b);c.setAttribute("type","video/quicktime");if(!Media.Detection.Firefox()&&!Media.Detection.Opera()){c.setAttribute("wmode","transparent")
}c.setAttribute("postdomevents",true);c.setAttribute("controller",false);c.setAttribute("showlogo",false);
c.setAttribute("scale","tofit");if(a){if(!isNaN(parseInt(a.width,10))){c.setAttribute("width",a.width)
}if(!isNaN(parseInt(a.height,10))){c.setAttribute("height",a.height)}if(typeof a.target!="undefined"){c.setAttribute("target",a.target)
}}return c},_createInnerObject:function(c,b){var a=document.createElement("object");
a.setAttribute("type","video/quicktime");a.setAttribute("id",b.id+"Inner");a.setAttribute("name",b.id);
a.setAttribute("width","1");a.setAttribute("height","1");a.setAttribute("data",c);
this._addParameter(a,"target",b.target);this._addParameter(a,"postdomevents","true");
return a},_createObject:function(c,b){var a=document.createElement("object"),d="7,3,0,0";
if(Media.Detection.Mobile()&&b.posterFrame){this._addParameter(a,"src",b.posterFrame);
this._addParameter(a,"href",c);this._addParameter(a,"target","myself")}else{this._addParameter(a,"src",c);
if(!Media.Detection.Firefox()&&!Media.Detection.Opera()){this._addParameter(a,"wmode","transparent")
}}a.setAttribute("id",name);if(!Media.Detection.Mobile()){this._addParameter(a,"showlogo",false);
this._addParameter(a,"scale","tofit");this._addParameter(a,"saveembedtags",true);
this._addParameter(a,"postdomevents",true)}if(null!==b&&(typeof b.codebase!=="undefined")&&""!==b.codebase){d=b.codeBase
}a.setAttribute("codebase","http://www.apple.com/qtactivex/qtplugin.cab#version="+d);
return a}}};if(AC.Detector.isiPad()){HTMLMediaElement.prototype.forcePlay=function(){var a=this,b=document.createElement("a"),d=function(e){e.preventDefault();
a.play()},c;b.addEventListener("click",d,false);document.body.appendChild(b);c=document.createEvent("MouseEvents");
if(c.initMouseEvent){c.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
b.dispatchEvent(c)}document.body.removeChild(b)};HTMLMediaElement.prototype.forcePause=function(){var a=this,c=document.createElement("a"),b=function(e){e.preventDefault();
a.pause()},d;c.addEventListener("click",b,false);document.body.appendChild(c);d=document.createEvent("MouseEvents");
if(d.initMouseEvent){d.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
c.dispatchEvent(d)}document.body.removeChild(c)}}Media.VideoInterface=function(h,f){var b=h,e=f,a,c,g,d,i;
return{videoTitle:function(){return c},setVideoTitle:function(j){c=j},videoUrl:function(){return g
},setVideoUrl:function(j){g=j},videoDescription:function(){return d},setVideoDescription:function(j){d=j
},videoPosterFrame:function(){return i},setVideoPosterFrame:function(j){i=j},object:function(){return b
},setObject:function(j){b=j},setDelegate:function(j){e=j},setup:function(){},override:function(k){var l;
function j(m,n){return function(){return n.apply(b,arguments)}}for(l in k){this[l]=j(l,k[l])
}return this},registerEvent:function(l,j,k){if(!k&&typeof(j)=="function"){k=j;j=null
}var m=j||l;Event.observe(b,m,function(n){if(k){k.apply(this)}this.messageDelegate(l)
}.bind(this))},pollForChanges:function(j){if(a){window.clearInterval(a)}if(j){a=window.setInterval(function(){for(var k=0,l;
l=j[k];k++){this.messageDelegate(l)}}.bind(this),480)}},messageDelegate:function(j){if(!e){return
}j=j.charAt(0).toUpperCase()+j.substring(1);var k="videoReceived"+j+"Event";if(k in e){e[k](this)
}}}};Media.Controller=function(d){var n=d,t,s,i,v,k,q,b,c=false,l,g=false,m=false,e=false,f=true,r=true,j=false,x=false,a=false,p=false;
function u(z){if(!v||x||!g){return}v.show();window.clearTimeout(k);var y=v.element;
mouseElement=z.target||z.srcElement;if(mouseElement==y){k=window.setTimeout(function(){if(v&&typeof v!="undefined"){v.hide()
}},2500)}}function h(y){if(!v||!g){return}window.clearTimeout(k);k=window.setTimeout(function(){if(v){v.hide()
}},50)}function w(y){if(!v||!g){return}window.clearTimeout(k);k=window.setTimeout(function(){if(v){v.hide()
}},50)}function w(y){if(!v||x||!g){return}window.clearTimeout(k);v.show()}function o(y){if(!v){return
}window.clearTimeout(k);v.show()}return{_send:function(z,y){if(t&&z in t){y=[this].concat(y);
return t[z].apply(t,y)}},_fireEvent:function(y,z){Media.Controller.fireEvent(y,z)
},reset:function(){c=false;g=false;m=false;e=false},setDelegate:function(y){t=y
},setVideo:function(y){g=false;m=false;s=y;b=s.duration()||0;if(v&&v.videoObjectHasChanged){v.videoObjectHasChanged(s)
}return this},setVideoSrc:function(y){i=y},video:function(){return s},setControlPanel:function(y){setTimeout(function(){v=(s.tagName==="VIDEO"&&Media.Detection.iPad())?false:y;
if(v){if(existingVideo!=false&&playExistingVideo===true){s.play()}v.delegate=this;
Event.observe(d,"mousemove",u);Event.observe(d,"mouseout",h);Event.observe(d,"mouseover",w);
if(v.settingsMenu){Event.observe(v.settingsMenu,"mouseover",o)}s.setTrackTextSpan(v.trackText);
if(!v.settingsControlsAreSet&&(s.tagName==="VIDEO")){this.configureSettingsControls(i);
v.settingsControlsAreSet=true}if(v.element){v.element.parentNode.parentNode.style.width=this.currentWidth+"px";
v.element.parentNode.parentNode.style.height=this.currentHeight+"px"}if(s.object().tagName.toLowerCase()==="video"){this.setSizeAnimation(true)
}this.setVideoSizeForWidthAndHeight(this.currentWidth,this.currentHeight);v.setFocus()
}else{Event.stopObserving(d,"mousemove",u);Event.stopObserving(d,"mouseout",h);
Event.stopObserving(d,"mouseover",w)}return this}.bind(this),1)},beginSeeking:function(){if(c){return
}c=true;l=!s.paused()&&this.rate()==1;this.pause();var y=s.time();this._send("didStartJogging",y);
this._fireEvent("QuickTime:didStartJogging",{controller:this,time:y})},endSeeking:function(){var z=s.time(),y=s.duration();
c=false;this._send("didStopJogging",z);this._fireEvent("QuickTime:didStopJogging",{controller:this,time:z});
if(l){if(z!=y){this.play()}else{m=false;this.videoReceivedEndedEvent(this)}}},time:function(){return s.time()||this._lastTime||0
},setTime:function(y){s.setTime(y);this.videoReceivedTimeupdateEvent()},duration:function(){if(!b){b=s.duration()
}return b},volume:function(){return s.volume()},setVolume:function(y){s.setMuted(false);
s.setVolume(y);if(typeof v!="undefined"&&v!=null){v.volumeControlSetting=y}},setMuted:function(y){s.setMuted(y);
if(typeof v!="undefined"&&v!=null){v.volumeControlSetting=0}},toggleMute:function(){var y=s.muted();
if(y){this.setMuted(false)}else{this.setMuted(true)}return !y},playPause:function(){var y=s.paused(),z=this.rate();
if(y&&z===1){this.play()}else{if(z!==1){this.setRate(1)}else{this.pause()}}return s.paused()
},playing:function(){return e},play:function(){s.play();e=true;f=false},playing:function(){return e
},pause:function(){s.pause();e=false;r=false},stop:function(){s.pause();e=false;
r=false;m=true},setRate:function(y){s.setRate(y);if(y!==1||y!==0){j=true}else{j=false
}},rate:function(){return s.rate()},src:function(){return s.src()},setSrc:function(y){s.setSrc(y);
this._currentSrc=y},setSizeAnimation:function(y){a=y},_currentSrc:false,setVideoSizeForSrc:function(A){var z=this.moviePath(),y=A.substring(A.lastIndexOf("/")+1,A.length);
srcToSet=z+y,newWidth=y.substring(y.lastIndexOf("_")+1,y.lastIndexOf("x")),newHeight=y.substring(y.lastIndexOf("x")+1,y.lastIndexOf("."));
if(a===false||(s.percentLoaded()<1||(s.percentLoaded()>=1&&(this._currentSrc!=false&&i!=this._currentSrc)))){if(a===true){this.setSizeAnimation(false)
}this.setSrc(srcToSet)}this.setVideoSizeForWidthAndHeight(newWidth,newHeight)},setVideoSizeForWidthAndHeight:function(y,G){var z=s.object()||s.object().parentNode;
if(typeof v!="undefined"&&typeof z!="undefined"){function C(){if(typeof v!="undefined"){v.setControllerType();
v.setTrackContainerWidth()}}if(AC.Detector.isIEStrict()){var E=parseInt(G/2);z.style.marginTop="-"+E+"px";
v.element.style.marginTop="-"+E+"px"}if(s.percentLoaded()<1||a===false||Media.Detection.Chrome()){z.width=y;
z.height=G;if(s.movieType()!="Video"&&typeof z.parentNode!=null){z.parentNode.width=y;
z.parentNode.height=G}v.container.style.width=y+"px";v.container.style.height=G+"px";
if(v.element){v.element.style.width=y+"px";v.element.style.height=G+"px"}if(AC.Detector.isIEStrict()){var E=parseInt(G/2);
z.style.marginTop="-"+E+"px";v.element.style.marginTop="-"+E+"px";if(AC.Detector.getAgent().match(/msie 8/i)){var A=parseInt(y/2,10);
z.parentNode.style.left="50%";v.element.style.left="0";z.style.marginLeft="-"+A+"px";
v.element.style.marginLeft="-"+A+"px"}}}else{if(Media.Detection.CSSTransitions()===true&&s.movieType()!=="QuickTime"){z.style.width=y+"px";
z.style.height=G+"px";v.container.style.width=y+"px";v.container.style.height=G+"px";
v.element.style.width=y+"px";v.element.style.height=G+"px"}else{var F=[];if(v.controllerType==="slim"||v.controllerType==="short-slim"){v._hiding=true;
v._showing=false;v.fadeElement.style.opacity="0";v.fadeElement.style.visibility="hidden";
if(v.settingsMenu){Element.removeClassName(v.settingsMenu,v.settingsMenu.baseClassName+"-hovered")
}x=true}v.resetSettingsMenus();F.push(new Effect.Morph(z,{sync:true,style:{width:y+"px",height:G+"px"}}));
if(s.movieType!="Video"&&typeof z.parentNode!=null){F.push(new Effect.Morph(z.parentNode,{sync:true,style:{width:y+"px",height:G+"px"}}))
}F.push(new Effect.Morph(v.container,{sync:true,style:{width:y+"px",height:G+"px"}}));
F.push(new Effect.Morph(v.element,{sync:true,style:{width:y+"px",height:G+"px"}}));
var H=document.createElement("div");Element.addClassName(H,"ACMediaRedraw");var B=AC.Detector.getAgent();
var D=function(){z.style.outline="1px solid transparent";document.body.appendChild(H);
v.mouseoverSettingsControl(v.sizesControl);z.style.outline="none";document.body.removeChild(H);
v.hide();v.resetSettingsMenus()};new Effect.Parallel(F,{duration:0.4,beforeStart:function(){if(AC.Detector.isIEStrict()){var I=parseInt(z.offsetHeight/2);
z.parentNode.style.top="50%";z.style.top="0";v.element.style.top="0";z.style.marginTop="-"+I+"px";
v.element.style.marginTop="-"+I+"px";D()}},afterUpdate:function(){x=true;if(AC.Detector.isIEStrict()){var I=parseInt(z.offsetHeight/2);
z.parentNode.style.top="50%";z.style.top="0";v.element.style.top="0";z.style.marginTop="-"+I+"px";
v.element.style.marginTop="-"+I+"px";D()}},afterFinish:function(){if(AC.Detector.isIEStrict()){var I=parseInt(G/2);
z.parentNode.style.top="50%";z.style.top="0";v.element.style.top="0";z.style.marginTop="-"+I+"px";
v.element.style.marginTop="-"+I+"px";v.mouseoutSettingsControl(v.sizesControl);
v.hide()}C();window.clearTimeout(q);q=window.setTimeout(function(){if(v.controllerType==="slim"||v.controllerType==="short-slim"){v.fadeElement.style.visibility="visible";
v.fadeElement.style.opacity="1";v._hiding=false;v._showing=false}x=false},50)}})
}}C()}this.currentWidth=y;this.currentHeight=G},timeScale:function(){return s.timeScale()
},movieType:function(){return s.movieType()},moviePath:function(){var y,z="";if(typeof i!="undefined"&&i.length>0){y=i.substring(0,i.lastIndexOf("_"))+".html"
}else{return}if(y.match(/\w+:\/\//i)){if((window.location.href.match(/\w+:\/\/ic/i)||window.location.href.match(/\w+:\/\/www-dev/i))&&y.indexOf("/105")<0){y=y.replace(/\w+:\/\/[^\/]+/i,"/105")
}else{y=y.replace(/\w+:\/\/[^\/]+/i,"")}}z=y.substring(0,(y.lastIndexOf("/")+1));
return z},setCaptionsAvailable:function(y){var z=this.enableCaptionsControl.bind(this);
s.setCaptionsAvailable(z,y)},enableCaptionsControl:function(){if(v&&typeof v.enableCaptionsControl!=="undefined"){v.enableCaptionsControl();
return true}return false},enableCaptions:function(){s.enableCaptions();this._fireEvent("QuickTime:didSetClosedCaptions",{controller:this,enabled:true})
},disableCaptions:function(){s.disableCaptions();this._fireEvent("QuickTime:didSetClosedCaptions",{controller:this,enabled:false})
},enableCaptionsTextDisplay:function(){return s.videoClosedCaptionsEnabled()},resetCaptions:function(){s.disableCaptions()
},setSizesAvailable:function(A){this.sizesMenuOptions=A;for(var y=0,z;z=this.sizesMenuOptions[y];
y++){this.sizesMenuOptions["size_"+z.type]=z}this.enableSizesControl()},enableSizesControl:function(){if(v&&typeof v.enableSizesControl!=="undefined"){if(this.sizesMenuOptions.length>1){v.buildSizesMenu(this.sizesMenuOptions);
v.setSizesAvailable();v.enableSizesControl();return true}}return false},setDownloadAvailable:function(A){this.downloadMenuOptions=A;
for(var y=0,z;z=this.downloadMenuOptions[y];y++){this.downloadMenuOptions["download_"+z.type]=z
}this.enableDownloadControl()},enableDownloadControl:function(){if(v&&typeof v.enableDownloadControl!=="undefined"){if(this.downloadMenuOptions.length>0){v.buildDownloadMenu(this.downloadMenuOptions);
v.setDownloadAvailable();v.enableDownloadControl();return true}}return false},setShareAvailable:function(z){if(v&&typeof v.enableShareControl!=="undefined"&&ac_media_language.sharemenu){var E=document.getElementsByTagName("head").item(0),y=ac_media_language.sharemenu,C=this;
for(var D=0,F;F=y[D];D++){var B=document.createElement("script"),A;B.setAttribute("type","text/javascript");
B.pluginName=F.id;A=function(){if(typeof window.event!="undefined"){var G=window.event.srcElement;
if(!window.event||((G=window.event.srcElement)&&(G.isLoaded||((typeof G.isLoaded==="undefined")&&((G.readyState=="complete")||(G.readyState=="loaded")))))){if(G&&!G.isLoaded){G.onreadystatechange=null;
G.isLoaded=true}Event._domReady()}}};if(B.addEventListener){B.addEventListener("load",A,false)
}else{if(typeof B.onreadystatechange==="function"){B.onreadystatechange=function(){if(this.readyState=="complete"){A()
}}}else{B.onreadystatechange=A}}B.setAttribute("src",F.plugin);E.appendChild(B);
y[D].localScript=B}}},configureSettingsControls:function(z){if(existingVideo!=false&&p===true){return
}var y,A=document.body.parentNode.getAttribute("lang"),C=MediaLanguage.getLangFromAttr(A),B=this.moviePath();
if(typeof z!="undefined"&&z.length>0){y=z.substring(0,z.lastIndexOf("_"))+".json"
}else{return}if(y.match(/\w+:\/\//i)){if((window.location.href.match(/\w+:\/\/ic/i)||window.location.href.match(/\w+:\/\/www-dev/i))&&y.indexOf("/105")<0){y=y.replace(/\w+:\/\/[^\/]+/i,"/105")
}else{y=y.replace(/\w+:\/\/[^\/]+/i,"")}}new Ajax.Request(y,{method:"get",requestHeaders:{Accept:"application/json"},onSuccess:function(D){this.configSettings=new Function("return "+D.responseText)();
this.setSettingsControlsAvailableForLanguageAndPath(C,B)}.bind(this),onFailure:function(){if(typeof v!="undefined"){v.setTrackContainerWidth()
}}.bind(this),onException:function(){},evalJS:false})},setSettingsControlsAvailableForLanguageAndPath:function(E,K){var H=this.configSettings.metadata.captions,y=this.configSettings.metadata.sizes,J=this.configSettings.metadata.downloads,I=this.configSettings.metadata.share||true,F=this.configSettings.metadata.lang,B=this.configSettings.metadata.title,z=this.configSettings.metadata.description,D=this.configSettings.src,G=this.configSettings.posterframe||"http://images.apple.com/global/elements/overlay/overlay_movie_endstate_640x400_20081014.jpg";
if(typeof B!="undefined"){s.setVideoTitle(B)}if(typeof D!="undefined"){s.setVideoUrl(D)
}if(typeof z!="undefined"){s.setVideoDescription(z)}if(typeof G!="undefined"){s.setVideoPosterFrame(G)
}if(typeof H!="undefined"){var A=H.substring(H.lastIndexOf("/"),H.length),C=K+((A[0]==="/")?A.substring(1,A.length):A);
v.captionsUrl=C;this.setCaptionsAvailable(v.captionsUrl)}if(typeof y!="undefined"){this.setSizesAvailable(y)
}if(typeof downloadsList!="undefined"){this.setDownloadAvailable(J)}if(I){this.setShareAvailable()
}if(typeof C=="undefined"&&typeof y=="undefined"&&typeof downloadsList=="undefined"&&!I&&this.supprtsFullscreen()===false&&typeof v!="undefined"){v.setTrackContainerWidth()
}p=true},videoReceivedPlayingEvent:function(y){if(!g&&(this.movieType()=="Video"||(this.time()>0&&this.duration!=0))){if(v&&typeof v.mediaDidBecomePlayable!=="undefined"){v.mediaDidBecomePlayable()
}if(v&&typeof v.enableBasicControls!=="undefined"){v.enableBasicControls();v.setSettingsControls();
if(typeof v.captionsUrl!="undefined"&&!v.captionsControl.isEnabled){this.setCaptionsAvailable(v.captionsUrl)
}switch(true){case (typeof v.captionsControlSetting!="undefined"&&v.captionsControlSetting===true):s.enableCaptions();
break;default:break}}e=true;Element.removeClassName(this.container,this.movieLoadingPanelClass);
g=true;this._send("didBecomePlayable");this._fireEvent("QuickTime:canplaythrough",{controller:this});
this._send("didBegin");this._fireEvent("QuickTime:begin",{controller:this});k=window.setTimeout(function(){if(v&&typeof v!="undefined"){v.hide()
}},500)}},videoReceivedLoadEvent:function(z){if(v){var y=s.percentLoaded();v.updatePercentLoaded(y);
if(y<=1&&typeof v.captionsUrl!="undefined"&&!v.captionsControl.isEnabled){this.setCaptionsAvailable(v.captionsUrl)
}}},videoReceivedEndedEvent:function(y){var A=s.time();b=s.duration();if(m){return
}if(g&&((A>=b&&b!=0)||(s.movieType()=="SBVDP"&&b!=0&&A>=(b-0.5)))){m=true;this.videoReceivedTimeupdateEvent(this);
if(v){v.resetSettingsMenus();if(AC.Detector.isIEStrict()){var z=s.object();z.parentNode.style.width="";
z.parentNode.style.height="";z.parentNode.style.top="";z.style.top="";v.element.style.top="";
z.style.marginTop="";v.element.style.marginTop="";if(AC.Detector.getAgent().match(/msie 8/i)){z.parentNode.style.left="";
z.style.left="";v.element.style.left="";z.style.marginLeft="";v.element.style.marginLeft=""
}}}if(!c){this._send("onMovieFinished");this._send("didEnd");this._fireEvent("QuickTime:end",{controller:this})
}}},videoReceivedPlayEvent:function(y){this._currentPlayState="playing";if(f){return
}f=true;this._send("didStart");this._fireEvent("QuickTime:start",{controller:this})
},videoReceivedPauseEvent:function(y){this._currentPlayState="paused";if(r){return
}r=true;this._send("didStop");this._fireEvent("QuickTime:stop",{controller:this})
},videoReceivedTimeupdateEvent:function(y){var z=s.time()||0;if(v){v.updateTime(z)
}if(this._lastTime!=z){this._fireEvent("QuickTime:didPlayProgress",{controller:this,currentTime:z,duration:this.duration()})
}this._lastTime=z},videoReceivedProgressEvent:function(y){if(v){v.updatePercentLoaded(s.percentLoaded())
}switch(true){case (!g&&Media.Detection.SnowLeopard()&&this.movieType()=="Video"&&s.autoplay()===true&&s.readystate()>=3&&s.percentLoaded()>0.4):this.play();
break;default:break}},videoReceivedDurationchangeEvent:function(y){if(v){v.updateRemainingTime(this.duration()-this.time())
}}}};Media.Controller.fireEvent=function(b,c){var a=$(document.body);if("fire" in a){a.fire(b,c)
}};Media.ControlsWidget=function(g,a,c){this.settingsControlsAreSet=false;this.container=g;
this.delegate=a;this.options=c;Event.observe(document.body,"PluginClass:Added",this.registerPluginClass.bind(this));
for(var d=0,f;f=Media.ControlsWidget.pluginTypes[d];d++){for(var b=0,e;e=f[b];b++){this.registerPluginClass(e)
}}if(!Media.Detection.iPad()){this._createTemplate();this._setupControls()}};Media.ControlsWidget.registerPluginClass=function(a){var c=a.prototype.name(),d=a.prototype.pluginType(),b;
this.pluginTypes(d);this.pluginClassesForType;if(!(b=Media.ControlsWidget._pluginTypes[d])||!Media.ControlsWidget._pluginTypes.hasOwnProperty(d)){b=[];
Media.ControlsWidget._pluginTypes[d]=b;Media.ControlsWidget._pluginTypes.push(d)
}if(!b.hasOwnProperty(c)){b[c]=c;b.push(c)}Media.Controller.fireEvent("PluginClass:Added",{plugin:a,name:c,type:d})
};Media.ControlsWidget._pluginTypes=[];Media.ControlsWidget.pluginTypes=function(a){return this._pluginTypes
};Media.ControlsWidget.pluginClassesForType=function(a){return this.pluginTypes[a]
};Media.ControlsWidget.TEMPLATE='<div id="ACMedia-controls" class="ACMediaControls" tabindex="0">	<a href="#video"></a>	<div id="ACMedia-alert-display-container" class="ACMediaAlertDisplay"></div>	<div id="ACMedia-track-text" class="ACMediaTrackText"><span id="ACMedia-track-text-span"></span></div>    <div id="ACMedia-controls-panel" class="mediaControllerPanel">		<div class="slim-left-cap"></div>        <div id="ACMedia-media-controller" class="ACMediaController">            <div id="ACMedia-volume-mute" class="volumeMute"></div>            <div class="volumePanel">                <div id="ACMedia-volume-track" class="volumeTrack">                    <div id="ACMedia-control-volume-progress" class="volumeTrackProgress"></div>                    <div id="ACMedia-volume-handle" class="volumePlayHead"></div>                </div>            </div>			<div id="ACMedia-volume-full" class="volumeFull"></div>            <div id="ACMedia-control-fastbackward" class="fastBackward"></div>            <div id="ACMedia-control-play-pause"></div>            <div id="ACMedia-control-fastforward" class="fastForward"></div>			<div id="ACMedia-track-container" class="track-container">      	      <div id="ACMedia-control-time-display" class="timeDisplay"><span id="ACMedia-min-played">00</span>:<span id="ACMedia-sec-played">00</span></div>	            <div class="trackPanel">	                <div id="ACMedia-control-track" class="track">	                    <div id="ACMedia-control-loaded-progress" class="loadedProgress"></div>	                    <div id="ACMedia-control-track-progress" class="trackProgress"></div>	                    <div id="ACMedia-control-playhead" class="playHead"></div>	                </div>					<div id="ACMedia-track-end-cap" class="track-right-cap"></div>	            </div>	            <div id="ACMedia-control-duration-display" class="durationDisplay">-<span id="ACMedia-min-remain">00</span>:<span id="ACMedia-sec-remain">00</span></div>			</div>			<div id="ACMedia-settings-controls" class="settingsControls">				<div id="ACMedia-captions-control" class="captionsControl"></div>				<div id="ACMedia-sizes-control" class="sizesControl"></div>				<div id="ACMedia-download-control" class="downloadControl"></div>				<div id="ACMedia-share-control" class="shareControl"></div>			</div>        </div>		<div class="slim-right-cap"></div>    </div></div>';
Media.ControlsWidget.show=function(a){if(a.fadeElement&&!a._showing){if(a._effect){try{a._effect.cancel()
}catch(b){}delete a._effect}a._showing=true;a._hiding=false;if(a.fadeElement){if(Media.Detection.CSSTransitions()===true){a._effect=function(){Element.removeClassName(a.fadeElement,"fade")
};a._effect()}else{a._effect=new Effect.Opacity(a.fadeElement,{to:1,duration:0.5,afterFinish:function(){a._showing=false
}})}}}};Media.ControlsWidget.hide=function(a){if(a.fadeElement&&!a._hiding){if(a._effect){try{a._effect.cancel()
}catch(b){}delete a._effect}a._hiding=true;a._showing=false;if(a.fadeElement){if(Media.Detection.CSSTransitions()===true){a._effect=function(){a.resetSettingsMenus();
Element.addClassName(a.fadeElement,"fade")};a._effect()}else{a._effect=new Effect.Opacity(a.fadeElement,{to:0,duration:0.5,beforeStart:function(){a.resetSettingsMenus()
},afterFinish:function(){a._hiding=false}})}}}};Media.ControlsWidget.prototype={delegate:null,element:null,_plugins:[],_buildControlWithTitleOptions:function(d,c){var b=document.createElement("li"),a=document.createElement("a");
Element.addClassName(b,d);if(typeof c!="undefined"&&typeof c.url!="undefined"&&typeof c.name!="undefined"){a.setAttribute("href",c.url);
a.innerHTML=c.name;b.appendChild(a)}else{return}b.baseClassName=b.baseClassName||b.className;
Event.observe(b,"mousedown",function(e){Element.addClassName(this,this.baseClassName+"-active")
});Event.observe(b,"mouseup",function(e){Element.removeClassName(this,this.baseClassName+"-active")
});Event.observe(document.documentElement,"mouseup",function(e){Element.removeClassName(this,this.baseClassName+"-active")
});Event.observe(b,"mouseover",function(e){Element.addClassName(this,this.baseClassName+"-hover")
});Event.observe(b,"mouseout",function(e){Element.removeClassName(this,this.baseClassName+"-hover")
});return b},_sizesMenuControls:[],selectSizeFromMenu:function(c){if(typeof c!="undefined"){this._unselectMenu();
this._unselectControl(this.sizesControl);for(var b=0,a;a=this._sizesMenuControls[b];
b++){(a===c)?this._selectControl(a):this._unselectControl(a)}this._send("setVideoSizeForSrc",c.optionsUrl);
this.sizesControlSetting=c}},_getSizesMenuControl:function(b,d,a){var c=this._buildControlWithTitleOptions("size"+d,{url:a.src,name:(ac_media_language[b]||d)+" "+a.width+"x"+a.height});
c.appendChild(document.createElement("span"));c.optionsUrl=a.src;Event.observe(c,"click",function(e){Event.stop(e);
this.selectSizeFromMenu(c)}.bindAsEventListener(this));if(this.element.offsetWidth==a.width&&this.element.offsetHeight==a.height){this._selectControl(c)
}return c},buildSizesMenu:function(a){this.originalElementWidth=this.element.offsetWidth;
this.originalElementHeight=this.element.offsetHeight;if(Media.Detection.CSSTransitions()===true){this.element.style.width=this.originalElementWidth+"px";
this.element.style.height=this.originalElementHeight+"px"}if(typeof a.size_hd!="undefined"&&this.originalElementWidth>=a.size_hd.width&&this.originalElementHeight>=a.size_hd.height){this.sizesHDControl=this._getSizesMenuControl("hd","HD",a.size_hd);
this._sizesMenuControls.push(this.sizesHDControl);this.sizesMenu.appendChild(this.sizesHDControl)
}if(typeof a.size_large!="undefined"&&this.originalElementWidth>=a.size_large.width&&this.originalElementHeight>=a.size_large.height){this.sizesLargeControl=this._getSizesMenuControl("large","Large",a.size_large);
this._sizesMenuControls.push(this.sizesLargeControl);this.sizesMenu.appendChild(this.sizesLargeControl)
}if(typeof a.size_medium!="undefined"&&this.originalElementWidth>=a.size_medium.width&&this.originalElementHeight>=a.size_medium.height){this.sizesMediumControl=this._getSizesMenuControl("medium","Medium",a.size_medium);
this._sizesMenuControls.push(this.sizesMediumControl);this.sizesMenu.appendChild(this.sizesMediumControl)
}if(typeof a.size_small!="undefined"&&this.originalElementWidth>=a.size_small.width&&this.originalElementHeight>=a.size_small.height){this.sizesSmallControl=this._getSizesMenuControl("small","Small",a.size_small);
this._sizesMenuControls.push(this.sizesSmallControl);this.sizesMenu.appendChild(this.sizesSmallControl)
}return this._sizesMenuControls},_downloadMenuControls:[],_getDownloadMenuControl:function(c,f,b){var a=(f.match(/\//))?f.substring(0,f.indexOf("/")):f,d="mb";
var e=this._buildControlWithTitleOptions("download"+a,{url:b.src,name:(ac_media_language[c]||f)+" "+b.size+(ac_media_language[d]||"MB")});
Event.observe(e,"click",function(g){Event.stop(g);this._unselectMenu();this._unselectControl(this.downloadControl);
document.location.href=b.src}.bindAsEventListener(this));return e},buildDownloadMenu:function(a){if(typeof a.download_hd!="undefined"){this.downloadHDControl=this._getDownloadMenuControl("hd","HD",a.download_hd);
this._downloadMenuControls.push(this.downloadHDControl);this.downloadMenu.appendChild(this.downloadHDControl)
}if(typeof a.download_large!="undefined"){this.downloadLargeControl=this._getDownloadMenuControl("large","Large",a.download_large);
this._downloadMenuControls.push(this.downloadLargeControl);this.downloadMenu.appendChild(this.downloadLargeControl)
}if(typeof a.download_ipod!="undefined"){this.downloadiPodControl=this._getDownloadMenuControl("ipod","iPod/iPhone",a.download_ipod);
this._downloadMenuControls.push(this.downloadiPodControl);this.downloadMenu.appendChild(this.downloadiPodControl)
}return this._downloadMenuControls},_shareMenuControls:[],buildShareMenu:function(b){var d=b.name(),a=b.url();
var e=this[d.toLowerCase()+"Control"]=this._buildControlWithTitleOptions(d,{url:a,name:d});
var c=this._send("video");Event.observe(e,"click",function(f){Event.stop(f);b.share(c)
});this._shareMenuControls.push(e);this.shareMenu.appendChild(e);Element.addClassName(e,e.baseClassName+"-enabled");
return this._shareMenuControls},_registeredPlugins:[],registerPluginClass:function(b){var c=new b.memo.plugin(),d=c.name(),a=c.actionName(),e=c.pluginType();
this._registeredPlugins.push(c);this.buildShareMenu(c);if(!this.shareEnabled){this.setShareAvailable();
this.enableShareControl()}},_createTemplate:function(){function a(e){var c=document.createElement("div"),d;
c.innerHTML=e;d=c.firstChild;return d}this.setControllerType();var b=new Date();
this.timestamp=b.getTime();this.container.appendChild(a(Media.ControlsWidget.TEMPLATE));
this.element=document.getElementById("ACMedia-controls");this.element.id="ACMedia-controls_"+this.timestamp;
this.element.style.outline="none";Event.observe(this.element,"keydown",this.keyDownHandler.bindAsEventListener(this))
},_setRegularControllerType:function(){Element.removeClassName(this.container,"slim");
Element.removeClassName(this.container,"short-slim");this.controllerType="regular"
},_setSlimControllerType:function(){Element.addClassName(this.container,"slim");
Element.removeClassName(this.container,"short-slim");this.controllerType="slim"
},_setShortSlimControllerType:function(){Element.addClassName(this.container,"slim");
Element.addClassName(this.container,"short-slim");this.controllerType="short-slim"
},setControllerType:function(){switch(true){case Media.Detection.Firefox():case Media.Detection.Opera():case (typeof this.options!="undefined"&&this.options.slimController===true):case (typeof this.options!="undefined"&&this.options.controllerType==="slim"):if(this.container.offsetWidth<450){this._setShortSlimControllerType()
}else{this._setSlimControllerType()}break;case (this.container.offsetWidth<450&&!AC.Detector.isIEStrict()):this._setShortSlimControllerType();
break;default:this._setRegularControllerType()}if(!this.volumeScrubber){this.createVolumeScrubber()
}},setFocus:function(){if(this.element){window.setTimeout(function(){try{this.element.focus()
}catch(a){this.setFocus()}}.bind(this),50)}},_setupControls:function(){var g=this.timestamp;
this.fadeElement=d("ACMedia-controls-panel");this.trackEndCap=d("ACMedia-track-end-cap");
function a(j){var i=j.id;j.id=i+"_"+g;return j.id}function f(i){i.baseClassName=i.baseClassName||i.className
}function b(k){f(k);function i(l){Element.addClassName(this,this.baseClassName+"-active")
}function j(l){Element.removeClassName(this,this.baseClassName+"-active")}Event.observe(k,"mousedown",i.bind(k));
Event.observe(k,"mouseup",j.bind(k));Event.observe(document.documentElement,"mouseup",j.bind(k))
}function e(j){if(!j.baseClassName){f(j)}function k(l){Element.addClassName(this,j.baseClassName+"-hover")
}function i(l){Element.removeClassName(this,j.baseClassName+"-hover")}Event.observe(j,"mouseover",k.bind(j));
Event.observe(j,"mouseout",i.bind(j))}function d(k){var j=document.getElementById(k),i=a(j);
return j}this.toggleControl=d("ACMedia-control-play-pause");this.playControl=document.createElement("div");
Element.addClassName(this.playControl,"play");b(this.playControl);this.playControl.id="ACMedia-play-control_"+this.timestamp;
Event.observe(this.playControl,"click",this.play.bind(this));this.playControl.innerHTML=ac_media_language.play||"Play";
this.playControl.style.display="none";this.pauseControl=document.createElement("div");
Element.addClassName(this.pauseControl,"pause");b(this.pauseControl);this.pauseControl.id="ACMedia-pause-control_"+this.timestamp;
Event.observe(this.pauseControl,"click",this.pause.bind(this));this.pauseControl.innerHTML=ac_media_language.pause||"Pause";
this.pauseControl.style.display="none";Element.show(this._send("playing")?this.pauseControl:this.playControl);
var c=this.toggleControl;c.appendChild(this.playControl);c.appendChild(this.pauseControl);
this.fastBackwardControl=d("ACMedia-control-fastbackward");this.fastBackwardControl.innerHTML=ac_media_language.fastreverse||"Fast Reverse";
Event.observe(this.fastBackwardControl,"click",this.fastBackward.bind(this));b(this.fastBackwardControl);
this.fastForwardControl=d("ACMedia-control-fastforward");this.fastForwardControl.innerHTML=ac_media_language.fastforward||"Fast Forward";
Event.observe(this.fastForwardControl,"click",this.fastForward.bind(this));b(this.fastForwardControl);
this.volumeMuteControl=d("ACMedia-volume-mute");this.volumeMuteControl.innerHTML=ac_media_language.mutevolume||"Mute Volume";
Event.observe(this.volumeMuteControl,"click",this.muteVolume.bind(this));b(this.volumeMuteControl);
this.volumeFullControl=d("ACMedia-volume-full");this.volumeFullControl.innerHTML=ac_media_language.fullvolume||"Full Volume";
Event.observe(this.volumeFullControl,"click",this.fullVolume.bind(this));b(this.volumeFullControl);
this.settingsControls=d("ACMedia-settings-controls");f(this.settingsControls);this.captionsControl=d("ACMedia-captions-control");
if(!AC.Detector.isIEStrict()){this.captionsControl.innerHTML=ac_media_language.captionscontrol||"Closed Captions"
}Event.observe(this.captionsControl,"click",this.toggleCaptions.bind(this));b(this.captionsControl);
this.sizesControl=d("ACMedia-sizes-control");if(!AC.Detector.isIEStrict()){this.sizesControl.innerHTML=ac_media_language.sizescontrol||"Video Size"
}this.sizesControl.controlName="sizes";Event.observe(this.sizesControl,"click",this.toggleSizesMenu.bind(this));
b(this.sizesControl);Event.observe(this.sizesControl,"mouseover",this.mouseoverSettingsControl.bind(this,this.sizesControl));
Event.observe(this.sizesControl,"mouseout",this.mouseoutSettingsControl.bindAsEventListener(this,this.sizesControl));
this.downloadControl=d("ACMedia-download-control");if(!AC.Detector.isIEStrict()){this.downloadControl.innerHTML=ac_media_language.downloadcontrol||"Download Video"
}this.downloadControl.controlName="download";Event.observe(this.downloadControl,"click",this.toggleDownloadMenu.bind(this));
b(this.downloadControl);Event.observe(this.downloadControl,"mouseover",this.mouseoverSettingsControl.bind(this,this.downloadControl));
Event.observe(this.downloadControl,"mouseout",this.mouseoutSettingsControl.bindAsEventListener(this,this.downloadControl));
this.shareControl=d("ACMedia-share-control");if(!AC.Detector.isIEStrict()){this.shareControl.innerHTML=ac_media_language.sharecontrol||"Share Video"
}this.shareControl.controlName="share";Event.observe(this.shareControl,"click",this.toggleShareMenu.bind(this));
b(this.shareControl);Event.observe(this.shareControl,"mouseover",this.mouseoverSettingsControl.bind(this,this.shareControl));
Event.observe(this.shareControl,"mouseout",this.mouseoutSettingsControl.bindAsEventListener(this,this.shareControl));
this.settingsMenu=document.createElement("div");if(Media.Detection.CSSBorderRadius()===false){this.settingsMenuRoundRect=this.getRoundRectForArcAndOpacity(0.05,0.9);
this.settingsMenu.appendChild(this.settingsMenuRoundRect)}this.settingsMenu.id="ACMedia-settings-menu_"+this.timestamp;
Element.addClassName(this.settingsMenu,"ACMediaSettingsMenu");document.body.appendChild(this.settingsMenu);
this.settingsMenu.baseClassName="ACMediaSettingsMenu";this.settingsMenuCarrot=document.createElement("div");
Element.addClassName(this.settingsMenuCarrot,"ACMediaSettingsMenuCarrot");this.settingsMenu.appendChild(this.settingsMenuCarrot);
this.settingsMenuTitle=document.createElement("div");Element.addClassName(this.settingsMenuTitle,"ACMediaSettingsMenuTitle");
this.settingsMenu.appendChild(this.settingsMenuTitle);this.mediaController=d("ACMedia-media-controller");
this.speedDisplayAlert=document.createElement("div");this.captionsDisplayAlert=document.createElement("div");
Element.addClassName(this.captionsDisplayAlert,"ACMediaCaptionsDisplay");this.alertDisplayContainer=d("ACMedia-alert-display-container");
this.trackText=d("ACMedia-track-text");this.trackTextSpan=d("ACMedia-track-text-span");
this.volumeThumb=d("ACMedia-volume-handle");this.volumeTrack=d("ACMedia-volume-track");
this.volumeProgress=d("ACMedia-control-volume-progress");this.trackContainer=d("ACMedia-track-container");
this.playhead=d("ACMedia-control-playhead");this.track=d("ACMedia-control-track");
this.trackProgress=d("ACMedia-control-track-progress");this.controlLoadedProgress=d("ACMedia-control-loaded-progress");
this.mediaTimeDisplay=d("ACMedia-control-time-display");this.minutesPlayed=d("ACMedia-min-played");
this.secondsPlayed=d("ACMedia-sec-played");this.mediaDurationDisplay=d("ACMedia-control-duration-display");
this.minutesRemaining=d("ACMedia-min-remain");this.secondsRemaining=d("ACMedia-sec-remain");
this.settingsMenuList=document.createElement("div");this.settingsMenu.appendChild(this.settingsMenuList);
this.sizesMenu=document.createElement("ul");this.sizesMenu.menuName="sizes";this.sizesMenu.menuTitle=this.sizesControl.menuTitle=ac_media_language.sizescontrol||"Video Size";
this.downloadMenu=document.createElement("ul");this.downloadMenu.menuName="download";
this.downloadMenu.menuTitle=this.downloadControl.menuTitle=ac_media_language.downloadcontrol||"Download Video";
this.shareMenu=document.createElement("ul");this.shareMenu.menuName="share";this.shareMenu.menuTitle=this.shareControl.menuTitle=ac_media_language.sharecontrol||"Share Video";
f(this.alertDisplayContainer);f(this.trackText);f(this.mediaTimeDisplay);f(this.mediaDurationDisplay);
switch(this.controllerType){case"slim":case"short-slim":var h=+(this.container.offsetWidth-235);
if(AC.Detector.isWin()){h=h-10}this.trackContainer.style.width=h+"px";break;default:break
}b(this.volumeThumb);if(!this.scrubber&&this.element!==null){b(this.playhead)}},SPECIAL_KEYS:["ESC","COMMAND","CONTROL","OPTION","ALT","SHIFT"],KEYS:{KEY_TAB:9,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_0:48,KEY_1:49,KEY_2:50,KEY_C:67,KEY_F:70,KEY_R:82,KEY_T:84},_keyHandlerTimeout:null,keyDownHandler:function(b){var c=window.event?window.event:b;
var h=(c.keyCode)?c.keyCode:((c.which)?c.which:0);window.clearTimeout(this._keyHandlerTimeout);
var g="";switch(true){case ((h==this.KEYS.KEY_0)&&c.ctrlKey):Event.stop(b);this.selectSizeFromMenu(this.sizesSmallControl);
break;case ((h==this.KEYS.KEY_1)&&c.ctrlKey):Event.stop(b);this.selectSizeFromMenu(this.sizesMediumControl);
break;case ((h==this.KEYS.KEY_2)&&c.ctrlKey):Event.stop(b);this.selectSizeFromMenu(this.sizesLargeControl);
break;case ((h==this.KEYS.KEY_3)&&c.ctrlKey):Event.stop(b);this.selectSizeFromMenu(this.sizesHDControl);
break;case (!Media.Detection.Firefox()&&((h==this.KEYS.KEY_T)&&c.metaKey&&c.altKey)):case ((h==this.KEYS.KEY_C)&&c.ctrlKey&&c.shiftKey):Event.stop(b);
this.toggleCaptions();this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_RIGHT_ARROW)&&c.metaKey):Event.stop(b);this.show();
this.fastForward();this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_LEFT_ARROW)&&c.metaKey):Event.stop(b);this.show();
this.fastBackward();this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_RIGHT_ARROW)&&c.altKey):Event.stop(b);this.show();
this.pause();var f=+(1);this.scrubber.setValue(f);if(!this._seeking){this._seeking=true;
this._send("beginSeeking");this.resetRate()}this._send("setTime",+(f*this._send("duration")-0.1));
window.setTimeout(function(){this.trackProgress.style.width=+((this.scrubber.maximum*f)-4)+"px";
this.playhead.style.left=+((this.scrubber.maximum*f)-4)+"px"}.bind(this),50);this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_LEFT_ARROW)&&c.altKey):Event.stop(b);this.show();
this.pause();var f=+(0);this.scrubber.setValue(f);if(!this._seeking){this._seeking=true;
this._send("beginSeeking");this.resetRate()}this._send("setTime",+(f*this._send("duration")+0.1));
window.setTimeout(function(){this.trackProgress.style.width=f+"px";this.playhead.style.left=f+"px"
}.bind(this),50);this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_RIGHT_ARROW)):break;case ((h==this.KEYS.KEY_LEFT_ARROW)):break;
case (h==this.KEYS.KEY_SPACE):Event.stop(b);this.show();this.togglePlaying();this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_UP_ARROW)&&c.altKey):Event.stop(b);this.show();this.fullVolume();
this.volumeControlSetting=1;this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_DOWN_ARROW)&&c.altKey):Event.stop(b);this.show();
this.muteVolume();this.volumeControlSetting=0;this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case (h==this.KEYS.KEY_UP_ARROW):Event.stop(b);this.show();var d=this._send("volume"),a=+(d+0.1),e=(a<1)?a:1;
this._send("setVolume",e);this.volumeScrubber.setValue(e);this.volumeControlSetting=e;
this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);break;case (h==this.KEYS.KEY_DOWN_ARROW):Event.stop(b);
this.show();var d=this._send("volume"),a=+(d-0.1),e=(a>0)?a:0;this._send("setVolume",e);
this.volumeScrubber.setValue(e);this.volumeControlSetting=e;this._keyHandlerTimeout=window.setTimeout(this.hide.bind(this),2500);
break;case ((h==this.KEYS.KEY_R)&&c.metaKey):Event.stop(b);window.location.reload(false);
break;default:return true;break}},createTrackScrubber:function(){if(this.track){var a=this.track.offsetWidth;
if(!this.scrubber&&this.element!==null){this.scrubber=new Control.Slider(this.playhead,this.track,{alignX:-5,increment:1,sliderValue:0,minimum:0,maximum:a,onSlide:function(b){if(!this._seeking){this._seeking=true;
this._send("beginSeeking");this.resetRate()}this._send("setTime",b*this._send("duration"));
this.trackProgress.style.width=this.playhead.style.left}.bind(this),onChange:function(b){if(this._seeking){this._seeking=false;
this._send("endSeeking")}this.trackProgress.style.width=this.playhead.style.left
}.bind(this)})}}},createVolumeScrubber:function(){if(!this.volumeScrubber&&this.element!==null){var a=this.volumeTrack.offsetWidth;
this.volumeScrubber=new Control.Slider(this.volumeThumb,this.volumeTrack,{alignX:-3,increment:1,sliderValue:0,minimum:0,maximum:a,onSlide:function(b){this._volSeeking=true;
this._send("setVolume",b);this.volumeProgress.style.width=this.volumeThumb.style.left
}.bind(this),onChange:function(b){this._volSeeking=false;this.volumeProgress.style.width=this.volumeThumb.style.left
}.bind(this)});if(typeof this.volumeControlSetting=="undefined"){this.volumeControlSetting=1
}this.volumeScrubber.setValue(this.volumeControlSetting)}},getRoundRectForArcAndOpacity:function(c,b){if(Media.Detection.CSSBorderRadius()!==false){return false
}if(typeof this.hasVMLNameSpaceDefined=="undefined"||this.hasVMLNameSpaceDefined==false){this.setVML()
}var a=document.createElement("v:roundrect"),d=document.createElement("v:fill");
a.setAttribute("arcsize",c);a.setAttribute("fill","true");a.setAttribute("fillcolor","#000000");
a.setAttribute("stroked","false");a.className="border-radius-box";d.setAttribute("type","background");
d.setAttribute("opacity",b);d.className="border-radius-fill";if(typeof a=="object"){a.appendChild(d);
return a}else{return false}},setVML:function(){if(!document.namespaces){return}var c,a,d,b=document.getElementsByTagName("head")[0];
this.hasVMLNameSpaceDefined=false;for(c=0,a=document.namespaces.length;c<a;c++){if(document.namespaces(c).name=="v"){this.hasVMLNameSpaceDefined=true;
break}}if(!this.hasVMLNameSpaceDefined){document.namespaces.add("v","urn:schemas-microsoft-com:vml")
}},setCaptionsAvailable:function(){this._send("setCaptionsAvailable",this.captionsUrl)
},_setControlsAvailableForMenu:function(c,a){c.menuListHeight=0;for(var b=0,d;d=a[b];
b++){this._enableControl(d);c.menuListHeight+=25}switch(c){case this.sizesControl:this.enableSizesControl();
break;case this.downloadControl:this.enableDownloadControl();break;case this.shareControl:this.enableShareControl();
break;default:break}},setSizesAvailable:function(){this._setControlsAvailableForMenu(this.sizesControl,this._sizesMenuControls)
},setDownloadAvailable:function(){this._setControlsAvailableForMenu(this.downloadControl,this._downloadMenuControls)
},setShareAvailable:function(){this._setControlsAvailableForMenu(this.shareControl,this._shareMenuControls)
},enableBasicControls:function(){if(this.playControl){Element.hide(this.playControl)
}if(this.pauseControl){Element.show(this.pauseControl)}this._enableControl(this.volumeMuteControl);
this._enableControl(this.volumeFullControl);this._enableControl(this.volumeThumb);
this._enableControl(this.playControl);this._enableControl(this.pauseControl);this._enableControl(this.playhead);
this._enableControl(this.fastBackwardControl);this._enableControl(this.fastForwardControl);
this.createTrackScrubber();this._enableControl(this.mediaTimeDisplay);this._enableControl(this.mediaDurationDisplay)
},enableCaptionsControl:function(){if(!this.captionsControl.isEnabled&&this.controllerType!=="short-slim"&&!this.captionsControl.isEnabled&&!(typeof this.options!="undefined"&&this.options.captionsControlOff===true)){Element.addClassName(this.captionsControl,this.captionsControl.baseClassName+"-enabled");
this.captionsControl.isEnabled=true;this.setSettingsControlsClass()}},_enableSettingsControlWithMenu:function(a,b){if(!a.isEnabled&&this.controllerType!=="short-slim"&&!(typeof this.options!="undefined"&&this.options[a.name+"Off"]===true)){this.settingsMenuList.appendChild(b);
a.menuListWidth=(AC.Detector.isIEStrict())?165:this.settingsMenuList.offsetWidth;
this.settingsMenuList.removeChild(b);Element.addClassName(a,a.baseClassName+"-enabled");
a.isEnabled=true;this.setSettingsControlsClass()}},enableSizesControl:function(){this.sizesControl.name="sizesControl";
this._enableSettingsControlWithMenu(this.sizesControl,this.sizesMenu)},enableDownloadControl:function(){this.downloadControl.name="downloadControl";
this._enableSettingsControlWithMenu(this.downloadControl,this.downloadMenu)},enableShareControl:function(){this.shareControl.name="shareControl";
this._enableSettingsControlWithMenu(this.shareControl,this.shareMenu)},togglePlaying:function(){var a=this._send("playing");
if(a){this.pause()}else{this.resetRate();this.play()}},toggleCaptions:function(){if(!Element.hasClassName(this.captionsControl,this.captionsControl.baseClassName+"-selected")&&!this.resettingController&&this.captionsControl.isEnabled===true){this._selectControl(this.captionsControl);
if(this._send("movieType")==="Video"&&this._send("enableCaptionsTextDisplay")===false){this._enableControl(this.trackText)
}this._send("enableCaptions");var c=ac_media_language.captionsturnedon||"Closed Captions On";
while(typeof this.alertDisplayContainer.firstChild!="undefined"&&this.alertDisplayContainer.firstChild!=null){this.alertDisplayContainer.removeChild(this.alertDisplayContainer.firstChild)
}if(Media.Detection.CSSBorderRadius()===false){var a=this.getRoundRectForArcAndOpacity(0.19,0.5)
}if(typeof a!="undefined"&&a!==false){var b=document.createElement("span");this.captionsDisplayAlert.innerHTML="";
b.appendChild(document.createTextNode(c));a.appendChild(b);this.captionsDisplayAlert.appendChild(a)
}else{this.captionsDisplayAlert.innerHTML=c}this.alertDisplayContainer.appendChild(this.captionsDisplayAlert);
Element.addClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active");
this.captionsControlSetting=true}else{if(this.captionsControl.isEnabled===true){this._unselectControl(this.captionsControl);
this._disableControl(this.trackText);this.captionsControlSetting=false;if(this.resettingController===true){this._send("resetCaptions")
}else{this._send("disableCaptions");var c=ac_media_language.captionsturnedoff||"Closed Captions Off";
while(typeof this.alertDisplayContainer.firstChild!="undefined"&&this.alertDisplayContainer.firstChild!=null){this.alertDisplayContainer.removeChild(this.alertDisplayContainer.firstChild)
}var a=this.getRoundRectForArcAndOpacity(0.19,0.5);if(a!==false){var b=document.createElement("span");
this.captionsDisplayAlert.innerHTML="";b.appendChild(document.createTextNode(c));
a.appendChild(b);this.captionsDisplayAlert.appendChild(a)}else{this.captionsDisplayAlert.innerHTML=c
}this.alertDisplayContainer.appendChild(this.captionsDisplayAlert);Element.addClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active")
}}}},_toggleMenuForControlAndMenuControls:function(e,d,c){if(!Element.hasClassName(d,d.baseClassName+"-selected")&&!this.resettingMenus&&!this.resettingController){this._selectControl(d);
this._selectSettingsMenuForMenu(e);this.positionSettingsMenuForControl(d)}else{this._unselectControl(d);
this._unselectMenu();if(this.resettingController===true){for(var b=0,a;a=c[b];b++){this._unselectControl(a)
}}}},toggleSizesMenu:function(){if(this.sizesControl&&this.sizesControl.isEnabled===true&&this.sizesMenu){this._toggleMenuForControlAndMenuControls(this.sizesMenu,this.sizesControl,this._sizesMenuControls)
}},toggleDownloadMenu:function(){if(this.downloadControl&&this.downloadControl.isEnabled===true&&this.downloadMenu){this._toggleMenuForControlAndMenuControls(this.downloadMenu,this.downloadControl,this._downloadMenuControls)
}},toggleShareMenu:function(){if(this.shareControl&&this.shareControl.isEnabled===true&&this.shareMenu){this._toggleMenuForControlAndMenuControls(this.shareMenu,this.shareControl,this._shareMenuControls)
}},volumeControlSetting:1,sizesControlSetting:false,setSettingsControls:function(){if(typeof this.sizesControlSetting!="undefined"&&this.sizesControlSetting!=false){this.selectSizeFromMenu(this.sizesControlSetting)
}if(typeof this.volumeControlSetting!="undefined"&&this.volumeControlSetting!=1){this.volumeScrubber.setValue(this.volumeControlSetting);
this._send("setVolume",this.volumeControlSetting)}},mouseoverSettingsControl:function(a){this.settingsMenuTitle.innerHTML=a.menuTitle;
if(typeof this.currentMenu!="undefined"&&this.currentMenu!=false){if(this.settingsMenuList.childNodes.length>0){this.settingsMenuList.removeChild(this.currentMenu)
}this.currentMenu=false}this.positionSettingsMenuForControl(a);Element.addClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-hovered");
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName);this._unselectControl(this.sizesControl);
this._unselectControl(this.downloadControl);this._unselectControl(this.shareControl)
},mouseoutSettingsControl:function(a,g){return;var a=a||window.event,d=Element.cumulativeOffset(this.settingsMenu).top,f=Element.cumulativeOffset(this.settingsMenu).left,e=this.settingsMenu.offsetWidth,h=this.settingsMenu.offsetHeight,c,b;
if(a){c=a.pageX||(a.clientX+(document.documentElement.scrollLeft)?document.documentElement.scrollLeft:document.body.scrollLeft);
b=a.pageY||(a.clientY+(document.documentElement.scrollTop)?document.documentElement.scrollTop:document.body.scrollTop);
if(!(c>f&&c<(f+e)&&b>d&&b<(d+h+14))){Element.addClassName(this.settingsMenu,this.settingsMenu.baseClassName);
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-hovered")
}}},positionSettingsMenuForControl:function(j){this.positionCarrotForControl(j);
if(typeof this.settingsMenuRoundRect!="undefined"&&this.settingsMenuRoundRect!==false){var p=this.settingsMenuList.getElementsByTagName("li"),r=j.menuListWidth,o=parseInt(((p.length>0)?22:0)+this.settingsMenuTitle.offsetHeight+(p.length*25)),i=Math.min((7/Math.min(o,r)),1).toFixed(2),n=this.settingsMenu.childNodes,s=this.settingsMenu.node;
try{while(typeof this.settingsMenuRoundRect!="undefined"&&this.settingsMenuRoundRect.firstChild){this.settingsMenuRoundRect.removeChild(this.settingsMenuRoundRect.firstChild)
}}catch(v){}this.settingsMenu.removeChild(this.settingsMenuRoundRect);this.settingsMenuRoundRect=this.getRoundRectForArcAndOpacity(i,0.9);
this.settingsMenu.insertBefore(this.settingsMenuRoundRect,this.settingsMenu.firstChild);
if(r&&o){this.settingsMenuList.style.display="block";this.settingsMenu.style.width=r+"px";
this.settingsMenu.style.height=o+"px"}else{this.settingsMenu.style.display="none"
}}else{if(typeof j.menuListWidth!="undefined"){this.settingsMenuList.style.width=j.menuListWidth+"px"
}}var u=parseInt(this.settingsMenuCarrot.style.top),h=parseInt(this.settingsMenuCarrot.style.left),q=this.settingsMenu.offsetHeight,a=this.settingsMenu.offsetWidth,b=Element.cumulativeOffset(this.mediaController).left,d=this.mediaController.offsetWidth,g=this.settingsMenuCarrot.offsetHeight,l=this.settingsMenuCarrot.offsetWidth,A=u-q+g,m=(b+d)-a,c=Element.cumulativeOffset(j).left,t=c+(j.offsetWidth/2),f,z,k,y,x;
switch(this.controllerType){case"slim":case"short-slim":var w=(b+d+20)-a;this.settingsMenu.style.top=(u+g)+"px";
this.settingsMenu.style.left=((w<h)?w:h)+"px";break;default:this.settingsMenu.style.top=A+"px";
this.settingsMenu.style.left=((m-7<h)?(m-7):h)+"px";break}f=parseInt(this.settingsMenu.style.left);
k=q;y=parseInt(this.settingsMenuCarrot.style.left)-f;switch(this.controllerType){case"slim":case"short-slim":this.settingsMenuCarrot.style.top=(0-(g+6))+"px";
break;default:this.settingsMenuCarrot.style.top=((AC.Detector.isIEStrict())?((q-g)+8):(q-g))+"px";
break}this.settingsMenuCarrot.style.left=(y-(l/2))+"px";this.settingsMenu.style.overflow="visible"
},positionCarrotForControl:function(d){var b=Element.cumulativeOffset(this.mediaController).top,c=this.mediaController.offsetWidth,f=this.mediaController.offsetHeight,i=Element.cumulativeOffset(d).left,j=d.offsetWidth,g=this.settingsMenuCarrot.offsetWidth,e=this.settingsMenuCarrot.offsetHeight,a=b-e,h=i+((j-g)/2);
this.settingsMenu.style.overflow="hidden";switch(this.controllerType){case"slim":case"short-slim":Element.addClassName(this.settingsMenuCarrot,"slim-menu-carrot");
this.settingsMenuCarrot.style.top=(b+f)+"px";break;default:this.settingsMenuCarrot.style.top=a+"px";
break}this.settingsMenuCarrot.style.left=h+"px"},_selectSettingsMenuForMenu:function(c){var a=c.menuTitle,b=c.menuName;
this.settingsMenuTitle.innerHTML=a;if(typeof this.currentMenu!="undefined"&&this.currentMenu!=false){if(this.settingsMenuList.childNodes>0){this.settingsMenuList.removeChild(this.currentMenu)
}}this.settingsMenuList.appendChild(c);this.currentMenu=c},_unselectMenu:function(){Element.addClassName(this.settingsMenu,this.settingsMenu.baseClassName);
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-selected");
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-hovered")
},_selectControl:function(a){Element.addClassName(a,a.baseClassName+"-selected");
if(a===this.sizesControl||a===this.downloadControl||a===this.shareControl){Element.addClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-selected");
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName);Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-hovered");
this._currentSettingsControl=a}},_unselectControl:function(a){if(a){Element.removeClassName(a,a.baseClassName+"-selected")
}},_enableControl:function(a){if(a){Element.addClassName(a,a.baseClassName+"-enabled")
}},_disableControl:function(a){if(a){Element.removeClassName(a,a.baseClassName+"-enabled")
}},reset:function(){if(typeof this.scrubber!="undefined"){this.playhead.style.left="0px";
this.trackProgress.style.width=this.playhead.style.left;this.show();if(this.playControl){Element.show(this.playControl)
}if(this.pauseControl){Element.hide(this.pauseControl)}this._disableControl(this.volumeMuteControl);
this._disableControl(this.volumeFullControl);this._disableControl(this.volumeThumb);
this._disableControl(this.playControl);this._disableControl(this.pauseControl);
this._disableControl(this.playhead);this._disableControl(this.fastBackwardControl);
this._disableControl(this.fastForwardControl);this.removeAdvancedPlayDisplay()}},resetSettingsControls:function(){this.resetSettingsMenus()
},resetSettingsMenus:function(){this.resettingMenus=true;if(this.alertDisplayContainer){Element.removeClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active")
}if(this.settingsMenu){Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-hovered");
Element.removeClassName(this.settingsMenu,this.settingsMenu.baseClassName+"-selected")
}this.toggleSizesMenu();this.toggleDownloadMenu();this.toggleShareMenu();this.resettingMenus=false
},resetRate:function(){if(this._send("rate")!==1){this.removeAdvancedPlayDisplay();
this._send("setRate",1)}},removeAdvancedPlayDisplay:function(){this.removeAlertDisplay();
Element.removeClassName(this.fastBackwardControl,"fastBackward-active");Element.removeClassName(this.fastForwardControl,"fastForward-active")
},removeAlertDisplay:function(){if(this.fastBackwardControl){this.setRateDisplay(this.fastBackwardControl,null)
}if(this.fastForwardControl){this.setRateDisplay(this.fastForwardControl,null)}if(this.alertDisplayContainer){Element.removeClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active")
}},setSettingsControlsClass:function(){var b=this.settingsControls.baseClassName,a=0;
if(typeof this.captionsControl.isEnabled!="undefined"&&this.captionsControl.isEnabled===true){b+="-captions";
a++}if(typeof this.sizesControl.isEnabled!="undefined"&&this.sizesControl.isEnabled===true){b+="-sizes";
a++}if(typeof this.downloadControl.isEnabled!="undefined"&&this.downloadControl.isEnabled===true){b+="-download";
a++}if(typeof this.shareControl.isEnabled!="undefined"&&this.shareControl.isEnabled===true){b+="-share";
a++}this.settingsControls.className="";Element.addClassName(this.settingsControls,this.settingsControls.baseClassName);
Element.addClassName(this.settingsControls,b);this.setTrackContainerWidth()},setTrackContainerWidth:function(){if(this.controllerType==="regular"||!this.settingsControls||!this.trackContainer){return
}var e=(this.settingsControls.offsetWidth>0)?parseInt(this.settingsControls.offsetWidth+10):0,b=this.mediaController.offsetLeft,d=this.mediaController.offsetWidth,c=parseInt(b+d);
newTrackWidth=parseInt(((c-this.trackContainer.offsetLeft)<=600)?(c-this.trackContainer.offsetLeft):600),newTrackContainerWidth=parseInt(newTrackWidth-(e+10));
if(this.controllerType==="slim"){var a=parseInt(this.trackContainer.offsetLeft+newTrackContainerWidth+20);
if(c<a){newTrackContainerWidth=parseInt(newTrackContainerWidth-(a-c))}}this.trackContainer.style.width=newTrackContainerWidth+"px";
this.track.parentNode.style.width=(this.controllerType==="short-slim")?newTrackContainerWidth+"px":parseInt(newTrackContainerWidth-80)+"px";
this.scrubberMax=(this.controllerType==="short-slim")?newTrackContainerWidth:parseInt(newTrackContainerWidth-80);
this.volumeScrubber=null;this.createVolumeScrubber();this.scrubber=null;this.createTrackScrubber()
},_send:function(b,a){if(this.delegate&&b in this.delegate){a=[].concat(a);return this.delegate[b].apply(this.delegate,a)
}},show:function(){Media.ControlsWidget.show(this)},hide:function(){if(this._seeking||this._volSeeking){return
}Media.ControlsWidget.hide(this);this.removeAlertDisplay()},play:function(){this.resetRate();
if(this._send("playing")===false){if(AC.Detector.isiPad()){this._send("forcePlay")
}else{this._send("play")}}if(this.playControl){Element.hide(this.playControl)}if(this.pauseControl){Element.show(this.pauseControl)
}},pause:function(){this.resetRate();if(this._send("playing")===true){if(AC.Detector.isiPad()){this._send("forcePause")
}else{this._send("pause")}}if(this.pauseControl){Element.hide(this.pauseControl)
}if(this.playControl){Element.show(this.playControl)}},fastBackward:function(){var c=this._send("rate"),b="";
if(this._send("playing")===false){this._send("play")}else{if(this.pauseControl){Element.hide(this.pauseControl)
}if(this.playControl){Element.show(this.playControl)}}switch(c){case -2:this._send("setRate",-4);
b="4x";this.setRateDisplay(this.speedDisplayAlert,"four-times-speed-display");this.setRateDisplay(this.fastBackwardControl,"four-times-fast-backward");
break;case -4:this._send("setRate",-8);b="8x";this.setRateDisplay(this.speedDisplayAlert,"eight-times-speed-display");
this.setRateDisplay(this.fastBackwardControl,"eight-times-fast-backward");break;
default:this._send("setRate",-2);b="2x";this.setRateDisplay(this.speedDisplayAlert,"two-times-speed-display");
this.setRateDisplay(this.fastBackwardControl,"two-times-fast-backward");break}this.setRateDisplay(this.fastForwardControl,null);
while(typeof this.alertDisplayContainer.firstChild!="undefined"&&this.alertDisplayContainer.firstChild!=null){this.alertDisplayContainer.removeChild(this.alertDisplayContainer.firstChild)
}this.speedDisplayAlert.innerHTML="";var a=this.getRoundRectForArcAndOpacity(0.19,0.5);
if(a!==false){var d=document.createElement("span");d.appendChild(document.createTextNode(b));
a.appendChild(d);this.speedDisplayAlert.appendChild(a)}else{this.speedDisplayAlert.appendChild(document.createTextNode(b))
}this.alertDisplayContainer.appendChild(this.speedDisplayAlert);Element.addClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active");
Element.removeClassName(this.fastForwardControl,"fastForward-active");Element.addClassName(this.fastBackwardControl,"fastBackward-active")
},fastForward:function(){var c=this._send("rate"),b="";if(this._send("playing")===false){this._send("play")
}else{if(this.pauseControl){Element.hide(this.pauseControl)}if(this.playControl){Element.show(this.playControl)
}}switch(c){case 2:this._send("setRate",4);b="4x";this.setRateDisplay(this.speedDisplayAlert,"four-times-speed-display");
this.setRateDisplay(this.fastForwardControl,"four-times-fast-forward");break;case 4:this._send("setRate",8);
b="8x";this.setRateDisplay(this.speedDisplayAlert,"eight-times-speed-display");
this.setRateDisplay(this.fastForwardControl,"eight-times-fast-forward");break;default:this._send("setRate",2);
b="2x";this.setRateDisplay(this.speedDisplayAlert,"two-times-speed-display");this.setRateDisplay(this.fastForwardControl,"two-times-fast-forward");
break}this.setRateDisplay(this.fastBackwardControl,null);while(typeof this.alertDisplayContainer.firstChild!="undefined"&&this.alertDisplayContainer.firstChild!=null){this.alertDisplayContainer.removeChild(this.alertDisplayContainer.firstChild)
}this.speedDisplayAlert.innerHTML="";var a=this.getRoundRectForArcAndOpacity(0.19,0.5);
if(a!==false){var d=document.createElement("span");d.appendChild(document.createTextNode(b));
a.appendChild(d);this.speedDisplayAlert.appendChild(a)}else{this.speedDisplayAlert.appendChild(document.createTextNode(b))
}this.alertDisplayContainer.appendChild(this.speedDisplayAlert);Element.addClassName(this.alertDisplayContainer,this.alertDisplayContainer.baseClassName+"-active");
Element.removeClassName(this.fastBackwardControl,"fastBackward-active");Element.addClassName(this.fastForwardControl,"fastForward-active")
},setRateDisplay:function(b,a){if(!b){return}switch(true){case (typeof b.currentRateDisplay!="undefined"&&b.currentRateDisplay!==a):Element.removeClassName(b,b.currentRateDisplay);
break;default:break}switch(a){case null:break;default:Element.addClassName(b,a);
break}b.currentRateDisplay=a},muteVolume:function(){this._send("setMuted",true);
this.volumeScrubber.setValue(0)},fullVolume:function(){this._send("setMuted",false);
this._send("setVolume",1);this.volumeScrubber.setValue(1)},updatePercentLoaded:function(a){if(typeof this.controlLoadedProgress!=="undefined"&&a){this.controlLoadedProgress.style.width=a*100+"%"
}if(a===1){Element.addClassName(this.trackEndCap,"track-right-cap-loaded");Element.removeClassName(this.trackEndCap,"track-right-cap")
}},updateTime:function(b){var d=this._send("duration"),a=(d-b);if((b<1||a<1)&&this._send("rate")!==1){this.resetRate();
this._send("pause");Element.removeClassName(this.fastBackwardControl,"fastBackward-active");
Element.removeClassName(this.fastForwardControl,"fastForward-active")}try{this.scrubber.setValue((b/d)||0)
}catch(c){}this.updateElapsedTime(b);this.updateRemainingTime(a)},_setTimeForReadout:function(d,b,e){if(b&&e){var a=parseInt(d/60,10),c=parseInt(d%60,10);
if(a<10){a="0"+a}if(c<10){c="0"+c}b.innerHTML=a;e.innerHTML=c}},updateElapsedTime:function(b){var a=this.minutesPlayed,c=this.secondsPlayed;
this._setTimeForReadout(b,a,c)},updateRemainingTime:function(b){var a=this.minutesRemaining,c=this.secondsRemaining;
this._setTimeForReadout(b,a,c)}};Ajax.checkURL=function(a,c){var b=Ajax.getTransport();
b.onreadystatechange=function(){if(this.readyState===4&&this.status===200){c()}};
b.open("HEAD",a,true);b.send(null)};Ajax.Request.prototype._overrideMimeType=null;
Ajax.Request.prototype.overrideMimeType=function(a){this._overrideMimeType=a;if(this.transport.overrideMimeType){this.transport.overrideMimeType(a)
}};Ajax.Response.prototype.responseXMLValue=function(){if(AC.Detector.isIEStrict()){var a=this.transport.responseXML.documentElement;
if(!a&&this.request._doesOverrideXMLMimeType()){this.transport.responseXML.loadXML(this.transport.responseText)
}}return this.transport.responseXML};Media.ControlsWidget.SharePlugin=function(){};
Media.ControlsWidget.SharePlugin.prototype.name=function(){return this._name};Media.ControlsWidget.SharePlugin.prototype.actionName=function(){return"share"
};Media.ControlsWidget.SharePlugin.prototype.pluginType=function(){return"Share"
};
