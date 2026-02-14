export default class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.password = data.password;
    }

    // getters and setters
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = password;
    }
}
