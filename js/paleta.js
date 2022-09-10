import {hexToRGB, RGBToHSL, HSLToRGB, RGBToHex} from './conversor.js'

(function(){
    const colorInput = document.getElementById('color')
    colorInput.addEventListener('input', () => {
        const colorCode = document.getElementById('color').value;
        console.log(colorCode)
        document.querySelector('.wrapper').style.backgroundColor = colorCode
        document.querySelector('label').style.backgroundColor = colorCode
        let coresNovas = conversor(colorCode)
        trocaCor(coresNovas[0], '.cor1')
        trocaCor(coresNovas[1], '.cor2')
        trocaCor(coresNovas[2], '.cor3')
        trocaCor(coresNovas[3], '.cor4')
        trocaCor(coresNovas[4], '.cor5')

    })
    
})()

function trocaCor(corAtual, classe){
    let corOrginal = document.querySelector(classe)
    corOrginal.style.backgroundColor = corAtual
}

function conversor(corAtual){
    let mudaCor = hexToRGB(corAtual)
    mudaCor = RGBToHSL(mudaCor)
    mudaCor = geraPaletaAnaloga(mudaCor)
    for(let cor = 0; cor < mudaCor.length; cor++){
        let corAux = HSLToRGB(mudaCor[cor])
        mudaCor[cor] = RGBToHex(corAux)
    }
    return mudaCor
}

function geraPaletaAnaloga(colorEmHSL){

    let h = colorEmHSL[0]
    let s = colorEmHSL[1]
    let l = colorEmHSL[2]
    
    let primeiraCor = [h + (2 * 0.03 * h), s + 5, l + 5]
    let segundaCor = [h + (0.03 * h), s + 5, l + 9]
    let corPrincipal = [h, s, l]
    let quartaCor = [h - (0.03 * h), s + 5, l + 9]
    let quintaCor = [h - (2 * 0.03 * h), s + 5, l + 5]

    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}