({
	handleGetMessageEvent1 : function(component, event, helper) {
        var eventGetmessage = event.getParam('appEventMsg');
        alert('Fired in ApplicationParentComponent with Id :'+component.get('v.id'));
		component.set('v.message',eventGetmessage);
        
	}
})