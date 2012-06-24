define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/upload/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/upload/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		uploadView
		) {
			
	    core.createContainer('upload');
	    
	    _.extend(uploadView.prototype,{
	    	
    				initialize: function(){

		        	core.loadCSS('upload', function(){
		        		
		        	}); 

    				}
    	
					  ,el: '#upload'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }	  
				    ,events: {
				         "click #postImage": "postImage"
				        ,"click #delete": "removeModel"
				        ,"click #image_div": "clickButton"
				        ,"change #file_name": "postImage"
				    }
				    
				    ,saveModel: function(){
				    	this.model.save(
										{},
										{
												success: function(model, response) {
													
														core.log( 'Server : ' + JSON.stringify(response));
														
														var id = ( model.get('id') ?  model.get('id') : JSON.stringify(response) );
														
														core.log( 'model is being set with id:' + id );
														
												    model.set('id', id);  // Only set id if wasn't already done so by a previous POST into the database.  A PUT will do nothing.
												    
												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
												wait: true
										}
								);
				    }
				    
				    ,removeModel:function(){
				    	
				    		var  module_name = this.model.get('module_name')
				    				,default_src = this.model.get('default_src')
				    				,thumb_width = this.model.get('thumb_width')
				    				,thumb_height = this.model.get('thumb_height')
				    				,id = this.model.get('id')
				    				,cid = this.model.get('cid')
				    				,callbackWhenRemoved = this.model.get('callbackWhenRemoved');
				    	
		      			this.model.destroy({
												 success: function(model, response) {
														
														$('#' + module_name + ' img[cid=' + cid + ']')
														.removeAttr('id')
														.attr({
															 src:default_src
														})
														.css({
															 width :thumb_width
															,height:thumb_height
															,'margin-left':'-'+(thumb_width)/2+'px'
															,'margin-top':'-'+(thumb_height)/2+'px'
														}).each(function(event) {
																	callbackWhenRemoved($(this));
														});	
														
												}
												,error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												}
										    ,"url": "/api/index.php/rest/index/images/" + id
										    ,wait: true
										});
										
				    }
				    ,postImage: function(){
				    	
				    	this.model.set('file_name', $('#file_name').val());
				    	
				    	this.saveModel();
    	
				    	var that = this;
			    	
				    	var doWhenReady = function(){
				    		if( !that.model.get('id')){
				    			core.log('attempting do.' );
				    			setTimeout(function(){
				    				doWhenReady();
				    			}, 1);
				    			
				    		}else{
				    	
				    			$('#php_callback_dom_el').val(that.model.get('php_callback_dom_el'));
				    			$('#thumb_width').val(that.model.get('thumb_width'));
				    			$('#thumb_height').val(that.model.get('thumb_height'));				    			
				    			$('#full_width').val(that.model.get('full_width'));
				    			$('#full_height').val(that.model.get('full_height'));
				    			
						    	$('#form0').attr('action', '/api/index.php/rest/upload/' + that.model.get('table') + '/' + that.model.get('id') )
						    	.submit();
				    			
				    		};
				    		
				    	};
				    	
				    	doWhenReady();
				    	
				    }
				    
				    ,clickButton: function(){
				    	$('#file_name').click();
				    	
				    }

				}
    );	

    return {
    	
    		module_name: 'upload'
    	
    		,description: 'uploads Module for testing.'
    		
    		,view:new uploadView()

        ,register:function(){
        	
		  		var that = this.view;

		      core.registerMethod(this.module_name, 'image', function( model ){
		      	
		      		that.model = model;	
		      		
		      		that.clickButton();
		      	
      		});
      		
		      core.registerMethod(this.module_name, 'remove_image', function( model ){
		      	
		      		that.model = model;	
		      		
		      		that.removeModel();
		      	
      		});      		
      		
      		
        }

        ,init: function() {
        	
					this.register();
					
					var	 Model = Backbone.Model.extend()
				    	
				    	,model = new Model();
					
					this.view.template = _.template(template, {
					    model: model.toJSON()  
					});
					
					this.view.render(this.view.template);
					
        }

    }

});