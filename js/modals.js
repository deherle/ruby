
var missingModalComponent = Vue.component( 'missing-modal', {
    data : function() {
        return  {
          missingText : '',
          missingObject : ''
        }
    },
    methods : {
      
    },
    watch : {
        $route : function(to,from) {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount') {
                this.missingText = 'the bank account name';
                this.missingObject = 'Bank Account' 
            } else if(currentRoute == 'contact' || currentRoute == 'familyContact') {
                this.missingText = 'the contact name';
                this.missingObject = 'Contact' 
            } else if(currentRoute == 'investment') {
                this.missingText = 'the investment account name';
                this.missingObject = 'Investment Account' 
            } else if(currentRoute == 'insurancePolicy') {
                this.missingText = 'the insurance policy name';
                this.missingObject = 'Insurance Policy' 
            } else if(currentRoute == 'serviceProvider') {
                this.missingText = 'the service provider name';
                this.missingObject = 'Service Provider' 
            } else if(currentRoute == 'documents') {
                this.missingText = 'the document name';
                this.missingObject = 'Document' 
            }
        }
    },
    template: `        
        <div class="ui basic modal" id="missing-modal">
            <div class="ui icon header">
                <!-- <i class="archive icon"></i> -->
                Missing {{missingObject}} Information
            </div>
            <div class="content" style="text-align: center;">
                <p>It looks like you're missing {{missingText}}, please enter that information in order to save this {{missingObject}}.</p>
            </div>
            <div class="actions" style="text-align: center;">
                <div class="ui green ok inverted button">
                    <i class="checkmark icon"></i>
                    OK
                </div>
            </div>
        </div>
    `
});

var saveModalComponent = Vue.component( 'save-modal', {
    data : function() {
        return  {
            missingText : '',
            changedObject : ''
        }
    },
    watch : {
        $route : function(to,from) {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount') {
                this.changedObject = 'Bank Account';
            } else if(currentRoute == 'contact' || currentRoute == 'familyContact') {
                this.changedObject = 'Contact' 
            } else if(currentRoute == 'investment') {
                this.changedObject = 'Investment Account' 
            } else if(currentRoute == 'insurancePolicy') {
                this.changedObject = 'Insurance Policy' 
            } else if(currentRoute == 'serviceProvider') {
                this.changedObject = 'Service Provider' 
            } else if(currentRoute == 'documents') {
                this.changedObject = 'Document' 
            }
        }
    },
    methods : {
        Save : function() {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount') {
                EventBus.$emit('save-bankaccount');
            } else if(currentRoute == 'contact') {
                EventBus.$emit('save-contact');
            } else if(currentRoute == 'familyContact') {
                EventBus.$emit('save-familycontact');
            } else if(currentRoute == 'investment') {
                EventBus.$emit('save-investment');
            } else if(currentRoute == 'insurancePolicy') {
                EventBus.$emit('save-insurance');
            } else if(currentRoute == 'serviceProvider') {
                EventBus.$emit('save-serviceprovider');
            } else if(currentRoute == 'document') {
                EventBus.$emit('save-document'); 
            }
        },
        Discard : function() {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount') {
                EventBus.$emit('discard-bankaccount-changes');
            } else if(currentRoute == 'contact') {
                EventBus.$emit('discard-contact-changes');
            } else if(currentRoute == 'familyContact') {
                EventBus.$emit('discard-familycontact-changes');
            } else if(currentRoute == 'investment') {
                EventBus.$emit('discard-investment-changes');
            } else if(currentRoute == 'insurancePolicy') {
                EventBus.$emit('discard-insurance-changes');
            } else if(currentRoute == 'serviceProvider') {
                EventBus.$emit('discard-serviceprovider-changes');
            } else if(currentRoute == 'document') {
                EventBus.$emit('discard-document-changes'); 
            }
        }
    },
    template: `        
        <div class="ui basic modal" id="save-modal">
            <div class="ui icon header">
                <!-- <i class="archive icon"></i> -->
                Go Back to {{changedObject}}s
            </div>
            <div class="content" style="text-align: center;">
                <p>It looks like you've made some changes to this {{changedObject}}, are you sure you want to go back?</p>
            </div>
            <div class="actions" style="text-align: center;">
                <div class="ui red basic cancel inverted button" @click="Discard();">
                    <i class="remove icon"></i>
                    Discard
                </div>
                <div class="ui green ok inverted button" @click="Save();">
                    <i class="checkmark icon"></i>
                    Save changes
                </div>
            </div>
        </div>
    `
});

var deleteModalComponent = Vue.component( 'delete-modal', {
    data : function() {
        return  {
            deleteObject : ''
        }
    },
    watch : {
        $route : function(to,from) {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount' || currentRoute == 'bankAccounts') {
                this.deleteObject = 'bank account';
            } else if(currentRoute == 'contact' || currentRoute == 'familyContact' || currentRoute == 'contacts' || currentRoute == 'familyContacts') {
                this.deleteObject = 'contact';
            } else if(currentRoute == 'document' || currentRoute == 'documents') {
                this.deleteObject = 'document';
            } else if(currentRoute == 'investment' || currentRoute == 'investments') {
                this.deleteObject = 'investment account';
            } else if(currentRoute == 'serviceProvider' || currentRoute == 'serviceproviders') {
                this.deleteObject = 'service provider';
            } else if(currentRoute == 'insurancePolicy' || currentRoute == 'insurancePolicies') {
                this.deleteObject = 'insurance policy';
            } 
        }
    },
    methods : {
        Delete : function() {
            var currentRoute = gRouter.history.current.name;
            if(currentRoute == 'bankAccount' || currentRoute == 'bankAccounts') {
                EventBus.$emit('delete-bankaccount');
            } else if(currentRoute == 'contact' || currentRoute == 'contacts') {
                EventBus.$emit('delete-contact');
            } else if(currentRoute == 'familyContact' || currentRoute == 'familyContacts') {
                EventBus.$emit('delete-familycontact');
            } else if(currentRoute == 'document' || currentRoute == 'documents') {
                EventBus.$emit('delete-document');
            } else if(currentRoute == 'investment' || currentRoute == 'investments') {
                EventBus.$emit('delete-investment');
            } else if(currentRoute == 'serviceProvider' || currentRoute == 'serviceProviders') {
                EventBus.$emit('delete-serviceprovider');
            } else if(currentRoute == 'insurancePolicy' || currentRoute == 'insurancePolicies') {
                EventBus.$emit('delete-insurance');
            } 
        }
    },
    template: `        
        <div class="ui basic modal" id="delete-modal">
            <div class="ui icon header">
                <!-- <i class="archive icon"></i> -->
                Delete {{deleteObject}}
            </div>
            <div class="content" style="text-align: center;">
                <p>Are you sure you want to delete this {{deleteObject}}?</p>
            </div>
            <div class="actions" style="text-align: center;">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>
                    Cancel
                </div>
                <div class="ui green ok inverted button" @click="Delete();">
                    <i class="checkmark icon"></i>
                    Delete
                </div>
            </div>
        </div>
    `
});
