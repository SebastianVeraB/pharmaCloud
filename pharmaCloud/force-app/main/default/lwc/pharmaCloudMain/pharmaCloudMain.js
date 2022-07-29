import { LightningElement, track } from 'lwc';


export default class PharmaCloudMain extends LightningElement {

    @track hasItemSelected;
    @track description;
    @track selectedItemTitle;
    @track listOfInterchangeables;
    @track itemSelected;
    @track isShowingSpecs = false;
    @track linkToShow;


 

    handleSelect(event) {


        let itemSelected = event.detail.selectedItem;
        let queryResults = event.detail.queryResoult;
        
        this.selectedItemTitle = `${itemSelected.generic_name} ${itemSelected.quantity}${itemSelected.unit}`
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
    handleClose() {
        this.isShowingSpecs = false;
    }

    handleShowSpecs(event) {
        let productId = event.detail;
        this.linkToShow = `https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=${productId}&type=display`
        this.isShowingSpecs = true;
    }

        
   

   
}

