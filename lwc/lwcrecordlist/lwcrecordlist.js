/**
 * @File Name          : lwcrecordlist.js
 * @Description        :
 * @Author             : Amit Singh (SFDCPanther)
 * @Group              :
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/7/2020, 12:41:38 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    5/31/2020   Amit Singh (SFDCPanther)     Initial Version
 **/
import { LightningElement, api } from "lwc";

export default class Lwcrecordlist extends LightningElement {
  /* Public Property to pass the single record & iconname */
  @api rec;
  @api iconname = "standard:account";
  @api parentidfield;

  handleSelect() {
    let selectEvent = new CustomEvent("select", {
      detail: {
        selRec: this.rec,
        parent: this.parentidfield
      }
    });
    this.dispatchEvent(selectEvent);
  }

  handleRemove() {
    let selectEvent = new CustomEvent("select", {
      detail: {
        selRec: undefined,
        parent: this.parentidfield
      }
    });
    this.dispatchEvent(selectEvent);
  }
}
