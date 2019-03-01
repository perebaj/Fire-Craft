const firePixelArray = [] //Matriz de "Pixels"
const fireLargura = 45
const fireAltura = 45
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start(){
    createStructureFire()
    createFireSource()
    renderFire()
    setInterval(calculeteFirePropagation, 50)
}


function createStructureFire() {
    const Pixels = fireAltura * fireLargura

    for(let i = 0; i < Pixels; i++){
        firePixelArray[i] = 0
    }
}


function renderFire(){
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for(let row = 0; row < fireAltura; row++){
        html += '<tr>'
        for(let column = 0; column < fireLargura; column++){
            const pixelIndex = column + (fireLargura * row)
            
            const fireIntensity = firePixelArray[pixelIndex]
            if (debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            }
            else{
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td  class= "pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
            
        }
        html += '</tr>'
        
    }
    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}


function createFireSource(){
    
    for(let column = 0; column <= fireAltura; column++){
        const overflowPixelIndex = fireAltura * fireLargura
        const pixelIndex = (overflowPixelIndex - fireLargura) + column
        firePixelArray[pixelIndex] = 36
    }
}

function calculeteFirePropagation(){
    for(let columns = 0; columns < fireLargura; columns++){
        for(let row = 0; row < fireAltura; row++){
            const pixelIndex = columns  + (fireLargura * row)
            console.log(pixelIndex)
            updateFireIntensityPixel(pixelIndex)
        }
    }
    renderFire()
}


function updateFireIntensityPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireLargura
    if (belowPixelIndex >= (fireLargura * fireAltura)){
        return
    }
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = (belowPixelFireIntensity - decay) >= 0 ? belowPixelFireIntensity - decay : 0
    firePixelArray[currentPixelIndex] = newFireIntensity
}


start()