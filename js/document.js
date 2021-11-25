
const dialog = require('electron').remote.dialog;
const {shell} = require('electron');

var documentComponent = Vue.component( 'document-template', {
    computed : {
      name : {
        cache: false,
        get() { return gSelectedDocument.name; },
        set(value) { 
            gSelectedDocument.name = value;
            inputHasChanged = true; 
          }
      },
      type : {
        cache: false,
        get() { return gSelectedDocument.type },
        set(value) { 
            gSelectedDocument.type = value; 
            inputHasChanged = true; 
        }
      },
      date : {
        cache: false,
        get() { return gSelectedDocument.date },
        set(value) { 
            gSelectedDocument.date = value;
            inputHasChanged = true;  
        }
      },
      author : {
        cache: false,
        get() { return gSelectedDocument.author },
        set(value) { 
            gSelectedDocument.author = value;
            inputHasChanged = true;
        }
      },
      status : {
        cache: false,
        get() { return gSelectedDocument.status },
        set(value) { 
            gSelectedDocument.status = value;
            inputHasChanged = true;
        }
      },
      attachedFilename : {
        cache: false,
        get() { return gSelectedDocument.attachedFilename },
        set(value) {
            gSelectedDocument.attachedFilename = value;
            inputHasChanged = true; 
        }
      },
      notes : {
        cache: false,
        get() { return gSelectedDocument.notes },
        set(value) { 
            gSelectedDocument.notes = value; 
            inputHasChanged = true; 
        }
      }
    },
    props : ['documentIndex'],
    data : function() {
        return  {
          inputHasChanged : false,
          localDocumentIndex : 0,
          filenameIsHidden : true,
          uploadButtonIsHidden : false,
          uploadButtonLoading : false,
        }
    },
    mounted : function() {
      if(this.attachedFilename !== "") {
          this.filenameIsHidden = false;
          this.uploadButtonIsHidden = true;
          this.uploadButtonLoading = false;
      }
      this.localDocumentIndex = this.documentIndex;
      EventBus.$on('save-document', this.saveDocument);
      EventBus.$on('discard-document-changes', this.discardDocumentChanges);
      EventBus.$on('delete-document', this.hardDelete);
      EventBus.$on('upload-filename-selected', this.setUploadFilename);
      EventBus.$on('upload-file-complete', this.uploadFileComplete);
      EventBus.$on('upload-file-error', this.uploadFileError);
    },
    beforeDestroy : function() {  
      EventBus.$off('save-document', this.saveDocument);
      EventBus.$off('discard-document-changes', this.discardDocumentChanges);
      EventBus.$off('delete-document', this.hardDelete);
      EventBus.$off('upload-filename-selected', this.setUploadFilename);
      EventBus.$off('upload-file-complete', this.uploadFileComplete);
      EventBus.$off('upload-file-error', this.uploadFileError);
    },
    methods : {
      saveDocument : function() {
        if( gSelectedDocument.name.length == 0 ) {
          $('#missing-modal').modal('show');
        } else {
          if(this.localDocumentIndex != -1) {
            gVaultBlob.Documents[this.localDocumentIndex] = gSelectedDocument;
          } else {
            gSelectedDocument.id = this.localDocumentIndex = gVaultBlob.Documents.length;
            gVaultBlob.Documents[gVaultBlob.Documents.length] = gSelectedDocument;
          }
          EventBus.$emit('save-to-device');
          gRouter.push('documents');
        }
      },
      discardDocumentChanges : function() {
        gRouter.push('documents');
      },
      inputChanged : function() {
        this.inputHasChanged = true;
      },
      Back : function() {
        if( this.inputHasChanged ) {
          $('#save-modal').modal('show');
        } else {
          gRouter.push('documents');
        }
      },
      Delete : function() {
        $('#delete-modal').modal('show');
      },
      hardDelete : function() {
        if(this.documentIndex == -1) {
          gRouter.push('documents');
        } else {
          this.removeFile();
          gVaultBlob.Documents.splice(this.localDocumentIndex,1);
          gRouter.push('documents');
        }
      },
      selectFileToUpload : function() {
        dialog.showOpenDialog({
            title: "Add file to your vault",
            buttonLabel: 'Upload',
            properties: ['openFile']
            }).then(file => { 
                if (!file.canceled) { 
                var sourcePath = file.filePaths[0].toString();
                var filename = sourcePath.replace(/^.*[\\\/]/, '');
                var destPath = gMountedDrive + '\\' + gDeviceFilesDirectory + '\\' + filename;
                EventBus.$emit('upload-filename-selected', filename);
                fs.copyFile(sourcePath, destPath, (err) => {
                    if(err) {
                        console.log(err);
                        EventBus.$emit('upload-file-error');
                    } else {
                        EventBus.$emit('upload-file-complete');
                    }
                });
            }
        }).catch(err => { 
            console.log(err) 
        }); 
      },
      removeFile : function() {
          var path = gMountedDrive + '\\' + gDeviceFilesDirectory + '\\' + this.attachedFilename;
          fs.unlink(path, (err => {
            if(err) {
                console.log(err);
            }
          }));
          this.uploadButtonLoading = false;
          this.uploadButtonIsHidden = false;
          this.filenameIsHidden = true;
          this.attachedFilename = "";
          this.inputHasChanged = true;
      },
      setUploadFilename : function(filename) {
        this.uploadButtonLoading = true;
        this.attachedFilename = filename;
      },
      uploadFileComplete : function() {
        this.uploadButtonLoading = false;
        this.uploadButtonIsHidden = true;
        this.filenameIsHidden = false;
        this.inputHasChanged = true;
      },
      uploadFileError : function() {
        this.uploadButtonLoading = false;
        this.uploadButtonIsHidden = false;
        this.filenameIsHidden = true;
      },
      handleFileLinkClick : function() {
        var path = gMountedDrive + '\\' + gDeviceFilesDirectory + '\\' + this.attachedFilename;
        shell.openItem(path);
      }

    },
    template: `        
        <div class="row centered" style="margin: 4em 0;" >

          <div class="column ten wide">
                
            <h2>Document Information</h2>
            
            <h4>Enter as much information as you can about this document.</h4>

            <div class="ui big form" style="margin-top: 2em;">

            <div class="eight wide field required">
              <label>Document Name</label>
              <input v-model="name" type="text" placeholder="Mom's Will, 2021 Power of Attorney, etc." autocomplete="off" id="documentname" @input="inputChanged();">
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Date</label>
                  <input v-model="date" type="text" name="date" placeholder="Date" @input="inputChanged();">
                </div>
                <div class="field">
                  <label>Type</label>
                  <input v-model="type" type="text" name="type" placeholder="Will, Power of Attorney, Account Statement, etc." @input="inputChanged();">
                </div>
              </div>
            </div>
      
            <div class="inline fields">
              <label>Document Status:</label>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="status" value="Active" v-model="status" @input="inputChanged();">
                  <label>Active</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="status" value="Archived" v-model="status" @input="inputChanged();">
                  <label>Archived</label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label>Author</label>
                  <input v-model="author" type="text" name="author" placeholder="Author" @input="inputChanged();">
                </div>
              </div>
            </div>
                              
            <div class="field">
              <label>Notes</label>
              <textarea rows="2" placeholder="Description, ownership, notes, etc." v-model="notes" @input="inputChanged();"></textarea>
            </div>

            <div class="field">
                <button class="ui icon button big" v-bind:class="{ hidden: uploadButtonIsHidden, loading: uploadButtonLoading }" @click="selectFileToUpload();">
                    Add to vault
                    <i class="paperclip icon"></i>
                </button>
                <div class="field" v-bind:class="{ hidden: filenameIsHidden }">
                    <a href="#" @click="handleFileLinkClick();" style="font-size: 1.2em;">{{attachedFilename}}</a>
                    <button class="ui icon button" @click="removeFile();" style="margin-left: 1em">
                        Remove from Vault
                    </button>
                </div>
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
            <div class="three wide column">
                <button class="ui huge blue button" @click="saveDocument();">
                Save this document
                </button>
            </div>
            <div class="two wide column">
                <button class="ui huge blue button" @click="Delete();">
                Delete this document
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

