define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/google/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
		,'modules/google/view/view'
	], function(
		$, 
		core 
		,_		
		,Backbone
		,template
		,GoogleView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('google');

    _.extend(GoogleView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('google', function(){}); 

    				}
    	
					  ,el: '#google'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #theLink": "donow"
				    }					  
        
		        ,donow: function(  evt ){
		        	
		        	alert('');
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'google'
    	
    		,description: 'Googles Module for testing.'
    		
    		,view:new GoogleView()


        ,init: function() {
        	
					var that = this.view;
				
					if( window.parent.$('#single_module').is(":checked") 
							&& window.parent.$('#module2').val() == ''
							&& window.parent.$('#module3').val() == ''
					 ){
				 	
							var  Model = Backbone.Model.extend()
									,model = new Model();							
					
							that.template = _.template(template, {
							    model: model.toJSON()  
							});
							
							that.render(that.template);		
						
					};
			
					
        }

    }

});