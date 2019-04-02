require('./../config/config');

const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Notes} = require('./../models/notes');
const {Users} = require('./../models/users');
const {notes, populateNotes, users, populateUsers} = require('./seed/seed');

beforeEach(populateNotes);
beforeEach(populateUsers);

//tests begin here
describe('POST /addNote', ()=>{
    it('should post a note to db and send result back', (done)=>{
        var note = {
            title: "Testing",
            text: "Testing POST request",
            author: "Przemysław Kłos",
            date: new Date(2019, 1, 31)
        };

        request(app)
            .post('/addNote')
            .send(note)
            .expect(200)
            .expect((res)=>{
                expect(res.body.title).toBe(note.title);
                expect(res.body.text).toBe(note.text);
                expect(res.body.author).toBe(note.author);
                //expect(res.body.date).toBe(note.date);
                //expect(res.body).toEqual(note);
            })
            .end((err, res)=>{
                if (err){
                    return done(err);
                }

                Notes.find().then((notes)=>{
                    expect(notes.length).toBe(3);
                    expect(notes[2].title).toBe(note.title);
                    expect(notes[2].text).toBe(note.text);
                    expect(notes[2].author).toBe(note.author);
                    // expect(notes[2].date).toBe(note.date);
                   // expect(res.body).toEqual(note);
                    done();
                }).catch((e)=> done(e));
            });
    });
});

describe('PATCH /editNote/:id', ()=>{
    it('should update note', (done)=>{
        var id = notes[1]._id.toHexString();
        var originalText = notes[1].text;
        var originalTitle = notes[1].title;

        request(app)
            .patch(`/editNote/${id}`)
            .send({text: "Text to replace the text used to be", title: "Changed title"})
            .expect(200)
            .expect((res)=>{
                expect(res.body.note.text).not.toEqual(originalText);
                expect(res.body.note.title).not.toEqual(originalTitle);
            })
            .end(done);
    });

    it('should not update a note', (done)=>{
        var id = notes[0]._id.toHexString() + '1';

        request(app)
            .patch(`/editNote/${id}`)
            .send({text: "Text to replace the text used to be", title: "Changed title"})
            .expect(400)
            .end(done);
    });
});

describe('DELETE /deleteNote/:id', ()=>{
    it('should delete note with given id', (done)=>{
        var id = notes[1]._id.toHexString();

        request(app)
            .delete(`/deleteNote/${id}`)
            .expect(200)
            .expect((res)=>{
                //expect(res.body.note._id).toBe(id);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Notes.findById(id).then((note)=>{
                    expect(note).toBeFalsy();
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not delete note with given wrong id', (done)=>{
        var id = notes[1]._id.toHexString() + '1';

        request(app)
            .delete(`/deleteNote/${id}`)
            .expect(400)
            .end(done)
    });
});

describe('GET /loadNotes', ()=>{
    it('should load all notes', (done)=>{
        request(app)
            .get('/loadNotes')
            .expect(200)
            .expect((res)=>{
                expect(res.body.notes.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /loadNote/:id', ()=>{
    it('should load note with valid id', (done)=>{
        var id = notes[0]._id.toHexString();

        request(app)
            .get(`/loadNote/${id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.note.text).toBe(notes[0].text);
            })
            .end(done);
    });

    it('should not load note with invalid id', (done)=>{
        var id = notes[0]._id.toHexString() + '1';

        request(app)
            .get(`/loadNote/${id}`)
            .expect(404)
            .end(done);
    });
});

//===========================================================
//users
//===========================================================

describe('POST /addUser', ()=>{
    it('should add new user', (done)=>{
        var user = {
            nick: "klosik007",
            password: "hjj",
            email: "pklos1992@gmail.com"
        };

        request(app)
            .post('/addUser')
            .send(user)
            .expect(200)
            .expect((res)=>{
                expect(res.body.nick).toBe(user.nick);
                expect(res.body.password).toBe(user.password);
                expect(res.body.email).toBe(user.email);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Users.find().then((user)=>{
                    expect(user.length).toBe(3);
                    expect(users[2].email).toBe(user.email);
                    expect(users[2].nick).toBe(user.nick);
                    expect(users[2].password).toBe(user.password);
                    done();
               });
            })
            .catch((e)=>done(e));
    });
});

describe('PATCH /editUser/:id' ,()=>{
    it('should edit user properties', (done)=>{
        let id = users[1]._id.toHexString();
        let originalNick = users[1].nick;
        let originalEmail = users[1].email;
        let originalPass = users[1].password;
        let reqToSend = {nick: "klosik008", email: "pklos1992@o2.pl", password: "kkddjsa"};

        request(app)
            .patch(`/editUser/${id}`)
            .send(reqToSend)
            .expect(200)
            .expect((res)=>{
                expect(res.body.user.nick).not.toEqual(originalNick);
                expect(res.body.user.email).not.toEqual(originalEmail);
                expect(res.body.user.password).not.toEqual(originalPass);
            })
            .end(done);
    });

    it('should not update a note', (done)=>{
        let id = users[0]._id.toHexString() + '1';
        let reqToSend = {nick: "klosik008", email: "pklos1992@o2.pl", password: "kkddjsa"};

        request(app)
            .patch(`/editUser/${id}`)
            .send(reqToSend)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /deleteUser/:id', ()=>{
    it('should delete user with given id', (done)=>{
        var id = users[1]._id.toHexString();

        request(app)
            .delete(`/deleteUser/${id}`)
            .expect(200)
            .expect((res)=>{
                //expect(res.body.note._id).toBe(id);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Users.findById(id).then((user)=>{
                    expect(user).toBeFalsy();
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not delete note with given wrong id', (done)=>{
        var id = users[1]._id.toHexString() + '1';

        request(app)
            .delete(`/deleteUser/${id}`)
            .expect(400)
            .end(done)
    });
});

describe('GET /loadUsers', ()=>{
    it('should load all users', (done)=>{
        request(app)
            .get('/loadUsers')
            .expect(200)
            .expect((res)=>{
                expect(res.body.users.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /loadUser/:id', ()=>{
    it('should load user info with valid id', (done)=>{
        var id = users[0]._id.toHexString();

        request(app)
            .get(`/loadUser/${id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.user.text).toBe(users[0].text);
            })
            .end(done);
    });

    it('should not load note with invalid id', (done)=>{
        var id = users[0]._id.toHexString() + '1';

        request(app)
            .get(`/loadUser/${id}`)
            .expect(404)
            .end(done);
    });
});