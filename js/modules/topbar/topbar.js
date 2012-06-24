define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/topbar/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/topbar/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		TopbarView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('topbar');
    

    _.extend(TopbarView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('topbar', function(){}); 

    				},
    	
					  el: '#topbar',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'topbar',
    	
    		description: 'Topbars Module for testing.',
    		
    		view:new TopbarView(),

        register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'doSomething', function( model ){
		      	
							that.template = _.template(template, {
							    model: model.toJSON()  
							});
							
							that.render(that.template);
							
      		});
      		
        },

        init: function() {
        	
					this.register();
					
					var that = this;
					
					setTimeout(function(){

						if( window.parent.$('#single_module').is(":checked")  ){
							core.method('topbar', 'doSomething', arg1 = new Model());
						};
						

					}, 500); 					
					
        }

    }

});