const axios = require('axios');
const books = require('../../controllers/books')
const sinon = require('sinon');
const middlewares = require('../../middlewares/middlewares');


//testing server route
describe("Server ", () => {
  var server
  let sessionStub
  let getBookCacheAdminStub
  let getBookCacheUserStub
  let unidentifiedUserStub
  beforeEach(()=> {
    sessionStub = sinon.stub(middlewares, 'redirectLogin').callsFake(function(req, res, next) {
      console.log('sessionStub');
      next();
    })

    server = require('../../server')
  })
  afterEach(() => { 
    sessionStub.restore();
    getBookCacheAdminStub.restore()
    getBookCacheUserStub.restore()
    unidentifiedUserStub.restore()
  })

  it("should return true for admin", (done) => {
    try {
      getBookCacheAdminStub =sinon.stub(books, 'getBookCacheAdmin').callsFake(function(req,res) {
        expect(req.session.role=='admin').toEqual(true)
      })
      
      getBookCacheUserStub =sinon.stub(books, 'getBookCacheUser').callsFake(function(req,res,next) {
        expect(req.session.role=='user').toEqual(false)
      
      })
    
      unidentifiedUserStub =sinon.stub(books, 'unidentifiedUser').callsFake(function(req,res,next) {
        expect(!req.session.role||req.session.role!='admin'||req.session.role!='user').toEqual(false)
      })
      var req = {
        session: {
          role: "admin"
        }
      }
      var res = {function(done) {
        done()
      }} 
      books.getBookCacheAdmin(req,res)
      done()
    } catch(err) {
      console.log(err)
    }
})

  it("should return true for user", (done) => {
    try {  
      getBookCacheAdminStub =sinon.stub(books, 'getBookCacheAdmin').callsFake(function(req,res) {
        expect(req.session.role=='admin').toEqual(false)
      })
      
      getBookCacheUserStub =sinon.stub(books, 'getBookCacheUser').callsFake(function(req,res,next) {
        expect(req.session.role=='user').toEqual(true)
      
      })
    
      unidentifiedUserStub =sinon.stub(books, 'unidentifiedUser').callsFake(function(req,res,next) {
        expect(!req.session.role||req.session.role!='admin'||req.session.role!='user').toEqual(false)
      })
      var req = {
        session: {
          role: "user"
        }
      }
      var res = {function(done) {
        done()
      }} 
      books.getBookCacheUser(req,res)
      done()
    } catch(err) {
      console.log(err)
    }
}) 

  it("should return true for unidentified role", (done) => {
    try {
      getBookCacheAdminStub =sinon.stub(books, 'getBookCacheAdmin').callsFake(function(req,res) {
        expect(req.session.role=='admin').toEqual(false)
      })
      
      getBookCacheUserStub =sinon.stub(books, 'getBookCacheUser').callsFake(function(req,res,next) {
        expect(req.session.role=='user').toEqual(false)
      
      })
    
      unidentifiedUserStub =sinon.stub(books, 'unidentifiedUser').callsFake(function(req,res,next) {
        expect(!req.session.role||req.session.role!='admin'||req.session.role!='user').toEqual(true)
      })
      var req = {
        session: {
          role: "abc"
        }
      }
      var res = {function(done) {
        done()
      }} 
       books.unidentifiedUser(req,res)
      done()
    } catch(err) {
      console.log(err)
    }
})
  it("should return true for null", (done) => {
    try {
      getBookCacheAdminStub =sinon.stub(books, 'getBookCacheAdmin').callsFake(function(req,res) {
        expect(req.session.role=='admin').toEqual(false)
      })
      
      getBookCacheUserStub =sinon.stub(books, 'getBookCacheUser').callsFake(function(req,res,next) {
        expect(req.session.role=='user').toEqual(false)
      
      })
    
      unidentifiedUserStub =sinon.stub(books, 'unidentifiedUser').callsFake(function(req,res,next) {
        expect(!req.session.role||req.session.role!='admin'||req.session.role!='user').toEqual(true)
      })
      
      var req = {
        session: {
          role: undefined
        }
      }
      var res = {function(done) {
        done()
      }} 
      books.unidentifiedUser(req,res)
      done()
  } catch(err) {
    console.log(err)
  }
})
})

// describe("Route ", () => {
//   var server
//   beforeAll(()=> {
//     sinon.stub(middlewares, 'redirectLogin').callsFake(function(req, res, next) {
//       console.log('sessionStub');
//       next();
//     })

    // sinon.stub(books, 'getBookCacheAdmin').callsFake(function(req,res,next) {
    //   if(req.session.admin) res.send('admin')
    //   else next()
    // })
    
    // sinon.stub(books, 'getBookCacheUser').callsFake(function(req,res,next) {
    //   if(req.session.user) res.send('user')
    //   else next()
    // })
    

    // sinon.stub(books, 'unidentifiedUser').callsFake(function(req,res,next) {
    //   res.send('unidentified')
    // })
    
//     server = require('../../server')
//   })
//   afterAll(()=> {
//     server.close()
//   })
//   describe('Get /', ()=> {
//     beforeEach((done) => {
//       try {
//         axios.get("http://localhost:3000/home")
//         .then((response)=> {
//           console.log(response)
//           done()
//         })

//       } catch (e) {
//         console.error('axios.get failed to execute');
//         throw e;  // throwing errors should fail the spec.
//       }
//     });
//     it('should be expected', (done)=> {
      
      
//       done()
//     })
//   })
// })
