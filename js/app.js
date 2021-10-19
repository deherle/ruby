

window.onload = function() {

    $('.ui.checkbox').checkbox();

    vaultBlob = JSON.parse(localStorage.getItem("vault-blob"));

    const routes = [
        { path: '/', redirect: '/connect' },
        { path: '/connect', name: 'connect', component: connectComponent },
        { path: '/contact', name: 'contact', component: contactComponent, props : true },
        { path: '/contacts', name: 'contacts', component: contactsComponent },
        { path: '/bank-account', name: 'bankAccount', component: bankAccountComponent, props : true },
        { path: '/bank-accounts', name: 'bankAccounts', component: bankAccountsComponent },
        { path: '/intro1', name: 'intro1', component: intro1Component },
        { path: '/intro2', name: 'intro2', component: intro2Component }
    ];

    router = new VueRouter({
        routes: routes
    });

    const vm = new Vue({
        router
    }).$mount('#vue-wrapper');

}