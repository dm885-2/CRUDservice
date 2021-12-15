
describe('READ Test', () => {
    beforeEach(()=> {
        Cypress.Cookies.defaults({
            preserve: "sessionId"
          })
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

        cy.request('POST', "/files", file).then((response) => {
            console.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body.error).to.eq(false);
            expect(response.body.filename).to.eq('testFile.mzn');
            expect(response.body.filetype).to.eq('mzn');
        });

        cy.request('GET', "/files/all/mzn").then((response) => {
            expect(response.body.results.length).to.eq(rowsBefore + 1);
        });
        
    });
});
