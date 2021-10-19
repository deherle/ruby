
Vue.component('header-bar', {
    data: function () {
      return { count : 0 }
    },
    template: `
        <div class="row centered" style="margin: 2em 0;">
            <div class="right floated left aligned six wide column">
                <button href="index.html" class="ui labeled icon button">
                    Search
                    <i class="search icon"></i>
                </button>
                <button href="index.html" class="ui labeled icon button">
                    Help
                    <i class="help icon"></i>
                </button>
                <button href="index.html" class="ui labeled icon button">
                    Bookmark
                    <i class="bookmark icon"></i>
                </button>
            </div>
        </div>
    `
});

