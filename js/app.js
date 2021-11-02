

window.onload = function() {

    $('.ui.checkbox').checkbox();

    const routes = [
        { path: '/', redirect: '/connect' },
        { path: '/connect', name: 'connect', component: connectComponent },
        { path: '/contact', name: 'contact', component: contactComponent, props : true },
        { path: '/contacts', name: 'contacts', component: contactsComponent },
        { path: '/family-contact', name: 'familyContact', component: familyContactComponent, props : true },
        { path: '/family-contacts', name: 'familyContacts', component: familyContactsComponent },
        { path: '/documents', name: 'documents', component: documentsComponent },
        { path: '/document', name: 'document', component: documentComponent, props : true },
        { path: '/bank-account', name: 'bankAccount', component: bankAccountComponent, props : true },
        { path: '/bank-accounts', name: 'bankAccounts', component: bankAccountsComponent },
        { path: '/investment', name: 'investment', component: investmentAccountComponent, props : true },
        { path: '/investments', name: 'investments', component: investmentAccountsComponent },
        //{ path: '/insurance-policy', name: 'insurancePolicy', component: insurancePolicyComponent, props : true },
        //{ path: '/insurance-policies', name: 'insurancePolicies', component: insurancePoliciesComponent },
        //{ path: '/service-provider', name: 'serviceProvider', component: serviceProviderComponent, props : true },
        //{ path: '/service-providers', name: 'serviceProvider', component: serviceProvidersComponent },
        { path: '/intro1', name: 'intro1', component: intro1Component },
        { path: '/intro2', name: 'intro2', component: intro2Component }
    ];

    gRouter = new VueRouter({
        routes: routes
    });

    const vm = new Vue({
        router: gRouter
    }).$mount('#vue-wrapper');



}