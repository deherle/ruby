
var insurancePolicyComponent = Vue.component( 'insurance-policy-template', {
    computed : {
      id : {
        cache: false,
        get() { return gSelectedInsurancePolicy.id; },
        set(value) { 
            gSelectedInsurancePolicy.id = value;
          }
      },
      name : {
        cache: false,
        get() { return gSelectedInsurancePolicy.name; },
        set(value) { 
            gSelectedInsurancePolicy.name = value;
            inputHasChanged = true; 
          }
      },
      type : {
        cache: false,
        get() { return gSelectedInsurancePolicy.type },
        set(value) { 
            gSelectedInsurancePolicy.type = value; 
          inputHasChanged = true; 
        }
      },
      broker : {
        cache: false,
        get() { return gSelectedInsurancePolicy.broker },
        set(value) { 
            gSelectedInsurancePolicy.broker = value;
          inputHasChanged = true;  
        }
      },
      underwriter : {
        cache: false,
        get() { return gSelectedInsurancePolicy.underwriter },
        set(value) { 
            gSelectedInsurancePolicy.underwriter = value;
          inputHasChanged = true; 
        }
      },
      startdate : {
        cache: false,
        get() { return gSelectedInsurancePolicy.startdate },
        set(value) { 
            gSelectedInsurancePolicy.startdate = value;
          inputHasChanged = true;  
        }
      },
      term : {
        cache: false,
        get() { return gSelectedInsurancePolicy.term },
        set(value) { 
            gSelectedInsurancePolicy.term = value;
          inputHasChanged = true;  
        }
      },
      premium : {
        cache: false,
        get() { return gSelectedInsurancePolicy.premium },
        set(value) { 
            gSelectedInsurancePolicy.premium = value;
          inputHasChanged = true;  
        }
      },
      value : {
        cache: false,
        get() { return gSelectedInsurancePolicy.value },
        set(value) { 
            gSelectedInsurancePolicy.value = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        cache: false,
        get() { return gSelectedInsurancePolicy.notes },
        set(value) { 
            gSelectedInsurancePolicy.notes = value; 
          inputHasChanged = true; 
        }
      }
    },
    props : ['policyIndex'],
    data : function() {
        return  {
          inputHasChanged : false,
          localPolicyIndex : 0
        }
    },
    mounted : function() {
      this.localPolicyIndex = this.policyIndex;
      EventBus.$on('save-policy', this.savePolicy);
      EventBus.$on('discard-insurance-changes', this.discardPolicyChanges);
      EventBus.$on('delete-insurance', this.hardDelete);
    },
    beforeDestroy : function() { 
      EventBus.$off('save-policy', this.savePolicy);
      EventBus.$off('discard-insurance-changes', this.discardPolicyChanges);
      EventBus.$off('delete-insurance', this.hardDelete);
    },
    methods : {
      savePolicy : function() {
        if( gSelectedInsurancePolicy.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localPolicyIndex != -1) {
            gVaultBlob.Insurance[this.localPolicyIndex] = gSelectedInsurancePolicy;
          } else {
            gSelectedInsurancePolicy.id = this.localPolicyIndex = gVaultBlob.Insurance.length;
            gVaultBlob.Insurance[gVaultBlob.Insurance.length] = gSelectedInsurancePolicy;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('insurance-policies');
          
        }
      },
      discardPolicyChanges : function() {
        gRouter.push('insurance-policies');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('insurance-policies');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.providerIndex == -1) {
          gRouter.push('insurance-policies');
        } else {
          gVaultBlob.Insurance.splice(this.localPolicyIndex,1);
          gRouter.push('insurance-policies');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Insurance Policy Information</h2>
            
            <h4>Enter as much information as you can about this service provider, which may be an organization or person that provides recurring services for you.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Policy Name or Number</label>
              <input v-model="name" type="text" placeholder="Life Insurance, Policy #4888362" autocomplete="off" id="name" @input="inputChanged();">
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Type</label>
                  <input v-model="type" type="text" name="type" placeholder="Home, auto, life, etc." @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Broker</label>
                    <input v-model="broker" type="text" name="broker" placeholder="Farmers, Allstate, Geico" @input="inputChanged();">
                  </div>
                </div>
            </div>
    
            <div class="field">
                <label>Underwriter</label>
                <input placeholder="Lloyds, Travelers, etc." v-model="underwriter" @input="inputChanged();"></input>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Policy Start Date</label>
                  <input v-model="type" type="text" name="type" placeholder="June 30, 2018" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Term</label>
                  <input v-model="term" type="text" name="term" placeholder="Annual, 10-years" @input="inputChanged();">
                </div>
              </div>
            </div>

            <div class="field">
                <label>Premium</label>
                <div class="ui right labeled input">
                    <label for="premium" class="ui label">$</label>
                    <input v-model="premium" type="text" name="premium" placeholder="Monthly premium" @input="inputChanged();">
                </div>
            </div>

            <div class="field">
                <label>Value</label>
                <div class="ui right labeled input">
                    <label for="value" class="ui label">$</label>
                    <input v-model="value" type="text" name="value" placeholder="Policy payout value" @input="inputChanged();">
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
                <button class="ui huge blue button" @click="savePolicy();">
                Save this policy
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this policy
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

