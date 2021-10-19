
var bankAccountsComponent = Vue.component( 'bank-accounts-template', {
  computed : {
    bankAccounts() {
      return vaultBlob.BankAccounts;
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      selectedBankAccount = JSON.parse(JSON.stringify(vaultBlob.BankAccounts[rowId]));
      this.$router.push( {name : 'bankAccount', params : { accountIndex: rowId }});
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
      this.$router.push( {name : 'bankAccount', params : { accountIndex: -1 }});
    },
    doneWithAccounts : function() {

    },
    back : function() {

    },
    onDelete: function(i) {
      vaultBlob.BankAccounts.splice(i,1);
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