define([
		'jquery', 
		'core', 
		'underscore', 		
		'backbone',
		'text!modules/test/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
		'modules/test/view/view'
	], function(
		$, 
		core, 
		_, 		
		Backbone, 
		template, 
		TestView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('test');
    

    _.extend(TestView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('test', function(){}); 

    				},
    	
					  el: '#test',
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
					  
				    events: {
				         "click .box": "clickButton"
				    }
        
		        ,clickButton: function(evt){
		        	
							var	 table = 'images'
							
									,Model = Backbone.Model.extend({   url: '/api/index.php/rest/index/' + table  	})
						    	
						    	,model = new Model({
						    							 table: table
						    							,dom_el: "$('#test #" + $(evt.target).parent().attr('id') + " img')"
															,name:'pic of heart'
															,description: 'Lorem ipsum .'
														});
		        	
		        			core.method('upload', 'image', arg1 = model);
		        	
						}
		        ,launchModal: function(evt){
		        	
						}						
		});	

    return {
    	
    		module_name: 'test',
    	
    		description: 'Tests Module for testing.',
    		
    		view:new TestView(),

        init: function() {
        	
					var that = this.view;
					
					var  Model = Backbone.Model.extend()
							,model = new Model()
							,options = {	 width:800
														,height:300
														,scaleImg: false
														,closeOnClick: false // Close the zoom by clicking on the contents
												 };		
												 
					that.template = _.template(template, {
					    model: model.toJSON()  
					});
					
					that.render(that.template);
					
					core.method('modal', 'bind', arg1 = '#launchModal', arg2 = $('#target_iframe'));	
									

        }

    }

});