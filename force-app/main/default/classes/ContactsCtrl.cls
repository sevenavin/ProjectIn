//added comments once again

public class ContactsCtrl {

    @AuraEnabled
    public static list<Contact> getContacts(list<Id> accountsIds){
        list<Contact> lstContacts = [Select id, Name, FirstName, LastName, AccountId, Phone, Email from Contact where AccountId in: accountsIds];
        return lstContacts;
    }

    @AuraEnabled
    public static map<String,String> updateCons(list<Contact> lstCons){
        map<String,String> mapStatus = new map<String,String>();
        try{
            update lstCons;
            mapStatus.put('status','SUCCESS');
            mapStatus.put('message','Contacts updated successfully');
            mapStatus.put('records', string.valueOf(lstCons));
        }catch(Exception e){
            mapStatus.put('status','ERROR');
            mapStatus.put('message','Contacts updation failed due to: '+e.getmessage());
        }
        return mapStatus;
    }
    
    @AuraEnabled
    public static map<String,String> deleteCons(list<Id> conIds){
        list<Contact> lstConsDelete = [Select id from Contact where id in: conIds];

        map<String,String> mapStatus = new map<String,String>();
        try{
            delete lstConsDelete;
            mapStatus.put('status','SUCCESS');
            mapStatus.put('message','Contacts Deleted successfully');
            //mapStatus.put('records', string.valueOf(lstCons));
        }catch(Exception e){
            mapStatus.put('status','ERROR');
            mapStatus.put('message','Contacts Deletion failed due to: '+e.getmessage());
        }
        return mapStatus;
    }
    
    @AuraEnabled
    public static map<String,String> createCon(Contact objCon){
        map<String,String> mapStatus = new map<String,String>();
        try{
            insert objCon;
            mapStatus.put('status','SUCCESS');
            mapStatus.put('message','Contact inserted successfully');
            //mapStatus.put('records', string.valueOf(lstCons));
        }catch(Exception e){
            mapStatus.put('status','ERROR');
            mapStatus.put('message','Contact insertion failed due to: '+e.getmessage());
        }
        return mapStatus;
    }
}