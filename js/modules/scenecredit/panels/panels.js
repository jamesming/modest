define([
		'jquery', 
		'scrollTo', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/scenecredit/panels/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
	], function(
		$, 
		scrollTo, 
		core, 
		_, 		
		Backbone, 
		template
		) {   
			
		var Model =  Backbone.Model.extend()
								,scrollTo_speed = 1500
								,PanelView = Backbone.View.extend();
			
    core.createContainer('outter');
    
    $('#outter').html("\
			    <div id='panels_wrapper' class='full_size'>\
					</div >\
		");
			

    _.extend(PanelView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('scenecredit/panels', function(){}); 

    				},
    	
					  el: '#panels_wrapper',
        
		        reAdjustCSS: function( numberOfPanels  ){
		        	
									    var numOfPanels = numberOfPanels,  // this is the size of the collection
									        bodyWidth = $('body').width();			      	
								      	
									    var widthOfOutter = (numOfPanels * bodyWidth);
									
									    $('#panels_wrapper').width(widthOfOutter);
									    $('.panel').width(bodyWidth).height($('body').height()-50); 
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'panels',
    	
    		description: 'Panels Module for testing.',
    		
    		view:new PanelView(),

        register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'createPanel', function( model ){
		      	
							that.template = _.template(template, {
							    model: model.toJSON()  
							});
							
							return that.template;
							
      		});
      		
      		
		      core.registerMethod(this.module_name, 'addToEl', function( combinedPanels ){
		      	
		      		$(that.el).append( combinedPanels);

							
      		});      		
      		
		      core.registerMethod(this.module_name, 'reAdjustCSS', function(numberOfPanels ){

							that.reAdjustCSS( numberOfPanels );
							
      		});      		
      		
		      core.registerMethod(this.module_name, 'scrollToPanel', function( model ){

							$('#outter').scrollTo('#category_' + model.get('id'), scrollTo_speed);
							
      		});   
      		
        },

        init: function() {
        	
					this.register();
					
					setTimeout(function(){

						if( !window.parent.$('#single_module').is(":checked")  ){
								$('#outter').scrollTo('#category_49', scrollTo_speed, function(){
									$('#outter').scrollTo('#category_44', scrollTo_speed);
								});							
						};
						

					}, 1000); 					
					
					
//					var callThisFromCategoriesModule = function(){
//						
//							var obj = {
//								model:	new Model({ name: "Home" }),
//								numberOfPanels: 1 // THIS IS THE SIZE OF THE COLLECTION
//							};
//						
//					    core.method('panels', 'addPanel', arg1 = obj)
//						
//					};
//					
//					var callThisFromCategoriesModule2 = function(){
//						
//							var obj = {
//								model:	new Model({ name: "Gallery" }),
//								numberOfPanels: 2 
//							};
//						
//					    core.method('panels', 'addPanel', arg1 = obj)
//						
//					};					
//					
//        	
//					setTimeout(function(){
//						callThisFromCategoriesModule();
//						callThisFromCategoriesModule2();
//					}, 1000); 

			    
        }

    }

});