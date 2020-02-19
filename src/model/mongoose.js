const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})

const User = mongoose.model('User',{
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        validate(value){
            if(value <0 ){
                throw new Error('Age must be positive')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter valid email address')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        
        validate(value){
            if(value.indexOf('password') != '-1'){
                throw new Error('String should not contain \"Password\"')
            }
            if(value.length <= 6){
                throw new Error('Password must be greater than 6 digits in length')
            }
        }
    }
})

const me = new User({name:'Test2',age:22,email:'test2@gmail.com',password:'1234567'})

// me.save().then(()=>{
//     console.log(me)
// }).catch((error) => {
//     console.log('Error! '+ error)
// })

const Task = mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const task1 = new Task({
    description:'Test the code',
   
})

task1.save().then(() => {
    console.log(task1)
}).catch((error) => {
    console.log('Error '+ error)
})