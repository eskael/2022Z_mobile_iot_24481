const PeopleDbContext = require('../DataAccess/db-context');
const common = require('./../common');

module.exports = async function (context, req) {
    await common.functionWrapper(context, req, async (body) => {
        try {
            const connectionString = process.env['POSTGRESQLCONNSTR_PeopleDb'];
            const peopleDb = await new PeopleDbContext(connectionString, context.log);
            await peopleDb.addPerson(req.query.first_name, req.query.last_name, req.query.phone_number);
        } catch(err){
            context.log(err);
        }
    });
}