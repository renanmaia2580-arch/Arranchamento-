const SENHA_ADMIN = "1234";

let nomes = JSON.parse(
  localStorage.getItem("militares") || "[]"
);

const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const admin = document.getElementById("admin");
const adminLista = document.getElementById("adminLista");
const nome = document.getElementById("nome");

const modal = document.getElementById("modal");
const senha = document.getElementById("senha");
const erro = document.getElementById("erro");

function salvar() {
  localStorage.setItem(
    "militares",
    JSON.stringify(nomes)
  );
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function renderizar() {

  lista.innerHTML = "";
  adminLista.innerHTML = "";

  vazio.style.display =
    nomes.length ? "none" : "block";

  nomes.forEach((nomeMilitar, indice) => {

    lista.innerHTML += `
      <div class="item">
        <span>${escapar(nomeMilitar)}</span>
      </div>
    `;

    adminLista.innerHTML += `
      <div class="item">
        <span>${escapar(nomeMilitar)}</span>

        <button
          class="delete"
          onclick="remover(${indice})">
          Remover
        </button>
      </div>
    `;
  });
}

function remover(indice) {

  if (
    confirm(
      "Tem certeza que deseja remover este militar?"
    )
  ) {

    nomes.splice(indice, 1);

    salvar();

    renderizar();
  }
}

document.getElementById("entrar").onclick = function() {

  modal.classList.remove("hidden");

  senha.focus();
};

document.getElementById("fechar").onclick = function() {

  modal.classList.add("hidden");

  erro.textContent = "";
};

document.getElementById("login").onclick = function() {

  if (senha.value === SENHA_ADMIN) {

    modal.classList.add("hidden");

    admin.classList.remove("hidden");

    document
      .getElementById("entrar")
      .classList.add("hidden");

    senha.value = "";

    erro.textContent = "";

  } else {

    erro.textContent =
      "Senha incorreta.";
  }
};

document.getElementById("sair").onclick = function() {

  admin.classList.add("hidden");

  document
    .getElementById("entrar")
    .classList.remove("hidden");
};

document.getElementById("adicionar").onclick = function() {

  const nomeDigitado =
    nome.value.trim();

  if (!nomeDigitado) {

    alert(
      "Digite o nome do militar."
    );

    return;
  }

  nomes.push(nomeDigitado);

  nomes.sort(
    (a, b) =>
      a.localeCompare(b, "pt-BR")
  );

  salvar();

  nome.value = "";

  renderizar();
};

nome.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      document
        .getElementById("adicionar")
        .click();
    }
  }
);

renderizar();
