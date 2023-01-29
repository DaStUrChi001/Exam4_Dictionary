const container = document.querySelector("#container")
const form = document.querySelector("form")
const input = document.querySelector("input")


form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            if(data.title === undefined){
                const div = document.createElement("div")
                div.className = "wrapper"
                container.appendChild(div)

                for(let index=0; index<data.length; index++){
            
                    if(index<1){
                        const h2 = document.createElement("h2")
                        h2.innerHTML = data[index].word.toUpperCase() + " - " + data[index].phonetic
                        div.appendChild(h2)
                    }

                    data[index].meanings.forEach( def => {
                        def.definitions.forEach( element => {
                            const p = document.createElement("p")
                            p.innerHTML = element.definition
                            div.appendChild(p)
                
                            if(element.example){
                                const span = document.createElement("span")
                                span.innerHTML = "Example: " + element.example
                                div.appendChild(span)
                            }
                        })
                    })
                }

                for(let index=0; index<data.length; index++){
                    if(index<1){
                        const divEl = document.createElement("div")
                        divEl.className = "audio-wrapper"
                        div.appendChild(divEl)
                
                        const audio = document.createElement("audio")
                        audio.src = `${data[index].phonetics[0].audio}`
                        audio.setAttribute("controls", "")
                        divEl.appendChild(audio)
                
                        const p = document.createElement("p")
                        p.innerHTML = "Play the word"
                        divEl.appendChild(p)
                    }
                }

                form.addEventListener("submit", (e) => {
                    e.preventDefault()
                    div.remove()
                })
            }
            else {
                alert("Bunday so'zni topa olmadik. Iltimos boshqa so'z kiriting!")
            }
        })
        .catch(err => console.error(err))
    
    // function renderData(data) {
    // }
})