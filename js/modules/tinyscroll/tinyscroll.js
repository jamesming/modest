define([
		'jquery', 
		'tinyscrollbar', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/tinyscroll/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/tinyscroll/view/view'
	], function(
		$, 
		tinyscrollbar, 
		core, 
		_, 		
		Backbone, 
		template, 
		TinyscrollView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('tinyscroll');
    

    _.extend(TinyscrollView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('tinyscroll', function(){}); 

    				},
    	
					  el: '#tinyscroll',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'tinyscroll',
    	
    		description: 'Tinyscrolls Module for testing.',
    		
    		view:new TinyscrollView(),

        register:function(){
        	
        	var self = this;
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'doSomething', function( model ){
		      	
		      		model.set('image_path', 'js/modules/' + self.module_name + '/images/');
		      	
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
							core.method('tinyscroll', 'doSomething', arg1 = new Model());
						};
						
						$('#scrollbar1').tinyscrollbar();

					}, 500); 					
					
        }

    }

});