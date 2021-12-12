
describe('UPDATE Test', () => {
    //add a files before each test
    beforeEach(()=> {
        Cypress.Cookies.defaults({
            preserve: "sessionId"
          })

        cy.request("POST", "/files", {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        }).then((res) => {
            return;
        });
    })
    
    //Delete all files after each test
   afterEach(()=>{
        cy.request('GET', "/files/all/mzn").then(res => {
            res.body.results.forEach(file => {
                cy.request('DELETE', "/files/"+file.fileId);
            })
            return;
        });
   })

   // Test update end-point
   it("UPDATE TEST", () => {
        cy.request('GET', "/files/all/mzn").then(file => {
            cy.request("PUT", "/files/"+file.body.results[0].fileId, {
                "data": "new data"
            }).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
                return;
            });
        });
    });
});