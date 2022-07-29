import { LightningElement, api } from 'lwc';

export default class PharmaCloudTable extends LightningElement {

    @api items;

    handleClick(event) {
        let productId = event.currentTarget.getAttribute('data-id');
        this.dispatchEvent(new CustomEvent('showspecs', {detail:productId}));
    };



}