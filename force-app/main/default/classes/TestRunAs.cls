@isTest
private class TestRunAs {
    public static testMethod void testRunAs() {
        // Setup test data
        // This code runs as the system user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Email='standarduser@testorg.com', 
            EmailEncodingKey='UTF-8', 
            LastName='Yong', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', 
            UserName='standarduser@torg.com',
            Alias = 'stdUser');
        List<Account> aList = new List<Account> {
        new Account (Name = 'My Test Account')  };

        insert aList;
        
        Opportunity objOpp = new Opportunity(Name ='opp 1',
                        AccountID =aList[0].id,
                        StageName = 'Customer Won',
                        Amount = 3000,
                        Probability = 0.80,
                        CloseDate = System.today());
        insert objOpp;            
        System.runAs(u) {
            // The following code runs as user 'u' 
            System.debug('Current User: ' + UserInfo.getUserName());
            System.debug('Current Profile: ' + UserInfo.getProfileId()); 

            Test.startTest();
                delete objOpp;
            Test.stopTest();
        }
    }
}