$( document ).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let varDe = sessionStorage.getItem('de');
  let varPara = sessionStorage.getItem('para');
  let varMensagem = sessionStorage.getItem('mensagem');
  let varModelo = sessionStorage.getItem('modelo');
  $("h1 b").html(varDe);
  $("h2").after("<img class='preview' src='https://fermen.to/tools/gerador-de-cartoes/imagem.php?modelo=" + encodeURIComponent(varModelo) + "&de=" + encodeURIComponent(varDe) + "&para=" + encodeURIComponent(varPara) + "&mensagem=" + encodeURIComponent(varMensagem) + "'>");
  $(".salvar").attr("href", "https://fermen.to/tools/gerador-de-cartoes/download-imagem.php?modelo=" + encodeURIComponent(varModelo) + "&de=" + encodeURIComponent(varDe) + "&para=" + encodeURIComponent(varPara) + "&mensagem=" + encodeURIComponent(varMensagem));
});