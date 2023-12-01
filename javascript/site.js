// limpa formulario
function clearForm()
{
	document.getElementById('user').value = '';
	document.getElementById('age').value = 18;
	document.getElementById('mail').value = '';
	document.getElementById('interest').value = 'lib_economica';
	document.getElementById('suggestion').value = '';
}

// salvar pro localStorage
function saveLStorage()
{
	const user = document.getElementById('user').value;
	const age = document.getElementById('age').value;
	const mail = document.getElementById('mail').value;
	const interest = document.getElementById('interest').value;
	const suggestion = document.getElementById('suggestion').value;

	const currentDate = new Date();
	const day = currentDate.getDate();
	// tem q botar o +1 pq conta apartir do 0
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();

	// data no formato DD/MM/YYYY
	const formattedDate = `${day}/${month}/${year}`;

	// recupera dados existentes
	const existingData = JSON.parse(localStorage.getItem('formData')) || [];

	// add nova submissão
	const newSubmission = { date: formattedDate, user, age, mail, interest, suggestion };
	existingData.push(newSubmission);

	// Salvar no local storage
	localStorage.setItem('formData', JSON.stringify(existingData));
	
	// limpa e F5 na pagina
	clearForm();
	location.reload();
}

// mostra os dados local storage em html pagina
function showFData(date, user, age, mail, interest, suggestion, index)
{
	const formDataList = document.getElementById('formDataList');
	const listItem = document.createElement('li');
  
	let interestName;
	
	// converte value formatao legivel
	switch (interest)
	{
		case 'desburocratizar':
			interestName = 'Desburocratização';
			break;
		case 'reformapenal':
			interestName = 'Reforma Penal';
			break;
		case 'fimcorporativismo':
			interestName = 'Fim Do Corporativismo';
			break;
		case 'direitopropriedade':
			interestName = 'Direito a Propriedade';
			break;
		default:
		interestName = interest;
	}
	
	// formato exibicao da lista simples
	listItem.innerHTML = formatFormData(date, user, age, mail, interestName, suggestion, index);
	
	formDataList.appendChild(listItem);
}

// lista melhor formatado
function formatFormData(date, user, age, mail, interest, suggestion,index)
{
// seta o index como id/referencia pra remover incluido id de elementos HTML
return `<input value="Excluir Do Local Storage" type="button" onclick="removeLSByIndex(${index});" class="delbtn" id="${index}">
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<input value="Excluir Da Lista" type="button" onclick="removeElementsById(${index});" class="delbtn" id="${index}">
		<ul id="${index}">
            <li><strong>Data:</strong> ${date}</li>
            <li><strong>Nome:</strong> ${user}</li>
            <li><strong>Idade:</strong> ${age}</li>
            <li><strong>E-mail:</strong> ${mail}</li>
            <li><strong>Topico:</strong> ${interest}</li>
            <li><strong>Sugestões:</strong> ${suggestion}</li>
          </ul>`;
}

// funcao para carregar local storage
function loadLStorage()
{
	const savedData = JSON.parse(localStorage.getItem('formData'));
	const formDataList = document.getElementById('formDataList');
	
	// limpa lista
	formDataList.innerHTML = '';

	if (savedData && savedData.length > 0)
	{
		
		// mostra o botao purge LS
		const purgeLS = document.getElementById('purgeLS');
		purgeLS.style.display = 'inline-block';
		
		for (let i = 0; i < savedData.length; i++)
		{
			const submission = savedData[i];
			showFData(submission.date, submission.user, submission.age, submission.mail, submission.interest, submission.suggestion,i);
		}
	}
	else
	{
		// esconde o botao se nao tem nada no LS
		const purgeLS = document.getElementById('purgeLS');
		purgeLS.style.display = 'none';
		
		// Print "No Data" in an h1 element
		formDataList.innerHTML = '<h2>Sem sugestões enviadas</h2>';
	}
}

// remove localstorage por index number
function removeLSByIndex(index)
{
	// pega os valores existentes
	const existingData = JSON.parse(localStorage.getItem('formData')) || [];

	if (index >= 0 && index < existingData.length)
	{
		//remove o index to index
		existingData.splice(index, 1);

		// salva alteracoes
		localStorage.setItem('formData', JSON.stringify(existingData));
	}
	
	clearForm();
	location.reload();
}

// remove elemento da pagina com o querySelector
function removeElementsById(elementId)
{
    const elementsToRemove = document.querySelectorAll(`[id="${elementId}"]`);
    
    elementsToRemove.forEach(element =>
    {
        element.remove();
    });
}

// busca por nome
function loadSearchName()
{
	const searchName = document.getElementById('user').value.toLowerCase(); // caso nao sensitivo
	const savedData = JSON.parse(localStorage.getItem('formData'));
	const formDataList = document.getElementById('formDataList');
	
	//limpa lista
	formDataList.innerHTML = '';

	if (savedData && savedData.length > 0)
	{
		for (let i = 0; i < savedData.length; i++)
		{
			const submission = savedData[i];
			const userName = submission.user.toLowerCase(); // caso nao sensitivo

			if (userName.includes(searchName))
			{
				showFData(submission.date, submission.user, submission.age, submission.mail, submission.interest, submission.suggestion, i);
			}
		}
	}
	else
	{
		formDataList.innerHTML = '<h2>Busca nao encontrada</h2>';
	}
}

// apaga tudo do local storage
function purgeLStorage()
{
	localStorage.removeItem('formData');
	clearForm();
	location.reload();
}

