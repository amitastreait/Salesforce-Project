/**
 * @File Name          : CustomSearchController.cls
 * @Description        : 
 * @Author             : Amit Singh (SFDCPanther)
 * @Group              : 
 * @Last Modified By   : Amit Singh (SFDCPanther)
 * @Last Modified On   : 5/31/2020, 10:37:01 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    5/31/2020   Amit Singh (SFDCPanther)     Initial Version
**/
public with sharing class CustomSearchController {
    
    @AuraEnabled
    public static String searchRecords(String objName, String fieldName, String searchKey){
        String searchKeyword = searchKey + '*';
        String returningQuery = objName+' ( Id, '+fieldName+')';
        String query = 'FIND :searchKeyword IN ALL FIELDS RETURNING '+returningQuery+' LIMIT 2000';
        List<List<sObject>> sobjectList = Search.query(Query);
        return JSON.serialize(sobjectList);
    }
}