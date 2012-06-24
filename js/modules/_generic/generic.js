define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/generic/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
		,'modules/generic/view/view'
	], function(
		$ 
		,core 
		,_		
		,Backbone
		,template
		,GenericView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('generic');

    _.extend(GenericView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('generic', function(){}); 

    				}
    	
					  ,el: '#generic'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #generic .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'generic'
    	
    		,description: 'Generics Module for testing.'
    		
    		,view:new GenericView()

        ,register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'doSomething', function( model ){

							
      		});
      		
        }

        ,init: function() {
        	
					this.register();
					
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