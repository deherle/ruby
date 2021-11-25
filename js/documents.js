
var documentsComponent = Vue.component( 'documents-template', {
  computed : {
    documents() {
      return gVaultBlob.Documents;
    }
  },
  methods : {
    onRowClick : function(rowId) {
      // copy the object so we can work on the copy and not the original
      gSelectedDocument = JSON.parse(JSON.stringify(gVaultBlob.Documents[rowId]));
      gRouter.push( {name : 'document', params : { documentIndex: rowId }});
    },
    addNewDocument : function() {
      gSelectedDocument = {
        name : "",
        type : "",
        date : "",
        attachedFilename : "",
        status : "Active",
        author : "",
        notes : ""
      };
      gRouter.push( {name : 'document', params : { documentIndex: -1 }});
    },
    doneWithDocuments : function() {

    },
    back : function() {

    },
    onDelete : function() {
      $('#delete-modal').modal('show');
    },
    hardDelete: function(i) {
      gVaultBlob.Documents.splice(i,1);
      this.$forceUpdate();
    }
  },
  template: `        
    <div class="row centered" style="margin: 4em 0;" >
                   
      <div class="column ten wide">

        <h2>Documents Summary</h2>

        <h4>This list summarizes all of your important documents. If you wish to review or edit an item on this list, click on the applicable item.</h4>
        
        <table class="ui single line padded large table" style="margin-top: 4em;">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Date</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="Document in documents">
                <td><a href="#" @click="onRowClick(Document.id);">{{Document.name}}</a></td>
                <td><a href="#" @click="onRowClick(Document.id);">{{Document.date}}</a></td>
                <td><a href="#" @click="onRowClick(Document.id);">{{Document.author}}</a></td>
                <td><a href="#" @click="onRowClick(Document.id);">Edit</a>&nbsp;|&nbsp;<a href="#" @click="onDelete(Document.id);">Delete</a></td>
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
          <div class="three wide column">
            <button class="ui huge blue button"  @click="addNewDocument();">
              Add another document
            </button>
          </div>
          <div class="two wide column">
            <button class="ui huge blue button" @click="doneWithDocuments();">
              Done with documents
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