define([
     'core'
    ,'modules/reset/reset'
    ,'modules/topbar/topbar'
    ,'modules/stretch/stretch'
    ,'modules/profile/profile'
    ,'modules/gallery/gallery'
    ,'modules/panels/panels'
    ,'modules/navicons/navicons'
    ,'modules/categories/categories'
    ], function(
		 core
		,reset
		,topbar
		,stretch
		,profile
		,gallery
		,panels
		,navicons
		,categories
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
        	core.registerModuleWithObject('topbar', topbar);   
        	core.registerModuleWithObject('stretch', stretch);   
        	core.registerModuleWithObject('profile', profile);   
        	core.registerModuleWithObject('gallery', gallery);   
        	
        	
					core.registerModuleWithObject('navicons', navicons);        	
					core.registerModuleWithObject('panels', panels);

					
					
					//COLLECTIONS AND MODELS ALWAYS LAST
					core.registerModuleWithObject('categories', categories);
					
					
					
					core.init();
					
					
					console_out();

        }
    }

});