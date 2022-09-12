import {hexToRGB, RGBToHSL, HSLToRGB, RGBToHex} from './conversor.js'
import {geraPaletaAnaloga, geraPaletaMonocromatica, geraPaletaTriade, geraPaletaComplementar} from './gerador.js'

(function(){
    const colorInput = document.getElementById('color')
    colorInput.addEventListener('input', () => {
        const colorCode = document.getElementById('color').value;
        console.log(colorCode)
        document.querySelector('.wrapper').style.backgroundColor = colorCode
        document.querySelector('label').style.backgroundColor = colorCode
        document.querySelector('.opcoes').style.backgroundColor = colorCode
        document.querySelector('select').style.backgroundColor = colorCode
        let coresNovas = conversor(colorCode)
        trocaCor(coresNovas[0], '.cor1')
        trocaCor(coresNovas[1], '.cor2')
        trocaCor(coresNovas[2], '.cor3')
        trocaCor(coresNovas[3], '.cor4')
        trocaCor(coresNovas[4], '.cor5')

    })
    
})()

function trocaCor(corAtual, classe){
    let corOriginal = document.querySelector(classe)
    corOriginal.style.backgroundColor = corAtual
}

function conversor(corAtual){
    let mudaCor = hexToRGB(corAtual)
    mudaCor = RGBToHSL(mudaCor)
    mudaCor = geraPaletaAnaloga(mudaCor)
    //mudaCor = geraPaletaMonocromatica(mudaCor)
    //mudaCor = geraPaletaTriade(mudaCor)
    //mudaCor = geraPaletaComplementar(mudaCor)
    for(let cor = 0; cor < mudaCor.length; cor++){
        let corAux = HSLToRGB(mudaCor[cor])
        mudaCor[cor] = RGBToHex(corAux)
    }
    console.log(mudaCor)
    return mudaCor
}
