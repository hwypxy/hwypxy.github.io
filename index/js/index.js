$(function() {
    var height = $(window).height();
    var width = $(window).width();
    var roundStratW = $('#round').width();

    $('#firstCover').height(height);

    function global() {
        $('#round').css({
            top: -(roundStratW / 2),
            right: -(roundStratW / 8)
        });
        $('.logInput').css({
            marginTop: ($('#round').height() - $('.logInput').height()) / 2
        });

    }

    // 小圆点动画
    function roundAnimate() {
        // 移入小圆点
        function enter() {
            $('#round').stop().animate({
                top: '10px',
                right: '10px'
            }, 1000, function() {
                $('.log').show();
            });
        }
        // 移出小圆点
        function leave() {
            $('#round').stop(false, true).animate({
                top: -(roundStratW / 2),
                right: -(roundStratW / 8)
            }, 1000, function() {
                $('.log').hide();
            });
        }
        return {
            enter,
            leave
        }
    }

    // 变大球，进入登录和注册界面
    function logTo() {

        // 小圆点登录按钮
        var reset = roundAnimate();
        $('#round').on('mouseenter', function() {
            reset.enter();
        }).on('mouseleave', function() {
            reset.leave();
        });

        // 点击登录按钮
        $('.log span').on('click', function() {
            $('#round').off('mouseleave mouseenter');
            if (width < 768) {
                $('#round').stop(false, true).delay(500).animate({
                    width: '280px',
                    height: '280px',
                    top: (height - 280) / 2,
                    right: (width - 280) / 2
                }, 1000, function() {
                    $('.logInput').css({
                        marginTop: ($('#round').height() - $('.logInput').height()) / 2
                    });
                    $('.back').css({
                        top: ($('#round').height() - $('.logInput').height()) / 6
                    });
                    $('.go').css({
                        bottom: ($('#round').height() - $('.logInput').height()) / 6
                    });
                    $('.logInput').show();
                    $('.log').hide();
                });
            } else {
                $('#round').stop(false, true).delay(500).animate({
                    width: '600px',
                    height: '600px',
                    top: (height - 600) / 2,
                    right: (width - 600) / 2
                }, 1000, function() {
                    $('.logInput').css({
                        marginTop: ($('#round').height() - $('.logInput').height()) / 2
                    });
                    $('.back').css({
                        top: ($('#round').height() - $('.logInput').height()) / 4
                    });
                    $('.go').css({
                        bottom: ($('#round').height() - $('.logInput').height()) / 4
                    });
                    $('.logInput').show();
                    $('.log').hide();
                });
            }
        });
    }

    // 登录，注册完后变回小球
    function logUp() {
        var reset = roundAnimate();
        $('#round').on('click', '.backBtn , .goBtn', function() {
            // $(this).css({
            //     backgroundColor: '#5b5b5b',
            //     color: '#fff'
            // });
            $('.logInput').hide();

            $('#round').animate({
                width: roundStratW,
                height: roundStratW,
                top: -(roundStratW / 2),
                right: -(roundStratW / 8)
            }, 1000, function() {
                $('#round').on('mouseenter', function() {
                    reset.enter();
                }).on('mouseleave', function() {
                    reset.leave();
                });
            });

        });
    }

    $(window).resize(function() {
        global();
    })

    global();

    roundAnimate();

    logTo();

    logUp();




});