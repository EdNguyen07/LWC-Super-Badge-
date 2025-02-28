import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    
    // Handles loading event
    handleLoading() {
        this.isLoading = true;
    }
    // Handles done loading event
    handleDoneLoading() {
        this.isLoading = false;
        console.log("in handles done" );
    }
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) {    
        let boatTypeId = event.detail.boatTypeId;
        this.template.querySelector('c-boat-search-results').searchBoats(boatTypeId);
        console.log('boatSearch >> searchBoats>> this.template.querySelector: ', this.template.querySelector('c-boat-search-results').searchBoats(boatTypeId));
        this.handleDoneLoading();
        console.log("in searchBoat function" );
    }
    createNewBoat() {
        console.log("click create new boat" );
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });        
    }
}