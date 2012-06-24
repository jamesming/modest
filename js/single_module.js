
var module = window.parent.$('#module').val();


define([
    'core',
    'modules/' + module + '/' + module
    ], function(
		core,
		obj
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
            
            
						//console.log(style);        
            
					}, 1000); 
			
		};

    return {

        init: function() {
        	
        	core.registerModuleWithObject(module, obj);   
        	
					core.init();
					
					console_out();

        }
    }

});