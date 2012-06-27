define([
		 'order!jquery'
		,'order!jquery_ui_1_8_16'
		,'order!widget'
		,'order!mouse'
		,'order!draggable'
		,'piro'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/piro/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$ 
		,jquery_ui_1_8_16
		,widget
		,mouse
		,draggable
		,piro
		,core 		
		,_		
		,Backbone
		,template
		) {
			
		var			 Collection =  Backbone.Collection.extend()
						,Model =  Backbone.Model.extend()
						,PiroView = Backbone.View.extend();
			
    core.createContainer('piro', 'ul');

    _.extend(PiroView.prototype,{
    	
    				initialize: function(){
    					
    					var that = this;
    					
		        	core.loadCSS('piro', function(){
		        		
	       						
					        			        		
		        	});
		        	
    				}
    				
    				
    				,singleMode:function(){
    					
				        	var		html=''
					        				,images = [
						        					{ large: 'js/modules/piro/images/33.jpg'
						        				   ,small: 'js/modules/piro/images/33s.jpg'}
						        				, { large: 'js/modules/piro/images/34.jpg'
						        				   ,small: 'js/modules/piro/images/34s.jpg'}
						        				, { large: 'js/modules/piro/images/37.jpg'
						        				   ,small: 'js/modules/piro/images/37s.jpg'}
						        				, { large: 'js/modules/piro/images/38.jpg'
						        				   ,small: 'js/modules/piro/images/38s.jpg'}
						        				, { large: 'js/modules/piro/images/13.jpg'
						        				  	,small: 'js/modules/piro/images/13s.jpg'}
						        				, { large: 'js/modules/piro/images/27.jpg'
					        				   		,small: 'js/modules/piro/images/27s.jpg'}]
					        				,len = images.length;
					        				
					        	this.collection = new Collection();
					        	
					        	for(var i = 0 ; i < len; i++ ){
					        		
		    							var model = new Model({		small: images[i].small
								    											 		 ,large: images[i].large 
																				});
																				
											model.set('cid', model.cid);
											
											this.collection.add([model]);			        	
						        						        		
					        	}
					        	
					        	var that = this;
					        	
					        	this.collection.each(function(model){
				    						html += that.createHTML(model);
				    				});
				    				
					        	this.render( html );	
					        	
								    $( 'a[href$="jpg"]\
								    	 ,a[href$="bmp"]\
								    	 ,a[href$="gif"]\
								    	 ,a[href$="jpeg"]\
								    	 ,a[href$="png"]')
								    .addClass('pirobox_gallery')
								    .attr('rel', 'gallery');
								    
								    $.pirobox_ext({
								        piro_speed: 600,
								        zoom_mode: true,
								        move_mode: 'mousemove',
								        bg_alpha: .8,
								        bgColor:'rgba(0, 0, 0, 0.9)',
								        piro_scroll: true,
								        share: true,
								        resize: true
								    });							 	
    					
    					
    				}
    				
    				,createHTML: function(model){
																	
								var html = _.template(template, {
								    model: model.toJSON()  
								});
	
						 		return html;	
    					
    				}
    	
					  ,el: '#piro'
					  
					  ,render: function(html) {
					      $(this.el).append(html);
					  }

				}
    );	

    return {
    	
    		 module_name: 'piro'
    	
    		,description: 'Piros Module for testing.'
    		
    		,view:new PiroView()

        ,register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'createHTML', function( collection ){
		      	
		      		var		html='';

					        	collection.each(function(model){
				    						html += that.createHTML(model);
				    				});
				    				
					        	that.render( html );	
					        	
      		});
      		
      		
		      core.registerMethod(this.module_name, 'applyPiro', function(){

								    $( 'a[href$="jpg"]\
								    	 ,a[href$="bmp"]\
								    	 ,a[href$="gif"]\
								    	 ,a[href$="jpeg"]\
								    	 ,a[href$="png"]')
								    .addClass('pirobox_gallery')
								    .attr('rel', 'gallery');
								    
								    $.pirobox_ext({
								        piro_speed: 600,
								        zoom_mode: true,
								        move_mode: 'mousemove',
								        bg_alpha: .8,
								        bgColor:'rgba(0, 0, 0, 0.9)',
								        piro_scroll: true,
								        share: true,
								        resize: true
								    });	
      		});      		
      		
        }

        ,init: function() {
        	
					this.register();
					
					var that = this.view;
				
					if( window.parent.$('#single_module').is(":checked") 
							&& window.parent.$('#module2').val() == ''
							&& window.parent.$('#module3').val() == ''
					 ){
				 	
				 			setTimeout(function(){
				 				that.singleMode();
				 			}, 1000);
				 			

					};							
							
					
        }

    }

});