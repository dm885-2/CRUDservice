
describe('DELETE Test', () => {
    beforeEach(()=> {
        Cypress.Cookies.defaults({
            preserve: "sessionId"
          });

          cy.request("POST", "/files", {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        }).then((res) => {
            return;
        });
    });
    
    //Delete all files after each test
   afterEach(()=>{
        cy.request('GET', "/files/all/mzn").then(res => {
            res.body.results.forEach(file => {
                cy.request('DELETE', "/files/"+file.fileId);
            })
            return;
        });
   })

   it("CREATE TEST", () => {
        let rowsBefore;  

        var file = {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        }

        cy.request('GET', "/files/all/mzn").then((response) => {
            rowsBefore = response.body.results.length;
        });

        cy.request('GET', "/files/all/mzn").then(file => {
            cy.request("DELETE", "/files/"+file.body.results[0].fileId, {
                "data": "new data"
            }).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
            });
        });
        
        cy.request('GET', "/files/all/mzn").then((response) => {
            expect(response.body.results.length).to.eq(rowsBefore - 1);
        });

    });
});
