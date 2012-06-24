var module = window.parent.$('#module').val();
var module2 = window.parent.$('#module2').val();

define([
    'core',
    'modules/' + module + '/' + module,
    'modules/' + module2 + '/' + module2
    ], function(
		core,
		obj,
		obj2
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
            
            
						console.log(style);        
            
					}, 1000); 
			
		};

    return {

        init: function() {
        	
        	core.registerModuleWithObject(module, obj); 
        	core.registerModuleWithObject(module2, obj2); 
					
					
					core.init();
					
					console_out();

        }
    }

});