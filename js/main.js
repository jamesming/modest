require.config({ 
    'paths': {
    	
    	 /* 
    	 *
    	 *  BASE JQUERY
    	 *
    	 */
			 "jquery": "libs/jquery/jquery.1.7.2"
			,"jquery_1_4_2": "libs/jquery/jquery.1.4.2.min"
			,"jquery_ui_1_8_13": "libs/jquery/jquery-ui.1.8.13.min"
			
			
			
			/* 
			*
			*  BACKBONE
			*
			*/
			,"underscore": "libs/lodash-0.2.1" // replacement for underscore   : https://github.com/bestiejs/lodash
			,"backbone": "libs/backbone.0.9.2"
			,"less": "libs/less-1.3.0"
			
			
			/* 
			*
			*  PIRO BOX
			*
			*/
			,"jquery_ui_1_8_16": "libs/jquery/jquery-ui.1.8.16.min"
			,"widget": "libs/jquery/jquery.ui.widget.min"
			,"mouse": "libs/jquery/jquery.ui.mouse.min"
			,"draggable": "libs/jquery/jquery.ui.draggable.min"
			,"piro": "libs/piro/js/pirobox_extended_v.1.2" 			
			
			
			,"scrollTo": "libs/scrollTo/jquery.scrollTo-min"
			,"fancyzoom": "libs/fancyzoom/fancyzoom" 
			,"yox_src": "libs/yoxview/jquery.yoxview-2.21.min" 
			,"yoxthumbs": "libs/yoxview/jquery.yoxthumbs" 
			,"stretch": "libs/backstretch/jquery.backstretch"
			,"tinyscrollbar": "libs/jquery.tinyscrollbar.1.67"
			,"mousewheel": "libs/mousewheel/jquery.mousewheel.3.0.6"
			,"jscrollpane": "libs/scrollpane/jquery.jscrollpane.2.0"
			
			

		},
		urlArgs: "bust=" + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
}); 


if( window.parent.hasOwnProperty("$") &&	window.parent.$('#single_module').is(":checked")  ){
	
	if( window.parent.$('#module3').val() != ''){
		var whichApp = 'triple_module';
	}else if( window.parent.$('#module2').val() != ''){
		var whichApp = 'double_module';
	}else{
		var whichApp = 'single_module';
	};
	
		
}else{
	var whichApp = window.parent.$('#app').val();	
};
 

require([
	 'underscore'
	,'backbone'
	,'core'
	,'order!'+ whichApp
	], 
	function( 
	 _
	,backbone
	,core
	,app
	){

		/* 
		*
		* CHANGES UNDERSCORE FOR MUSTACHE LIKE TEMPLATING 
		*
		*/
		_.templateSettings = {
			interpolate: /\{\{(.+?)\}\}/g
		};		

		core.BrowserDetect.init();
		app.init();
		
});


