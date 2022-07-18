import { LightningElement } from 'lwc';

export default class PharmaCloudSearch extends LightningElement {

    toggleDropdown(event){
        const evt = event.currentTarget;
        evt.classList.toggle('slds-is-open');

        const calloutURI = 'https://pharma-cloud.herokuapp.com/api/query/product/65483-991';
        fetch(calloutURI, {
            method: "GET",
        }).then((response) => {
            console.log(response)
            response.json();
        })
            
            .then(repos => {
                console.log(repos)
            });
        };

}