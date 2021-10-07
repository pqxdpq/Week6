export class User {
    objectid: string;
    username: string;
    email: string;
    password: string;
    role: string;

    constructor(objectid: string, username:string, email:string, password:string, role:string){
        this.objectid = objectid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export class Group {
    objectid: string;
    groupname: string;
    id: number;

    constructor(objectid: string, groupname:string, id:number){
        this.objectid = objectid;
        this.groupname = groupname;
        this.id = id;
    }
}

export class Room {
    objectid: string;
    parentgroup: string;
    roomname: string;
    id: number;

    constructor(objectid: string, parentgroup:string,roomname: string, id:number){
        this.objectid = objectid;
        this.parentgroup = parentgroup;
        this.roomname = roomname;
        this.id = id;
    }
}

export class Message {
    objectid: string;
    roomid: number;
    sender: string;
    message: string;
    date: Date;

    constructor(objectid: string,roomid: number, sender:string,message: string, date:Date){
        this.objectid = objectid;
        this.roomid = roomid;
        this.sender = sender;
        this.message = message;
        this.date = date;
    }
}


