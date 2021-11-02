
var familyContactsComponent = Vue.component( 'family-contacts-template', {
  computed : {
    contacts() {
      return gVaultBlob.FamilyContacts;
    }
  },
  data : function () {
    return {
      addButtonText : '',
      indexToDelete : -1
    }
  },
  mounted : function() {
    if(gVaultBlob.FamilyContacts.length > 0) {
      this.addButtonText = 'Add another contact';
    } else {
      this.addButtonText = 'Add your first contact';
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      gSelectedFamilyContact = JSON.parse(JSON.stringify(gVaultBlob.FamilyContacts[rowId]));
      gRouter.push( {name : 'family-contact', params : { contactIndex: rowId }});
    },
    addNewContact : function() {
      gSelectedFamilyContact = {
        id : -1,
        name : "",
        number : "",
        mobile : "",
        organization : "",
        email : "",
        address : "",
        notes : ""
      };
      gRouter.push( {name : 'familyContact', params : { contactIndex: -1 }});
    },
    doneWithContacts : function() {

    },
    back : function() {

    },
    onDelete : function(i) {
      this.indexToDelete = i;
      $('#delete-modal').modal('show');
    },
    hardDelete: function(i) {
      gVaultBlob.FamilyContacts.splice(i,1);
      EventBus.$emit('save-to-device');
      if(gVaultBlob.FamilyContacts.length > 0) {
        this.addButtonText = 'Add another contact';
      } else {
        this.addButtonText = 'Add your first contact';
      }
      this.$forceUpdate();
    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Family Contacts Summary</h2>

        <h4>This list summarizes all of your family contacts. If you wish to review or edit an item on this list, click on the applicable item.</h4>
        
        <table class="ui single line padded large table" style="margin-top: 4em;">
          <thead>
            <tr>
              <th>Contact Name</th>  
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="Contact in contacts">
                <td><a href="#" @click="onRowClick(Contact.id);">{{Contact.name}}</a></td>
                <td><a href="#" @click="onRowClick(Contact.id);">{{Contact.phone}}</a></td>
                <td><a href="#" @click="onRowClick(Contact.id);">{{Contact.email}}</a></td>
                <td><a href="#" @click="onRowClick(Contact.id);">Edit</a>&nbsp;|&nbsp;<a href="#" @click="onDelete(Contact.id);">Delete</a></td>
              </tr>
            </tbody>
          </table>

      </div>

      <div class="ui grid" style="margin-top:4em;">
        
        <div class="two wide column">
          <button class="ui huge blue labeled icon button" @click="back();">
            Previous
            <i class="left arrow icon"></i>
          </button>
        </div>

        <div class="eight wide column"></div>
          <div class="two wide column">
            <button class="ui huge blue button"  @click="addNewContact();">
              {{addButtonText}}
            </button>
          </div>
          <div class="two wide column">
            <button class="ui huge blue button" @click="doneWithContacts();">
              Done with contacts
            </button>
          </div>

          <div class="row centered" style="margin: 2em 0;">
            <p>&nbsp;</p>
            <h5>&copy;2021 SmartVault or one of its affiliates. All rights reserved.</h5>
          </div>
    
      </div>
    </div>

    `
});