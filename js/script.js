$(document).ready(function () {
    const $path = $('#myPath');
    const $wrapper = $('.main_wrapper');
    const $body = $('body');

    // Получаем длину линии
    const length = $path[0].getTotalLength();

    // Настраиваем пунктир: линия полностью видна изначально
    $path.css({
        'strokeDasharray': length,
        'strokeDashoffset': 0
    });

    $body.css({'overflow': 'hidden'});

    // Кнопка "Стереть"
    $('#eraseBtn').on('click', function () {
        // Анимация линии
        $path.css({
            'transition': 'stroke-dashoffset 1s ease-out',
            'strokeDashoffset': length
        });

        // Через 1 секунду после нажатия анимируем main_wrapper
        setTimeout(function () {
            $wrapper.css({
                'transition': 'transform 0.5s ease-out, opacity 0.5s ease-out',
                'transform': 'scale(2)',
                'opacity': '0'
            });

            $body.css({'overflow': 'auto'});

            // После завершения анимации скрываем блок
            setTimeout(function () {
                $wrapper.css('display', 'none');
            }, 500);
        }, 1000);
    });
});

$(document).ready(function() {
    var path = $('#sPath')[0];
    var length = path.getTotalLength();
    var $container = $('.svg-container');
    var $window = $(window);
    var $heart = $('.heart-icon');
    
    // Изначально линия скрыта, сердечко в начале пути
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    
    // Устанавливаем сердечко в начало линии
    function setHeartAtProgress(progress) {
        var point = path.getPointAtLength(progress * length);
        var svg = $('svg')[0];
        var svgRect = svg.getBoundingClientRect();
        
        var heartX = svgRect.left + point.x;
        var heartY = svgRect.top + point.y;
        
        $heart.css({
            'transform': 'translate(' + (heartX - 15) + 'px, ' + (heartY - 15) + 'px)',
        });
    }
    
    function update() {
        var containerTop = $container.offset().top;
        var containerBottom = containerTop + $container.height();
        var scrollTop = $window.scrollTop();
        var windowHeight = $window.height();
        var windowCenter = scrollTop + windowHeight / 2;
        
        // Прогресс от начала линии до конца (0-1)
        var lineStart = containerTop;
        var lineEnd = containerBottom;
        
        var progress = (windowCenter - lineStart) / (lineEnd - lineStart);
        progress = Math.min(1, Math.max(0, progress));
        
        // Рисуем линию
        var drawnLength = progress * length;
        path.style.strokeDashoffset = length - drawnLength;
        
        // Двигаем сердечко ровно на столько же, сколько отрисовано
        setHeartAtProgress(progress);
    }
    
    // Запускаем при скролле
    $window.on('scroll resize', function() {
        requestAnimationFrame(update);
    });
    
    // Запускаем при загрузке
    update();
});

function updateTimer() {
    const targetDate = new Date('2026-06-27T00:00:00');
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById('timer').textContent = '00:00:00:00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('timer').textContent = 
        String(days).padStart(2, '0') + ':' +
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);