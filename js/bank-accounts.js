
var bankAccountsComponent = Vue.component( 'bank-accounts-template', {
  computed : {
    bankAccounts() {
      return gVaultBlob.BankAccounts;
    }
  },
  data : function() {
    return  {
      indexToDelete : -1,
      addButtonText : ""
    }
},
  mounted : function() 
  {
    EventBus.$on('delete-bankaccount', this.hardDelete);
    if(gVaultBlob.BankAccounts.length > 0) {
      this.addButtonText = 'Add another account';
    } else {
      this.addButtonText = 'Add your first account';
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      gSelectedBankAccount = JSON.parse(JSON.stringify(gVaultBlob.BankAccounts[rowId]));
      gRouter.push( {name : 'bankAccount', params : { accountIndex: rowId }});
    },
    addNewAccount : function() {
      gSelectedBankAccount = {
        id : -1,
        name : "",
        number : "",
        balance : "",
        type : "Savings",
        ownership : "Individual",
        bankname : "",
        address : "",
        notes : ""
      };
      gRouter.push( {name : 'bankAccount', params : { accountIndex: -1 }});
    },
    doneWithAccounts : function() {

    },
    back : function() {

    },
    onDelete : function(i) {
      this.indexToDelete = i;
      $('#delete-modal').modal('show');
    },
    hardDelete: function(i) {
      gVaultBlob.BankAccounts.splice(i,1);
      EventBus.$emit('save-to-device');
      if(gVaultBlob.BankAccounts.length > 0) {
        this.addButtonText = 'Add another account';
      } else {
        this.addButtonText = 'Add your first account';
      }
      this.$forceUpdate();
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
                <td><a href="#" @click="onRowClick(BankAccount.id);">&#36;{{BankAccount.balance}}</a></td>
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
              {{addButtonText}}
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