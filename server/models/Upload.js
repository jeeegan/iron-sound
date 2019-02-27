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
    required: true 
  },
  genre: { 
    type: String, 
    required: true 
  },
  tags: [String],
  embed_url: { 
    type: String, 
    required: true, 
    match: /^https?\:\/\// // Must start by "http://" or "https://" }
  },
  host: {
    type: String,
    required: true,
    enum: ['bc', 'sc', 'yt'],
  },
  _created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upload_img: String,
  upload_type: {
    type: String,
    required: true,
    enum: ['track', 'album']
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;