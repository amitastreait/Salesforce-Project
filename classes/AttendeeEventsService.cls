/**
 * @File Name          : AttendeeEventsService.cls
 * @Description        :
 * @Author             : A Singh
 * @Group              :
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/9/2020, 9:01:38 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    6/9/2020   A Singh     Initial Version
 **/
public with sharing class AttendeeEventsService {
  @AuraEnabled
  public static List<Event_Attendee__c> upcomingEvets(String attendeeId) {
    List<Event_Attendee__c> eventLists = [
      SELECT
        Id,
        Name,
        Event__c,
        Event__r.Location__c,
        Event__r.Location__r.Name,
        Event__r.Event_Organizer__c,
        Event__r.Event_Organizer__r.Name,
        Event__r.Name__c,
        Event__r.Start_DateTime__c
      FROM Event_Attendee__c
      WHERE
        Attendee__c = :attendeeId
        AND Event__r.Start_DateTime__c >= today
        AND Event__r.Live__c = true
      WITH SECURITY_ENFORCED
    ];
    return eventLists;
  }

  @AuraEnabled
  public static List<Event_Attendee__c> pastEvents(String attendeeId) {
    List<Event_Attendee__c> eventLists = [
      SELECT
        Id,
        Name,
        Event__c,
        Event__r.Location__c,
        Event__r.Location__r.Name,
        Event__r.Event_Organizer__c,
        Event__r.Event_Organizer__r.Name,
        Event__r.Name__c,
        Event__r.Start_DateTime__c
      FROM Event_Attendee__c
      WHERE Attendee__c = :attendeeId AND Event__r.Start_DateTime__c < today
      WITH SECURITY_ENFORCED
    ];
    return eventLists;
  }
}
