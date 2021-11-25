
var serviceProviderComponent = Vue.component( 'service-provider-template', {
    computed : {
      id : {
        cache: false,
        get() { return gSelectedServiceProvider.id; },
        set(value) { 
            gSelectedServiceProvider.id = value;
          }
      },
      name : {
        cache: false,
        get() { return gSelectedServiceProvider.name; },
        set(value) { 
            gSelectedServiceProvider.name = value;
            inputHasChanged = true; 
          }
      },
      phone : {
        cache: false,
        get() { return gSelectedServiceProvider.phone },
        set(value) { 
            gSelectedServiceProvider.phone = value; 
          inputHasChanged = true; 
        }
      },
      email : {
        cache: false,
        get() { return gSelectedServiceProvider.email },
        set(value) { 
            gSelectedServiceProvider.email = value;
          inputHasChanged = true;  
        }
      },
      type : {
        cache: false,
        get() { return gSelectedServiceProvider.type },
        set(value) { 
            gSelectedServiceProvider.type = value;
          inputHasChanged = true; 
        }
      },
      date : {
        cache: false,
        get() { return gSelectedServiceProvider.date },
        set(value) { 
            gSelectedServiceProvider.date = value;
          inputHasChanged = true;  
        }
      },
      address : {
        cache: false,
        get() { return gSelectedServiceProvider.address },
        set(value) { 
            gSelectedServiceProvider.address = value;
          inputHasChanged = true;  
        }
      },
      cost : {
        cache: false,
        get() { return gSelectedServiceProvider.cost },
        set(value) { 
            gSelectedServiceProvider.cost = value;
          inputHasChanged = true;  
        }
      },
      notes : {
        cache: false,
        get() { return gSelectedServiceProvider.notes },
        set(value) { 
            gSelectedServiceProvider.notes = value; 
          inputHasChanged = true; 
        }
      }
    },
    props : ['providerIndex'],
    data : function() {
        return  {
          inputHasChanged : false,
          localProviderIndex : 0
        }
    },
    mounted : function() {
      this.localProviderIndex = this.providerIndex;
      EventBus.$on('save-provider', this.saveProvider);
      EventBus.$on('discard-provider-changes', this.discardProviderChanges);
      EventBus.$on('delete-provider', this.hardDelete);
    },
    beforeDestroy : function() { 
      EventBus.$off('save-provider', this.saveProvider);
      EventBus.$off('discard-provider-changes', this.discardProviderChanges);
      EventBus.$off('delete-provider', this.hardDelete);
    },
    methods : {
      saveProvider : function() {
        if( gSelectedServiceProvider.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localProviderIndex != -1) {
            gVaultBlob.ServiceProviders[this.localProviderIndex] = gSelectedServiceProvider;
          } else {
            gSelectedServiceProvider.id = this.localProviderIndex = gVaultBlob.ServiceProviders.length;
            gVaultBlob.ServiceProviders[gVaultBlob.ServiceProviders.length] = gSelectedServiceProvider;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('service-providers');
          
        }
      },
      discardProviderChanges : function() {
        gRouter.push('service-providers');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('service-providers');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.providerIndex == -1) {
          gRouter.push('service-providers');
        } else {
          gVaultBlob.ServiceProviders.splice(this.localProviderIndex,1);
          gRouter.push('service-providers');
        }
      }
    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Service Provider Information</h2>
            
            <h4>Enter as much information as you can about this service provider, which may be an organization or person that provides recurring services for you.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Service Provider Name</label>
              <input v-model="name" type="text" placeholder="Person or organization's name" autocomplete="off" id="name" @input="inputChanged();">
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Phone</label>
                  <input v-model="phone" type="text" name="name" placeholder="(555) 555-1212" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Email</label>
                    <input v-model="email" type="text" name="email" placeholder="person@company.com" @input="inputChanged();">
                  </div>
                </div>
            </div>
    
            <div class="field">
                <label>Address</label>
                <input placeholder="1234 Ramblin Road" v-model="address" @input="inputChanged();"></input>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Type</label>
                  <input v-model="type" type="text" name="type" placeholder="Landscaping, nurse, lawyer, etc." @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Date</label>
                  <input v-model="date" type="text" name="date" placeholder="Start date, recurring service date" @input="inputChanged();">
                </div>
              </div>
            </div>

            <div class="field">
                <label>Cost</label>
                <div class="ui right labeled input">
                    <label for="cost" class="ui label">$</label>
                    <input v-model="cost" type="text" name="cost" placeholder="Weekly or monthly service cost" @input="inputChanged();">
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
                <button class="ui huge blue button" @click="saveProvider();">
                Save this provider
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this provider
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

