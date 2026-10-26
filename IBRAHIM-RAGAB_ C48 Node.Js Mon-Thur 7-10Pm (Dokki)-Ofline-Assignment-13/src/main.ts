class User {
    private static counter = 1;
    private id: number = User.counter++;
    private notebooks: NoteBook[] = [];
    private _age!: number;

    public get userId(): number {
        return this.id;
    }

    public get age(): number {
        return this._age;
    }

    public set age(value: number) {
        if (value < 18 || value > 60) {
            throw Error("Age must be between 18 and 60");
        }
        this._age = value;
    }

    constructor(
        public name: string,
        public email: string,
        private password: string,
        public phone: string,
        age: number
    ) {
        this.age = age;
    }

    displayInfo() {
        console.log(this.id, this.name, this.email, this.phone, this.age);
    }

    addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}

class Admin extends User {
    constructor(name: string, email: string, password: string, phone: string, age: number) {
        super(name, email, password, phone, age);
    }

    manageNotes(notebook: NoteBook, noteId: number): void {
        notebook.removeNote(noteId);
    }
}
class Note {
    private static counter = 1;
    private id: number = Note.counter++;

    constructor(public title: string, public content: string, public author: User) {}

    public get userId(): number {
        return this.author.userId;
    }

    public get noteId(): number {
        return this.id;
    }

    preview(): string {
        return this.content.slice(0, 20);
    }
}

class NoteBook {
    private notes: Note[] = [];

    constructor(public title: string) {}

    addNote(title: string, content: string, author: User) {
        const note = new Note(title, content, author);
        this.notes.push(note);
    }

    removeNote(noteId: number) {
        this.notes = this.notes.filter(note => note.noteId !== noteId);
    }
}

class DataStorage<T> {
    private items: T[] = [];

    addItem(item: T) {
        this.items.push(item);
    }

    removeItem(item: T) {
        this.items = this.items.filter(i => i !== item);
    }

    getAllItems(): T[] {
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

const storage = new DataStorage<string>();
storage.addItem("hello");
console.log(storage.getAllItems());