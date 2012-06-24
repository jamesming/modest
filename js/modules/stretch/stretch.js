define([
		'jquery', 
		'core', 
		'stretch'
	], function(
		$, 
		core,
		stretch
		) {
			

    return {
    	
    		module_name: 'stretch',
    	
    		description: 'Stretchs Module for testing.',

        init: function() {
					//http://about.me/AlmudenaOrtega
					$.backstretch("http://d13pix9kaak6wt.cloudfront.net/background/almudenaortega_1330525840_32.jpg");
					
        }
    }

});