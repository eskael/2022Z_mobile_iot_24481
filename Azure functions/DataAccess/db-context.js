const { Pool, Client } = require("pg");

class PeopleDbContext {
    constructor(connectionString, log) {
        this.log = log;
        this.config = connectionString;
        this.getPeople = this.getPeople.bind(this);
        this.getPerson = this.getPerson.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
    }

    async getPeople() {
        try{
            const client = new Client(this.config);
            client.connect()
            const result = await client.query("select * from People");
            await client.end();
            return result.rows;
        }catch(err){
            this.log(err);
        }
    }

    async getPerson(person_id) {
        try{
            const client = new Client(this.config);
            client.connect()
            const result = await client.query(`select * from People where personid = ${person_id}`);
            await client.end();
            return result.rows;
        }catch(err){
            this.log(err);
        }
    }

    async deletePerson(person_id) {
        try{
            const client = new Client(this.config);
            client.connect()
            const result = await client.query(`Delete from People where personid = ${person_id}`);
            await client.end();
            return result.rows;
        }catch(err){
            this.log(err);
        }
    }

    async addPerson(first_name, last_name, phone_number) {
        try{
            const client = new Client(this.config);
            client.connect()
            const result = await client.query(`Insert into People(FirstName, LastName, PhoneNumber) values ('${first_name}', '${last_name}', '${phone_number}');`);
            await client.end();
            return result.rows;
        }catch(err){
            this.log(err);
        }
    }
}


module.exports = PeopleDbContext;