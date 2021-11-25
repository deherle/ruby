
var insurancePoliciesComponent = Vue.component( 'insurance-policies-template', {
  computed : {
    insurancePolicies() {
      return gVaultBlob.Insurance;
    }
  },
  data : function() {
    return  {
      indexToDelete : -1,
      addButtonText : ''
    }
},
  mounted : function() 
  {
    EventBus.$on('delete-insurance', this.hardDelete);
    if(gVaultBlob.Insurance.length > 0) {
      this.addButtonText = 'Add another policy';
    } else {
      this.addButtonText = 'Add a policy';
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      gSelectedInsurancePolicy = JSON.parse(JSON.stringify(gVaultBlob.Insurance[rowId]));
      gRouter.push( {name : 'insurancePolicy', params : { policyIndex: rowId }});
    },
    addNewPolicy : function() {
        gSelectedInsurancePolicy = {
        id : -1,
        name : "",
        type : "",
        broker : "",
        type : "",
        underwriter : "",
        startdate : "",
        term : "",
        premium : "",
        value : "",
        notes : ""
      };
      gRouter.push( {name : 'insurancePolicy', params : { policyIndex: -1 }});
    },
    doneWithPolicies : function() {

    },
    back : function() {

    },
    onDelete : function(i) {
      this.indexToDelete = i;
      $('#delete-modal').modal('show');
    },
    hardDelete: function(i) {
      gVaultBlob.Insurance.splice(i,1);
      EventBus.$emit('save-to-device');
      if(gVaultBlob.Insurance.length > 0) {
        this.addButtonText = 'Add another policy';
      } else {
        this.addButtonText = 'Add a policy';
      }
      this.$forceUpdate();
    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Insurance Summary</h2>

        <h4>This list summarizes all of the insurance policies you have.</h4>
        
        <table class="ui single line padded large table" style="margin-top: 4em;">
          <thead>
            <tr>
              <th>Policy Name</th>  
              <th>Type</th>
              <th>Premium</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="Policy in insurancePolicies">
                <td><a href="#" @click="onRowClick(Policy.id);">{{Policy.name}}</a></td>
                <td><a href="#" @click="onRowClick(Policy.id);">{{Policy.type}}</a></td>
                <td><a href="#" @click="onRowClick(Policy.id);">&#36;{{Policy.premium}}</a></td>
                <td><a href="#" @click="onRowClick(Policy.id);">Edit</a>&nbsp;|&nbsp;<a href="#" @click="onDelete(Policy.id);">Delete</a></td>
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
            <button class="ui huge blue button"  @click="addNewPolicy();">
              {{addButtonText}}
            </button>
          </div>
          <div class="two wide column">
            <button class="ui huge blue button" @click="doneWithPolicies();">
              Done with policies
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