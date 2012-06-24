define([
		'jquery', 
		'core', 
		'mousewheel', 
		'jscrollpane', 
		'underscore', 		
		'backbone',
		'text!modules/scrollpane/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/scrollpane/view/view'
	], function(
		$, 
		core, 
		mousewheel, 
		jscrollpane, 
		_, 		
		Backbone, 
		template, 
		ScrollpaneView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('scrollpane');
    

    _.extend(ScrollpaneView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('scrollpane', function(){}); 

    				},
    	
					  el: '#scrollpane',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'scrollpane',
    	
    		description: 'Scrollpanes Module for testing.',
    		
    		view:new ScrollpaneView(),

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
							core.method('scrollpane', 'doSomething', arg1 = new Model());
						};
						
						
						// $('.scroll-pane').jScrollPane();
						$('.scroll-pane-arrows').jScrollPane(
							{
								showArrows: true,
								horizontalGutter: 10
							}
						);
						

					}, 500); 					
					
        }

    }

});