/**
 * @File Name          : eventDetails.js
 * @Description        :
 * @Author             : A Singh
 * @Group              :
 * @Last Modified By   : A Singh
 * @Last Modified On   : 6/14/2020, 10:30:30 PM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0    6/7/2020   A Singh     Initial Version
 **/
import { LightningElement, api, track, wire } from "lwc";
import getSpeakers from "@salesforce/apex/EventDetailsController.getSpeakers";
import getLocationDetails from "@salesforce/apex/EventDetailsController.getLocationDetails";
import getAttendees from "@salesforce/apex/EventDetailsController.getAttendees";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import userId from "@salesforce/user/Id";
import { getRecord } from "lightning/uiRecordApi";
import profile from "@salesforce/schema/User.Profile.Name";
const columns = [
  {
    label: "Name",
    fieldName: "Name",
    cellAttributes: {
      iconName: "standard:user",
      iconPosition: "left"
    }
  },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Company Name", fieldName: "CompanyName" }
];

const columnsAtt = [
  {
    label: "Name",
    fieldName: "Name",
    cellAttributes: {
      iconName: "standard:user",
      iconPosition: "left"
    }
  },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "Company Name", fieldName: "CompanyName" },
  {
    label: "Location",
    fieldName: "Location",
    cellAttributes: {
      iconName: "utility:location",
      iconPosition: "left"
    }
  }
];

export default class EventDetails extends NavigationMixin(LightningElement) {
  @api recordId;
  @track speakerList;
  @track eventRec;
  @track attendeesList;
  errors;
  columnsList = columns;
  columnAtt = columnsAtt;
  user_id = userId;

  @wire(getRecord, { recordId: "$user_id", fields: [profile] })
  wiredMethod({ error, data }) {
    if (data) {
      window.console.log(" userRecord ", data);
    }
    if (error) {
      console.log("Error Occurred ", JSON.stringify(error));
    }
  }
  connectedCallback() {}

  handleSpeakerActive() {
    getSpeakers({
      eventId: this.recordId
    })
      .then((result) => {
        result.forEach((speaker) => {
          speaker.Name = speaker.Speaker__r.Name;
          speaker.Email = "*********@gmail.com";
          speaker.Phone = speaker.Speaker__r.Phone__c;
          speaker.Picture__c = speaker.Speaker__r.Picture__c;
          speaker.About_Me__c = speaker.Speaker__r.About_Me__c;
          speaker.CompanyName = speaker.Speaker__r.Company__c;
        });
        this.speakerList = result;
        window.console.log(" result ", this.result);
        this.errors = undefined;
      })
      .catch((err) => {
        this.errors = err;
        this.speakerList = undefined;
        window.console.log(" err ", this.errors);
      });
  }

  handleLocatioDetails() {
    getLocationDetails({
      eventId: this.recordId
    })
      .then((result) => {
        if (result.Location__c) {
          this.eventRec = result;
        } else {
          this.eventRec = undefined;
        }
        this.errors = undefined;
      })
      .catch((err) => {
        this.errors = err;
        this.speakerList = undefined;
      });
  }

  handleEventAttendee() {
    getAttendees({
      eventId: this.recordId
    })
      .then((result) => {
        result.forEach((att) => {
          //window.console.log(att.Attendee__r.Name);
          att.Name = att.Attendee__r.Name;
          att.Email = "*********@gmail.com";
          att.CompanyName = att.Attendee__r.Company_Name__c;
          if (att.Attendee__r.Location__c) {
            att.Location = att.Attendee__r.Location__r.Name;
          } else {
            att.Location = "Preferred Not to Say";
          }
        });

        //window.console.log(" result ", result);
        this.attendeesList = result;
        //window.console.log(" attendeesList ", this.attendeesList);
        this.errors = undefined;
      })
      .catch((err) => {
        this.errors = err;
        this.speakerList = undefined;
      });
  }
  createSpeaker() {
    const defaultValues = encodeDefaultFieldValues({
      Event__c: this.recordId
    });
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "EventSpeakers__c",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    });
  }
  createAttendee() {
    const defaultValues = encodeDefaultFieldValues({
      Event__c: this.recordId
    });
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Event_Attendee__c",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    });
  }
}
