@isTest
public class EventAttendeeTriggerTest {
	
    @testSetup
    public static void setupData(){
        
        Event_Organizer__c  org = new Event_Organizer__c (
            Name = 'Amit Singh',
            Phone__c = '9807654321',
            Email__c = 'sfdcpanther@gmail.com.dev1',
            Alternative_Phone__c  = '9807654321',
            Alternative_Email__c ='sfdcpanther@gmail.com.dev1'
        );
        insert org;
        
        Event__c event = new Event__c(
            Name__c = 'MAX FIT Campaign',
            Event_Organizer__c  = org.Id,
            Event_Type__c = 'Virtual',
            Frequency__c  = 'Weekly',
            Max_Seats__c  = 199,
            Recurring__c = true,
            Live__c = true,
            Start_DateTime__c = System.now(),
            End_Date_Time__c  = System.now().addDays(3)
        );
        insert event;
        Attendee__c att = new Attendee__c(
            Name = 'Akash Jain',
            Email__c = 'akash.jain@gmail.com',
            Phone__c = '9807654321'
        );
        insert att;
        
        Event_Attendee__c evtAtt = new Event_Attendee__c(Event__c = event.Id, Attendee__c = att.Id);
        insert evtAtt;
    }
    
    @isTest
    static void sendEmailTest(){
        Test.startTest();
        try{
            integer i = 10/0;
        }catch(System.Exception ex ){
            
        }
        Test.stopTest();
    }
}