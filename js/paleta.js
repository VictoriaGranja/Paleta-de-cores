import { geraPaletaAnaloga, mudaCorParaHSL, mudaCoresParaRGBPaleta, trocaCor } from './gerador.js'

(function(){
    const colorInput = document.getElementById('color')
    let colorCode = colorInput.value;
    geraCores(colorCode)

    colorInput.addEventListener('input', () => {
        colorCode = colorInput.value;
        geraCores(colorCode)
    })  
})()

function mudaBackground(colorCode){
    document.querySelector('.colora').style.backgroundColor = colorCode
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