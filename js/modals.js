
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
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                this.missingText = 'the Bank Account name';
                this.missingObject = 'Bank Account' 
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
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                this.changedObject = 'Bank Account';
            }
        }
    },
    methods : {
        Save : function() {
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                EventBus.$emit('save-bankaccount');
            }
        },
        Discard : function() {
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                EventBus.$emit('discard-bankaccount-changes');
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
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                this.deleteObject = 'Bank Account';
            }
        }
    },
    methods : {
        Delete : function() {
            var currentRoute = router.history.current.name;
            if(currentRoute == 'bankAccount') {
                EventBus.$emit('delete-bankaccount');
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
