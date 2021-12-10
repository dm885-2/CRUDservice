const ip = "http://127.0.0.1:3000"; // Should be url to UI

describe('CRUD Tests', () => {
    it("CREATE file test", () => {
        cy.request('POST', ip + "/files/create", {
            filename: "testfile.mzn",
            filetype: "mzn",
            data: "This is the file content!"
        }).then((response) => {
            console.log(response);
            cy.wrap(response).its('status').should('eq', "200");
        })
    })

    it("READ file test", () => {
        cy.request('GET', ip + "/files/read", {
            filename: "testfile.mzn",
            filetype: "mzn"
        }).then((response) => {
            cy.wrap(response).its('error').should('eq', false);
        })
    })

    it("UPDATE file test", () => {
        cy.request('PUT', ip + "/files/update", {
            filename: "testfile.mzn",
            data: "new content of the file!",
            filetype: "mzn"
        }).then((response) => {
            cy.wrap(response).its('error').should('eq', false);
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
        cy.request('DELETE', ip + "/files/delete", {
            filename: "testfile.mzn",
            filetype: "mzn"
            
        }).then((response) => {
            cy.wrap(response).its('error').should('eq', false);
        })
    })

    it("GET ALL file test", () => {
        cy.request('GET', ip + "/files/getall", {
            filetype: "mzn"
        }).then((response) => {
            cy.wrap(response).its('error').should('eq', false);
        })
    })
})
