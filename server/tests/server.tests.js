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
describe('POST /note', ()=>{
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
