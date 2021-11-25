
var summaryComponent = Vue.component( 'summary-template', {
    props : [],
    data : function() {
        return  {
          numFamilyContacts : 0,
          numContacts : 0,
          numDocuments : 0,
          numServiceProviders : 0,
          numBankAccounts : 0,
          numInvestments : 0,
          numInsurancePolicies : 0
        }
    },
    mounted : function() {
      this.numFamilyContacts = gVaultBlob.FamilyContacts.length;
      this.numContacts = gVaultBlob.Contacts.length;
      this.numDocuments = gVaultBlob.Documents.length;
      this.numServiceProviders = gVaultBlob.ServiceProviders.length;
      this.numBankAccounts = gVaultBlob.BankAccounts.length;
      this.numInvestments = gVaultBlob.InvestmentAccounts.length;
      this.numInsurancePolicies = gVaultBlob.Insurance.length;
    },
    beforeDestroy : function() { 
      
    },
    methods : {
      
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
          <h1 class="ui header" style="margin-top: 1em;">
            <i class="list ol icon"></i>
            <div class="content" style="text-decoration: underline;">
              Summary
            </div>
          </h1>
            
            <h3>Here's a summary of all the information you've entered into your SmartVault.</h3>

            <div class="ui positive message column six wide">
                <div class="header">
                    Jump to any category
                </div>
                <p>You can jump to any of the sub categories below by clicking on the number in each row.</p>
            </div>

            <h3 class="ui header">
                <i class="users icon"></i>
                <div class="content">
                <a href="#" @click="FamilyContacts();" style="text-decoration: underline;">{{numFamilyContacts}}</a>&nbsp;&nbsp;&nbsp;Family Contacts
                <div class="sub header">Family contacts, relatives</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="address book icon"></i>
                <div class="content">
                <a href="#" @click="Contacts();" style="text-decoration: underline;">{{numContacts}}</a>&nbsp;&nbsp;&nbsp;Important Contacts
                <div class="sub header">Friends, personal and professional contacts, emergency contacts</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="file alternate icon"></i>
                <div class="content">
                <a href="#" @click="Documents();" style="text-decoration: underline;">{{numDocuments}}</a>&nbsp;&nbsp;&nbsp;Important Documents
                <div class="sub header">Birth certificates, passports, wills, power of attorney, titles</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="plug icon"></i>
                <div class="content">
                <a href="#" @click="Providers();" style="text-decoration: underline;">{{numServiceProviders}}</a>&nbsp;&nbsp;&nbsp;Service Providers
                <div class="sub header">Lawyer, doctor, nurse, landscaping, taxi</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="dollar sign icon"></i>
                <div class="content">
                <a href="#" @click="BankAccounts();" style="text-decoration: underline;">{{numBankAccounts}}</a>&nbsp;&nbsp;&nbsp;Bank Accounts
                <div class="sub header">Savings, Checkings, Bill Payments, Joint, HOA, Taxes</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="chart line icon"></i>
                <div class="content">
                <a href="#" @click="Investments();" style="text-decoration: underline;">{{numInvestments}}</a>&nbsp;&nbsp;&nbsp;Investments
                <div class="sub header">401k, IRA, Pension, Brokerage, RESP, RRSP, Non-Registered, TFSA</div>
                </div>
            </h3>

            <h3 class="ui header">
                <i class="university icon"></i>
                <div class="content">
                <a href="#" @click="Insurance();" style="text-decoration: underline;">{{numInsurancePolicies}}</a>&nbsp;&nbsp;&nbsp;Insurance
                <div class="sub header">Home, auto, life, disability, liability, professional</div>
                </div>
            </h3>
    
        </div>
      </div>

    `
});

