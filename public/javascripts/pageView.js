jQuery(document).ready(function ($) {
    $(".image_stack").delegate('img', 'mouseenter', function () {
        if ($(this).hasClass('stackphotos')) {
            var $parent = $(this).parent();
            $parent.find('img.photo1').addClass('rotate1');
            $parent.find('img.photo2').addClass('rotate2');
            $parent.find('img.photo3').addClass('rotate3');
            $parent.find('img.photo1').css("left", "150px");
            $parent.find('img.photo3').css("left", "50px");
        }
    })
        .delegate('img', 'mouseleave', function () {
            $('img.photo1').removeClass('rotate1');
            $('img.photo2').removeClass('rotate2');
            $('img.photo3').removeClass('rotate3');
            $('img.photo1').css("left", "");
            $('img.photo3').css("left", "");
        });

    function nextSlide($container, $pagination, $n) {
        var visibleSlide = $container.children('.season-active-slide'),
            navigationDot = $container.next('.season-slider-pagination').find('.season-active');
        if (typeof $n === 'undefined') $n = visibleSlide.index() + 1;
        $container.children('li').eq($n).addClass('season-active-slide').prevAll().addClass('move-left').not(visibleSlide).addClass('hide-avatar');
        visibleSlide.removeClass('season-active-slide');
        setTimeout(function () {
            $container.find('.hide-avatar').removeClass('hide-avatar');
        }, 400);
        navigationDot.removeClass('season-active');
        $pagination.eq($n).addClass('season-active');
    }

    function prevSlide($container, $pagination, $n) {
        var visibleSlide = $container.children('.season-active-slide'),
            navigationDot = $container.next('.season-slider-pagination').find('.season-active');
        if (typeof $n === 'undefined') $n = visibleSlide.index() - 1;
        $container.children('li').eq($n).addClass('season-active-slide').removeClass('move-left').nextAll().removeClass('move-left').not(visibleSlide).addClass('hide-avatar');
        visibleSlide.removeClass('season-active-slide');
        setTimeout(function () {
            $container.find('.hide-avatar').removeClass('hide-avatar');
        }, 400);
        navigationDot.removeClass('season-active');
        $pagination.eq($n).addClass('season-active');
    }

    Generator = {
        createSliderPagination: function ($container) {
            var wrapper = $('<ul class="season-slider-pagination"></ul>').insertAfter($container);
            $container.children('li').each(function (index) {
                var dotWrapper = (index == 0) ? $('<li class="season-active"></li>') : $('<li></li>'),
                    dot = $('<a href="#0"></a>').appendTo(dotWrapper);
                dotWrapper.appendTo(wrapper);
                dot.text(index + 1);
            });
            return wrapper.children('li');
        }
    };

    if ($('.main').length > 0) {
        var itemInfoWrapper = $('.seasons-slider');
        sliderPagination = Generator.createSliderPagination(itemInfoWrapper);

        itemInfoWrapper.on('swipeleft', function () {
            if (!itemInfoWrapper.children('.season-active-slide').is(':last-child')) {
                nextSlide(itemInfoWrapper, sliderPagination);
            }
        });
        itemInfoWrapper.on('swiperight', function () {
            if (!itemInfoWrapper.children('.season-active-slide').is(':first-child')) {
                prevSlide(itemInfoWrapper, sliderPagination);
            }
        });
        sliderPagination.on('click', function () {
            var selectedDot = $(this);
            if (!selectedDot.hasClass('season-active')) {
                var selectedPosition = selectedDot.index(),
                    activePosition = itemInfoWrapper.children('.season-active-slide').index();
                if (activePosition < selectedPosition) {
                    nextSlide(itemInfoWrapper, sliderPagination, selectedPosition);
                } else {
                    prevSlide(itemInfoWrapper, sliderPagination, selectedPosition);
                }
            }
        });
    }

});

