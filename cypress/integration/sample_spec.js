const ip = "http://127.0.0.1:3000"; // Should be url to UI

describe('CRUD Tests', () => {
    it("CREATE file test", () => {
        cy.request('POST', ip + "/files/create", {
            filename: "testfile.mzn",
            filetype: "mzn",
            data: "This is the file content!"
        }).then((response) => {
            cy.wrap(response).its('status').should('eq', 200);
        })
    })

    it("UPDATE file test", () => {
        cy.request({
            method: "PUT",
            url: ip + "/files/update",
            json: true,
            body: {
                filename: "testfile.mzn",
                data: "THIS IS THE NEW DATA",
                filetype: "mzn"
            }
        }).then((response) => {
            cy.wrap(response).its('status').should('eq', 200);
        })
    })

    it("CREATE some more files", () => {
        for(var i = 0; i < 5; i++) {
            cy.request('POST', ip + "/files/create", {
                filename: "testfile" + i + ".mzn",
                data: "new content of the file" + i + "!",
                filetype: "mzn"
            }).then((response) => {
                cy.wrap(response).its('error').should('eq', false);
            })
        }
    })

    it("DELETE file test", () => {
        cy.request({
            method: "DELETE",
            url: ip + "/files/delete",
            json: true,
            body: {
                filename: "testfile.mzn",
                filetype: "mzn"
            }
        }).then((response) => {
            cy.wrap(response).its('status').should('eq', 200);
        })
    })

    // it("GET ALL file test", () => {
    //     cy.request('GET', ip + "/files/getall", {
    //         filetype: "mzn"
    //     }).then((response) => {
    //         cy.wrap(response).its('error').should('eq', false);
    //     })
    // })
})
