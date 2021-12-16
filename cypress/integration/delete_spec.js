describe('DELETE Test', () => {

    //Creates a user before spec file is run.
    before(()=> {
        const uname = "u"+Date.now();
        const pass = "p"+Date.now();
        cy.register(uname, pass);
        cy.login(uname, pass);
        cy.getAT();
        cy.addFile("test.mzn");
    })

   it("DELETE TEST", () => {
        let rowsBefore;  

        var header = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cypress.env("token")
        }

        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: header
        }).then((response) => {
            rowsBefore = response.body.results.length;
        });

        console.log(rowsBefore);

        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: header
        }).then(file => {
            cy.request({
                method: "DELETE",
                url: "/files/"+file.body.results[0].fileId,
                headers: header
            }).then((res) => {
                expect(res).to.have.property("status", 200);
                expect(res.body).to.have.property("error", false);
            });
        });
        
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: header
        }).then((response) => {
            expect(response.body.results.length).to.eq(rowsBefore - 1);
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
