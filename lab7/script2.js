// Массив с доступными звуками
const sounds = {
    piano: 'pianino.mp3',
    drum: 'baraban.mp3',
    guitar: 'gitara.mp3',
    trumpet: 'truba.mp3',
    violin: 'skripka.mp3',
    flute: 'fleita.mp3'
};

// Получаем все элементы с классом "key"
const keys = document.querySelectorAll('.key');

// Функция воспроизведения звука
function playSound(instrument) {
    const audio = new Audio(sounds[instrument]);
    audio.play();
}

// Функция для обработки нажатий на клавиши мышью
function handleClick(event) {
    const instrument = event.target.dataset.sound;
    if (instrument) {
        playSound(instrument);
        event.target.classList.add('active');
        setTimeout(() => {
            event.target.classList.remove('active');
        }, 200);
    }
}

// Функция для обработки нажатий на клавиатуре
function handleKeyPress(event) {
    let instrument;
    switch (event.key) {
        case 'a':
            instrument = 'piano';
            break;
        case 's':
            instrument = 'drum';
            break;
        case 'd':
            instrument = 'guitar';
            break;
        case 'f':
            instrument = 'trumpet';
            break;
        case 'g':
            instrument = 'violin';
            break;
        case 'h':
            instrument = 'flute';
            break;
        default:
            return; // Если клавиша не соответствует, выходим
    }
    playSound(instrument);
    const keyElement = document.querySelector(`[data-sound="${instrument}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 200);
    }
}

// Добавляем обработчики событий для каждого элемента
keys.forEach(key => {
    key.addEventListener('click', handleClick);
});

// Добавляем обработчик для нажатий на клавиатуре
document.addEventListener('keydown', handleKeyPress);
