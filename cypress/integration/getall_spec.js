
describe('READ ALL Test', () => {
    
    var password = "ogi";
    
    var currentdate = new Date(); 
    var datetime = "" + currentdate.getDate() + (currentdate.getMonth()+1) + currentdate.getFullYear()
    + currentdate.getHours()  
    + currentdate.getMinutes()
    + currentdate.getSeconds();
    
    var at;

    //Creates a user before spec file is run.
    before(()=> {
        Cypress.Cookies.defaults({
            preserve: "sessionId"
        })
        let username = datetime;
        cy.request("POST", "/auth/register", {
            username: username,
            password: password,
            passwordRepeat: password
        }).then(res => {
            cy.request("POST", "/auth/login", {
                username: username,
                password: password
            }).then(res2 => {
                var rt = res2.body.refreshToken;
                cy.request("POST", "/auth/accessToken", {
                    refreshToken : rt
                }).then(res3 => {
                    at = res3.body.accessToken;
                    //add a files before the test
                    for(var i = 0; i < 5; i++) {
                        cy.request({
                            method: "POST",
                            url: "/files",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${at}`
                            },
                            body:  {
                                "filename": i+"testwFile.mzn",
                                "filetype": "mzn",
                                "data": "This is the file content!"
                            }
                        })
                    }
                    return;
                })
            }); 
        });        
    })

   it("READ ALL TEST", () => {
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${at}`
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
                "Authorization": `Bearer ${at}`
            }
        }).then(res => {
            res.body.results.forEach(file => {
                cy.request({
                    method: "DELETE",
                    url: "/files/"+file.fileId,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${at}`
                    }
                })
                return;
            });
        })
    })
});
