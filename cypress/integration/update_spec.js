describe('UPDATE Test', () => {

    //Creates a user before spec file is run.
    before(()=> {
        cy.loginAsUser();
        cy.getAT();
        cy.addFile("test.mzn");
    })
    
    it("UPDATE TEST", () => {
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cypress.env("token")
            }
        }).then(file => {
            cy.request({
                method: "PUT",
                url: "/files/"+file.body.results[0].fileId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Cypress.env("token")
                },
                body: {
                    "data" : "updated data",
                }
            }).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
                return;
            });
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
