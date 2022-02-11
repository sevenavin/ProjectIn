({
    callEvent : function(component, event, helper) {
        var evtGM = $A.get('e.c:MessageApplicationEvent');
        console.log('evtGM : '+evtGM);
        evtGM.setParams({
            appEventMsg:'Awesome.. It Fired.. and got the Message ' +component.get('v.id')
        });
        evtGM.fire();
	},    
    handleGetMessageEvent: function(component, event, helper) {
        alert('Fired in Application Container with Id :'+component.get('v.id'));
	}
})