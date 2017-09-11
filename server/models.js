const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true}
})

userSchema.methods.apiRepr = function() {
    return {
        googleId: this.googleId
    }
}

const User = mongoose.model('User', userSchema);

module.exports = {User};