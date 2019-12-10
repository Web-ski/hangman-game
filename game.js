//zmienne stanu: np. lista słów, funckja losująca, kiedy zakończyć grę, 

(function () {

	//DOM elems
	const game = document.getElementById('game');
	const gameTitle = game.getElementsByClassName('game-name')[0];
	const wordContainer = game.getElementsByClassName('hidden-word')[0];
	const chancesText = game.getElementsByClassName('chances')[0];
	const chancesNmbr = game.getElementsByClassName('chances-number')[0];
	const letterContainer = game.getElementsByClassName('letter-container')[0];
	const button = game.getElementsByClassName('button')[0];
	const resultText = game.getElementsByClassName('result')[0];


	gameTitle.textContent = 'Szubienica';
	//lista słów
	const listOfWords = ['halabardnik', 'hydraulik', 'podpułkownik', 'kamerdyner'];

	//losowanie słowa
	const wordsIndex = Math.floor(Math.random() * listOfWords.length);
	const word = listOfWords[wordsIndex];
	let listOfErrors = 5;

	//ukrycie słowa
	const choosenWordArr = Array.from(word);
	const hiddenWord = Array.from(word, () => '_');

	//console.log(writedLetter);
	wordContainer.textContent = 'Słowo: ' + hiddenWord.join(' ');

	let arr = [];
	//komunikat słowo
	//alert('Ukryte słowo: ' + hiddenWord.join(' ')); //join łączy elementy arraya

	let nmbrOfChances = listOfErrors;

	//funkcja dodawania liter
	const checkLetter = () => {
		let writedLetter = letterContainer.value;

		let find = choosenWordArr.includes(writedLetter);

		//funkcja filtrująca
		function letterSearch(element, index) {
			let nmbr = element === writedLetter && index;
			//console.log(nmbr);
			if (nmbr !== false) {
				return nmbr;
			}
		}

		function addLetters(item, index) {
			if (item !== undefined) {
				arr[index] = item;
			}
		}

		if (find === true) {
			//console.log('Trafione');
			let nmbrArr = choosenWordArr.map(letterSearch);
			//tu odsłanianie
			nmbrArr.map(addLetters);
			console.log(arr);
			showingLetters();

		} else {
			//console.log('Nietrafione');
			//console.log(nmbrOfChances);
			if (nmbrOfChances > 0) {
				nmbrOfChances -= 1;
				chancesNmbr.textContent = nmbrOfChances;
			} else {
				button.removeEventListener('click', checkLetter);
				resultText.style.color = 'red';
				resultText.textContent = 'Przegrałeś. Spróbuj jeszcze raz.';
			}
		}
	}

	let word2;
	chancesNmbr.textContent = nmbrOfChances;

	//komunikat z pobraniem
	function showingLetters() {

		const unHiddenWord = Array.from(word, (item, index) =>
			index === arr[index] ? item : '_'
		);

		console.log(arr);

		//sprawdzqnie wartości....
		wordContainer.textContent = 'Słowo: ' + unHiddenWord.join(' ');
		console.log(choosenWordArr, unHiddenWord)
		word2 = unHiddenWord.join('');

		if (word2 === word) {
			resultText.style.color = 'orange';
			resultText.textContent = 'Cudownie. Wygrałeś!';
			button.removeEventListener('click', checkLetter);
		}
	}

	button.addEventListener('click', checkLetter);

}()) //funckja samowywołująca się