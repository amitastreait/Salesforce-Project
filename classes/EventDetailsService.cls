/**
 * @File Name          : EventDetailsService.cls
 * @Description        :
 * @Author             : A Singh
 * @Group              :
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/10/2020, 5:50:17 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    6/8/2020   A Singh     Initial Version
 **/
public with sharing class EventDetailsService {
  @AuraEnabled
  public static List<Event__c> upcomingEvents() {
    List<Event__c> eventList = [
      SELECT
        Id,
        Name,
        Name__c,
        Event_Detail__c,
        Location__c,
        Location__r.Name,
        Event_Organizer__c,
        Start_DateTime__c,
        Event_Organizer__r.Name
      FROM Event__c
      WHERE Start_DateTime__c >= Today AND Live__c = true
      WITH SECURITY_ENFORCED
    ];
    return eventList;
  }
}
