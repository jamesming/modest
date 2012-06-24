define([
	'jquery',
	'less'], function($, less) {
		
		var BrowserDetect = {
				    init: function() {
				        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
				        this.OS = this.searchString(this.dataOS) || "an unknown OS";
				    },
				    searchString: function(data) {
				        for (var i = 0; i < data.length; i++) {
				            var dataString = data[i].string;
				            var dataProp = data[i].prop;
				            this.versionSearchString = data[i].versionSearch || data[i].identity;
				            if (dataString) {
				                if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
				            }
				            else if (dataProp) return data[i].identity;
				        }
				    },
				    searchVersion: function(dataString) {
				        var index = dataString.indexOf(this.versionSearchString);
				        if (index == -1) return;
				        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
				    },
				    dataBrowser: [
				        {
				        string: navigator.userAgent,
				        subString: "Chrome",
				        identity: "Chrome"},
				    {
				        string: navigator.userAgent,
				        subString: "OmniWeb",
				        versionSearch: "OmniWeb/",
				        identity: "OmniWeb"},
				    {
				        string: navigator.vendor,
				        subString: "Apple",
				        identity: "Safari",
				        versionSearch: "Version"},
				    {
				        prop: window.opera,
				        identity: "Opera",
				        versionSearch: "Version"},
				    {
				        string: navigator.vendor,
				        subString: "iCab",
				        identity: "iCab"},
				    {
				        string: navigator.vendor,
				        subString: "KDE",
				        identity: "Konqueror"},
				    {
				        string: navigator.userAgent,
				        subString: "Firefox",
				        identity: "Firefox"},
				    {
				        string: navigator.vendor,
				        subString: "Camino",
				        identity: "Camino"},
				    { // for newer Netscapes (6+)
				        string: navigator.userAgent,
				        subString: "Netscape",
				        identity: "Netscape"},
				    {
				        string: navigator.userAgent,
				        subString: "MSIE",
				        identity: "Explorer",
				        versionSearch: "MSIE"},
				    {
				        string: navigator.userAgent,
				        subString: "Gecko",
				        identity: "Mozilla",
				        versionSearch: "rv"},
				    { // for older Netscapes (4-)
				        string: navigator.userAgent,
				        subString: "Mozilla",
				        identity: "Netscape",
				        versionSearch: "Mozilla"}
				    ],
				    dataOS: [
				        {
				        string: navigator.platform,
				        subString: "Win",
				        identity: "Windows"},
				    {
				        string: navigator.platform,
				        subString: "Mac",
				        identity: "Mac"},
				    {
				        string: navigator.userAgent,
				        subString: "iPhone",
				        identity: "iPhone/iPod"},
				    {
				        string: navigator.platform,
				        subString: "Linux",
				        identity: "Linux"}
				    ]
				
				};
				
		BrowserDetect.init();  
		
    var modules = {}, 
    		methods = {};
    
    return {
    	
    		debug: 0
    		
    		,log: function(what){
    			if( this.debug === 1){
    				console.log(what);
    			};
    		}

        ,init: function() {

            for (var name in modules) {
   	
                if (modules[name].hasOwnProperty('init')) {
                    modules[name].init();
                };
                
            }

        }
        
        /* MODULES
        *
        *  
        *
        */

        ,registerModule: function(name) {
            var module = {
                name: name,
                init: function() {
                    // console.log(this.name + ' is started.');
                }
            };
            modules[name] = module;
        }
        ,registerModuleWithObject: function(name, obj) {
            obj.name = name;
            if (!obj.hasOwnProperty('init')) {
                obj.init = function() {
                    // console.log(this.name + ' is started.');
                };
            }
            modules[name] = obj;
        }
        ,registerModuleWCallback: function(name, callback) {

            var that = this,
                module = callback(util, that);

            module.name = name;

            if (!module.hasOwnProperty('init')) {
                module.init = function() {
                    // console.log(this.name + ' is started.');
                };
            }

            modules[name] = module;
        }
        ,removeModule: function(name) {

            delete modules[name];
        }
        ,module: function(name) {
            if (modules[name]) {
                return modules[name];
            } else {
                this.registerModule(name);
                return modules[name];
            };

        }
        ,listAllModules: function() {
            this.log(modules);
        }



				/* METHODS
				*
				*	  
				*
				*/
        ,registerMethod: function(module_name, method_name, method_function) {
        	
	        	methods[module_name] = methods[module_name] || {};
        	
            methods[module_name][method_name] = method_function;

        }
        ,removeMethod: function(module_name, method_name) {
        	
        		if( !method_name ){
        			delete methods[module_name];
        		}else{
        			delete methods[module_name][method_name];
        		};
            
            
        }
        ,method: function(module_name, method_name, arg1, arg2, arg3, arg4, arg5) {
        	
        		if( !methods[module_name]){
        			console.log('"'+module_name + '" is not a registered module.');
        			return;
        		}else if(!methods[module_name][method_name]){
        			console.log('"'+method_name + '" is not a registered method in the "' + module_name + '" module.');
        			return;
        		};
        	
            return methods[module_name][method_name](arg1, arg2, arg3, arg4, arg5);
            
        }
        ,listAllMethods: function() {
            this.log(methods);
        }


				/* LAYOUT
				*
				*  
				*
				*/
				,css:{}
				
        ,loadCSS: function(module_name, callback) {
        	
						if (module_name in this.css) {
							
								callback();
								
						}else{
							
	        		this.css[module_name] = {};
	        		
	            var  head = document.getElementsByTagName('head')[0]
	            		,link = document.createElement('link')
	            		,path = 'js/modules/' + module_name + '/style.css'+ '?v=' + Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1;
	            
	            link.id = 'style_' + module_name;
	            link.rel = 'stylesheet';
	            link.type = 'text/css';
	            link.href = path;
	            link.media = 'all';
	            
	            
	            $(head).prepend(link);	           
	            
								
							if ($("#style_" + module_name )[0]) {
								
								//console.log('does exist' );
							
							}else{
								
								//console.log('not exist' );
								
							}								
								
	            var that = this;
	            
              $.get(path, function(data) {
					        that.css[module_name].style = data;
					    });
					    
							setTimeout(function(){
								
								callback();
								
							}, 1000); 					    

						}

        }
        ,loadLESS: function( lessStyle ) {
        	
							(new less.Parser()).parse(lessStyle, function (err, css) {
							  if (err) {
							    this.log(err);
							  } else {
							    var style = document.createElement('style');
							    style.type = 'text/css';
							    style.textContent = css.toCSS();
							    
			            var head = document.getElementsByTagName('head')[0];
			            head.appendChild(style);								    
							    
							  }
							});
							
        }        
        ,image_path: function(module){
        	return 'js/modules/' + module + '/images/';
        }
        ,createContainer: function(module, container_type){
        	
        		var  container_type = container_type || 'div'
        				,body = document.getElementsByTagName('body')[0]
        				,ele = document.createElement(container_type);   
            ele.id = module;
            body.appendChild(ele);
        	
        }
        
        
        /* UTILS
        *
        *  
        *
        */
				,BrowserDetect : BrowserDetect


    };


});