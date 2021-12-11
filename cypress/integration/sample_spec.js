const ip = "http://127.0.0.1:3000";

describe('CRUD Tests', () => {

    it("CREATE file test", () => {
        cy.request("POST", ip + '/files/create', {
            filename: "testfile.mzn",
            filetype: "mzn",
            data: "This is the file content!"
        }).as('crudRequest');

        cy.get("@crudRequest").then(response => {
            expect(response.status).to.eq(200);
        })
    })






    // it("CREATE file test", () => {
    //     cy.request('POST', ip + "/files/create", {
    //         filename: "testfile.mzn",
    //         filetype: "mzn",
    //         data: "This is the file content!"
    //     }).then((response) => {
    //         expect(response).to.have.property("status", 200);
    //         expect(response.body).to.have.property("message", "File created successfully.");
    //     })
    // })

    // it("READ file test", () => {
    //     cy.request('POST', ip + "/files/create", {
    //         filename: "testfile.mzn",
    //         filetype: "mzn",
    //         data: "This is the file content!"
    //     });

    //     cy.request("GET", ip + "/files/read", {
    //         filename: "testfile.mzn",
    //         filetype: "mzn"
    //     }).then((response)=> {
    //         expect(response).to.have.property("status", 200);
    //     })
    // })

    // it("UPDATE file test", () => {
    //     cy.request('POST', ip + "/files/create", {
    //         filename: "testfile.mzn",
    //         filetype: "mzn",
    //         data: "This is the file content!"
    //     });

    //     cy.request({
    //         method: "PUT",
    //         url: ip + "/files/update",
    //         json: true,
    //         body: {
    //             filename: "testfile.mzn",
    //             data: "THIS IS THE NEW DATA",
    //             filetype: "mzn"
    //         }
    //     }).then((response) => {
    //         expect(response).to.have.property("status", 200);
    //     })
    // })

    // it("DELETE file test", () => {
    //     cy.request('POST', ip + "/files/create", {
    //         filename: "testfile.mzn",
    //         filetype: "mzn",
    //         data: "This is the file content!"
    //     });

    //     cy.request({
    //         method: "DELETE",
    //         url: ip + "/files/delete",
    //         json: true,
    //         body: {
    //             filename: "testfile.mzn",
    //             filetype: "mzn"
    //         }
    //     }).then((response) => {
    //         expect(response).to.have.property("status", 200);
    //     })
    // })

    // it("GET ALL file test", () => {
    //     for(var i = 0; i < 5; i++) {
    //         cy.request('POST', ip + "/files/create", {
    //             filename: i+"testfile.mzn",
    //             filetype: "mzn",
    //             data: i+"This is the file content!"
    //         });
    //     }

    //     cy.request("GET", ip + "/files/getall", {
    //         filetype: "mzn"
    //     }).then((response)=> {
    //         expect(response).to.have.property("status", 200);
    //     })
    // })
})
