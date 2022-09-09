(function(){
    const colorInput = document.getElementById('color')
    colorInput.addEventListener('input', () => {
        const colorCode = document.getElementById('color').value;
        console.log(typeof(colorCode))
        document.querySelector('.wrapper').style.backgroundColor = colorCode
        document.querySelector('label').style.backgroundColor = colorCode
        corPrincipal(colorCode)
    })
    
})()

function corPrincipal(corAtual){
    let corOrginal = document.querySelector('.cor3')
    corOrginal.style.backgroundColor = corAtual
}