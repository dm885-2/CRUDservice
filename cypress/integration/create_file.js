// describe('CREATE Test', () => {

//     beforeEach(()=> {
//         const uname = "u"+Date.now();
//         const pass = "p"+Date.now();
//         cy.register(uname, pass);
//         cy.login(uname, pass);
//         cy.getAT();
//     });

//     it("CREATE test", () => {
//         cy.request({
//             method: "POST",
//             url: "/files",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + Cypress.env("token")
//             },
//             body: {
//                 filename: "testfile.mzn",
//                 filetype: "mzn",
//                 data : "fuk of ya buggar"
//             }
//         })
//     })
// });