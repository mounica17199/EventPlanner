const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    require: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // Array of Points of Interests Object
  PointsOfInterest: [
    {
      startTime: {
        type: Date, 
        required: true
      },

      endTime: {
        type: Date, 
        required: true
      },
      location: {
        lat: {
          type: Number, 
        },
        lng: {
          type: Number, 
        }
      },
      name: {
        type: String,
        required: true
      },
      // Optional description of the Point of Interest
      description: {
        type: String
      }
    }
  ],
  // Array of Users Ids 
  attendees: [ {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
  ],
  threads: [{
    type: Schema.Types.ObjectId,
    ref: "Thread"
  }]
}, {
  timestamps: true
});

module.exports = Event = mongoose.model('Event', EventSchema)