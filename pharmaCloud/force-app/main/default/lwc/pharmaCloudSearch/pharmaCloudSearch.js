import { api, LightningElement, track } from 'lwc';

export default class PharmaCloudSearch extends LightningElement {

    @track queryResoult;
    @track listForDropDown
    @track loaded = false
    timer;
    searchTerm;

    delay = t => new Promise(resolve => this.timer = setTimeout(resolve, t));

    toggleDropdown() {
        const dropdown = this.template.querySelector('[data-id="dropdown"]');
        dropdown.classList.toggle('slds-is-open');
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
                 
                 this.loaded = true;
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