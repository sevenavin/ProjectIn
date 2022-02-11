/*
    Type : Class
    Class name : OpportunityTriggerHander
    Description : Handler for opportunityTrigger
*/
public class OpportunityTriggerHander{
    /*
        Method name : beforeDelete
        Arguments : list of opportunities which are supposed to be deleted
        description : Prevent Opportunity from being deleted if  Probability greater than or equal to 75% . 
    */
    public static void beforeDelete(list<Opportunity> lstOldOpps){
        Id idProfile=userinfo.getProfileId(); //get current profile Id
        String strProfileName =[Select Id,Name from Profile where Id=:idProfile].Name; //get Name of the current profile
        for(Opportunity eachOpp : lstOldOpps){
            if(strProfileName != ConstantVariables.strSysAdminProfileName && eachOpp.Probability >= 0.75){
                eachOpp.addError(ConstantVariables.strErrorProbablity); //add error if current proile is not sys admin and probability is greater tan or equal to 75%
            }
        }
    }
}