$(document).foundation()
const LOCAL_STORAGE_NAMESPACE = `dadJokes`;

const Storage = {
  save(newObject) {
    raw = JSON.stringify(newObject)
    window.localStorage.setItem(LOCAL_STORAGE_NAMESPACE, raw);
  },
  load() {
    var raw = window.localStorage.getItem(LOCAL_STORAGE_NAMESPACE);
    return JSON.parse(raw);
  }
};

function saveToStorage(text, value) {
  currentJokes = Storage.load()
  if( currentJokes === {}) {
    const currentJokes = {}
  }
  currentJokes[text] = value
  Storage.save(currentJokes)
}

function displayStorage() {
  currentJokes = Storage.load()
  for (var jokeText in currentJokes) {
    appendJoke(jokeText, currentJokes[jokeText]);
  };
}

function appendJoke(jokeText, told) {
    var template = $('#hidden-template').html();
    var item = $(template).clone();
    $(item).find('.jokeText').html(jokeText);

    var told = (told === 1 ? true : false);
    $(item).find('.jokeToggle').attr('checked', told);
    $('.jokesTable').append(item)
  }


$(document).ready(function () {
  if(Storage.load() === null) {
    Storage.save({});
    saveToStorage('Why did the chicken cross the road?', 0);
    saveToStorage('Why is this iso hard', 0);
    saveToStorage('How about a third?', 0);
  };

  $('#addJoke').on("click", function (data) {
    var newJoke = $('#addJokeText');
    appendJoke(newJoke.val(), 0);
    saveToStorage(newJoke.val(), 0);
    newJoke.val(null);
  });

  $(this).on('change', '.jokeToggle', function () {
    var jokeRow = $(this).closest('tr')
    var told = (jokeRow.find('.jokeToggle').prop('checked') === true ? 1 : 0);

    saveToStorage(jokeRow.find('.jokeText').text(), told);
  });

  $('#removeJokes').on("click", function (data) {
    $('.jokeRow').remove();
    Storage.save({});
  });

  displayStorage();
});
