# Readability Bookmarklet (CSS Modified)


## What
[Readability?](http://lab.arc90.com/experiments/readability/) is a simple tool that makes reading on the Web more enjoyable by removing the clutter around what you're reading. Follow the steps below to install Readability? in your Web browser.

/css/readability.css is modified for better viewing experience.
- show the tools(refresh/print/email) when hover on the page
- show the links when hover on the content
- auto scale down the images to fit the content area, hover to scale up to original size.


## HowTo
Drag This link to bookmarks bar

<a href="javascript:(function(){readConvertLinksToFootnotes=false;readStyle='style-ebook';readSize='size-small';readMargin='margin-wide';_readability_script=document.createElement('script');_readability_script.type='text/javascript';_readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random());document.documentElement.appendChild(_readability_script);_readability_css=document.createElement('link');_readability_css.rel='stylesheet';_readability_css.href='http://zonovo.github.com/readability/css/readability.css';_readability_css.type='text/css';_readability_css.media='all';document.documentElement.appendChild(_readability_css);_readability_print_css=document.createElement('link');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://lab.arc90.com/experiments/readability/css/readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')[0].appendChild(_readability_print_css);})();">→Readability</a>


## Preview
- English Article: <http://veerle.duoh.com/design/article/css3_for_web_designers_book_review> [[using readability→](http://i.min.us/ieqbiw.png)]
- 中文 (Zh-Cn) Article: <http://www.typeisbeautiful.com/2010/09/2971> [[using readability→](http://i.min.us/ieqBw6.png)]

## Bookmarklet Code
    `javascript:(function(){readConvertLinksToFootnotes=false;readStyle='style-ebook';readSize='size-small';readMargin='margin-wide';_readability_script=document.createElement('script');_readability_script.type='text/javascript';_readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random());document.documentElement.appendChild(_readability_script);_readability_css=document.createElement('link');_readability_css.rel='stylesheet';_readability_css.href='http://zonovo.github.com/readability/css/readability.css';_readability_css.type='text/css';_readability_css.media='all';document.documentElement.appendChild(_readability_css);_readability_print_css=document.createElement('link');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://lab.arc90.com/experiments/readability/css/readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')[0].appendChild(_readability_print_css);})();`


## Fork on Github
[http://github.com/zonovo/zonovo.github.com/tree/master/readability/](http://github.com/zonovo/zonovo.github.com/tree/master/readability/)


---
by [zonovo](http://claimID.com/zonovo)

Last Updated: January 23, 2011