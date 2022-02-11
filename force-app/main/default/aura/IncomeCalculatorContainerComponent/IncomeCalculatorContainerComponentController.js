({
	displayValues : function(component, event, helper) {
		component.set('v.totalIncomeFromEvent',event.getParam('totalincomeEventAttribute'));
        //component.set('v.totalIncomeFromEvent','0');
        alert('Container populated'+event.getParam('totalIncome'));
        //event.stopPropagation();
	}
})