$(document).ready(function() {
    const buttonColors = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;

    // Обработчик события для начала игры при нажатии любой клавиши
    $(document).on("keydown", function() {
        if (!started) {
            $("#level-title").text("Рівень " + level);
            nextSequence();
            started = true;
        }
    });

    // Обработчик кликов по цветным кнопкам
    $(".btn").click(function() {
        if (started) { // Добавлена проверка, чтобы кнопки срабатывали только после начала игры
            let userChosenColor = $(this).attr("id");
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor);
            animatePress(userChosenColor);

            // Проверка правильности ответа пользователя
            checkAnswer(userClickedPattern.length - 1);
        }
    });

    // Проверка ответа пользователя
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            // Если пользователь ошибается
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Гра закінчена. Натисніть будь-яку клавішу, щоб почати знову.");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            // Перезапуск игры
            startOver();
        }
    }

    // Генерация новой последовательности
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Рівень " + level);

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    // Воспроизведение звука
    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Анимация при нажатии
    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    // Перезапуск игры
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});
