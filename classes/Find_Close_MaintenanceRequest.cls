public class Find_Close_MaintenanceRequest {
    public static void MaintenanceRequest(List<case> listCase){
        list<id> vehicleId = new List<id>();
        list<id> listnewcase = new list<id>();
        list<case> caseToUpdate = new list<case>();
        for(case c: listCase){
            if(c.status == 'closed' && c.type == 'Routine Maintenance'){
                system.debug('Ed= in helper class '+c.Vehicle__r.id);
                listnewcase.add(c.id);
                c.status = 'New';
                caseToUpdate.add(c);
            }
        }
       update caseToUpdate;
       /* list<case> getCase1 = [select id, Vehicle__r.id from case where ID IN :listnewcase];
        system.debug('Ed= in helper class ID '+getCase1[0].Vehicle__r.id);
        for(case c:getCase1){
            vehicleId.add(c.Vehicle__r.id);
        }*/
       /* system.debug('ed vehicle ID: '+vehicleId);
        case c = new case(Vehicle__c = 'a013j00000bhO5RAAU',
                         Origin = 'Web',
                         status = 'New',
                         type = 'Routine Maintenance');
        insert c;*/
    }
}