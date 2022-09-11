function geraPaletaAnaloga(corEmHSL){

    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]
    
    let primeiraCor = [voltaMax(360, h, (2 * 0.03 * h)), s + 5, l + 5]
    let segundaCor = [voltaMax(360, h, (0.03 * h)), s + 5, l + 9]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, (0.03 * h)), s + 5, l + 9]
    let quintaCor = [voltaMin(0, 360, h, (2 * 0.03 * h)), s + 5, l + 5]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaMonocromatica(corEmHSL){
    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]

    console.log(corEmHSL, h, s, l)
    //usar case em um for?
    let primeiraCor = [h, s, voltaMin(0, 50, l, 50)]
    let segundaCor = [h, voltaMin(0, 100, s, 30), l + 1]
    let corPrincipal = [h, s, l]
    let quartaCor = [h, voltaMin(0, 100, s, 30), voltaMin(0, 50, l, 50)]
    let quintaCor = [h, s, voltaMin(0, 50, l, 20)]
    
    return [primeiraCor, segundaCor, corPrincipal, quartaCor, quintaCor]
}

function geraPaletaTriade(corEmHSL){
    let h = corEmHSL[0]
    let s = corEmHSL[1]
    let l = corEmHSL[2]

    console.log(corEmHSL, h, s, l)
    //usar case em um for?
    let primeiraCor = [h, s + 10, voltaMin(0, 100, l, 30)]
    let segundaCor = [voltaMin(0, 360, h, 240), s - 10, l]
    let corPrincipal = [h, s, l]
    let quartaCor = [voltaMin(0, 360, h, 120), s - 10, l]
    let quintaCor = [voltaMin(0, 360, h, 120), s + 5, voltaMin(0, 100, l, 30)]
    
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

export{
    geraPaletaAnaloga,
    geraPaletaMonocromatica,
    geraPaletaTriade
}