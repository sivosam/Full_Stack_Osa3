const mongoose = require('mongoose')

const url = 'mongodb://XXXXXX@ds159073.mlab.com:59073/osa3'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})


if (process.argv.length === 2) {
    console.log('puhelinluettelo:')
    Person
        .find({})
        .then(res => {
            res.forEach(p => {
                console.log(p.name, p.number)
            })
            mongoose.connection.close()
        })
} else {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    person.save().then(res => {
        console.log(`Lisätään henkilö ${process.argv[2]} : numero ${process.argv[3]} luetteloon`)
        mongoose.connection.close()
    })
}



// const person = new Person({
//     name: 'Pekka',
//     number: '040-1234567'
// })

// person.save().then(res => {
//     console.log('saved')
//     mongoose.connection.close()
// })