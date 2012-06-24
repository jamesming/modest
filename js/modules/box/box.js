define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/box/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$ 
		,core 
		,_		
		,Backbone
		,template
		) {
			
		var Model =  Backbone.Model.extend()
								,BoxView = Backbone.View.extend();
			
    core.createContainer('box');

    _.extend(BoxView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('box', function(){}); 

    				}
    	
					  ,el: '#box'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #box .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'box'
    	
    		,description: 'Boxs Module for testing.'
    		
    		,view:new BoxView()

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