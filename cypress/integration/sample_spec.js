
describe('CRUD Tests', () => {  
    //Delete all files before each test
    // beforeEach(()=> {
    //     cy.request('GET', "/files/getall", {
    //         "filetype": "mzn"
    //     }).then(res => {
    //         res.body.files.forEach(file => {
    //             cy.request('DELETE', "/files/delete", {
    //                 "filename": file.filename,
    //                 "filetype": "mzn"
    //             });
    //         })
    //     });
    //     cy.request('GET', "/files/getall", {
    //         "filetype": "dzn"
    //     }).then(res => {
    //         res.body.files.forEach(file => {
    //             cy.request('DELETE', "/files/delete", {
    //                 "filename": file.filename,
    //                 "filetype": "mzn"
    //             });
    //         })
    //     });
    // })

    beforeEach(()=> {
        cy.request('POST', "/files/create", {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        })
    });

    afterEach(()=> {
        cy.request('DELETE', "/files/delete", {
            "filename": "testFile.mzn",
            "filetype": "mzn"
        })
    });

    it("CRUD UPDATE file test", () => {
        cy.request('GET', "/files/read", {
            "filename": "testFile.mzn",
            "filetype": "mzn"
        }).as("read");

        cy.get("@read").should(res=>{
            expect(res).to.have.property("status", 200);
            expect(res.body).to.have.property("error", false);
        })
    });

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
});
