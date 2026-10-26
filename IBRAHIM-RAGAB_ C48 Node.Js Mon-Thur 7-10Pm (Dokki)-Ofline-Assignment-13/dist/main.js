"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    name;
    email;
    password;
    phone;
    static counter = 1;
    id = User.counter++;
    notebooks = [];
    _age;
    get userId() {
        return this.id;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    constructor(name, email, password, phone, age) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    displayInfo() {
        console.log(this.id, this.name, this.email, this.phone, this.age);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
}
class Admin extends User {
    constructor(name, email, password, phone, age) {
        super(name, email, password, phone, age);
    }
    manageNotes(notebook, noteId) {
        notebook.removeNote(noteId);
    }
}
class Note {
    title;
    content;
    author;
    static counter = 1;
    id = Note.counter++;
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }
    get userId() {
        return this.author.userId;
    }
    get noteId() {
        return this.id;
    }
    preview() {
        return this.content.slice(0, 20);
    }
}
class NoteBook {
    title;
    notes = [];
    constructor(title) {
        this.title = title;
    }
    addNote(title, content, author) {
        const note = new Note(title, content, author);
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.noteId !== noteId);
    }
}
class DataStorage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
const user1 = new User("ib", "ib@gmail", "123", "0122222222", 20);
user1.displayInfo();
const notebook1 = new NoteBook("My Notes");
user1.addNotebook(notebook1);
notebook1.addNote("First Note", "This is my first note", user1);
const admin1 = new Admin("admin", "admin@gmail", "123", "0100000000", 30);
admin1.manageNotes(notebook1, 1);
const storage = new DataStorage();
storage.addItem("hello");
console.log(storage.getAllItems());
