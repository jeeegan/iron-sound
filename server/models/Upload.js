const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: String, 
    required: true 
  },
  album: String,
  year: { 
    type: Number, 
  },
  genre: { 
    type: String, 
  },
  upload_url: { 
    type: String, 
    required: true, 
    match: /^https?\:\/\// // Must start by "http://" or "https://" }
  },
  track_img: String,
  _created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;