//zmienne stanu: np. lista słów, funckja losująca, kiedy zakończyć grę, 

const gameHangman = () => {

  //DOM elems
  const game = document.getElementById('game');
  const name = document.getElementById('name');
  const restart = document.getElementById('restart');
  const gameTitle = name.getElementsByClassName('game-name')[0];
  const wordContainer = game.getElementsByClassName('hidden-word')[0];
  const chancesText = game.getElementsByClassName('chances')[0];
  const chancesNmbr = game.getElementsByClassName('chances-number')[0];
  const letterContainer = game.getElementsByClassName('letter-container')[0];
  const button = game.getElementsByClassName('button')[0];
  const resultText = game.getElementsByClassName('result')[0];
  const buttonRestart = restart.getElementsByClassName('button-restart')[0];

  gameTitle.textContent = 'Szubienica';
  //lista słów
  const listOfWords = ['halabardnik', 'hydraulik', 'podpułkownik', 'kamerdyner', 'transporter'];

  //losowanie słowa
  const wordsIndex = Math.floor(Math.random() * listOfWords.length);
  const word = listOfWords[wordsIndex];
  let listOfErrors = Math.ceil(word.length / 2);
  //console.log(listOfErrors)

  //ukrycie słowa
  const choosenWordArr = Array.from(word);
  const hiddenWord = Array.from(word, () => '_');

  //console.log(writedLetter);
  wordContainer.textContent = hiddenWord.join(' ');

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
      //console.log(arr);
      showingLetters();

    } else {
      //console.log('Nietrafione');
      //console.log(nmbrOfChances);
      if (nmbrOfChances > 1) {
        let chances = nmbrOfChances;
        nmbrOfChances -= 1;
        chancesNmbr.textContent = nmbrOfChances;
      } else {
        button.removeEventListener('click', checkLetter);
        chancesNmbr.textContent = 0;
        resultText.style.color = 'red';
        resultText.textContent = 'Przegrałeś!';
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
    wordContainer.textContent = unHiddenWord.join(' ');
    console.log(choosenWordArr, unHiddenWord)
    word2 = unHiddenWord.join('');

    if (word2 === word) {
      resultText.style.color = 'orange';
      resultText.textContent = 'Cudownie. Wygrałeś!';
      button.removeEventListener('click', checkLetter);
    }
  }

  button.addEventListener('click', checkLetter);
  buttonRestart.addEventListener('click', () => {
    gameHangman();
    resultText.textContent = '';

  })
}

gameHangman()