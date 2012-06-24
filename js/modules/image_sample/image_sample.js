define([
		 'jquery'
		,'jquery_ui_1_8_16'
		,'pirobox'		 
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/image_sample/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$
		,jquery_ui 
		,pirobox 		
		,core 
		,_		
		,Backbone
		,template
		) {
			
		var	 module_name = 'image_sample'
		
				,table = 'images'
				
				,Collection = Backbone.Collection.extend()
		
				,Model = Backbone.Model.extend({   url: '/api/index.php/rest/index/' + table  	})
				,Image_sampleView = Backbone.View.extend();
			
    core.createContainer(module_name, container_type = 'ul');

    _.extend(Image_sampleView.prototype,{
    	
    				initialize: function(){
    					
    							var that = this;

				        	core.loadCSS('image_sample', function(){
				        		
											that.fancyzoom();
						        		
						        	$('.box').mouseover(function() {
						        		
						        			var cid = $(this).find('img').attr('cid')
						        			   ,model = that.getModel(cid);
						        		
						        			$(this).children('.overlay.edit').show();
						        			
													if(model.get('id'))$(this).children('.overlay.delete, .overlay.enlarge').show();
													
													
												}).mouseout(function() {
													
						        			var cid = $(this).find('img').attr('cid')
						        			   ,model = that.getModel(cid);											
													
													$(this).children('.overlay.edit').hide();
													if(model.get('id'))$(this).children('.overlay.delete, .overlay.enlarge').hide();
												});										
				
						        	
						        	$('.delete, .enlarge')
						        	.mouseover(function() {
													$(this).css({'background-color':'rgba(0, 0, 0, 0.5)'})
												})
											.mouseout(function() {
													$(this).css({'background-color':'rgba(0, 0, 0, 0.25)'})
												});
												
												
											$('.delete').click(function() {
												
						        			var cid = $(this).parent().find('img').attr('cid')
						        			   ,model = that.getModel(cid);
												
													core.method('upload', 'remove_image', arg1 = model);
														
												});

												
										
		        	});		        	

    				}
    				
    				
					  ,fancyzoom: function(  ) {

											
											var that = this
												  ,link = "#" + module_name + " a.enlarge"
													,options = {
																	 width:400
																	,height:400
																	,scaleImg: true
																	,closeOnClick: false // Close the zoom by clicking on the contents
														 		};
														 		
											core.method("modal", "bind", arg1 = link, arg2 = '', arg3 = options );
												
												
											$('.enlarge').mouseover(function() {
												
						        					var cid = $(this).parent().find('img').attr('cid')
								        			   ,model = that.getModel(cid)
								        			   ,content = "<img src='/api/uploads/images/" + model.get('id') + "/file_full.png?random=" + Math.random() + "' />";
												
															core.method("modal", "setModalContent", arg1 = content);
														
											});																
																

					  }    				
    				
					  ,el: '#image_sample'
					  
					  ,render: function( html ) {
					      $(this.el).append( html );
					  }
					  
				    ,events: {
				         "click .box .overlay.edit": "clickButton"
				    }
        
		        ,clickButton: function(evt){
		        	
		        			var cid = $(evt.target).parent().find('img').attr('cid');
		        			
		        			var model = this.getModel(cid);
		        	
		        			core.method('upload', 'image', arg1 = model);	
		        			
		        }	
		        
		        
		        ,getModel: function(cid){
		        	
									return this.collection.getByCid(cid);
		        			
		        }			        	  
		        
				}
    );	

    return {
    	
    		 module_name: 'image_sample'
    	
    		,description: 'Image_samples Module for testing.'
    		
    		,view:new Image_sampleView()
    		
    		,createModel:function(){
    			
    					var  that = this.view
    							,model = new Model({
								    							 table: table
																	,name:'pic of heart'
																	,description: 'Lorem ipsum'
																	,thumb_width: 200
																	,thumb_height: 200
																	,full_width: 400
																	,full_height: 400
																	,module_name: module_name
																	,default_src: 'http://worldvillage.com/wp-content/themes/worldVillage/images/noav-small.png'
																	,callbackWhenRemoved: function(dom_el){
																		dom_el.parent().parent().remove();
																	}
																});
																
							model.set('cid', model.cid);
							model.set('php_callback_dom_el', "$('#" + module_name + " img[cid=" + model.get('cid') + "]')");
							
							that.collection.add([
								model
					 		]);							
							
							var html = _.template(template, {
							    model: model.toJSON()  
							});

					 		return html;		
    		}

        ,init: function() {
					
					var  that = this.view
							,count=9
							,html='';
	    				
	    				that.collection = new Collection();
	   					
	   					while(--count){html += this.createModel();};
					 		
							that.render( html );		
					
        }

    }

});