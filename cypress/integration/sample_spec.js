
describe('CRUD Test', () => {
    //Delete all files before each test
    beforeEach(()=> {
        Cypress.Cookies.defaults({
            preserve: 'session_id',
        })

        cy.request("POST", "/files", {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        }).then((res) => {
            return;
        });
   })

   afterEach(()=>{
        cy.request('GET', "/files", {
            "filetype": "mzn"
        }).then(res => {
            res.body.results.forEach(file => {
                cy.request('DELETE', "/files/"+file.fileId);
            })
            return;
        });
   })

   it("GET TEST", () => {
        cy.request('GET', "/files", {
            "filetype": "mzn"
        }).then(file => {
            cy.request("GET", "/files/"+file.body.results[0].fileId).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
                expect(res.body).to.have.property("data", "This is the file content!");
                return;
            });
        });
   });

   it("UPDATE TEST", () => {
        cy.request('GET', "/files", {
            "filetype": "mzn"
        }).then(file => {
            cy.request("PUT", "/files/"+file.body.results[0].fileId, {
                "data": "new content"
            }).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
                return;
            });
        });
    });
});

// it("GET ALL", async () =>  {
//     let create = cy.request("POST", "/files", {
//         "filename": "testFile.mzn",
//         "filetype": "mzn",
//         "data": "This is the file content!"
//     });
//     await(create).then(() => {
//         cy.request("GET", "/files", {filetype: "mzn"}).then(res => {
//             expect(res).to.have.property("status", 200);
//             expect(res.body).to.have.property("error", false);
//         })
//     })
// });

//  it("UPDATE", async () =>  {
//      let get = cy.request("GET", "/files", {
//          "filetype": "mzn"
//      });
//      await(get).then((files) => {
//          let id = files.body.results[0].fileId;
//          cy.request("PUT", "/files/"+id, {data: "new data!"}).then(res => {
//              expect(res).to.have.property("status", 200);
//              expect(res.body).to.have.property("error", false);
//          })
//      });
//  });


   // beforeEach(()=> {
   //     cy.request('POST', "/files/create", {
   //         "filename": "testFile.mzn",
   //         "filetype": "mzn",
   //         "data": "This is the file content!"
   //     })
   //     Cypress.Cookies.defaults({
   //         preserve: 'sessionId'
   //     })
   // });

   // it("Test2", () => {
   //     cy.request('GET', "/files/read", {
   //         "filename": "testfile.mzn",
   //         "filetype": "mzn"
   //     }).then(res => {
   //         expect(res).to.have.property("status", 200);
   //         expect(res.body).to.have.property("error", false);
   //         expect(res.body).to.have.property("data", "This is the file content!");
   //     })
   // })


   // it("CRUD single file test", () => {
   //     // Create file request
   //     cy.request('POST', "/files/create", {
   //         "filename": "testfile.mzn",
   //         "filetype": "mzn",
   //         "data": "This is the file content!"
   //     }).then(createRes => {
   //         expect(createRes).to.have.property("status", 200);
   //         expect(createRes.body).to.have.property("message", "File created successfully.");
   //         expect(createRes.body).to.have.property("error", false);

   //         //Read file request
   //         cy.request('GET', "/files/read", {
   //             "filename": "testfile.mzn",
   //             "filetype": "mzn"
   //         }).then(readRes => {
   //             expect(readRes).to.have.property("status", 200);
   //             expect(readRes.body).to.have.property("error", false);
   //             expect(readRes.body).to.have.property("data", "This is the file content!");

   //             // Update file
   //             cy.request('PUT', "/files/update", {
   //                 "filename": "testfile.mzn",
   //                 "filetype": "mzn",
   //                 "data": "This is new content!"
   //             }).then(updateRes => {
   //                 expect(updateRes).to.have.property("status", 200);
   //                 expect(updateRes.body).to.have.property("error", false);
               
   //                 // Read updated file
   //                 cy.request('GET', "/files/read", {
   //                     "filename": "testfile.mzn",
   //                     "filetype": "mzn"
   //                 }).then(readRes2 => {
   //                     expect(readRes2).to.have.property("status", 200);
   //                     expect(readRes2.body).to.have.property("error", false);
   //                     expect(readRes2.body).to.have.property("data", "This is new content!");

   //                     // Delete 
   //                     cy.request('DELETE', "/files/delete", {
   //                         "filename": "testfile.mzn",
   //                         "filetype": "mzn"
   //                     }).then(deleteRes => {
   //                         expect(deleteRes).to.have.property("status", 200);
   //                         expect(deleteRes.body).to.have.property("error", false);
   //                         expect(deleteRes.body).to.have.property("message", "File deleted succesfully");
   //                     });
   //                 });
   //             });
   //         });
   //     });
   // });
// });
