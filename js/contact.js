
var contactComponent = Vue.component( 'contact-template', {
    computed : {
      name : {
        get() { return selectedContact.name; },
        set(value) { 
            selectedContact.name = value;
            inputHasChanged = true; 
          }
      },
      email : {
        get() { return selectedContact.email },
        set(value) { 
          selectedContact.email = value; 
          inputHasChanged = true; 
        }
      },
      phone : {
        get() { return selectedContact.phone },
        set(value) { 
          selectedContact.phone = value;
          inputHasChanged = true;  
        }
      },
      mobile : {
        get() { return selectedContact.mobile },
        set(value) { 
          selectedContact.mobile = value;
          inputHasChanged = true;
        }
      },
      company : {
        get() { return selectedContact.company },
        set(value) { 
          selectedContact.company = value;
          inputHasChanged = true; 
        }
      },
      address : {
        get() { return selectedContact.address },
        set(value) { 
          selectedContact.address = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        get() { return selectedContact.notes },
        set(value) { 
          selectedContact.notes = value; 
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
      saveBankAccount : function() {
        if( selectedContact.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localContactIndex != -1) {
            vaultBlob.Contacts[this.localContactIndex] = selectedContact;
          } else {
            selectedContact.id = this.localContactIndex = vaultBlob.Contacts.length;
            vaultBlob.Contacts[vaultBlob.Contacts.length] = selectedContact;
          }
          localStorage.setItem("vault-blob", JSON.stringify(vaultBlob));
          router.push('contacts');
        }
      },
      discardContactChanges : function() {
        router.push('contacts');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          router.push('contacts');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.accountIndex == -1) {
          router.push('contacts');
        } else {
          vaultBlob.Contacts.splice(this.localAccountIndex,1);
          router.push('contacts');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Contact Information</h2>
            
            <h4>Enter as much information as you can about this contact.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Contact Name</label>
              <input v-model="name" type="text" placeholder="First and last name" autocomplete="off" id="name" @input="inputChanged();">
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Account Number</label>
                  <input v-model="number" type="text" name="name" placeholder="Account Number" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Account Balance</label>
                  <div class="ui right labeled input">
                    <label for="balance" class="ui label">$</label>
                    <input v-model="balance" type="text" name="balance" placeholder="Account Balance (approximate)" @input="inputChanged();">
                  </div>
                </div>
              </div>
            </div>
      
            <div class="inline fields">
              <label>Account Type:</label>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Checkings" v-model="type" @input="inputChanged();">
                  <label>Checkings</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Savings" v-model="type" @input="inputChanged();">
                  <label>Savings</label>
                </div>
              </div>
            </div>

            <div class="inline fields">
              <label>Account Ownership:</label>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accountownership" v-model="ownership" value="Individual" @input="inputChanged();">
                  <label>Individual</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accountownership" tabindex="0" v-model="ownership" value="Joint" @input="inputChanged();">
                  <label>Joint</label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Bank Name</label>
                  <input v-model="bankname" type="text" name="bank-name" placeholder="Bank Name" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Bank Address</label>
                  <input v-model="address" type="text" name="address" placeholder="Bank Address" @input="inputChanged();">
                </div>
              </div>
            </div>
                              
            <div class="field">
              <label>Notes</label>
              <textarea rows="2" placeholder="Bank contact person, date opened, etc." v-model="notes" @input="inputChanged();"></textarea>
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
                <button class="ui huge blue button" @click="saveBankAccount();">
                Save this bank account
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this bank account
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

