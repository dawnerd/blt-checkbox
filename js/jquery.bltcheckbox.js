;(function($){
	$.bltCheckboxSettings = {
		restricted: false,
		onChecked: function(data){},
		onUnchecked: function(data){},
		onChange: function(data){}
	};

	$.fn.bltCheckbox = function(options){
		var settings = $.extend({},$.bltCheckboxSettings,options || {});
		var thisClone = this;
		var numChecked = 0;
		return this.each(function(){
			$('input',this).attr("checked",false);
			$(this).click(function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked");
					$('input',this).attr("checked",false);
					if(numChecked>0) numChecked--;
					var callbackData = new Object();
					callbackData.unCheckedItem = $('input',this).attr("id");
					settings.onUnchecked(callbackData);
				} else {
					if(settings.restricted===true){
						thisClone.each(function(){
							if($(this).hasClass("checked")) {
								$(this).removeClass("checked");
								if(numChecked>0) numChecked--;
								var callbackData = new Object();
								callbackData.changedItem = $('input',this).attr("id");
								settings.onChange(callbackData);
							}					
						});
					}
					$(this).addClass("checked");
					$('input',this).attr("checked",true);
					numChecked++;
					var callbackData = new Object();
					callbackData.checkedItem = $('input',this).attr("id");
					settings.onChecked(callbackData);
				}
			});
		});
	};
})(jQuery)