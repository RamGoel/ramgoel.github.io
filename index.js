// function debounce(fn, timer) {
//     let timeoutId
//     return () => {
//         clearTimeout(timeoutId)
//         timeoutId = setTimeout(fn, timer)
//     }
// }

// const debounced = debounce(() => {
//     console.log('ram')
// }, 1000)

// debounced()
// debounced()
// debounced()

function render(string, args) {
    // regex to match {{placeholders}}
    let regex = /{{\s*([\w.]+)\s*}}/g

    // run until all placeholders are handled
    while (string.match(regex) !== null) {
        // get the first match
        let firstMatch = string.match(regex)[0]

        // check if it's nested
        const isNestedPlaceholder = firstMatch.includes('.')

        let value
        const key = firstMatch.replace('{{', '').replace('}}', '').trim()

        if (isNestedPlaceholder) {
            // handle later
            let keys = key.split('.') // get all keys as array
            let finalValue = args
            let iter = 0
            while (iter < keys.length) {
                finalValue = finalValue[keys[iter]] // loop and keep updating
                iter++
            }

            value = finalValue || ''
        } else if (args[key]) {
            value = args[key]
        } else {
            value = ''
        }

        string = string.replaceAll(firstMatch, value)
    }

    return string
}

console.log(
    render(
        'Hello {{name}}, I am {{agent}} from {{company.name.firstName}}{{company.name.}}.',
        {
            name: 'Ram',
            agent: 'Sumit',
            company: {
                name: {
                    firstName: 'Sarvam',
                    lastName: 'AI',
                },
            },
        }
    )
)
