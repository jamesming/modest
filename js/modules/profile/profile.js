define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/profile/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/profile/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		ProfileView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('profile');
    

    _.extend(ProfileView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('profile', function(){}); 

    				},
    	
					  el: '#profile',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'profile',
    	
    		description: 'Profiles Module for testing.',
    		
    		view:new ProfileView(),

        register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'doSomething', function( model ){
		      	
							that.template = _.template(template, {
							    model: model.toJSON()  
							});
							
      		});
      		
        },

        init: function() {
        	
					this.register();
					
					core.method('profile', 'doSomething', arg1 = new Model());
					
					this.view.render();
			
					
        }

    }

});