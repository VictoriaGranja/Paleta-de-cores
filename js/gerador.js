import {hexToRGB, RGBToHSL, HSLToRGB, RGBToHex} from './conversor.js'
const select = document.querySelector('select')
function clickedOpcao(){
    
    const opcaoPaleta = select.options[select.selectedIndex].value
    let cor = document.getElementById('color')

    const actions = {
        analogo: geraPaletaAnaloga,
        monocromatico: geraPaletaMonocromatica,
        triade: geraPaletaTriade,
        complementar: geraPaletaComplementar
    }

    if(actions[opcaoPaleta]){
        cor.addEventListener('input', () => {
            let colorInput = document.getElementById('color').value
            colorInput = mudaCorParaHSL(colorInput)
            colorInput = actions[opcaoPaleta](colorInput[0], colorInput[1], colorInput[2])
            colorInput = mudaCoresParaRGBPaleta(colorInput)

            trocaCor(colorInput)
        })
    }

}

select.addEventListener("click", clickedOpcao)

function trocaCor(coresDaPaleta){
    let paleta = document.querySelector('.paleta')
    let cores = paleta.children
    for(let cor = 0; cor < cores.length; cor++){
        cores[cor].style.backgroundColor = coresDaPaleta[cor]
    }
}

function geraPaletaAnaloga(h, s, l){
    
    let primeiraCor = [voltaMax(360, h, (2 * 0.03 * h)), saturationMax(s), l + 5]
    let segundaCor = [voltaMax(360, h, (0.03 * h)), saturationMax(s), l + 9]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, (0.03 * h)), saturationMax(s), l + 9]
    let quintaCor = [voltaMin(0, 360, h, (2 * 0.03 * h)), saturationMax(s), l + 5]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaMonocromatica(h, s, l){

    let primeiraCor = [h, s, voltaMin(0, 50, l, 50)]
    let segundaCor = [h, saturationMax(s - 30), l + 1]
    let corPrincipal = [h, s, l]
    let quartaCor = [h, saturationMax(s - 30), voltaMin(0, 50, l, 50)]
    let quintaCor = [h, s, voltaMin(0, 50, l, 20)]

    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaTriade(h, s, l){

    let primeiraCor = [h, saturationMax(s + 10), mudaBrilhoComplementar(l, 30)]
    let segundaCor = [voltaMin(0, 360, h, 240), saturationMax(s - 10), l]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, 120), saturationMax(s - 10), l]
    let quintaCor = [voltaMin(0, 360, h, 120), saturationMax(s + 5), mudaBrilhoComplementar(l, 30)]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaComplementar(h, s, l){
    
    let primeiraCor = [h, saturationMax(s + 10), mudaBrilhoComplementar(l, 30)]
    let segundaCor = [h, saturationMax(s - 10), saturationMax(l + 10)]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMax(360, h, 180), saturationMax(s + 20), mudaBrilhoComplementar(l, 30)]
    let quintaCor = [voltaMax(360, h, 180), s, l]

    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function voltaMax(max, numero, condicao){
    let somaDaCondicao = numero + condicao
    if(somaDaCondicao > max){
        somaDaCondicao = somaDaCondicao - max
        return somaDaCondicao
    }
    return somaDaCondicao
}

function voltaMin(min, max, numero, condicao){
    let subtracaoDaCondicao = numero - condicao
    if(subtracaoDaCondicao < min){
        subtracaoDaCondicao = max + subtracaoDaCondicao
        return subtracaoDaCondicao
    }
    return subtracaoDaCondicao
}

function saturationMax(sat){
    if(sat > 100){
        sat = 100
    }else if(sat < 0){
        sat = 0
    }
    return sat
}

function mudaBrilhoComplementar(light, condicao){
    if(light < 50){
        light = light + condicao
    }else{
        light = light - condicao
    }
    return light
}

function mudaCorParaHSL(corAtual){
    let mudaCor = hexToRGB(corAtual)
    mudaCor = RGBToHSL(mudaCor)
    return mudaCor    
}

function mudaCoresParaRGBPaleta(cores){
    for(let cor = 0; cor < cores.length; cor++){
        let corAux = HSLToRGB(cores[cor])
        cores[cor] = RGBToHex(corAux)
    }
    return cores
}

export{ geraPaletaAnaloga, mudaCorParaHSL, mudaCoresParaRGBPaleta, trocaCor }