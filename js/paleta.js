/*import {hexToRGB, RGBToHSL, HSLToRGB, RGBToHex} from './conversor.js'*/
/*import {geraPaletaAnaloga, geraPaletaMonocromatica, geraPaletaTriade, geraPaletaComplementar} from './gerador.js'*/

(function(){
    const colorInput = document.getElementById('color')
    let colorCode = '#e78de1'
    console.log(colorCode)
    document.querySelector('.wrapper').style.backgroundColor = colorCode
    document.querySelector('label').style.backgroundColor = colorCode
    document.querySelector('.opcoes').style.backgroundColor = colorCode
    document.querySelector('select').style.backgroundColor = colorCode
    colorInput.addEventListener('input', () => {
        const colorCode = document.getElementById('color').value;
        console.log(colorCode)
        document.querySelector('.wrapper').style.backgroundColor = colorCode
        document.querySelector('label').style.backgroundColor = colorCode
        document.querySelector('.opcoes').style.backgroundColor = colorCode
        document.querySelector('select').style.backgroundColor = colorCode

    })  
})()

