define([
		 'jquery'
		,'jquery_ui'
		,'pirobox'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/pirobox/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
		,'modules/pirobox/view/view'
	], function(
		$ 
		,jquery_ui 
		,pirobox 
		,core 
		,_		
		,Backbone
		,template
		,PiroboxView
		) {
			
		var Model =  Backbone.Model.extend()
								,PiroboxView = Backbone.View.extend();
			
    core.createContainer('pirobox', 'ul');

    _.extend(PiroboxView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('pirobox', function(){}); 

    				}
    	
					  ,el: '#pirobox'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #pirobox .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'pirobox'
    	
    		,description: 'Piroboxs Module for testing.'
    		
    		,view:new PiroboxView()

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
							
							
							$.piroBox_ext({
								piro_speed :700,
								bg_alpha : 0.9,
								piro_scroll : true,
								piro_drag :null,
								piro_nav_pos: 'bottom'
							});
							
							
						
					};
			
					
        }

    }

});