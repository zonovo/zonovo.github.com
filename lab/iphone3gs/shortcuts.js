var geoMap={US:{code:"",noResults:"No Shortcut found. Search all of apple.com.",viewAll:"View all search results",searchText:"Search"},ASIA:{code:"asia"},AT:{code:"at",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},AU:{code:"au"},BE_FR:{code:"bf",viewAll:"Afficher tous les résultats",noResults:"Pas de résultat. Essayez une recherche apple.com",searchText:"Rechercher"},BE_NL:{code:"bl",viewAll:"Toon alle zoekresultaten",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",searchText:"Zoek"},BR:{code:"br",noResults:"Não encontrado. Tente a busca em apple.com",viewAll:"Ver todos os resultados da busca",searchText:"Buscar"},CA_EN:{code:"ca",directory:"/ca"},CA_FR:{code:"ca",directory:"/ca/fr",viewAll:"Afficher tous les résultats",searchText:"Recherche"},CH_DE:{code:"ce",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},CH_FR:{code:"cr",viewAll:"Afficher tous les résultats",noResults:"Pas de résultat. Essayez une recherche apple.com",searchText:"Rechercher"},CN:{code:"cn",directory:".cn",noResults:"找不到快速搜索结果，请尝试 apple.com.cn 的完整搜索",viewAll:"查看所有搜索结果",searchText:"搜索"},DE:{code:"de",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},DK:{code:"dk",noResults:"Ingen genvej fundet. Prøv at søge på hele apple.com.",viewAll:"Vis alle søgeresultater",searchText:"Søg"},ES:{code:"es",viewAll:"Ver todos los resultados de búsqueda",noResults:"Ningún atajo. Búsqueda completa en apple.com",searchText:"Buscar"},FI:{code:"fi",noResults:"Ei oikotietä. Etsi koko apple.com.",viewAll:"Katso hakutulokset",searchText:"Etsi"},FR:{code:"fr",viewAll:"Afficher tous les résultats",noResults:"Pas de résultat. Essayez une recherche apple.com",searchText:"Rechercher"},HK:{code:"hk",noResults:"找不到快速搜尋結果，請試試 apple.com 的完整搜尋",viewAll:"檢視所有搜尋結果",searchText:"搜尋"},HK_EN:{code:"hk",directory:"/hk/en"},ID:{code:"id"},IE:{code:"ie"},IN:{code:"in"},IT:{code:"it",noResults:"Nessuna scorciatoia trovata. Provate su apple.com",viewAll:"Mostra tutti i risultati",searchText:"Cerca"},JP:{code:"jp",noResults:"ショートカットは見つかりませんでした。検索はこちら。",viewAll:"すべての検索結果を見る",searchText:"Search"},KR:{code:"kr",noResults:"일치하는 검색결과가 없습니다. 다시 검색하기.",viewAll:"검색 결과 전체 보기."},LA:{code:"la",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",searchText:"Buscar"},LAE:{code:"lae",noResults:"No Shortcut found. Try a full search of apple.com.",viewAll:"View all search results",searchText:"Search"},MX:{code:"mx",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",searchText:"Buscar"},MY:{code:"my"},NL:{code:"nl",viewAll:"Toon alle zoekresultaten",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",searchText:"Zoek"},NO:{code:"no",noResults:"Fant ingen snarvei. Søk på hele apple.com.",viewAll:"Vis alle søkeresultater",searchText:"Søk"},NZ:{code:"nz"},PH:{code:"ph"},PL:{code:"pl",noResults:"Fraza nie została odnaleziona. Użyj apple.com.",viewAll:"Przeglądaj wszystkie wyniki",searchText:"Szukaj"},PT:{code:"pt",noResults:"Nenhum resultado. Tente pesquisar em apple.com.",viewAll:"Ver todos os resultados de pesquisa",searchText:"Procurar"},RU:{code:"ru",noResults:"Ссылок нет. Попробуйте расширенный поиск.",viewAll:"Показать все результаты поиска",searchText:"Поиск"},SE:{code:"se",noResults:"Ingen genväg hittad. Sök i hela apple.com.",viewAll:"Visa alla sökresultat",searchText:"Sök"},SG:{code:"sg"},TH:{code:"th"},TW:{code:"tw",noResults:"快速搜尋找不到，試試 apple.com 完整搜尋",viewAll:"瀏覽搜索結果",searchText:"搜尋"},UK:{code:"uk"},VN:{code:"vn"},ZA:{code:"za"},PO:null,TR:null,UA:null,RO:null,CZ:null,HU:null,BG:null,HR:null,GR:null,IS:null};
var enhanceSearch=function(b){var a=function(c){var d=document.getElementById(c);
if(d){d.parentNode.removeChild(d)}};document.getElementById("g-search").setAttribute("action",b);
document.getElementById("g-search").setAttribute("method","GET");a("search-oe");
a("search-access");a("search-site");a("search-lr")};function loadShortcuts(){decorateGlobalSearchInput();
if(typeof(searchCountry)=="undefined"){searchCountry="us"}if(geoMap[searchCountry.toUpperCase()].directory){var d=geoMap[searchCountry.toUpperCase()].directory
}else{if(searchCountry!="us"){var d="/"+searchCountry.replace(/_/,"")}else{d=""
}}var c={global:"http://www.apple.com"+d+"/search/",downloads:"http://www.apple.com"+d+"/search/",iphone:"http://www.apple.com"+d+"/search/",ipoditunes:"http://www.apple.com"+d+"/search/",mac:"http://www.apple.com"+d+"/search/",store:"http://www.apple.com"+d+"/search/",support:"http://www.info.apple.com/searchredir.html"};
var b=c[searchSection]||"http://www.apple.com/search/";b=b+="?sec="+window.searchSection;
enhanceSearch(b);var a=navigator.userAgent.match(/AppleWebKit/i)&&navigator.userAgent.match(/Mobile/i);
if(!a&&(typeof(deactivateSearchShortcuts)=="undefined"||!deactivateSearchShortcuts)){SearchShortcut.load()
}}function shortcutsPageLoader(b){var a=window.onload;if(typeof window.onload!="function"){window.onload=b
}else{window.onload=function(){a();b()}}}shortcutsPageLoader(loadShortcuts);var SearchShortcut={baseUrl:"http://www.apple.com/global/nav/scripts/shortcuts.php",minimumCharactersForSearch:0,entryDelay:150,currentRequest:false,descriptionCharacters:90,titleCharacters:39,isIe:false,init:function(){var d=document.getElementById("globalsearch").getElementsByTagName("form")[0],b=d.elements,a,c,e=d.getAttribute("action");
this._formValues=[];for(a=0;(c=b[a]);a++){if(c.name!=="q"&&e.indexOf(c.name)===-1){this._formValues.push(c.name+"="+c.value);
this._formValues[c.name]=c.name}}if(this._formValues.length>0){this.fullSearchUrl=e+((e.lastIndexOf("?")!==-1)?"&":"?")+this._formValues.join("&")
}else{this.fullSearchUrl=e}this.noResults=geoMap.US.noResults;this.viewAll=geoMap.US.viewAll;
if(typeof(searchCountry)!="undefined"&&searchCountry){this.noResults=geoMap[searchCountry.toUpperCase()].noResults||this.noResults;
this.viewAll=geoMap[searchCountry.toUpperCase()].viewAll||this.viewAll}this.html={results:document.getElementById("sp-results").getElementsByTagName("div")[0],input:document.getElementById("sp-searchtext")};
if(navigator.userAgent.toLowerCase().indexOf("msie 6.")!=-1){document.getElementById("sp-results").style.left="171px";
this.isIe=true}this.pausedControllers=[]},track:function(d,a){if(typeof(s_gi)=="undefined"||!s_gi){return
}var c="appleglobal";var e="appleussearch";var b=null;if(typeof(searchCountry)!="undefined"&&searchCountry&&searchCountry!="US"){b=geoMap[searchCountry.toUpperCase()].code
}if(b){c="apple"+b+"global";e="apple"+b+"search"}if(typeof(s_account)!="undefined"&&s_account.indexOf("appleussearch")==-1){s=s_gi(s_account+","+e)
}else{s=s_gi(c+","+e)}s.prop4="";s.g_prop4="";s.prop6="";s.g_prop6="";s.pageName="";
s.g_pageName="";s.pageURL="";s.g_pageURL="";s.g_channel="";s.linkTrackVars="eVar2,eVar4,prop7,prop10";
s.eVar2="WWW-sc: "+d.toLowerCase();s.prop7="WWW-sc: "+d.toLowerCase();s.eVar4=a;
s.prop10=a;s.tl(this,"o","Shortcut Search")},go:function(a){SearchShortcut.track(SearchShortcut.searchText,a);
document.location=a},search:function(e){var g=document.getElementById("globalsearch").getElementsByTagName("form")[0],d=g.elements,c,f,h=g.getAttribute("action");
this._formValues=[];for(c=0;(f=d[c]);c++){if(f.name!=="q"&&h.indexOf(f.name)===-1){this._formValues.push(f.name+"="+f.value);
this._formValues[f.name]=f.name}}if(this._formValues.length>0){this.fullSearchUrl=h+((h.lastIndexOf("?")!==-1)?"&":"?")+this._formValues.join("&")
}else{this.fullSearchUrl=h}var a=this.baseUrl+"?q="+encodeURIComponent(e);if(typeof(searchSection)!="undefined"&&searchSection){a+="&section="+searchSection
}if(typeof(searchCountry)!="undefined"&&searchCountry){a+="&geo="+searchCountry.toLowerCase()
}this.spin();a+="&transport=js";var b=document.getElementsByTagName("head")[0];
script=document.createElement("script");script.id="xdShortcutContainer";script.type="text/javascript";
script.src=a;b.appendChild(script);SearchShortcut.scriptLoadTest()},scriptLoadTest:function(){var a=0;
var b=window.setInterval(function(){a++;if(typeof(shortcutXml)!="undefined"){window.clearInterval(b)
}else{if(a>20){window.clearInterval(b);document.getElementById("sp-search-spinner").style.display="none"
}}},50)},loadXmlToDoc:function(b){var a;if(window.ActiveXObject){a=new ActiveXObject("Microsoft.XMLDOM");
a.async="false";a.loadXML(b)}else{var c=new DOMParser();a=c.parseFromString(b,"text/xml")
}if(!this.html||!this.html.results){this.init()}document.getElementById("sp-search-spinner").style.display="none";
this.term=a.getElementsByTagName("term")[0].firstChild.nodeValue;this.xml=a.getElementsByTagName("search_results")[0];
this.parseResults(this.xml);if(this.results){this.results.length>0?this.renderResults():this.renderNoResults()
}},spin:function(){document.getElementById("sp-search-spinner").style.display="block"
},parseResults:function(d){var c=d.getElementsByTagName("error");if(c.length>0){SearchShortcut.hideResults();
return}else{var f=d.getElementsByTagName("match");this.results=new Array();for(var e=0;
e<(f.length);e++){var a=f[e];var b={title:a.getAttribute("title"),url:a.getAttribute("url"),desc:a.getAttribute("copy"),category:a.getAttribute("category"),priority:a.getAttribute("priority"),image:a.getAttribute("image")};
b.url=decodeURIComponent(b.url);this.results.push(b)}}},renderNoResults:function(){var d=this.noResults;
this.html.results.innerHTML="";var b=document.createElement("ul");b.className="sp-results";
listResult=document.createElement("li");listResult.className="firstCat resultCat";
b.appendChild(listResult);listResult=document.createElement("li");listResult.id="sp-result-none";
listResult.className="viewall";var a=document.createElement("div");a.className="hoverbox";
var c=document.createElement("a");c.href=this.fullSearchUrl+"?q="+encodeURIComponent(this.term);
c.innerHTML=d;listResult.appendChild(a);listResult.appendChild(c);listResult.url=this.fullSearchUrl+"?q="+encodeURIComponent(this.term);
listResult.num=this.results.length;listResult.onclick=function(){SearchShortcut.go(this.url)
};listResult.onmouseover=function(){SearchShortcut.itemSelected=true};listResult.onmouseout=function(){SearchShortcut.itemSelected=false
};b.appendChild(listResult);this.html.results.appendChild(b);document.getElementById("globalsearch").className="active"
},hideAllQuicktimeMovies:function(){if(typeof(AC)!="undefined"&&typeof(AC.Quicktime)!="undefined"&&typeof(AC.Quicktime.controllers)!="undefined"){function h(i){var u=curtop=0;
if(i.offsetParent){u=i.offsetLeft;curtop=i.offsetTop;while(i=i.offsetParent){u+=i.offsetLeft;
curtop+=i.offsetTop}}return[u,curtop]}function q(v,A,E,I,u,z,C,H){var y=v+E;var F=A+I;
var x=u+C;var D=z+H;var w=Math.max(v,u);var B=Math.max(A,z);var G=Math.min(y,x);
var i=Math.min(F,D);return G>w&&i>B}var a=AC.Quicktime.controllers;var o=document.getElementById("sp-results");
var l={width:328,height:448};var p=h(o);var e=p[0]-328;var d=p[1];var c=g+l.width;
var b=f+l.height;for(var n=a.length-1;n>=0;n--){var j=a[n].movie;var m=Element.getDimensions(j);
var t=h(j);var g=t[0];var f=t[1];if(q(g,f,m.width,m.height,e,d,l.width,l.height)){this.pausedControllers.push(a[n]);
a[n].Stop();a[n].movie.style.visibility="hidden"}}}else{var k=document.getElementsByTagName("object");
for(n=0;n<k.length;n++){if(typeof(k[n].Stop)!="undefined"){k[n].Stop()}try{if(typeof(k[n].getElementsByTagName("embed")[0].Stop)!="undefined"){k[n].getElementsByTagName("embed")[0].Stop()
}}catch(r){}k[n].style.visibility="hidden"}}},showAllQuicktimeMovies:function(){if(typeof(AC)!="undefined"&&typeof(AC.Quicktime)!="undefined"&&typeof(AC.Quicktime.controllers)!="undefined"){for(var b=this.pausedControllers.length-1;
b>=0;b--){this.pausedControllers[b].movie.style.visibility="visible";if(navigator.userAgent.match(/Firefox/i)){this.pausedControllers[b].movie.style.zIndex="100";
setTimeout(this.pausedControllers[b].Play.bind(this.pausedControllers[b]),100)}else{this.pausedControllers[b].Play()
}}this.pausedControllers=[]}else{var a=document.getElementsByTagName("object");
for(b=0;b<a.length;b++){a[b].style.visibility="visible";if(typeof(a[b].Play)!="undefined"){a[b].Play()
}try{if(typeof(a[b].getElementsByTagName("embed")[0].Play)!="undefined"){a[b].getElementsByTagName("embed")[0].Play()
}}catch(c){}}}},startFlashFixTimer:function(){var b=0;var a=setInterval(function(){SearchShortcut.flashDomRender();
b++;if(b>50){clearInterval(a)}},10)},border:5,flashDomFix:function(){document.getElementById("sp-results").firstChild.firstChild.style.border="5px none red";
document.getElementById("globalsearch").onmousemove=function(){SearchShortcut.flashDomRender()
}},flashDomRender:function(){SearchShortcut.border%2==0?SearchShortcut.border++:SearchShortcut.border--;
var a=document.getElementById("sp-results").firstChild.firstChild;if(a){a.style.border=SearchShortcut.border+"px none red"
}},itemSelected:false,renderResults:function(){this.html.results.innerHTML="";var k=document.createElement("ul");
k.className="sp-results";var m={};for(var h=0;h<this.results.length;h++){var t=this.results[h];
var q=unescape(t.desc);var e="";if(q.length>this.descriptionCharacters){q=q.substring(0,q.lastIndexOf(" ",this.descriptionCharacters-11))+"&hellip;";
e=unescape(t.desc)}var d=unescape(t.title);if(d.length>this.titleCharacters){d=d.substring(0,d.lastIndexOf(" ",30))+"&hellip;"
}var g=document.createElement("li");g.id="sp-result-"+h;g.className="category-"+unescape(t.category).toLowerCase().replace(/\s+/g,"-");
var c=document.createElement("div");c.className="hoverbox";var f=document.createElement("img");
f.src=t.image;f.title=e;var p=document.createElement("span");p.className="text";
var j=document.createElement("h4");var o=document.createElement("a");var b=document.createElement("p");
o.href=decodeURIComponent(t.url);o.title=e;o.onclick=function(){SearchShortcut.go(decodeURIComponent(t.url))
};o.innerHTML=d;b.innerHTML=q;b.title=e;j.appendChild(o);p.appendChild(j);p.appendChild(b);
g.appendChild(c);g.appendChild(f);g.appendChild(p);g.url=t.url;g.num=h;g.onmouseover=function(){SearchShortcut.itemSelected=true;
SearchShortcut.highlight(this)};g.onmouseup=function(){SearchShortcut.itemSelected=true;
SearchShortcut.go(this.url)};g.onmouseout=function(){SearchShortcut.itemSelected=false;
SearchShortcut.unhighlight(this)};g.priority=parseInt(t.priority);if(!m[t.category]){m[t.category]=new Array()
}m[t.category].push(g)}var l="firstCat resultCat";for(var n in m){if(!m.hasOwnProperty(n)){continue
}g=document.createElement("li");g.className=l;g.innerHTML=unescape(n);l="resultCat";
k.appendChild(g);for(var a=0;a<m[n].length;a++){k.appendChild(m[n][a])}}g=document.createElement("li");
g.id="sp-result-"+this.results.length;g.className="viewall";var c=document.createElement("div");
c.className="hoverbox";var o=document.createElement("a");o.href=this.fullSearchUrl+((this.fullSearchUrl.lastIndexOf("?")!==-1)?"&":"?")+"q="+encodeURIComponent(this.term);
o.innerHTML=this.viewAll;g.appendChild(c);g.appendChild(o);g.url=this.fullSearchUrl+"?q="+encodeURIComponent(this.term);
g.num=this.results.length;g.onclick=function(){SearchShortcut.go(this.url)};g.onmouseover=function(){SearchShortcut.itemSelected=true
};g.onmouseout=function(){SearchShortcut.itemSelected=false};document.getElementById("globalsearch").className="active";
k.appendChild(g);this.html.results.appendChild(k);this.hideAllQuicktimeMovies();
if(typeof(flashOnPage)!="undefined"&&flashOnPage){this.flashDomFix();this.startFlashFixTimer()
}},startKeystrokeTimer:function(){if(this.timeoutId){window.clearTimeout(this.timeoutId)
}this.timeoutId=window.setTimeout("SearchShortcut.commitKeystroke()",this.entryDelay)
},commitKeystroke:function(){this.search(this.searchText)},hideResults:function(a,b){if(!this.html){this.init()
}this.selected=null;document.getElementById("globalsearch").className="";this.html.results.innerHTML="";
this.showAllQuicktimeMovies()},highlight:function(a){a.className="hoverli"},keyHighlight:function(a){if(this.selected){this.selected.className=""
}this.selected=a;a.className="hoverli"},unhighlight:function(a){a.className=""},load:function(){var d=document.createElement("img");
if(location.protocol.match(/https/)){d.src="https://ssl.apple.com/global/nav/images/spinner.gif"
}else{d.src="http://images.apple.com/global/nav/images/spinner.gif"}d.width="11";
d.height="11";d.border="0";d.alt="*";d.id="sp-search-spinner";d.style.display="none";
document.getElementById("globalsearch").appendChild(d);var b=document.getElementById("g-search"),c=document.getElementById("search-section"),a;
if(!c){a=b.getElementsByTagName("div")[0];if(!a){a=b}c=document.createElement("input");
c.id="search-section";c.type="hidden";c.name="sec";c.value=window.searchSection;
a.appendChild(c)}else{if(c){c.value=window.searchSection}}b.onsubmit=function(e){return false
};if(navigator.userAgent.match(/AppleWebKit/i)&&!(navigator.userAgent.match(/Chrome/i)&&navigator.userAgent.match(/win/i))){document.getElementById("sp-searchtext").onkeydown=function(e){var f=typeof(event)!="undefined"?event.keyCode:e.keyCode;
if(!e){e=event}if(f==13&&!e.altKey){if(e.target.value.length===0){return false}if(SearchShortcut.selected){SearchShortcut.go(SearchShortcut.selected.url)
}else{SearchShortcut.hideResults();document.getElementById("g-search").submit()
}}}}document.getElementById("sp-searchtext").onkeyup=function(e){var g=typeof(event)!="undefined"?event.keyCode:e.keyCode;
if(!e){e=event}if(g==40&&SearchShortcut.results){try{e.preventDefault();e.stopPropagation()
}catch(h){}if(SearchShortcut.selected&&(SearchShortcut.results.length>SearchShortcut.selected.num+1)){SearchShortcut.keyHighlight(document.getElementById("sp-result-"+(SearchShortcut.selected.num+1)))
}if(!SearchShortcut.selected&&SearchShortcut.results.length>0){SearchShortcut.keyHighlight(document.getElementById("sp-result-0"))
}SearchShortcut.flashDomRender()}else{if(g==38&&SearchShortcut.results){try{e.preventDefault();
e.stopPropagation()}catch(h){}if(SearchShortcut.selected&&SearchShortcut.selected.num>0){SearchShortcut.keyHighlight(document.getElementById("sp-result-"+(SearchShortcut.selected.num-1)))
}SearchShortcut.flashDomRender()}else{if(g==27){SearchShortcut.hideResults();document.getElementById("sp-searchtext").value=""
}else{SearchShortcut.selected=false;var f=document.getElementById("sp-searchtext").value;
f=f.replace(/[%\^\?\!\*\/<>\$]/ig,"");f=f.replace(/^\s+/g,"").replace(/\s+$/g,"");
if(f.length<1&&SearchShortcut.html){SearchShortcut.html.results.innerHTML="";document.getElementById("sp-search-spinner").style.display="none";
SearchShortcut.hideResults()}else{if(f.length>SearchShortcut.minimumCharactersForSearch){SearchShortcut.searchText=f;
SearchShortcut.startKeystrokeTimer()}}}}}}}};function decorateGlobalSearchInput(){var m=document.getElementById("sp-searchtext"),d=document.getElementById("globalheader"),f=null,e=0,j="Search",i="";
if(typeof(searchCountry)=="undefined"){searchCountry="us"}if(geoMap[searchCountry.toUpperCase()].searchText){j=geoMap[searchCountry.toUpperCase()].searchText
}if(navigator.userAgent.match(/AppleWebKit/i)&&!(navigator.userAgent.match(/Chrome/i)&&navigator.userAgent.match(/win/i))){m.setAttribute("type","search");
if(!m.getAttribute("results")){m.setAttribute("results",e)}if(null!=j){m.setAttribute("placeholder",j);
m.setAttribute("autosave",i)}m.onfocus=function(){d.className+=" globalheader-focus"
};m.onblur=function(){if(!SearchShortcut.itemSelected){SearchShortcut.hideResults()
}}}else{m.setAttribute("autocomplete","off");f=document.createElement("input");
m.setAttribute("type","text");m.parentNode.replaceChild(f,m);var b=document.createElement("span");
b.className="left";var k=document.createElement("span");k.className="right";var h=document.createElement("div");
h.className="reset";var a=document.createElement("div");a.className="search-wrapper";
var g=m.value==j;var c=m.value.length==0;if(g||c){m.value=j;a.className+=" blurred empty"
}a.appendChild(b);a.appendChild(m);a.appendChild(k);a.appendChild(h);m.onfocus=function(){var n=a.className.indexOf("blurred")>-1;
if(m.value==j&&n){m.value=""}a.className=a.className.replace("blurred","");d.className+=" globalheader-focus"
};m.onblur=function(){if(!SearchShortcut.itemSelected){SearchShortcut.hideResults()
}if(m.value==""){a.className+=" empty";m.value=j}a.className+=" blurred";d.className=d.className.replace("globalheader-focus","")
};m.onkeydown=function(n){var p=typeof(event)!="undefined"?event.keyCode:n.keyCode;
if(!n){n=event}if(p==13&&!n.altKey){var o=null;if(n.target){o=n.target}else{if(n.srcElement){o=n.srcElement
}}if(o.value.length===0){return false}if(SearchShortcut.selected){SearchShortcut.go(SearchShortcut.selected.url)
}else{SearchShortcut.hideResults();document.getElementById("g-search").submit()
}return}if(m.value.length>=0){a.className=a.className.replace("empty","")}l()};
var l=function(){return(function(n){var o=false;if(!n){n=window.event}if(n.type=="keydown"){if(n.keyCode!=27){return
}else{o=true}}m.blur();m.value="";a.className+=" empty";m.focus()})};h.onmousedown=l();
if(f){f.parentNode.replaceChild(a,f)}}};
