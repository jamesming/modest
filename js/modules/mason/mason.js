define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'masonry'
		,'text!modules/mason/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$ 
		,core 
		,_		
		,Backbone
		,masonry
		,template
		) {
			
		var Model =  Backbone.Model.extend()
								,masonView = Backbone.View.extend();
			
    core.createContainer('mason');

    _.extend(masonView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('mason', function(){}); 

    				}
    	
					  ,el: '#mason'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #mason .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'mason'
    	
    		,description: 'masons Module for testing.'
    		
    		,view:new masonView()

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
						
					}else{
						
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