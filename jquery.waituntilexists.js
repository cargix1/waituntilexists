/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $('div.comments').waitUntilExists(commentCallbackFunction || function () { alert('function does not exist.'); })
*/

$.fn.waitUntilExists	= function (handler, shouldRunHandlerOnce, isChild) {
	var found	= 'found';
	var $this	= $(this.selector);
	var $elements	= $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);
	
	if (!isChild)
	{
		(window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
			window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
		;
	}
	else if (shouldRunHandlerOnce && $elements.length)
	{
		window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
	}
	
	return $this;
}
