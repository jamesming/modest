define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/controls/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/controls/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		ControlsView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('controls');
    

    _.extend(ControlsView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('controls', function(){}); 

    				},
    	
					  el: '#controls',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'controls',
    	
    		description: 'Controlss Module for testing.',
    		
    		view:new ControlsView(),

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
							core.method('controls', 'doSomething', arg1 = new Model());
						};
						

					}, 500); 					
					
        }

    }

});