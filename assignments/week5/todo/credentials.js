const dbUrl = 'mongodb+srv://exampleUser:icqxYJqXDVOURhKq@cluster0.9wbes.mongodb.net/todo?retryWrites=true&w=majority';

const dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

module.exports = {
    dbUrl: dbUrl,
    dbOptions: dbOptions
}

