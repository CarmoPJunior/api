
const formProduto = document.getElementById('formProduto');

listarUsuarios();

// Evento submit do form para cadastro do usuario
formProduto.addEventListener('submit', (e) => {
	e.preventDefault();

	let usuario = JSON.stringify({
		nome: document.getElementById('txtNome').value,
		senha: document.getElementById('txtSenha').value
	});	

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "http://localhost:8080/usuarios");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(usuario);

	// Reacarrega as informações no Table
	listarUsuarios();
	
	// Limpa os campos
	document.getElementById('txtNome').value = '';
	document.getElementById('txtSenha').value = '';


});

async function listarUsuarios() {

	const url = "http://localhost:8080/usuarios/";
	const response = await request("GET", url);

	const usuarios = JSON.parse(response);

	let table = document.getElementById('tabela');

	limparTabela(table);

	// Insere as linhas da tabela
	usuarios.forEach(usuario => {
		let row = table.insertRow(1);
		row.innerHTML = `<td>${usuario.id}</td>`
			+ `<td>${usuario.nome}</td>`
			+ `<td>${usuario.senha}</td>`;
	});
}

function request(method, url) {
	return new Promise(function(resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.response)
				} else {
					reject(xhr.status)
				}
			}
		}
		xhr.ontimeout = function() {
			reject('timeout')
		}
		xhr.open(method, url, true)
		xhr.send()
	})
}

// Função utilizada para limpar as tabelas
function limparTabela (table) {    
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}