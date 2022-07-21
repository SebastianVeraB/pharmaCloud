import { api, LightningElement, track } from 'lwc';

export default class PharmaCloudDropDown extends LightningElement {

    @api dropdownList

    check() {
        console.log(this.dropdownList)
    }
}