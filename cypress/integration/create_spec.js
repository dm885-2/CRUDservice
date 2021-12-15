
describe('CREATE Test', () => {
    
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

        cy.request({
            method: "POST",
            url: "/auth/accessToken",
            retryOnStatusCodeFailure: true,
            body: {     
                refreshToken : rt
            }
        }).then(res3 => {
            at = res3.body.accessToken;
        })
        //add a files before the test
        cy.request({
            method: "POST",
            url: "/files",
            retryOnStatusCodeFailure: true,
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
    
   it("CREATE TEST", () => {
        let rowsBefore;  

        var file = {
            "filename": "testFile.mzn",
            "filetype": "mzn",
            "data": "This is the file content!"
        }

        var header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${at}`
        }

        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: header
        }).then((response) => {
            rowsBefore = response.body.results.length;
        });

        cy.request({
            method: "POST",
            url: "/files",
            headers: header,
            body: file
        }).then((response) => {
            console.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body.error).to.eq(false);
            expect(response.body.filename).to.eq('testFile.mzn');
            expect(response.body.filetype).to.eq('mzn');
        });

        cy.request({
            method: "GET",
            url: "/files/all/mzn",
            headers: header
        }).then((response) => {
            expect(response.body.results.length).to.eq(rowsBefore + 1);
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
