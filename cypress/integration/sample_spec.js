const ip = "http://127.0.0.1:3000"; // Should be url to UI

describe('CRUD Tests', () => {
    it("CREATE file test", () => {
        cy.request('POST', ip + "/files/create", {
            filename: "testfile.mzn",
            filetype: "mzn",
            data: "This is the file content!"
        }).then((response) => {
            expect(response).to.have.property("status", 200);
        })
    })

    it("READ file test", () => {
        cy.request("GET", ip + "/files/read", {
            filename: "testfile.mzn",
            filetype: "mzn"
        }).then((response)=> {
            expect(response).to.have.property("status", 200);
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
            expect(response).to.have.property("status", 200);
        })
    })
    
    it("CREATE multiple file test", () => {
        for(var i = 0; i < 5; i++) {
            cy.request('POST', ip + "/files/create", {
                filename: i+"testfile.mzn",
                filetype: "mzn",
                data: i+"This is the file content!"
            });
        }
    });

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
            expect(response).to.have.property("status", 200);
        })
    })

    it("GET ALL file test", () => {
        cy.request("GET", ip + "/files/getall", {
            filetype: "mzn"
        }).then((response)=> {
            expect(response).to.have.property("status", 200);
        })
    })
})
