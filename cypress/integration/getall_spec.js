
describe('READ Test', () => {
    //add a files before each test
    beforeEach(()=> {
        Cypress.Cookies.defaults({
            preserve: "sessionId"
          })
        for(let i =0; i < 5; i++) {
            cy.request("POST", "/files", {
                "filename": `testFile ${i}.mzn`,
                "filetype": "mzn",
                "data": "This is the file content!"
            }).then((res) => {
                return;
            });
        }
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

   it("READ TEST", () => {
        cy.request('GET', "/files/all/mzn").then((response) => {
            expect(response).to.have.property("status", 200);
            expect(response.body).to.have.property("error", false);
            expect(response.body.results.length).to.eq(5);

        });
    });
});
