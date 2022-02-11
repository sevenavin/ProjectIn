({
	getContactlist : function(component, event, helper) {
		
		console.log('Hey !!!');
        helper.fetchContacts(component, event, helper);
	},
    createNew : function(component, event, helper){
        var createCon = $A.get("e.force:createRecord");
        createCon.setParams({
            'entityApiName':'Contact',
            'defaultFieldValues': {
                'AccountId' : component.get("v.recordId")
            }
        });
        createCon.fire();
    },
    editContact: function(component, event, helper){
        var btn = event.getSource();
        var btnName = btn.get('v.name');
        var recordView = component.find('recordView');
        var recordEdit = component.find('recordEdit');
        if(btnName == 'edit'){
            //alert('Edit');
            $A.util.addClass(recordView,'hideEdit');
            $A.util.removeClass(recordEdit,'hideEdit');
            btn.set('v.name','save');
            btn.set('v.label','Save');
        }else if(btnName == 'save'){
            //alert('Save'); 
            var validates = component.find('validateField');
            var blank = 0 ;
            if(validates.length!=undefined){
                var allValid = validates.reduce(function(VSF,eachField){
                    eachField.showHelpMessageIfInvalid();
                    return VSF && eachField.get('v.validity').valid;
                },true);
                if(!allValid){
                   blank++; 
                }
            }else{
                var allValid = validates.get('v.validity').valid;
                if(!allValid){
                   blank++; 
                }
            }
            if(blank == 0){
                helper.updateRecord(component, event, helper);
            }
            
        }
    },
    deleteContacts:function(component, event, helper){
        helper.deleteContacts(component, event, helper);
    },
    openModalContact:function(component, event, helper){
        var modal = component.find('slds-fade-in-open');
        var modalBackDrop = component.find('slds-backdrop_open');
        $A.util.addClass(modal,'slds-fade-in-open');
        $A.util.addClass(modalBackDrop,'slds-backdrop_open');        
    },
    closeModalContact: function(component, event, helper){
        //alert('Close called  ');
        var modal = component.find('slds-fade-in-open');
        var modalBackDrop = component.find('slds-backdrop_open');
        $A.util.removeClass(modal,'slds-fade-in-open');
        $A.util.removeClass(modalBackDrop,'slds-backdrop_open');        
    },
    callSave: function(component, event, helper){
        //alert('called callSave');
        var allValidcustom = component.customValidateModalfields(component,event,helper);
        if(allValidcustom){
            helper.callHelperSave(component, event, helper);
        }
    },
    customValidateModalfields: function(component,event,helper){
        //alert('called customValidateModalfields');
        var allValid = component.find('validateFieldinModal').reduce(function(validSoFar,each){
            each.showHelpMessageIfInvalid();
            if(each.get('v.name') == 'emailField'){
                if(each.get('v.value') != 'a@j.com'){
                    each.focus();
                    each.setCustomValidity('Incorrect Email');
                	each.reportValidity();
                    console.log(each.get('v.validity'));
                }
            }
            return validSoFar && each.get('v.validity').valid;
        },true);
        return allValid;
    }
})