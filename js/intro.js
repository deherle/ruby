
var intro1Component = Vue.component( 'intro1', {
    data : function() {
        return  {
          blah : 0
        }
    },
    methods : {
        Next : function() {
            gRouter.push('intro2');
        },
        Skip : function() {
            gRouter.push('family-contacts');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
        <div>
        <h1 class="ui header" style="margin-top: 1em;">
            <i class="thumbs up outline icon"></i>
            <div class="content" style="text-decoration: underline;">
                Welcome to SmartVault      
            </div>
        </h1>
        </div>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>Smartvault is the easiest and most secure way to organize, store and share your most sensitive information.</p>
                    <p>And... it's easy to store in a small, discrete and safe device. That is PIN protected.</p>
                    <p>Plus, your data is both hardware and software encrypted to ensure that personal information stays safe.</p>
                </h2>
                    <div class="ui positive message column six wide">
                        <div class="header">
                            Protect your PIN
                        </div>
                        <p>Just like your bank card PIN, never give away your SmartVault PIN code!</p>
                    </div>
                <h2>
                    <p>Follow the information on the next few screens to get started. You can skip directly to categories on the left at any time.</p>
                </h2>
            </div>
        </div>
        <div class="row centered">
            <div class="column four wide"></div>
            <a href="#" @click="Skip();" style="font-size: 2em; text-decoration: underline; margin: 0.5em 3em;">Skip</a>
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
            gRouter.push('intro3');
        },
        Back : function() {
            gRouter.push('intro1');
        },
        Skip : function() {
            gRouter.push('family-contacts');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
        <h1 class="ui header" style="margin-top: 1em;">
            <i class="question circle outline icon"></i>
            <div class="content" style="text-decoration: underline;">
                Interview Process           
            </div>
        </h1>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>The SmartVault application you're using right now is organized as an "interview", to capture and store your data.</p>
                    </h2>
                    <div class="ui positive message column six wide">
                        <div class="header">
                            Come back anytime
                        </div>
                        <p>Unlike a real interview, you can pause and come back to your interview at any time.</p>
                    </div>
                    <h2>
                    <p>You've probably used a similar approach when doing your taxes or paying a bill online.</p>
                    <p>The application will walk you through a series of questions in specific categories, and you can enter data as needed.</p>
                    <p>Some sections will apply and others will not - skip the sections that may not be relevant.</p>
                    <p></p>
                </h2>
            </div>
        </div>
        <div class="row centered">
            <div class="column four wide"></div>
            <a href="#" @click="Skip();" style="font-size: 2em; text-decoration: underline; margin: 0.5em 3em;">Skip</a>
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

var intro3Component = Vue.component( 'intro3', {
    data : function() {
        return  {
          blah : 0
        }
    },
    methods : {
        Next : function() {
            gRouter.push('intro4');
        },
        Back : function() {
            gRouter.push('intro2');
        },
        Skip : function() {
            gRouter.push('family-contacts');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
        <h1 class="ui header" style="margin-top: 1em;">
            <i class="archive icon"></i>
            <div class="content" style="text-decoration: underline;">
                Gathering Information            
            </div>
        </h1>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>The categories in the menu on the left probably give you a sense for the type of information we'll help you collect.</p>
                    <p>Wills.</p>
                    <p>Marriage certificates.</p>
                    <p>Bank statements.</p>
                    <p>Business cards. And more.</p>
                    <p>Don't worry about this yet - it's easiest to just jump in and then gather documents and information as you need it.</p>
                </h2>
            </div>
        </div>
        <div class="row centered">
            <div class="column four wide"></div>
            <a href="#" @click="Skip();" style="font-size: 2em; text-decoration: underline; margin: 0.5em 3em;">Skip</a>
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

var intro4Component = Vue.component( 'intro4', {
    data : function() {
        return  {
          blah : 0
        }
    },
    methods : {
        Next : function() {
            gRouter.push('family-contacts');
        },
        Back : function() {
            gRouter.push('intro3');
        },
        Skip : function() {
            gRouter.push('family-contacts');
        }
    },
    watch : {
        
    },
    template: `        
        <div style="margin-top: 2em;" class="ui grid">
        <h1 class="ui header" style="margin-top: 1em;">
            <i class="life ring outline icon"></i>
            <div class="content" style="text-decoration: underline;">
                Getting Help            
            </div>
        </h1>
        <div style="margin: 3em 0;" class="row centered">
            <div class="column">
                <h2>
                    <p>At some point, you may get stuck - that's OK! We're here to help:</p>
                    <ul>
                    <li><p>Click on the help button at the top of the screen - that will take you to our FAQs.</p></li>
                    <li><p>Make your way back through this brief tutorial.</p></li>
                    <li><p>Drop us an email at <a href="mailto:support@mysmartvault.com">support@mysmartvault.com</a> and we'll get back to you.</p></li>
                    </ul>
                    <p>It's time to get started, click Next to start your interview.</p>
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

