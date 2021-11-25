
var investmentAccountComponent = Vue.component( 'investment-account-template', {
    computed : {
      id : {
        cache: false,
        get() { return gSelectedInvestmentAccount.id; },
        set(value) { 
            gSelectedInvestmentAccount.id = value;
          }
      },
      name : {
        cache: false,
        get() { return gSelectedInvestmentAccount.name; },
        set(value) { 
            gSelectedInvestmentAccount.name = value;
            inputHasChanged = true; 
          }
      },
      number : {
        cache: false,
        get() { return gSelectedInvestmentAccount.number },
        set(value) { 
            gSelectedInvestmentAccount.number = value; 
          inputHasChanged = true; 
        }
      },
      balance : {
        cache: false,
        get() { return gSelectedInvestmentAccount.balance },
        set(value) { 
            gSelectedInvestmentAccount.balance = value;
          inputHasChanged = true;  
        }
      },
      type : {
        cache: false,
        get() { return gSelectedInvestmentAccount.type },
        set(value) { 
            gSelectedInvestmentAccount.type = value;
          inputHasChanged = true;
        }
      },
      ownership : {
        cache: false,
        get() { return gSelectedInvestmentAccount.ownership },
        set(value) { 
            gSelectedInvestmentAccount.ownership = value;
          inputHasChanged = true; 
        }
      },
      brokername : {
        cache: false,
        get() { return gSelectedInvestmentAccount.brokername },
        set(value) { 
            gSelectedInvestmentAccount.brokername = value;
          inputHasChanged = true;  
        }
      },
      address : {
        cache: false,
        get() { return gSelectedInvestmentAccount.address },
        set(value) { 
            gSelectedInvestmentAccount.address = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        cache: false,
        get() { return gSelectedInvestmentAccount.notes },
        set(value) { 
            gSelectedInvestmentAccount.notes = value; 
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
      EventBus.$on('save-investment', this.saveInvestmentAccount);
      EventBus.$on('discard-investment-changes', this.discardInvestmentAccountChanges);
      EventBus.$on('delete-investment', this.hardDelete);
    },
    beforeDestroy : function() { 
      EventBus.$off('save-investment', this.saveInvestmentAccount);
      EventBus.$off('discard-investment-changes', this.discardInvestmentAccountChanges);
      EventBus.$off('delete-investment', this.hardDelete);
    },
    methods : {
      saveInvestmentAccount : function() {
        if( gSelectedInvestmentAccount.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localAccountIndex != -1) {
            gVaultBlob.InvestmentAccounts[this.localAccountIndex] = gSelectedInvestmentAccount;
          } else {
            gSelectedInvestmentAccount.id = this.localAccountIndex = gVaultBlob.InvestmentAccounts.length;
            gVaultBlob.InvestmentAccounts[gVaultBlob.InvestmentAccounts.length] = gSelectedInvestmentAccount;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('investments');
          
        }
      },
      discardInvestmentAccountChanges : function() {
        gRouter.push('investments');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('investments');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.accountIndex == -1) {
          gRouter.push('investments');
        } else {
          gVaultBlob.InvestmentAccounts.splice(this.localAccountIndex,1);
          gRouter.push('investments');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Investment Account Information</h2>
            
            <h4>Enter as much information as you can about this investment account.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Account Name</label>
              <input v-model="name" type="text" placeholder="Primary retirement account, education account, etc." autocomplete="off" id="accountname" @input="inputChanged();">
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
                  <input type="radio" name="accounttype" value="401k" v-model="type" @input="inputChanged();">
                  <label>401k</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="IRA" v-model="type" @input="inputChanged();">
                  <label>IRA</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Brokerage" v-model="type" @input="inputChanged();">
                  <label>Brokerage</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Mutual Fund" v-model="type" @input="inputChanged();">
                  <label>Mutual Fund</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Pension" v-model="type" @input="inputChanged();">
                  <label>Pension</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="RRSP" v-model="type" @input="inputChanged();">
                  <label>RRSP</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="RESP" v-model="type" @input="inputChanged();">
                  <label>RESP</label>
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
                  <label>Broker/Custodian Name</label>
                  <input v-model="brokername" type="text" name="broker-name" placeholder="Broker Name" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Broker/Custodian Address</label>
                  <input v-model="address" type="text" name="address" placeholder="Broker Address" @input="inputChanged();">
                </div>
              </div>
            </div>
                              
            <div class="field">
              <label>Notes</label>
              <textarea rows="2" placeholder="Account contact person, date opened, etc." v-model="notes" @input="inputChanged();"></textarea>
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
                <button class="ui huge blue button" @click="saveInvestmentAccount();">
                Save this account
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this account
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

