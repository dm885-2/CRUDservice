describe('UPDATE Test', () => {

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
        var rt;
        cy.request("POST", "/auth/register", {
            username: username,
            password: password,
            passwordRepeat: password
        }).then(res => {
            cy.request("POST", "/auth/login", {
                username: username,
                password: password
            }).then(res2 => {
                rt = res2.body.refreshToken;
            }); 
        });        

        cy.request("POST", "/auth/accessToken", {
            refreshToken : rt
        }).then(res3 => {
            at = res3.body.accessToken;
            //add a files before the test
            cy.request({
                method: "POST",
                url: "/files",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${at}`
                },
                body:  {
                    "filename": "testwFile.mzn",
                    "filetype": "mzn",
                    "data": "This is the file content!"
                }
                
            }).then(l => {return})
        })
    })
    
    it("UPDATE TEST", () => {
        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${at}`
            }
        }).then(file => {
            cy.request({
                method: "PUT",
                url: "/files/"+file.body.results[0].fileId,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${at}`
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
