import { LightningElement, track } from 'lwc';


export default class PharmaCloudMain extends LightningElement {

    @track hasItemSelected;
    @track description;
    @track listOfInterchangeables


 

    handleSelect(event) {

        let itemSelected = event.detail.selectedItem;
        let queryResults = event.detail.queryResoult;
        
        this.description = itemSelected.mrdef;
        this.listOfInterchangeables = this.getInterchangeables(queryResults, itemSelected);
    
        this.hasItemSelected = true;

    };

    getInterchangeables(items, selectedItem) {
        let listOfInterchangeables =[];
        items.forEach(element => { 
            
            if(this.isInterchangeable(element, selectedItem)){
                listOfInterchangeables.push(element);
            }
        });
        return listOfInterchangeables;
       
    };

    isInterchangeable(element, selectedItem) {
       
        return selectedItem.quantity === element.quantity && selectedItem.generic_name === element.generic_name;
        
    };

    handleClear() {
        this.hasItemSelected = false;
        this.description = '';
        this.listOfInterchangeables = [];
    }
        
   

   
}

