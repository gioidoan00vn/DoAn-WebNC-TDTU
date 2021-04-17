const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/doan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.catch(e => console.log('Không thể kết nối tới db server: ' + e.message))