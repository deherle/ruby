
var contactsComponent = Vue.component( 'contacts-template', {
  computed : {
    contacts() {
      return vaultBlob.Contact;
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      selectedContact = JSON.parse(JSON.stringify(vaultBlob.Contacts[rowId]));
      this.$router.push( {name : 'contact', params : { contactIndex: rowId }});
    },
    addNewContact : function() {
      selectedContact = {
        name : "",
        number : "",
        mobile : "",
        company : "",
        email : "",
        address : "",
        notes : ""
      };
      this.$router.push( {name : 'contact', params : { accountIndex: -1 }});
    },
    doneWithContacts : function() {

    },
    back : function() {

    },
    onDelete: function(i) {
      vaultBlob.Contacts.splice(i,1);
      this.$forceUpdate();
    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Contacts Summary</h2>

        <h4>This list summarizes all of your personal and professional contacts. If you wish to review or edit an item on this list, click on the applicable item.</h4>
        
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
                <td><a href="#" @click="onRowClick(Contact.id);">{{Contact.Email}}</a></td>
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
              Add another contact
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