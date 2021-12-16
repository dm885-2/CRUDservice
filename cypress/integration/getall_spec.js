describe('READ ALL Test', () => {
    
    //Creates a user before spec file is run.
    before(()=> {
        const uname = "u"+Date.now();
        const pass = "p"+Date.now();
        cy.register(uname, pass);
        cy.login(uname, pass);
        cy.getAT();
        for(var i = 0; i < 5; i++)
            cy.addFile("test.mzn");
    })

   it("READ ALL TEST", () => {
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token")
            }
        }).then((response) => {
            expect(response).to.have.property("status", 200);
            expect(response.body).to.have.property("error", false);
            expect(response.body.results.length).to.eq(5);
        });
    });

    //Delete all files after each test
    after(()=>{
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
