$(document).ready(function () {
    const $path = $('#myPath');
    const $wrapper = $('.main_wrapper');
    const $body = $('body');

    // Проверяем существование элемента
    if ($path.length === 0) {
        console.error('Элемент #myPath не найден');
        return;
    }

    // Получаем длину линии
    const length = $path[0].getTotalLength();

    // Настраиваем пунктир
    $path.css({
        'strokeDasharray': length,
        'strokeDashoffset': 0
    });

    $body.css({'overflow': 'hidden'});

    // Кнопка "Стереть"
    $('#eraseBtn').on('click', function () {
        $path.css({
            'transition': 'stroke-dashoffset 1s ease-out',
            'strokeDashoffset': length
        });

        setTimeout(function () {
            $wrapper.css({
                'transition': 'transform 0.5s ease-out, opacity 0.5s ease-out',
                'transform': 'scale(2)',
                'opacity': '0'
            });

            $body.css({'overflow-x': 'hidden','overflow-y': 'auto'});

            setTimeout(function () {
                $wrapper.css('display', 'none');
            }, 500);
        }, 1000);
    });
});

$(document).ready(function() {
    // ПРОВЕРЯЕМ СУЩЕСТВОВАНИЕ ЭЛЕМЕНТА
    var path = $('#sPath')[0];
    if (!path) {
        console.warn('Элемент #sPath не найден, скрипт анимации линии пропущен');
        return; // Выходим, если элемента нет
    }
    
    var length = path.getTotalLength();
    var $container = $('.svg-container');
    var $window = $(window);
    var $heart = $('.heart-icon');
    
    // Проверяем остальные элементы
    if ($container.length === 0 || $heart.length === 0) {
        console.warn('Не найдены .svg-container или .heart-icon');
        return;
    }
    
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    
    function setHeartAtProgress(progress) {
        var point = path.getPointAtLength(progress * length);
        var svg = $('svg')[0];
        if (!svg) return;
        
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
        
        var lineStart = containerTop;
        var lineEnd = containerBottom;
        
        var progress = (windowCenter - lineStart) / (lineEnd - lineStart);
        progress = Math.min(1, Math.max(0, progress));
        
        var drawnLength = progress * length;
        path.style.strokeDashoffset = length - drawnLength;
        setHeartAtProgress(progress);
    }
    
    $window.on('scroll resize', function() {
        requestAnimationFrame(update);
    });
    
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
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = 
            String(days).padStart(2, '0') + ':' +
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }
}

updateTimer();
setInterval(updateTimer, 1000);