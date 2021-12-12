
describe('UPDATE Tests', () => {

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: 'sessionId',
          })
    });

   it("UPDATE", async () =>  {
       let get = cy.request("GET", "/files", {
           "filetype": "mzn"
       });
       await(get).then((files) => {
           let id = files.body.results[0].fileId;
           cy.request("PUT", "/files/"+id, {data: "new data!"}).then(res => {
               expect(res).to.have.property("status", 200);
               expect(res.body).to.have.property("error", false);
           })
        });
   });
});
