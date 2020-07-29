/**
 * @File Name          : lwcsearchcomponent.js
 * @Description        :
 * @Author             : Amit Singh (SFDCPanther)
 * @Group              :
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/8/2020, 10:26:37 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    5/31/2020   Amit Singh (SFDCPanther)     Initial Version
 **/
import { LightningElement, api, track } from "lwc";

export default class Lwcsearchcomponent extends LightningElement {
  @track searckKeyword;
  @api isrequired = "false";
  @api searchLabel = "Search Account";
  @api showLabel = "true";

  /* Check the isrequired prop is true then set the prop to true*/
  renderedCallback() {
    if (this.isrequired === "false") return;
    if (this.isrequired === "true") {
      let picklistInfo = this.template.querySelector("lightning-input");
      picklistInfo.required = true;
      this.isrequired = "false";
    }
  }

  handleChange(event) {
    var keyword = event.target.value;
    /* Create & dispatch the event to parent component with the search keyword */
    if (keyword && keyword.length >= 2) {
      let searchEvent = new CustomEvent("search", {
        detail: { value: keyword }
      });
      this.dispatchEvent(searchEvent);
    }
  }
}
