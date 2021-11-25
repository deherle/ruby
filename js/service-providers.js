
var serviceProvidersComponent = Vue.component( 'service-providers-template', {
  computed : {
    serviceProviders() {
      return gVaultBlob.ServiceProviders;
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
    EventBus.$on('delete-serviceprovider', this.hardDelete);
    if(gVaultBlob.ServiceProviders.length > 0) {
      this.addButtonText = 'Add another provider';
    } else {
      this.addButtonText = 'Add a service provider';
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      gSelectedServiceProvider = JSON.parse(JSON.stringify(gVaultBlob.ServiceProviders[rowId]));
      gRouter.push( {name : 'serviceProvider', params : { providerIndex: rowId }});
    },
    addNewProvider : function() {
      gSelectedServiceProvider = {
        id : -1,
        name : "",
        phone : "",
        email : "",
        type : "",
        date : "",
        address : "",
        cost : "",
        notes : ""
      };
      gRouter.push( {name : 'serviceProvider', params : { providerIndex: -1 }});
    },
    doneWithProviders : function() {

    },
    back : function() {

    },
    onDelete : function(i) {
      this.indexToDelete = i;
      $('#delete-modal').modal('show');
    },
    hardDelete: function(i) {
      gVaultBlob.ServiceProviders.splice(i,1);
      EventBus.$emit('save-to-device');
      if(gVaultBlob.ServiceProviders.length > 0) {
        this.addButtonText = 'Add another provider';
      } else {
        this.addButtonText = 'Add a service provider';
      }
      this.$forceUpdate();
    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Service Providers Summary</h2>

        <h4>This list summarizes all of the people and companies that are providing services to you. If you wish to review or edit an item on this list, click on the applicable item.</h4>
        
        <table class="ui single line padded large table" style="margin-top: 4em;">
          <thead>
            <tr>
              <th>Provider Name</th>  
              <th>Type</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="Provider in serviceProviders">
                <td><a href="#" @click="onRowClick(Provider.id);">{{Provider.name}}</a></td>
                <td><a href="#" @click="onRowClick(Provider.id);">{{Provider.type}}</a></td>
                <td><a href="#" @click="onRowClick(Provider.id);">&#36;{{Provider.cost}}</a></td>
                <td><a href="#" @click="onRowClick(Provider.id);">Edit</a>&nbsp;|&nbsp;<a href="#" @click="onDelete(Provider.id);">Delete</a></td>
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
            <button class="ui huge blue button"  @click="addNewProvider();">
              {{addButtonText}}
            </button>
          </div>
          <div class="two wide column">
            <button class="ui huge blue button" @click="doneWithProviders();">
              Done with providers
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