/**
 * @preserve Galleria Classic Theme 2011-06-07
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */
 
/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
    name: 'sarah2011',
    author: 'zonovo',
    css: 'galleria.sarah2011.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',
        
		// set this to false if you want to show the caption all the time:
        _toggleInfo: true
    },
    init: function(options) {

    	// add keyboard navigation. via http://getsatisfaction.com/galleria/topics/keyboard_navigation_is_not_functional_or_am_i_fat_fingering_the_code
        this.attachKeyboard({
		left: this.prev,
		80: this.prev, //ASCII Dec keycode for "P"
		75: this.prev, //ASCII Dec keycode for "K"
		65: this.prev, //ASCII Dec keycode for "A"
		
		right: this.next,
		78: this.next, //ASCII Dec keycode for "N"
		74: this.next, //ASCII Dec keycode for "J"
		68: this.next, //ASCII Dec keycode for "D"
		space: this.next,
		
		13: this.openLightbox, //ASCII Dec keycode for "Return"
		87: this.openLightbox, //ASCII Dec keycode for "W"
		88: this.closeLightbox, //ASCII Dec keycode for "X"
		81: this.closeLightbox, //ASCII Dec keycode for "Q"
		
		83: function() {
        // start playing when S (keyCode 83) is pressed:
        this.playToggle(3000);
	   	},
   		70: this.toggleFullscreen, //ASCII Dec keycode for "F"
	   		
   		84: function() { //ASCII Dec keycode for "T"
   		this.$('thumb-nav-left').click();
		this.$('thumblink').click();
	    },
	    71: function() { //ASCII Dec keycode for "G"
	    this.$('thumb-nav-right').click();
		this.$('thumblink').click();
	    },
	    
	    73: function() { //ASCII Dec keycode for "I"
	    this.$('info-link').click();
	    }
		
		});	
		
        // add some elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });
        
        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';
        
        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        /*
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }
        */
        
        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
			info.show();
			this.$('info-link, info-close').hide();
		}
        
        // bind some stuff
        this.bind('thumbnail', function(e) {
            
            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });
                
                if ( e.index === options.show ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', e.index == options.show ? 1 : 0.6);
            }
        });
        
        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            
            this.$('info').toggle( this.hasInfo() );
            
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });
        
        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

}(jQuery));
