const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    members: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    
    //ToDoList or Shopping list
    tasks: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ToDoList',
        }],
        default: [],
      },

    // calendar: {
    //     //Define structure for calendar
    // },

    // choreChart: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     chore: String,

    // }],



});

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;