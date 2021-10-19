//var { default: Vue } = require("vue");

Vue.component('menu-picker', {
    data: function () {
        return { count: 0 }
    },
    template: `
    <div class="ui vertical steps inverted" style="margin: 0.5em;">
        <a class="step">
        <i class="child icon"></i>
        <div class="content">
            <div class="title">Getting Started</div>
            <div class="description">Learn how SmartVault works</div>
        </div>
        </a>
        <a class="step">
        <i class="archive icon"></i>
        <div class="content">
            <div class="title">Sources of Information</div>
            <div class="description">Entering data</div>
        </div>
        </a>
        <a class="step">
        <i class="users icon"></i>
        <div class="content">
            <div class="title">Family Information</div>
            <div class="description">Family contacts</div>
        </div>
        </a>
        <a class="step">
            <i class="address book icon"></i>
            <div class="content">
            <div class="title">Important Contacts</div>
            <div class="description">Other key people</div>
            </div>
        </a>
        <a class="step">
            <i class="file alternate icon"></i>
            <div class="content">
                <div class="title">Important Documents</div>
                <div class="description">Power of attorney, etc.</div>
            </div>
        </a>
        <a class="step">
            <i class="plug icon"></i>
            <div class="content">
                <div class="title">Service Providers</div>
                <div class="description">Ongoing contracts</div>
            </div>
        </a>
        <a class="active step">
            <i class="dollar sign icon"></i>
            <div class="content">
                <div class="title">Bank Accounts</div>
                <div class="description">Banking information</div>
            </div>
        </a>
        <a class="step">
            <i class="university icon"></i>
            <div class="content">
                <div class="title">Insurance</div>
                <div class="description">Sources and dates</div>
            </div>
        </a>
    </div>`
});

Vue.component('header-bar', {
    data: function () {
      return { count : 0 }
    },
    template: `
        <div class="row centered" style="margin: 2em 0;">
            <div class="right floated left aligned six wide column">
                <button href="index.html" class="ui labeled icon button">
                    Search
                    <i class="search icon"></i>
                </button>
                <button href="index.html" class="ui labeled icon button">
                    Help
                    <i class="help icon"></i>
                </button>
                <button href="index.html" class="ui labeled icon button">
                    Bookmark
                    <i class="bookmark icon"></i>
                </button>
            </div>
        </div>
    `
});

var bankAccountComponent = Vue.component( 'bank-account-template', {
    computed : {
      name : {
          get() { return selectedBankAccount.name; },
          set(value) { selectedBankAccount.name = value; }
        },
        number : {
          get() { return selectedBankAccount.number },
          set(value) { selectedBankAccount.number = value; }
        },
        balance : {
          get() { return selectedBankAccount.balance },
          set(value) { selectedBankAccount.balance = value; }
        },
        type : {
          get() { return selectedBankAccount.type },
          set(value) { selectedBankAccount.type = value; }
        },
        ownership : {
          get() { return selectedBankAccount.ownership },
          set(value) { selectedBankAccount.ownership = value; }
        },
        bankname : {
          get() { return selectedBankAccount.bankname },
          set(value) { selectedBankAccount.bankname = value; }
        },
        address : {
          get() { return selectedBankAccount.address },
          set(value) { selectedBankAccount.address = value; }
        },
        notes : {
          get() { return selectedBankAccount.notes },
          set(value) { selectedBankAccount.notes = value; }
        }
    },
    props : ['id'],
    data : function() {
        return  {
          inputHasChanged : false
        }
    },
    methods : {
      Save : function() {
        if( this.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          var index;
          if(this.id != -1) {
            vaultBlob.BankAccounts[this.id] = selectedBankAccount;
            index = this.id;
          } else {
            vaultBlob.BankAccounts[vaultBlob.BankAccounts.length] = selectedBankAccount;
            index = vaultBlob.BankAccounts.length;
          }
          Vue.set(vaultBlob.BankAccounts, index, selectedBankAccount);
          localStorage.setItem("vault-blob", JSON.stringify(vaultBlob));
          router.push('bank-accounts');
        }
      },
      inputChanged : function() {
        this.inputHasChanged - true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          router.push('bank-accounts');
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
                  <input type="radio" name="accounttype" value="Checkings" v-model="type">
                  <label>Checkings</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accounttype" value="Savings" v-model="type">
                  <label>Savings</label>
                </div>
              </div>
            </div>

            <div class="inline fields">
              <label>Account Ownership:</label>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accountownership" v-model="ownership" value="Individual">
                  <label>Individual</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="accountownership" tabindex="0" v-model="ownership" value="Joint">
                  <label>Joint</label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Bank Name</label>
                  <input v-model="bankname" type="text" name="bank-name" placeholder="Bank Name" >
                </div>
                <div class="field">
                  <label>Bank Address</label>
                  <input v-model="address" type="text" name="address" placeholder="Bank Address" >
                </div>
              </div>
            </div>
                              
            <div class="field">
              <label>Notes</label>
              <textarea rows="2" placeholder="Bank contact person, date opened, etc." v-model="notes"></textarea>
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

          <div class="six wide column"></div>
            <div class="three wide column">
            <button class="ui huge blue button" @click="Save();">
              Save this bank account
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

var bankAccountsComponent = Vue.component( 'bank-accounts-template', {
  computed : {
    bankAccounts() {
      return vaultBlob.BankAccounts;
    }
  },
  methods : {
    onRowClick : function(id) {
      selectedBankAccount = vaultBlob.BankAccounts[id];
      this.$router.push( {path : '/bank-account', params : {id:id}});
    },
    addNewAccount : function() {
      selectedBankAccount = {
        name : "",
        number : "",
        balance : "",
        type : "Savings",
        ownership : "Individual",
        bankname : "",
        address : "",
        notes : ""
      };
      this.$router.push( {path : '/bank-account', params : {id: -1}});
    },
    doneWithAccounts : function() {

    },
    back : function() {

    },
    onDelete: function() {

    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Bank Accounts Summary</h2>

        <h4>This list summarizes all of your bank accounts. If you wish to review or edit an item on this list, click on the applicable item.</h4>
        
        <table class="ui single line padded large table" style="margin-top: 4em;">
          <thead>
            <tr>
              <th>Account Name</th>  
              <th>Bank</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="BankAccount in bankAccounts">
                <td><a href="#" @click="onRowClick(BankAccount.id);">{{BankAccount.name}}</a></td>
                <td><a href="#" @click="onRowClick(BankAccount.id);">{{BankAccount.bankname}}</a></td>
                <td><a href="#" @click="onRowClick(BankAccount.id);">{{BankAccount.balance}}</a></td>
                <td><a href="#" @click="onRowClick(BankAccount.id);">Edit</a>&nbsp;|&nbsp;<a href="#" @click="onDelete(BankAccount.id);">Delete</a></td>
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
            <button class="ui huge blue button"  @click="addNewAccount();">
              Add another bank account
            </button>
          </div>
          <div class="two wide column">
            <button class="ui huge blue button" @click="doneWithAccounts();">
              Done with bank accounts
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