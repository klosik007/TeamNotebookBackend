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



