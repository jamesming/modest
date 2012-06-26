define([
		 'order!jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'order!fancyzoom'
		,'text!modules/modal/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$, 
		core 
		,_		
		,Backbone
		,fancyzoom
		,template
		) {
			
		var  Model = Backbone.Model.extend()
				,ModalView= Backbone.View.extend();
			
    core.createContainer('modal');
    

    _.extend(ModalView.prototype,{
    	
    				initialize: function(){
    					
    					var that = this;
    					
		        	core.loadCSS('modal', function(){
		        		
									var  Model = Backbone.Model.extend()
											,model = new Model()
			
									that.template = _.template(template, {
									    model: model.toJSON()  
									});
									
									that.render(that.template);
									
		        	}); 

    				}
    	
					  ,el: '#modal'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }


				    ,events: {
				         "click #someElement": "launch"
				    }					  
        
		        ,launch: function(  ){
		        	
		        }
				            
		        ,reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'modal',
    	
    		description: 'Modals Module for testing.',
    		
    		 view:new ModalView()

        ,register:function(){
        	
		      core.registerMethod(this.module_name, 'bind', function( dom_el, content, options ){
		      	
		      		var options = options || {};
		      	
		      		// console.log(  content);

				    	var doWhenReady = function(){
				    		
				    		if( $('#modal_box').html() === null){
				    			core.log('attempting modal do.' );
				    			setTimeout(function(){
				    				doWhenReady();
				    			}, 55);
				    			
				    		}else{
				    			
														core.log( 'finally ready');
																		    			
				    								$('#modal_box').append(content);
				    									
				    								core.log( 'Insides to be popped out: ' +  $('#modal_box').html());  
				    								
				    								core.log( 'Text of selector: ' + dom_el);

														$(dom_el).attr('href', '#modal_box').fancyZoom(options);						    			
				    		};
				    		
				    	};
				    	
				    	doWhenReady();							
							
      		});  
      		
      		
					core.registerMethod(this.module_name, 'setModalContent', function( content ){
						
					  $('#modal_box').html(content);
					
						console.log( $('#modal_box').html());
					
					});
      		    		
      		
        }

        ,init: function() {
        	
					this.register();
					
					var that = this.view;

					if( window.parent.$('#single_module').is(":checked") 
							&& window.parent.$('#module2').val() == ''
							&& window.parent.$('#module3').val() == ''
					 ){
					 	
					 	$('#modal').prepend("\
					 		<a  class='modal_link' >launch</a>\
					 	");

						var  img_dog = "<img id='img_dog' src='http://www.the-hunting-dog.com/wp-content/uploads/2011/01/Dog-GR.jpg'/>"
								,options = {
																	 width:200
																	,height:100
																	,scaleImg: true
																	,closeOnClick: false // Close the zoom by clicking on the contents\
																	,
															};
							
						core.method('modal', 'bind', arg1 = '.modal_link', arg2 = img_dog, options );
							
					};
					

        }

    }

});