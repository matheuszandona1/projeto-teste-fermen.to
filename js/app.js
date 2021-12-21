$( document ).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let origem = urlParams.get('utm_source');
  if(origem) {
      $("#origem").val(origem);
  }
  $("html, body").animate({ scrollTop: 0 }, 500);
  function showError(input) {
      input.classList.add("erro");
      setTimeout(function(input){
          input.classList.remove("erro");
      }, 500, input);
  }
  function gotoel(el) {
      $([document.documentElement, document.body]).animate({
          scrollTop: $(el).offset().top - 50
      }, 500);
  }
  function inputHandler(e, t, n) {
      var r = n.target,
          i = r.value.replace(/\D/g, ""),
          o = r.value.length > t ? 1 : 0;
      VMasker(r).unMask(), VMasker(r).maskPattern(e[o]), r.value = VMasker.toPattern(i, e[o])
  }
  var telMask = ["(99) 9999-9999", "(99) 99999-9999"],
      tel = document.querySelector("#formtelefone");
  VMasker(tel).maskPattern(telMask[0]), tel.addEventListener("input", inputHandler.bind(void 0, telMask, 14), !1);
  
  
  var maxCaracteres = 100;
  $("#mensagem").val("");
  $("#mensagem").keyup(function() {
      $("#mensagem").val($("#mensagem").val().replace(/[\r\n\v]+/g, ' '));
      let qtdCaracteresAtual = $("#mensagem").val().length;
      if(qtdCaracteresAtual > maxCaracteres) {
          $("#mensagem").val($("#mensagem").val().substring(0,maxCaracteres));
          qtdCaracteresAtual = maxCaracteres;
      }
      $(".caracteres").html(qtdCaracteresAtual + "/" + maxCaracteres);
  });
  var modeloSelecionado = null;
  $(".capao .iniciar").click(function(){
      $(".container").css("margin-left","-100vw");
      $(".fundo-geral .pagina1").fadeOut();
      $(".fundo-geral .pagina2").fadeIn();
      $("html, body").animate({ scrollTop: 0 }, 500);
  });
  $(".opcoes .item").click(function(el) {
      $(".container").css("margin-left","-200vw");
      $(".fundo-geral .pagina2").fadeOut();
      $(".fundo-geral .pagina3").fadeIn();
      modeloSelecionado = $(this).attr("data-item");
      $("html, body").animate({ scrollTop: 0 }, 500);
  });
  $(".formulario .voltar").click(function() {
      $(".container").css("margin-left","-100vw");
      $(".fundo-geral .pagina3").fadeOut();
      $(".fundo-geral .pagina2").fadeIn();
      $("html, body").animate({ scrollTop: 0 }, 500);
  });
  var enviando = false;
  $(".formulario .gerar").click(function() {
      if(enviando) {
          return false;
      }
      enviando = true;
      
      let elNome = document.querySelector("#formnome");
      let elSobrenome = document.querySelector("#formsobrenome");
      let elEmail = document.querySelector("#formemail");
      let elTelefone = document.querySelector("#formtelefone");
      let elDestinatario = document.querySelector("#formdestinatario");
      let elMensagem = document.querySelector("#mensagem");

      if(!elNome.value.length) {
          gotoel(elNome);
          showError(elNome);
          enviando = false;
          return false;
      }
      if(!elSobrenome.value.length) {
          gotoel(elSobrenome);
          showError(elSobrenome);
          enviando = false;
          return false;
      }
      if(!elEmail.checkValidity()) {
          gotoel(elEmail);
          showError(elEmail);
          enviando = false;
          return false;
      }
      if(!elTelefone.value.length) {
          gotoel(elTelefone);
          showError(elTelefone);
          enviando = false;
          return false;
      }
      if(!elDestinatario.value.length) {
          gotoel(elDestinatario);
          showError(elDestinatario);
          enviando = false;
          return false;
      }
      if(!elMensagem.value.length) {
          gotoel(elMensagem);
          showError(elMensagem);
          enviando = false;
          return false;
      }

      let varDe = $("#formnome").val();
      let varPara = $("#formdestinatario").val();
      let varMensagem = $("#mensagem").val();
      let varModelo = modeloSelecionado;
      sessionStorage.setItem("de", varDe);
      sessionStorage.setItem("para", varPara);
      sessionStorage.setItem("mensagem", varMensagem);
      sessionStorage.setItem("modelo", varModelo);
      let retURL = window.location.origin + "/resultado.html";
      $("#retURL").val(retURL);


      $.post("https://hermes.fermen.to/form/sernatal", {
          nome: elNome.value,
          sobrenome: elSobrenome.value,
          email: elEmail.value,
          telefone: elTelefone.value,
          destinatario: elDestinatario.value,
          mensagem: elMensagem.value,
          modelo: modeloSelecionado
      }, function(data){
          $("#formulario").submit();
      });
  });
});