define([
     'core'
    ,'modules/reset/reset'
    ,'modules/image_sample/image_sample'
    ,'modules/upload/upload'
    ,'modules/modal/modal'
    ,'modules/piro/piro'
    ], function(
		 core
		,reset
		,image_sample
		,upload
		,modal
		,piro
		) {
			
		var console_out = function(){
			
					core.listAllModules();					
					core.listAllMethods();
					core.log(core.css);
					
					
					var style = '';
					setTimeout(function(){
						
            for (var module_name in core.css) {
                style += '/* ---' + module_name +  '--- */  \n' + core.css[module_name].style + '\n\n';
            }
            
            
						// console.log(style);        
            
					}, 1000); 
			
		};

    return {

        init: function() {
        	
        	core.registerModuleWithObject('reset', reset);   
        	core.registerModuleWithObject('image_sample', image_sample);   
        	core.registerModuleWithObject('upload', upload);   
        	core.registerModuleWithObject('modal', modal);   
        	core.registerModuleWithObject('piro', piro);   
        	
					
					
					core.init();
					
					
					console_out();

        }
    }

});