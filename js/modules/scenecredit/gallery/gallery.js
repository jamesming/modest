define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/scenecredit/gallery/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template
		) {
			
			
		if( window.parent.$('#single_module').is(":checked")  ){
			core.createContainer('gallery');
		};
			
		var Model =  Backbone.Model.extend()
								,GalleryView = Backbone.View.extend();
			

    _.extend(GalleryView.prototype,{
    	
    				el: '#gallery',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
    	
    				initialize: function(){

		        	core.loadCSS('scenecredit/gallery', function(){}); 

    				}
				}
    );	

    return {
    	
    		module_name: 'gallery',
    	
    		description: 'Gallerys Module for testing.',
    		
    		view:new GalleryView(),

        register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'generateGallery', function( model ){
		      	
							that.template = _.template(template, {
							    model: model.toJSON()  
							});
							
							return that.template;
							
      		});
      		 
      		
        },

        init: function() {
        	
					this.register();

					if( window.parent.$('#single_module').is(":checked")  ){
						
						model = new Model({name: 'James'});
						
						core.method('gallery', 'generateGallery', arg1 = model);
						
						this.view.render();
				
					};
	
					
        }

    }

});