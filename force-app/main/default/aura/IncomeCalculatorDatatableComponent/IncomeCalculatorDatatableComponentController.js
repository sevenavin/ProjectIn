({
	doInit : function(component, event, helper) {
        component.set('v.columns',[{
            label:'Serial No.',
            fieldName:'SerialNo',
            type:'number'
        },
                                  {
            label:'Source',
            fieldName:'source',
            type:'text'
        },
                                  {
            label:'Amount',
            fieldName:'amount',
            type:'number'
        }]);
        
        component.set('v.incomes',[{
            SerialNo:1,
            source:'Regular job',
            amount:1000
        },
                                  {
            SerialNo:2,
            source:'Part job',
            amount:600
        },
                                  {
            SerialNo:3,
            source:'OT',
            amount:1200
        }]);
	},
    toggleIncomeForm : function(component, event, helper) {
        //alert('toggleIncomeForm : ');
		var datatableId = component.find('datatableId');
        console.log('datatableId : '+datatableId);
        $A.util.toggleClass(datatableId, 'hide');
	},
    addIncome: function(component, event, helper) {
		var incomes = component.get('v.incomes');
        var source = component.find('source').get('v.value');
        var amount = parseFloat(component.find('amount').get('v.value')); 
        if(source != null && source != '' && amount != null && amount != ''){
            var newEntry = {
                SerialNo : incomes.length + 1,
                source : source,
                amount : amount
            };
            incomes.push(newEntry);
            component.set('v.incomes',incomes);
            component.find('source').set('v.value','');
            component.find('amount').set('v.value','');
        }
        
        
	},
    calculateIncome: function(component, event, helper) {
        var incomes = component.get('v.incomes');
        var totalIncomeAfterCal = 0;
        for(var i=0; i<incomes.length; i++ ){
            totalIncomeAfterCal = totalIncomeAfterCal + incomes[i].amount;
        }
        console.log('totalIncomeAfterCal : '+totalIncomeAfterCal);
        var refTotalIncomeEvent = component.getEvent('totalEvent');
        refTotalIncomeEvent.setParams({
            totalincomeEventAttribute:totalIncomeAfterCal
        });
        refTotalIncomeEvent.fire();
	},
    doFireEvent: function(component, event, helper) {
        alert('name : totalEvent, Event: c.totalIncomeEvent');
        //event.stopPropagation();
	}
})