import { LightningElement, track, wire } from 'lwc';
// imports
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    @track
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
      if (data) {
        console.log("In boatTypes map", data);
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
          console.log("In boatTypes loop number", +1);
          return{
            label: type.Name,
            value: type.Id
          };
          
        });
        console.log("In boatTypes 2");
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      // Create the const searchEvent
      // searchEvent must be the new custom event search
      console.log('boat search form: handle search option: ',this.selectedBoatTypeId);
      this.selectedBoatTypeId = event.detail.value;
      const searchEvent = new CustomEvent('search', { 
        detail: {
            boatTypeId: this.selectedBoatTypeId
        }
    });
    //console.log("handleSearchOptionChange", selectedBoatTypeId );
    
      this.dispatchEvent(searchEvent);
    }
  }