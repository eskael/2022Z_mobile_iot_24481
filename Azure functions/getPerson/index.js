const PeopleDbContext = require('../DataAccess/db-context');
const common = require('./../common');

module.exports = async function (context, req) {
    await common.functionWrapper(context, req, async (body) => {
        try {
            const connectionString = process.env['POSTGRESQLCONNSTR_PeopleDb'];
            const peopleDb = await new PeopleDbContext(connectionString, context.log);
            body.person = await peopleDb.getPerson(parseInt(req.query.person_id));
        } catch(err){
            context.log(err);
        }
    });
}