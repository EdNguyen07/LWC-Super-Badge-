public with sharing class ExampleClassController {

    @AuraEnabled(cacheable=true)
    public static Map<String, ObjectProperties> getObjectList() {

        Map<String, ObjectProperties> objectMap = new Map<String, ObjectProperties>();

        Map<String, Schema.SObjectType> gdResult = Schema.getGlobalDescribe();
        for (Schema.SObjectType s : gdResult.values()) {

            Schema.DescribeSObjectResult od = s.getDescribe();

            ObjectProperties o = new ObjectProperties();
            o.name = od.getName();
            o.label = od.getLabel();
            o.reference = od.getLabel() + ' (' + od.getName() +')';
            objectMap.put(o.Name, o);
        }

        return objectMap;
    }

    public class ObjectProperties {
        @AuraEnabled public String name {get; set;} // Object API Name
        @AuraEnabled public String label {get; set;} // Object Label
        
        // reference will be the value displayed to the user. There can be objects with the same label.
        @AuraEnabled public String reference {get; set;}
    }
}