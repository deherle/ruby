
Vue.component('menu-picker', {
    data: function () {
        return { 
            connect : true,
            gettingStarted : false,
            information : false,
            bankAccounts : false,
            investments : false,
            contacts : false,
            familyContacts : false,
            documents : false,
            serviceProviders : false,
            insurance : false
        }
    },
    watch : {
        $route : function(to,from) {
            var currentRoute = router.history.current.name;
            if(currentRoute == 'connect') {
                this.connect = true;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            }
            else if(currentRoute == 'intro1' || currentRoute == 'intro2') {
                this.connect = false;
                this.gettingStarted = true;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'bankAccount' || currentRoute == 'bankAccounts') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = true;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'contact' || currentRoute == 'contacts') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = true;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'familyContact' || currentRoute == 'familyContacts') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = true;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'infoSources' || currentRoute == 'infoSources') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = true;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'document' || currentRoute == 'documents') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = true;
                this.serviceProviders = false;
                this.insurance = false;
            } else if (currentRoute == 'serviceProvider' || currentRoute == 'serviceProviders') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = true;
                this.insurance = false;
            } else if (currentRoute == 'insurance-policy' || currentRoute == 'insurance-policies') {
                this.connect = false;
                this.gettingStarted = false;
                this.bankAccounts = false;
                this.information = false;
                this.investments = false;
                this.contacts = false;
                this.familyContacts = false;
                this.documents = false;
                this.serviceProviders = false;
                this.insurance = true;
            }
        }
    },
    methods : {
        Connect : function() {
            router.push('connect');
        },
        GettingStarted : function() {
            router.push('intro1');
        },
        InfoSources : function() {
            router.push('information');
        },
        BankAccounts : function() {
            router.push('bank-accounts');
        },
        Investments : function() {
            router.push('investments');
        },
        Contacts : function() {
            router.push('contacts');
        },
        FamilyContacts : function() {
            router.push('family-contacts');
        },
        Documents : function() {
            router.push('documents');
        },
        ServiceProviders : function() {
            router.push('service-providers');
        },
        Insurance : function() {
            router.push('insurance-policies');
        }
    },
    template: `
    <div class="ui vertical steps inverted" style="margin: 0.5em;">
        <a class="step" v-bind:class="{ active: connect }" @click="Connect();">
            <i class="unlock icon"></i>
            <div class="content">
                <div class="title">SmartVault Device</div>
                <div class="description">Connect and unlock</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: gettingStarted }" @click="GettingStarted();">
        <i class="child icon"></i>
        <div class="content">
            <div class="title">Getting Started</div>
            <div class="description">Learn how SmartVault works</div>
        </div>
        </a>
        <a class="step" v-bind:class="{ active: information }" @click="InfoSources();">
        <i class="archive icon"></i>
        <div class="content">
            <div class="title">Sources of Information</div>
            <div class="description">Entering data</div>
        </div>
        </a>
        <a class="step" v-bind:class="{ active: familyContacts }" @click="FamilyContacts();">
        <i class="users icon"></i>
        <div class="content">
            <div class="title">Family Information</div>
            <div class="description">Family contacts</div>
        </div>
        </a>
        <a class="step" v-bind:class="{ active: contacts }" @click="Contacts();">
            <i class="address book icon"></i>
            <div class="content">
            <div class="title">Important Contacts</div>
            <div class="description">Other key people</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: documents }" @click="Documents();">
            <i class="file alternate icon"></i>
            <div class="content">
                <div class="title">Important Documents</div>
                <div class="description">Power of attorney, etc.</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: serviceProviders }" @click="ServiceProviders();">
            <i class="plug icon"></i>
            <div class="content">
                <div class="title">Service Providers</div>
                <div class="description">Ongoing contracts</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: bankAccounts }" @click="BankAccounts();">
            <i class="dollar sign icon"></i>
            <div class="content">
                <div class="title">Bank Accounts</div>
                <div class="description">Banking information</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: investments }" @click="Investments();">
            <i class="chart line icon"></i>
            <div class="content">
                <div class="title">Investment Accounts</div>
                <div class="description">Investment information</div>
            </div>
        </a>
        <a class="step" v-bind:class="{ active: insurance }" @click="Insurance();">
            <i class="university icon"></i>
            <div class="content">
                <div class="title">Insurance</div>
                <div class="description">Sources and dates</div>
            </div>
        </a>
    </div>`
});

