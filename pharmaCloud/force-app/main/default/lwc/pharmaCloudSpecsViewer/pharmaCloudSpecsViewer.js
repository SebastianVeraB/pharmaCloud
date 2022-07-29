import { LightningElement, api } from 'lwc';

export default class PharmaCloudSpecsViewer extends LightningElement {

    @api link;
    @api header

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}