define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/register/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/register/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		registerView
		) {
			
		var Model = Backbone.Model.extend({
    	
    		initialize: function(){
    			
    			this.bind('change', function( model ){
    				
    			});
    			
    		},

		    url: '/api/index.php/rest/index/users' 
    	
    	}),
    	
    	model = new Model({
    							asset: 'images',
									name:'James Ming',
									email: 'jamesming@gmail.com'
								});
			
	    core.createContainer('register');
	    
	    _.extend(registerView.prototype,{
	    	
    	
    				initialize: function(){

		        	core.loadCSS('register', function(){
		        		
		        		
		        		
		        	}); 

    				},
					  
				    events: {
				        "click #submit": "register",
				        "click #delete": "removeModel",
				        "change input": "updateModel",
				        "click #submitImage": "postImage",
				    },
				    
				    register: function(){
				    	model.save(
										{},
										{
												success: function(model, response) {
													
												    $('#response').html(JSON.stringify(response));
												    model.set('id', JSON.stringify(response))
												    
												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
												wait: true
										}
								);
				    },
				    
				    removeModel:function(){
				    	
		      			model.destroy({
												success: function(model, response) {
													
														$('#response').html('Deleted' + model.get('id'))

												},
												error: function(model, response) {
												    console.log('FAIL:');
												    console.log(JSON.stringify(response));
												},
										    "url": "/api/index.php/rest/index/users/" + model.get('id')
										});
				    	
				    },
				    
				    updateModel: function(evt){
				    	
				    	model.set(  $(evt.target).attr('name'), $(evt.target).val() );
				    	
				    },
				    
				    postImage: function(){
				    	
				    	this.register();
				    	
				    	$('#callback').val("\
				    			console.log('this is called from the api within the iframe.')\
				    	");
				    	
				    	var doWhenReady = function(){
				    		if( !model.get('id')){
				    			
				    			setTimeout(function(){
				    				doWhenReady();
				    			}, 1);
				    			
				    		}else{
				    			
						    	$('#form0').attr('action', '/api/index.php/rest/upload/' + model.get('asset') + '/' + model.get('id') )
						    	.submit();
				    			
				    		};
				    		
				    	};
				    	
				    	doWhenReady();
				    	
				    },
    	
					  el: '#register',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
        
		        reAdjustCSS: function( arg  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		module_name: 'register',
    	
    		description: 'registers Module for testing.',
    		
    		view:new registerView(),

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
							core.method('register', 'doSomething', arg1 = model);
						};
						

					}, 500); 					
					
        }

    }

});