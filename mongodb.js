//CURD using mongo DB

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser: true,useUnifiedTopology:true},(error,client) => {
    if(error)
    {
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    db.collection('users').findOne({ name: 'Test1'},(error,user) =>{
        if(error){
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    db.collection('users').findOne({ _id: new ObjectID('5e4b86499a556929b842b44f')},(error,user) =>{
        if(error){
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    db.collection('users').find().toArray((error,users) => {
        if(error){
            return console.log('Unable to fetch')
        }
        console.log(users)
    })
    db.collection('users').find().count((error,count) => {
        if(error){
            return console.log('Unable to fetch')
        }
        console.log(count)
    })

    db.collection('tasks').findOne({ _id: new ObjectID('5e4b92dfbdf71329b873e008')},(error,task) =>{
        if(error){
            return console.log('Unable to fetch')
        }

        console.log(task)
    })

    db.collection('tasks').find({completed:"true"}).toArray((error,tasks) => {
        if(error){
            return console.log('Unable to fetch')
        }
        console.log(tasks)
    })

    db.collection('tasks').updateMany({completed:'false'},
    {
        $set:{completed:'true'}
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description:'Test'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) 
})