define([
		'jquery' 
		,'core' 
		,'underscore'
		,'text!modules/scenecredit/navicons/index.html?v='  + (Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1), 
	], function(
		$ 
		,core 
		,_ 
		,template 
		) {
			
		core.loadCSS('scenecredit/navicons', function(){}); 
				    	
    core.createContainer('navicons');

		var  backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
				,NaviconView = Backbone.View.extend();
				
    _.extend(NaviconView.prototype,{
    	
					  el: '#navicons',
					  initialize: function() {
					      
					  },
					  
					  render: function() {
					      $(this.el).append(this.template);
					  },
					  
				    events: {
				        "click .icons": "scrollToPanel"
				    },
				
				    addNavIconToCollection: function(){
				    	core.method('categories', 'addNow', arg1 = (Math.random() * 0xFFFFFF << 0).toString(16) );
				    },
				
				    saveNavIconToCollection: function( evt ){
				    	
				    	var model = core.method('categories', 'getModel', arg1 = $(evt.target).attr('category_id') );
				    	
				    	core.method('categories', 'saveNow', arg1 = model );
				    	
				    },
				
				    removeFromCollection: function( evt ){
				    	
				    	var model = core.method('categories', 'getModel', arg1 = $(evt.target).attr('category_id') );
				    	
				    	core.method('categories', 'removeNow', arg1 = model );
				    	
				    },
				
				    scrollToPanel: function( evt ){
				    	
				    	var model = core.method('categories', 'getModel', arg1 = $(evt.target).attr('category_id') );
				    	
				    	core.method('panels', 'scrollToPanel', arg1 = model);
				    	
				    },
				    
				    adjustCSS: function(){
				    	
						      	if( core.BrowserDetect.browser == 'Explorer' ){
						      		
												$('#navicons').css({
													'padding-bottom': '10px'
												})
						      	};
					      	
										$('#navicons').css({
											position: 'fixed',
											left:'50%',  	
											bottom:'5%'
										});
					      		
					      		var halfLength = $('#navicons').width() / 2;
					      		
					      		// core.log($('#navicons').width() );
					      		
								    var navicons = document.getElementById("navicons");
								    navicons.style.marginLeft = '-' + halfLength + 'px'; 	
				   }
				    
				}
    );	

    return {
    	
    		module_name: 'navicons',
    	
    		description: 'Navicons Module for testing.',
    		
    		view:new NaviconView(),
    		
        register:function(){
        	
		  		var that = this.view;
		  	
		      core.registerMethod(this.module_name, 'createMoreIcons', function( model){
      	
			      that.template = _.template(template, {
			          model: model.toJSON()
			      });
			      
			      that.render()
			      
			      that.adjustCSS();
		      
      		});
      		
      		
		      core.registerMethod(this.module_name, 'removeIcon', function( model){
      	
			      $(that.el).children('div[category_id=' + model.get('id') + ']').remove();

			      that.adjustCSS();
		      
      		});      		
      		

        },
				
        init: function() {
        
					this.register();

        }

    }

});