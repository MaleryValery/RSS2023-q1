const letterConut = text => {
    let arr = []
    let str =''
    for (let i = 0; i < text.length; i++) {
        let count = 0
        for (let j = 0; j < text.length; j++) {
            if (text[i] === text[j]) {
                count++
            }
        }
         arr.push(`${text[i]}: ${count}`)
       
    }
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] !== arr[j]) {
                if(i ===  arr.length -1) {
                     str +=`${arr[i]}`}
                  else  str +=`${arr[i]}, `
            }
    }
    return str
}
}
console.log(letterConut('Book'))