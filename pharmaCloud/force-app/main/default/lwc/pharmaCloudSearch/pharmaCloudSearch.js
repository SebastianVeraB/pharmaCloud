import { api, LightningElement, track } from 'lwc';

export default class PharmaCloudSearch extends LightningElement {

    @track queryResoult;
    @track listForDropDown;
    @track isLoaded = false;
    @track hasItemSelected = false;
    @track itemDescription;

    timer;
    searchTerm;

    delay = t => new Promise(resolve => this.timer = setTimeout(resolve, t));

    toggleDropdown() {
        const dropdown = this.template.querySelector('[data-id="dropdown"]');
        dropdown.classList.toggle('slds-is-open');
    };

    toogleSelect(event) {
        const container = this.template.querySelector('[data-id="container"]');
        container.classList.toggle('slds-has-selection');

        let selectedItem = event.detail;

        this.hasItemSelected = true;
        this.itemDescription = selectedItem.generic_name + "  •  " + selectedItem.quantity + selectedItem.unit;

        let selectedAndQueryResult = {selectedItem: selectedItem, queryResoult: this.queryResoult};
        this.dispatchEvent(new CustomEvent('select', {detail:selectedAndQueryResult}));
        this.toggleDropdown();

    };

    handleRemove() {

        this.hasItemSelected =false;
        this.isLoaded = false;
        this.dispatchEvent(new CustomEvent('clear'));

    };

    queryAPI() {
        

        let searchFor = this.searchTerm
        console.log(searchFor)
        const calloutURI = `https://pharma-cloud.herokuapp.com/api/query/generic/${searchFor}`;
        const methodAndHeaders = {
            method: "GET"
        }

        fetch(calloutURI, methodAndHeaders)
            .then((response) => {
               
                return response.json();
                
            })
                .then(resp => {
                 this.queryResoult = resp;
                 this.listForDropDown = this.filterUniques(resp)
                 
                 this.isLoaded = true;
                 this.toggleDropdown();
                });
    };

    handleSearch(event) {
        if (event.key.match(/^[a-zA-Z-0-9]$/g)) {
            clearTimeout(this.timer);
            this.searchTerm = event.target.value;
            this.delay(1000).then(() => this.queryAPI());
        }
    };

    filterUniques(items) {
        let listOfUniques =[];
        items.forEach(element => { 
            
            if(this.isUnique(element, listOfUniques)){
                listOfUniques.push(element);
            }
        });
        return listOfUniques;
       
    };

    isUnique(element, listOfUniques) {
        if(listOfUniques.length === 0) {

            return true;

        } else {

            return listOfUniques.every(unique => {
               return unique.ndc_product_code !== element.ndc_product_code && unique.quantity !== element.quantity
            }); 
        }
    };
}