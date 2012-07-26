define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'jcrop'
		,'text!modules/jcrop/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$ 
		,core 
		,_		
		,Backbone
		,jcrop
		,template
		) {
			
		var Model =  Backbone.Model.extend()
								,jcropView = Backbone.View.extend();
			
    core.createContainer('jcrop');

    _.extend(jcropView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('jcrop', function(){}); 

    				}
    	
					  ,el: '#jcrop'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #jcrop .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'jcrop'
    	
    		,description: 'jcrops Module for testing.'
    		
    		,view:new jcropView()

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
							
							
							$('#target').Jcrop({
									onSelect:function(c){
										console.log(JSON.stringify(c));
									}
								});
							
							
						
					};
			
					
        }

    }

});