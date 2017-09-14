const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true},
    score: {type: Number, default: 0},
    words: {type: Array, required: false}
})


userSchema.methods.apiRepr = function() {
    return {
        googleId: this.googleId,
        score: this.score,
        words: this.words
    }
}

const User = mongoose.model('User', userSchema);

module.exports = {User};