const input_where = document.getElementById('where');
const btn_filter = document.getElementById('btn_filter');

btn_filter.addEventListener('click', () => { 
    window.location.href = '/endereco=' + input_where.value;
})