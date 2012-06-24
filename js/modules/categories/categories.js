define([
	'jquery', 
	'core', 
	'underscore', 
	'modules/categories/model/model',
	'modules/categories/collection/collection'
	], function(
		$, 
		core,
		_,
		Model,
		Collection
		) {
			
		var module_name = 'categories';
			
    _.extend(Model.prototype, {
    	
    		initialize: function(){
    			
    			this.bind('change', function( model ){
    				
    				//console.log(model);
    				
    			});
    			
    		},

		    url: '/api/index.php/rest/index/' + module_name
    	
    	});				
        	
        	
    _.extend(Collection.prototype, {
    	
		    model:Model,
		    url: '/api/index.php/rest/index/' + module_name
    	
    	});	
			
    return {
    	
    	  module_name: module_name,
    	
    		description: 'Categories Module for testing.',
        
        collection:new Collection(),     
        
        register:function(){
        	
		  		var that = this;
		  		
		  		
		      core.registerMethod(this.module_name, 'getModel', function( id){
		      	
		      	return that.collection.get(id);
		      	
      		}); 		  		
		  		
		      core.registerMethod(this.module_name, 'addNow', function( name ){
							    
					 		that.collection.add([
								new Model({
								    name: name
								})
					 		]);	
						    
      		}); 
      		
		      core.registerMethod(this.module_name, 'saveNow', function( model ){
		      	
		      			model.set('name', '12342');
		      	
								model.save(
										{},
										{
												success: function(model, response) {
													
												    console.log('SUCCESS:');
												    console.log(JSON.stringify(response));
												    
												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
												wait: true
										}
								);
      		}); 
      		
		      core.registerMethod(this.module_name, 'removeNow', function( model ){
										
	
		      			model.destroy({
												success: function(model, response) {
													
//												    console.log('SUCCESS:');
//												    console.log(JSON.stringify(response));

															that.collection.remove(model);
															
															core.method('navicons', 'removeIcon', arg1 = model );
															
//													    that.collection.each(function(model){
//													        console.log('model ' + model.get('name'));
//													    });
												    
												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
										    contentType: "application/json",
										    "url": "/api/index.php/rest/index/categories/" + model.get('id')
										});


      		});        		      		
      		
        },        
           
        init: function() {
        	
        	var that = this;
        	
        	this.register();
        	
					this.collection.bind('add', function(model){

								model.save(
										{},
										{
												success: function(model, id) {
													
												    model.set('id', id);
												    
												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
												wait: true
										}
								);
								
								core.method('navicons', 'createMoreIcons', arg1 = model);
								
					});
					
					
					this.collection.bind('reset', function(){  // CALLED RIGHT AFTER COLLECTION IS FETCHED
						
						var combinedPanels = '';
						
				    that.collection.each(function(model){
				    		
				        core.method('navicons', 'createMoreIcons', arg1 = model);
				        
								var innerHtml = core.method('gallery', 'generateGallery', arg1 = 
														
															new Model({ name: "Home" })
														
														);
														
				        model.set("innerHtml", innerHtml);
				        
								combinedPanels += core.method('panels', 'createPanel', arg1 = model);
				        
				    });
				    
				   	core.method('panels', 'addToEl', arg1 = combinedPanels);
						
						core.method('panels', 'reAdjustCSS', numberOfPanels = that.collection.length);
						
					}, this);
					
					this.collection.fetch({
						
									add: false,
									
								  success: function ( response) {
								  	
								  		core.log(JSON.stringify(response));
								  	
									    // that.collection.each(function(model){
									    //    core.log('model ' + model.get('name'));
									    // });
											
								  }
								}
					);
					
					this.collection.bind('change', this.collection.save, this.collection);
						  
        }
        

    }

});