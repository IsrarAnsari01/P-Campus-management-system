const originalArray = [
    { id: "06", Name: "Israr" },
]
const testArray = [
    { id: "01", Name: "Israr" },
    { id: "02", Name: "Alex" },
    { id: "04", Name: "Alexa" },
    { id: "04", Name: "John" },
    { id: "05", Name: "MAxwell" }
]
const testFunction = () => {
    if (originalArray.length === 1) {
        testArray.forEach(arr => {
            originalArray.push(arr)
        })
    }
    console.log(originalArray)
}
testFunction()