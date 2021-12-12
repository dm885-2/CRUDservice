
describe('CRUD Tests', () => {  
    beforeEach(()=> {
        cy.request('POST', "/files/create", {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        })
        Cypress.Cookies.defaults({
            preserve: 'sessionId'
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
});
