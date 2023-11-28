const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
    users: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    
    //ToDoList or Shopping list
    toDoList: [{
        task: String,
        completed: Boolean
    }],

    calendar: {
        //Define structure for calendar
    },

    choreChart: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chore: String,

    }],



});

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;