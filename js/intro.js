
var intro1Component = Vue.component( 'intro1', {
    data : function() {
        return  {
          blah : 0
        }
    },
    methods : {
        Next : function() {
            router.push('intro2');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
            <div class="row centered">
                <div class="column eight wide">
                    <div><img src="images/smartvault.png"></div>
                </div>
            </div>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>Welcome to SmartVault!</p>
                    <p>You and the well-being of your family are pretty much the most valuable thing around.</p>
                    <p>iMemorized is going to organize all of your important information and secure it in a safe place in order to protect <span style="font-size: 1.5em; text-decoration: underline;">you and your family.</span></p>
                    <p>We are 100% committed to helping you do this. It's part of our DNA.</p>
                    <p>&nbsp;</p>
                    <p>Follow the information on the next few screens to get started.</p>
                </h2>
            </div>
        </div>
        <div class="row centered">
            <div class="column four wide"></div>
            <div class="column four wide">
                <a href="#" class="ui huge blue right labeled icon button" @click="Next();">
                    <i class="right arrow icon"></i>
                    Next
                </a>
            </div>
        </div>
        </div>
    `
});

var intro2Component = Vue.component( 'intro2', {
    data : function() {
        return  {
          blah : 0
        }
    },
    methods : {
        Next : function() {
            router.push('intro3');
        },
        Back : function() {
            router.push('intro1');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
            <div class="row centered">
                <div class="column eight wide">
                    <div><img src="images/smartvault.png"></div>
                </div>
            </div>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>We're going to go over a few things you're going to need in order to store your information with iMemorized.</p>
                    <p>First things first. Relax.</p>
                    <p>Grab a coffee.</p>
                    <p>We're going to make this <span style="font-size: 1.5em; text-decoration: underline;">easy.</span></p>
                    <p>Snuggle into your favorite chair. We're here to help.</p>
                </h2>
            </div>
        </div>
        <div class="row centered">
            <div class="column four wide"></div>
            <div class="right aligned column four wide">
                <a href="#" class="ui huge blue labeled icon button" @click="Back();">
                    Previous
                    <i class="left arrow icon"></i>
                </a>
            </div>
            <div class="column four wide">
                <a href="#" class="ui huge blue right labeled icon button" @click="Next();">
                    <i class="right arrow icon"></i>
                    Next
                </a>
            </div>
            <div class="column four wide"></div>
        </div>
        </div>
    `
});

