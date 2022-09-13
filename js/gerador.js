import {hexToRGB, RGBToHSL, HSLToRGB, RGBToHex} from './conversor.js'
const select = document.querySelector('select')
function clickedOpcao(e){
    
    /*const opcaoPaleta = e.target.getAttribute("class")*/
    const opcaoPaleta = select.options[select.selectedIndex].value
    console.log(opcaoPaleta)
    const opcoes = select.getElementsByTagName("option")
    let colorInput = document.getElementById('color').value
    /*if(!opcaoPaleta) return "nãoooooooo"
    console.log(e.target)
    switch(opcaoPaleta){
        case "editButton":
            console.log("é edit no switch")
        default:
            console.log("não é edit")
    }*/

    let opcaoAtual = e.target.children
    console.log("aqui -> ", opcaoAtual)
    /*while(opcaoAtual.nodeName != "LI"){
        opcaoAtual = opcaoAtual.parentElement
    }*/

    const opcaoAtualIndex = [...opcoes].indexOf(opcaoAtual)

    const actions = {
        analogo: geraPaletaAnaloga,
        monocromatico: geraPaletaMonocromatica,
        triade: geraPaletaTriade,
        complementar: geraPaletaComplementar
    }

    if(actions[opcaoPaleta]){
        colorInput = mudaCorParaHSL(colorInput)
        colorInput = actions[opcaoPaleta](colorInput)
        colorInput = mudaCoresParaRGBPaleta(colorInput)
        
        trocaCor(colorInput[0], '.cor1')
        trocaCor(colorInput[1], '.cor2')
        trocaCor(colorInput[2], '.cor3')
        trocaCor(colorInput[3], '.cor4')
        trocaCor(colorInput[4], '.cor5')
    }


}
select.addEventListener("click", clickedOpcao)

function trocaCor(corAtual, classe){
    let corOriginal = document.querySelector(classe)
    corOriginal.style.backgroundColor = corAtual
}

function geraPaletaAnaloga(corEmHSL){

    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]
    
    let primeiraCor = [voltaMax(360, h, (2 * 0.03 * h)), saturationMax(s), l + 5]
    let segundaCor = [voltaMax(360, h, (0.03 * h)), saturationMax(s), l + 9]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, (0.03 * h)), saturationMax(s), l + 9]
    let quintaCor = [voltaMin(0, 360, h, (2 * 0.03 * h)), saturationMax(s), l + 5]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaMonocromatica(corEmHSL){
    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]
    //console.log("aquiiiiiiiiiiii")
    //console.log(corEmHSL, h, s, l)
    //usar case em um for?
    let primeiraCor = [h, s, voltaMin(0, 50, l, 50)]
    let segundaCor = [h, saturationMax(s - 30), l + 1]
    let corPrincipal = [h, s, l]
    let quartaCor = [h, saturationMax(s - 30), voltaMin(0, 50, l, 50)]
    let quintaCor = [h, s, voltaMin(0, 50, l, 20)]
    console.log(primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor)
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaTriade(corEmHSL){
    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]

    console.log(corEmHSL, h, s, l)
    //usar case em um for?
    let primeiraCor = [h, saturationMax(s + 10), mudaBrilhoComplementar(l, 30)]
    let segundaCor = [voltaMin(0, 360, h, 240), saturationMax(s - 10), l]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, 120), saturationMax(s - 10), l]
    let quintaCor = [voltaMin(0, 360, h, 120), saturationMax(s + 5), mudaBrilhoComplementar(l, 30)]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaComplementar(corEmHSL){
    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]
    
    let primeiraCor = [h, saturationMax(s + 10), mudaBrilhoComplementar(l, 30)]
    let segundaCor = [h, saturationMax(s - 10), saturationMax(l + 10)]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMax(360, h, 180), saturationMax(s + 20), mudaBrilhoComplementar(l, 30)]
    let quintaCor = [voltaMax(360, h, 180), s, l]
    //console.log(corPrincipal, quartaCor, quintaCor)
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
    console.log("aqui -------", mudaCor)
    return mudaCor    
}

function mudaCoresParaRGBPaleta(cores){
    for(let cor = 0; cor < cores.length; cor++){
        let corAux = HSLToRGB(cores[cor])
        console.log(corAux)
        cores[cor] = RGBToHex(corAux)
    }
    return cores
}

export{
    geraPaletaAnaloga,
    geraPaletaMonocromatica,
    geraPaletaTriade,
    geraPaletaComplementar
}