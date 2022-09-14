import { geraPaletaAnaloga, mudaCorParaHSL, mudaCoresParaRGBPaleta, trocaCor } from './gerador.js'

(function(){
    const colorInput = document.getElementById('color')
    let colorCode = '#e78de1'
    geraCores(colorCode)

    colorInput.addEventListener('input', () => {
        let color = document.getElementById('color').value;
        geraCores(color)
    })  
})()

function mudaBackground(colorCode){
    document.querySelector('.wrapper').style.backgroundColor = colorCode
    document.querySelector('label').style.backgroundColor = colorCode
    document.querySelector('.opcoes').style.backgroundColor = colorCode
    document.querySelector('select').style.backgroundColor = colorCode
}

function geraCores(color){
    mudaBackground(color)
    color = mudaCorParaHSL(color)
    color = geraPaletaAnaloga(color[0], color[1], color[2])
    color = mudaCoresParaRGBPaleta(color)
    trocaCor(color)
}