define([
		 'jquery'
		,'jquery_ui_1_8_16'
		,'widget'
		,'mouse'
		,'draggable'
		,'piro'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/piro/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
	], function(
		$ 
		,jquery_ui_1_8_16
		,widget
		,mouse
		,draggable
		,piro
		,core 		
		,_		
		,Backbone
		,template
		) {
			
		var			 Collection =  Backbone.Collection.extend()
						,Model =  Backbone.Model.extend()
						,PiroView = Backbone.View.extend();
			
    core.createContainer('piro', 'ul');

    _.extend(PiroView.prototype,{
    	
    				initialize: function(){
		        	core.loadCSS('piro', function(){}); 
    				}
    	
					  ,el: '#piro'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				    ,events: {
				         "click #piro .someClass": "donow"
				    }					  
        
		        ,donow: function(  ){
		        	
		        }
				}
    );	

    return {
    	
    		 module_name: 'piro'
    	
    		,description: 'Piros Module for testing.'
    		
    		,view:new PiroView()

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
							
							setTimeout(function(){
								
						    $( 'a[href$="jpg"]\
						    	 ,a[href$="bmp"]\
						    	 ,a[href$="gif"]\
						    	 ,a[href$="jpeg"]\
						    	 ,a[href$="png"]')
						    .addClass('pirobox_gallery')
						    .attr('rel', 'gallery');
						    
						    $.pirobox_ext({
						        piro_speed: 600,
						        zoom_mode: true,
						        move_mode: 'mousemove',
						        bg_alpha: .8,
						        bgColor:'rgba(0, 0, 0, 0.9)',
						        piro_scroll: true,
						        share: true,
						        resize: true
						    });		
						
							}, 10);
								
						
					};
			
					
        }

    }

});