import { api, LightningElement, track } from 'lwc';

export default class PharmaCloudDropDown extends LightningElement {

    @api dropdownList

    handleItemClick(event) {
        let product_code = event.currentTarget.getAttribute('data-id');
        let listElement = this.getListElementByProductCode(product_code);
        this.dispatchEvent(new CustomEvent('select', {detail:listElement}));
    }

    getListElementByProductCode(product_code) {
        let elementFound;
        this.dropdownList.forEach(element => {
            if(element.ndc_product_code === product_code ) elementFound = element;
        });
        return elementFound;
    }
}