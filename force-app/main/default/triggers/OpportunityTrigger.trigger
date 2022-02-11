/*
    Type : Trigger
    Object : Opportunity
    Trigger name : Opportunity_Trigger
*/
trigger OpportunityTrigger on Opportunity(before delete){
    if(CheckRecursive.runOncebefore()){
        OpportunityTriggerHander.beforeDelete(Trigger.Old); //call trigger handler
    }
    
}