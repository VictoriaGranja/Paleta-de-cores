const colorInput = document.getElementById('color')
colorInput.addEventListener('input', () => {
    const colorCode = document.getElementById('color').value;
    document.querySelector('.wrapper').style.backgroundColor = colorCode
    document.querySelector('label').style.backgroundColor = colorCode
})