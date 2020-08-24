const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/KAMS', { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose