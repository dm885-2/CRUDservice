describe('CREATE Test', () => {
    
    beforeEach(()=> {
        cy.loginAsUser();
        cy.getAT();
    });

    it("CREATE test", () => { 
        cy.request({
            method: "POST",
            url: "/files",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token")
            },
            body: {
                filename: "testFile.mzn",
                filetype: "mzn",
                data : "fuk of ya buggar"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.error).to.eq(false);
            expect(response.body.filename).to.eq('testFile.mzn');
            expect(response.body.filetype).to.eq('mzn');
        })
    })

    afterEach(() => {
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token") 
            }
        }).then(res => {
            res.body.results.forEach(file => {
                cy.request({
                    method: "DELETE",
                    url: "/files/"+file.fileId,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + Cypress.env("token") 
                    }
                })
                return;
            });
        })
    })
});