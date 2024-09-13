const chai = await import('chai');
const use = chai.use;
const expect = chai.expect;
// chai (the testing framework) has to be imported weirdly because it's a stupid module that sucks. here's how you use it:

describe("Sample test", ()=>{
    it('should assert 2==2 correctly', ()=>{
        let pi = 2;
        let rounded = 2;
        expect(pi).to.equal(rounded);
        //note: for floats, there is a "to.be.closeTo" because of float imprecision
    })
})