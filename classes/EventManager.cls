@RestResource(urlMapping='/v1/futurevent')
global class EventManager {

    @httpGet
    global static List<Event__c> upcomingEvents(){
        List<Event__c> eventList = [SELECT Id, Name, CreatedDate,
                            Location__c, Event_Organizer__c, Event_Organizer__r.Name,Event_Organizer__r.Email__c,
                            Location__r.Name, Location__r.Street__c, Location__r.City__C,
                            Location__r.Postal_Code__c, Location__r.Country__c, Location__r.State__c,
                            Name__c, Start_DateTime__c, 
                            End_Date_Time__c, Recurring__c, Max_Seats__c, Live__c, 
                            PeopleAttending__c, Remaining_Seats__c, 
                            Event_Type__c, Frequency__c, 
                            Location_Verified__c, Status__c, 
                            Event_Detail__c 
                            FROM Event__c 
                            Where Start_DateTime__c >= TODAY AND Live__c = true
                            WITH SECURITY_ENFORCED
                           ];
        return eventList;
    }
    
    
}