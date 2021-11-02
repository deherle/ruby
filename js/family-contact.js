
var familyContactComponent = Vue.component( 'family-contact-template', {
    computed : {
      name : {
        get() { return gSelectedFamilyContact.name; },
        set(value) { 
            gSelectedFamilyContact.name = value;
            inputHasChanged = true; 
          }
      },
      email : {
        get() { return gSelectedFamilyContact.email },
        set(value) { 
            gSelectedFamilyContact.email = value; 
          inputHasChanged = true; 
        }
      },
      phone : {
        get() { return gSelectedFamilyContact.phone },
        set(value) { 
            gSelectedFamilyContact.phone = value;
          inputHasChanged = true;  
        }
      },
      mobile : {
        get() { return gSelectedFamilyContact.mobile },
        set(value) { 
            gSelectedFamilyContact.mobile = value;
          inputHasChanged = true;
        }
      },
      organization : {
        get() { return gSelectedFamilyContact.organization },
        set(value) { 
            gSelectedFamilyContact.organization = value;
          inputHasChanged = true; 
        }
      },
      address : {
        get() { return gSelectedFamilyContact.address },
        set(value) { 
            gSelectedFamilyContact.address = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        get() { return gSelectedFamilyContact.notes },
        set(value) { 
            gSelectedFamilyContact.notes = value; 
          inputHasChanged = true; 
        }
      }
    },
    props : ['contactIndex'],
    data : function() {
        return  {
          inputHasChanged : false,
          localContactIndex : 0
        }
    },
    mounted : function() {
      this.localContactIndex = this.contactIndex;
      EventBus.$on('save-contact', this.saveContact);
      EventBus.$on('discard-contact-changes', this.discardContactChanges);
      EventBus.$on('delete-contact', this.hardDelete);
    },
    methods : {
      saveContact : function() {
        if( gSelectedFamilyContact.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localContactIndex != -1) {
            gVaultBlob.FamilyContacts[this.localContactIndex] = gSelectedFamilyContact;
          } else {
            gSelectedFamilyContact.id = this.localContactIndex = gVaultBlob.FamilyContacts.length;
            gVaultBlob.FamilyContacts[gVaultBlob.FamilyContacts.length] = gSelectedFamilyContact;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('family-contacts');
        }
      },
      discardContactChanges : function() {
        gRouter.push('family-contacts');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('family-contacts');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.accountIndex == -1) {
          gRouter.push('family-contacts');
        } else {
          gVaultBlob.FamilyContacts.splice(this.localAccountIndex,1);
          gRouter.push('family-contacts');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Family Contact Information</h2>
            
            <h4>Enter as much information as you can about this family contact.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Family Contact Name</label>
              <input v-model="name" type="text" placeholder="First and last name" autocomplete="off" id="name" @input="inputChanged();">
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Email</label>
                  <input v-model="email" type="text" name="email" placeholder="somebody@domain.com" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Phone</label>
                  <input v-model="phone" type="text" name="phone" placeholder="+1 (555) 555-1212" @input="inputChanged();">
                </div>
              </div>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Mobile</label>
                  <input v-model="mobile" type="text" name="mobile" placeholder="+1 (555) 555-3434" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Organization</label>
                  <input v-model="organization" type="text" name="organization" placeholder="Rotary International" @input="inputChanged();">
                </div>
              </div>
            </div>

            <div class="field">
              <label>Address</label>
              <input v-model="address" type="text" name="address" placeholder="1256 Main Street, Youngstown, OH 34483" @input="inputChanged();">
            </div>
                              
            <div class="field">
              <label>Notes</label>
              <textarea rows="2" placeholder="Relationship, contact notes, etc." v-model="notes" @input="inputChanged();"></textarea>
            </div>

          </div>
      
        </div>

        <div class="ui grid" style="margin-top:4em;">
        
          <div class="two wide column">
            <button class="ui huge blue labeled icon button" @click="Back();">
              Back
              <i class="left arrow icon"></i>
            </button>
          </div>

          <div class="eight wide column"></div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="saveContact();">
                Save this contact
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this contact
                </button>
            </div>

          <div class="row centered" style="margin: 2em 0;">
            <p>&nbsp;</p>
            <h5>&copy;2021 MySafeVault or one of its affiliates. All rights reserved.</h5>
          </div>
    
        </div>
      </div>

    `
});

