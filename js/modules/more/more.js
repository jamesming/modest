define([
		 'jquery'
		,'core'
		,'underscore' 		
		,'backbone'
		,'text!modules/more/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1)
		,'modules/more/view/view'
	], function(
		$, 
		core 
		,_		
		,Backbone
		,template
		,MoreView
		) {
			
		var Model = Backbone.Model.extend();
			
    core.createContainer('more');
    

    _.extend(MoreView.prototype,{
    	
    				initialize: function(){

		        	core.loadCSS('more', function(){}); 

    				}
    	
					  ,el: '#more'
					  
					  ,render: function() {
					      $(this.el).append(this.template);
					  }
					  
				}
    );	

    return {
    	
    		module_name: 'more',
    	
    		description: 'More Module for testing.',
    		
    		 view:new MoreView()

        ,init: function() {
					
					var that = this.view;
					
	
					var  Model = Backbone.Model.extend()
							,model = new Model()
							,options = {
														 width:600
														,height:100
														,scaleImg: false
														,closeOnClick: false // Close the zoom by clicking on the contents
												 };							
					
					that.template = _.template(template, {
					    model: model.toJSON()  
					});
					
					that.render(that.template);							
					

					core.method('modal', 'bind', arg1 = '.more_div', arg2 = $('#more_content').html(), arg3 =options);
			
					
        }

    }

});