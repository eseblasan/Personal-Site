$(document).ready(function() {
    const buttonColors = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;

    // Старт гри при натисканні будь-якої клавіші
    $(document).keypress(function() {
        if (!started) {
            $("#level-title").text("Рівень " + level);
            nextSequence();
            started = true;
        }
    });

    // Обробка натискання кнопок гравцем
    $(".btn").click(function() {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        // Перевірка відповіді користувача
        checkAnswer(userClickedPattern.length - 1);
    });

    // Перевірка відповіді користувача
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            // Якщо гравець повторив послідовність
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            // Якщо помилка
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Гра закінчена, натисніть будь-яку клавішу, щоб почати знову");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }

    // Генерація наступної послідовності
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

    // Відтворення звуку
    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Анімація при натисканні
    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    // Перезапуск гри
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});
