
var vaultSeed = {
    "name" : "Darin Herle",
    "address" : "4037 Copperfield Lane",
    "dateofbirth" : "April 19, 1974",
    "BankAccounts" : [
        {
            "id" : 0,
            "name" : "Primary Savings",
            "number" : 8333489892,
            "balance" : "1022.35",
            "type" : "Savings",
            "ownership" : "Joint",
            "bankname" : "Bank of America",
            "address" : "3224 Shelbourne Street",
            "notes" : "Opened in 2014"
        },
        {
            "id" : 1,
            "name" : "Primary Chequings",
            "number" : 8000045772,
            "balance" : "5335.35",
            "type" : "Checkings",
            "ownership" : "Individual",
            "bankname" : "Wells Fargo",
            "address" : "311 Douglas Ave, Victoria",
            "notes" : "Used primarily for paying bills"
        }
    ],
    "Documents" : [],
    "Contacts" : [],
    "FamilyContacts" : [],
    "Investments" : [],
    "Insurance" : [],
    "ServiceProviders" : []
};

var emptyBlob = {
    "name" : "",
    "address" : "",
    "dateofbirth" : "",
    "BankAccounts" : [],
    "Documents" : [],
    "Contacts" : [],
    "FamilyContacts" : [],
    "InvestmentAccounts" : [],
    "Insurance" : [],
    "ServiceProviders" : []
};

localStorage.setItem("object-index", "0");
localStorage.setItem("vault-blob", JSON.stringify(vaultSeed));