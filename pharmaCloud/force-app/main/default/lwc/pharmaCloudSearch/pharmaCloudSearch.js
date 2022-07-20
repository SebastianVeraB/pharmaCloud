import { api, LightningElement, track } from 'lwc';

export default class PharmaCloudSearch extends LightningElement {

    queryResoult;
    timer;
    searchTerm;

    delay = t => new Promise(resolve => this.timer = setTimeout(resolve, t));

    toggleDropdown(event) {
        const evt = event.currentTarget;
        evt.classList.toggle('slds-is-open');
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
                 this.queryResoult = resp
                });
    }

    handleSearch(event) {
        if (event.key.match(/^[a-zA-Z-0-9]$/g)) {
            clearTimeout(this.timer);
            this.searchTerm = event.target.value;
            this.delay(1000).then(() => this.queryAPI());
        }
    }

}