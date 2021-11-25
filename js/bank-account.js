
var bankAccountComponent = Vue.component( 'bank-account-template', {
    computed : {
      id : {
        cache: false,
        get() { return gSelectedBankAccount.id; },
        set(value) { 
            gSelectedBankAccount.id = value;
          }
      },
      name : {
        cache: false,
        get() { return gSelectedBankAccount.name; },
        set(value) { 
            gSelectedBankAccount.name = value;
            inputHasChanged = true; 
          }
      },
      number : {
        cache: false,
        get() { return gSelectedBankAccount.number },
        set(value) { 
          gSelectedBankAccount.number = value; 
          inputHasChanged = true; 
        }
      },
      balance : {
        cache: false,
        get() { return gSelectedBankAccount.balance },
        set(value) { 
          gSelectedBankAccount.balance = value;
          inputHasChanged = true;  
        }
      },
      type : {
        cache: false,
        get() { return gSelectedBankAccount.type },
        set(value) { 
          gSelectedBankAccount.type = value;
          inputHasChanged = true;
        }
      },
      ownership : {
        cache: false,
        get() { return gSelectedBankAccount.ownership },
        set(value) { 
          gSelectedBankAccount.ownership = value;
          inputHasChanged = true; 
        }
      },
      bankname : {
        cache: false,
        get() { return gSelectedBankAccount.bankname },
        set(value) { 
          gSelectedBankAccount.bankname = value;
          inputHasChanged = true;  
        }
      },
      address : {
        cache: false,
        get() { return gSelectedBankAccount.address },
        set(value) { 
          gSelectedBankAccount.address = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        cache: false,
        get() { return gSelectedBankAccount.notes },
        set(value) { 
          gSelectedBankAccount.notes = value; 
          inputHasChanged = true; 
        }
      }
    },
    props : ['accountIndex'],
    data : function() {
        return  {
          inputHasChanged : false,
          localAccountIndex : 0
        }
    },
    mounted : function() {
      this.localAccountIndex = this.accountIndex;
      EventBus.$on('save-bankaccount', this.saveBankAccount);
      EventBus.$on('discard-bankaccount-changes', this.discardBankAccountChanges);
      EventBus.$on('delete-bankaccount', this.hardDelete);
    },
    beforeDestroy : function() { 
      EventBus.$off('save-bankaccount', this.saveBankAccount);
      EventBus.$off('discard-bankaccount-changes', this.discardBankAccountChanges);
      EventBus.$off('delete-bankaccount', this.hardDelete);
    },
    methods : {
      saveBankAccount : function() {
        if( gSelectedBankAccount.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localAccountIndex != -1) {
            gVaultBlob.BankAccounts[this.localAccountIndex] = gSelectedBankAccount;
          } else {
            gSelectedBankAccount.id = this.localAccountIndex = gVaultBlob.BankAccounts.length;
            gVaultBlob.BankAccounts[gVaultBlob.BankAccounts.length] = gSelectedBankAccount;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('bank-accounts');
          
        }
      },
      discardBankAccountChanges : function() {
        gRouter.push('bank-accounts');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('bank-accounts');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.accountIndex == -1) {
          gRouter.push('bank-accounts');
        } else {
          gVaultBlob.BankAccounts.splice(this.localAccountIndex,1);
          gRouter.push('bank-accounts');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Bank Account Information</h2>
            
            <h4>Enter as much information as you can about this bank account.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Account Name</label>
              <input v-model="name" type="text" placeholder="Primary Checkings, Rent, Education Savings, etc." autocomplete="off" id="accountname" @input="inputChanged();">
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

