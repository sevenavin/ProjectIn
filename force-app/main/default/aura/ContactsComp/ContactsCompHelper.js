({
	fetchContacts : function(component, event, helper) {
        console.log('Helper called : ');
		var action = component.get("c.getContacts");
        var accId = component.get("v.recordId");
        console.log('Helper called accId : '+accId);
        action.setParams({
            accountsIds : accId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
           	if(state === 'SUCCESS'){
                var contactList = response.getReturnValue();
            	console.log(contactList);
                component.set("v.lstContacts",contactList);
            }else{
                alert('Errored out ');
            }                
        });
        $A.enqueueAction(action);
	},
    updateRecord : function(component, event, helper) {
        var conList = component.get('v.lstContacts');
        var recordView = component.find('recordView');
        var recordEdit = component.find('recordEdit');
        var updateAction = component.get("c.updateCons");
        var toastEve = $A.get("e.force:showToast");
        var btn = event.getSource();
        var btnName = btn.get('v.name');
        updateAction.setParams({
            lstCons : conList
        });
        updateAction.setCallback(this,function(r){
            var state = r.getState();
            //alert('state : '+state);
            if(state == 'SUCCESS'){
                //component.set("v.lstContacts",contactList);
                var mapRV = r.getReturnValue();
                //alert('mapRV : '+mapRV);
                if(mapRV.status == 'SUCCESS'){
                    $A.util.addClass(recordEdit,'hideEdit');
                    $A.util.removeClass(recordView,'hideEdit');
                    btn.set('v.name','edit');
                    btn.set('v.label','Edit');
                    toastEve.setParams({
                        'title':'Success!',
                        'type':'success',
                        'mode':'dismissable',
                        'message': mapRV.message
                    });
                    toastEve.fire();
                    window.location.reload();
                }else{
                    toastEve.setParams({
                        'title':'Error!',
                        'type':'error',
                        'mode':'dismissable',
                        'message': mapRV.message
                    });
                    toastEve.fire();
                }
            }else{
                alert('Error in calling the controller');
            }
        });
        $A.enqueueAction(updateAction);
    },
    deleteContacts: function(component, event, helper) {
        
        var getDeletes = component.find('deleteContact');
        var idsToDelete = [];
        var toastForMessages = $A.get("e.force:showToast");
        
        if(getDeletes.length != undefined){
            for(var i=0 ; i< getDeletes.length ; i++){
                if(getDeletes[i].get('v.checked')){
                   idsToDelete.push(getDeletes[i].get('v.value')); 
                }
            }
        }else{
           if(getDeletes.get('v.checked')){
               idsToDelete.push(getDeletes.get('v.value')); 
           } 
        }
        //alert('idsToDelete : '+idsToDelete);
        if(idsToDelete.length > 0){
            var dltAction = component.get('c.deleteCons');
            dltAction.setParams({
                conIds : idsToDelete
            });
            dltAction.setCallback(this,function(r){
                var state = r.getState();
                if(state === 'SUCCESS'){
                    var mapRV = r.getReturnValue();
                    if(mapRV.status == 'SUCCESS'){
                        toastForMessages.setParams({
                            'title':'Success',
                            'type':'success',
                            'mode':'dismissable',
                            'message': 'Contacts deleted successfully!!'
                        });
                        toastForMessages.fire();
                        window.location.reload();
                    }else{
                         toastForMessages.setParams({
                            'title':'Error',
                            'type':'error',
                            'mode':'dismissable',
                            'message': mapRV.message
                        });
                        toastForMessages.fire();
                    }
                }else{
                    toastForMessages.setParams({
                        'title':'Error',
                        'type':'error',
                        'mode':'dismissable',
                        'message': 'Failed'
                    });
                    toastForMessages.fire();
                }
            });
            $A.enqueueAction(dltAction);
        }else{
            toastForMessages.setParams({
                'title':'No Records selected',
                'type':'error',
                'mode':'dismissable',
                'message': 'Please select the records to delete'
            });
            toastForMessages.fire();
        }
    },
    callHelperSave: function(component, event, helper) {
        var contactToInsert = component.get('v.contact');
        var insertAction = component.get('c.createCon');
        var toastMessages = $A.get('e.force:showToast');
        contactToInsert.AccountId = component.get("v.recordId");
        insertAction.setParams({
            objCon:contactToInsert
        });
        insertAction.setCallback(this, function(r){
            if(r.getState() === 'SUCCESS'){
                var mapRV = r.getReturnValue();
                if(mapRV.status == 'SUCCESS'){
                    toastMessages.setParams({
                        'title':'Success',
                        'type' : 'success',
                        'mode' : 'dismissable',
                        'message': mapRV.message
                    });
                    toastMessages.fire();
                    window.location.reload();
                }else{
                    toastMessages.setParams({
                        'title':'Error',
                        'type' : 'error',
                        'mode' : 'dismissable',
                        'message': mapRV.message
                    });
                    toastMessages.fire();
                }
            }
        });
        $A.enqueueAction(insertAction);
    }
})