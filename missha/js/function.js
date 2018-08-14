$(document).ready(function() {
    $('img[usemap]').rwdImageMaps();
    $('.btnPayment').click(function(){
        $(this).append('<i class="fa fa-circle-o-notch fa-spin"></i>');
        $(this).attr("style","pointer-events: none;");
        setTimeout(function(){
            $(this).html('Đặt hàng');
            $(this).attr("style","pointer-events: bounding-box;");
        },1000);

    });

    $('#navMobile').sidr({
        source: '.menu_main_content'
    });
    $('#addcart').click(function() {
        var qty = $('#Qty').val();
        var id = $(this).data('product');
        VNP.Ajax({
            url: 'ServiceSys/addCart',
            type: 'post',
            dataType: 'html',
            data: { id: id, qty: qty },
            success: function(res) {
                $('#myCart').modal('show');
                $('#contentCart').html(res);
            }
        });
    });

    $('.add-to-cart').click(function(e) {
        var qty = $(this).data('qty');
        qty = qty ? qty : 1;
        var id = $(this).data('product');
        VNP.Ajax({
            url: 'ServiceSys/addCart',
            type: 'post',
            dataType: 'html',
            data: { id: id, qty: qty },
            success: function(res) {
                $('#myCart').modal('show');
                $('#contentCart').html(res);
            }
        });
        e.preventDefault();
    });

    $('.add-to-favorite').click(function(e) {
        var product = $(this).data('product');
        VNP.Ajax({
            url: 'Favorite/addFavorite',
            type: 'post',
            data: { product: product },
            success: function(res) {
                VNP.Loader.hide(function() {

                }, 3000);
                console.log(res)
                if (res == 'ok') {
                    $('.add-success-favorite').addClass('el-show');
                    setTimeout(function() {
                        $('.add-success-favorite').removeClass("el-show");
                    }, 2000);
                } else {
                    $('#loginModal').modal();
                }

            }
        }, 'text');
        e.preventDefault();
    });



    $('#removeCupon').click(function() {
        VNP.Ajax({
            url: 'ServiceSys/removeCupon',
            type: 'post',
            dataType: 'html',
            success: function(res) {
                location.reload();
            }
        });
    });
    $('#addaffiliate').click(function() {
        var id = $(this).data('product');
        VNP.Ajax({
            url: 'ServiceSys/addAffiliate',
            type: 'post',
            dataType: 'html',
            data: { id: id, qty: 1 },
            success: function(res) {
                location.href = '/checkout/shipping.html';
            }
        });
    });

    $('#addgift').click(function() {
        var qty = $('#Qty').val();
        var id = $(this).data('product');
        VNP.Ajax({
            url: 'ServiceSys/addGift',
            type: 'post',
            data: { id: id, qty: qty, gift: 1 },
            success: function(res) {

                try {
                    var obj = JSON.parse(res);
                    if (obj.fail && obj.msg) {
                        alert(obj.msg);
                    }
                } catch (err) {
                    $('#myCart').modal('show');
                    $('#contentCart').html(res);
                }

            },
            error: function() {

            },
        });
    });

    $.validator.addMethod("captcha", function(value, element) {
        var status = false;
        VNP.Ajax({
            url: 'ServiceSys/checkCaptcha',
            type: 'post',
            dataType: 'text',
            data: { code: value },
            async: false,
            success: function(res) {
                if (res == 'true') {
                    status = true;
                } else
                    status = false;
            }
        });
        return status;
    }, "Mã không đúng");
    $.validator.addMethod("checkuser", function(value, element) {
        var status = false;
        VNP.Ajax({
            url: 'ServiceSys/checkUser',
            type: 'post',
            dataType: 'text',
            data: { user: value },
            async: false,
            success: function(res) {
                if (res == 'true') {
                    status = true;
                } else
                    status = false;
            }
        });
        return status;
    }, "Tên đăng nhập đã có người sử dụng");
    $.validator.addMethod("checkemail", function(value, element) {
        var status = false;
        VNP.Ajax({
            url: 'ServiceSys/checkUser',
            type: 'post',
            dataType: 'text',
            data: { user: value },
            async: false,
            success: function(res) {
                if (res == 'true') {
                    status = true;
                } else
                    status = false;
            }
        });
        return status;
    }, "Email đã có người sử dụng");
    $('#regForm').validate({
        errorElement: "span",
        rules: {
            "VNP_Captcha": "captcha",
            "reg_username": "checkuser",
            "reg_email": "checkemail"
        }
    });

    $('#reg_submit').click(function() {
        if ($('#regForm').valid()) {
            $('#loading').css('display', 'block');
            var username = $('#reg_username').val();
            var email = $('#reg_email').val();
            var password = $('#reg_password').val();
            var phone = $('#reg_phone').val();
            var birthday = $('#reg_birthday').val();
            var gender = $('#reg_gender').val();
            var captcha = $('#VNP_Captcha').val();
            var subscribe = 0;
            if ($("#subscribe").is(':checked')) {
                subscribe = 1;
            }
            VNP.Ajax({
                url: 'Account/RegisterAjax',
                type: 'post',
                data: { username: username, password: password, email: email, phone: phone, birthday: birthday, gender: gender, subscribe: subscribe, captcha: captcha },
                success: function(res) {
                    $('#loading').css('display', 'none');
                    $('#thongbaodangky').html(res.alert);
                    VNP.Loader.hide();
                    if (res.status == 1) {
                        location.reload().delay(2000);
                    }
                }
            }, 'json');
        }
    });
    $('#login_popup_submit').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        $(this).append('<i class="fa fa-circle-o-notch fa-spin"></i>');
        VNP.Ajax({
            url: 'Account/LoginAjax',
            type: 'post',
            data: { username: username, password: password },
            success: function(res) {
                $('#thongbaodangnhap').html(res.alert);
                if (res.status == 1) {
                    location.reload().delay(2000);
                }
                VNP.Loader.hide();
            }
        }, 'json');
    });
    $('#autocompleteSearch').typeahead({
        source: function(q, process) {
            return $.post('/ServiceSys/searchSugget', {
                query: q
            }, function(response) {
                var data = [];
                for (var i in response) {
                    var name = response[i].name;
                    name = name.replace('#','');
                    data.push(name + "#" + response[i].url + '#' + response[i].type);
                }
                data.pop();
                return process(data);
            });
        },
        highlighter: function(item) {
            var parts = item.split('#'),
                html = '<div class="typeahead">';
            html += '<div class="suggetItem">';
            html += '<div class="suggetName"><div class="boldName"> ' + parts[0] + '<div><div class="smallType">' + parts[2] + '</div></div>';
            html += '</div>';
            html += '<div class="clearfix"></div>';
            html += '</div>';
            return html;
        },
        updater: function(item) {
            var parts = item.split('#');
            window.location.href = parts[1];
        }

    });
    $('#mobileSearch').typeahead({
        source: function(q, process) {
            return $.post('/ServiceSys/searchSugget', {
                query: q
            }, function(response) {
                var data = [];
                for (var i in response) {
                    var name = response[i].name;
                    name = name.replace('#','');
                    data.push(name + "#" + response[i].url + '#' + response[i].type);
                }
                data.pop();
                return process(data);
            });
        },
        highlighter: function(item) {
            var parts = item.split('#'),
                html = '<div class="typeahead">';
            html += '<div class="suggetItem">';
            html += '<div class="suggetName"><div class="boldName"> ' + parts[0] + '<div><div class="smallType">' + parts[2] + '</div></div>';
            html += '</div>';
            html += '<div class="clearfix"></div>';
            html += '</div>';
            return html;
        },
        updater: function(item) {
            var parts = item.split('#');
            window.location.href = parts[1];
        }

    });

    if ($('#imageGallery').length > 0) {
        $('#imageGallery').lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            thumbItem: 5,
            slideMargin: 0,
            controls: false,
            nextHtml: '<i class="fa fa-chevron-right"></i>',
            prevHtml: '<i class="fa fa-chevron-left"></i>',
            enableDrag: false,
            currentPagerPosition: 'left',
            responsive: [{
                    breakpoint: 1980,
                    settings: {
                        onSliderLoad: function(el) {
                            el.lightGallery({
                                selector: '#imageGallery .lslide'
                            });
                        }
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        onSliderLoad: function(el) {

                        }
                    }
                }
            ]

        });
    }


    if ($('.rate').length > 0) {
        $('.rate').raty({
            score: function() {
                return $(this).attr('data-score');
            },
            path: '/data/library/js-plugins/raty/images/'
        });
        $('.rate').raty({
            score: function() {
                return $(this).attr('data-score');
            },
            readOnly: true,
            path: '/data/library/js-plugins/raty/images/'
        });
    }


    if ($('#slider').length > 0) {
        $('#slider').lightSlider({
            adaptiveHeight: true,
            item: 1,
            slideMargin: 0,
            loop: true
        });
    }

    if ($('.rate_2').length > 0) {
        $('.rate_2').raty({
            score: function() {
                return $(this).attr('data-score');
            },
            targetScore: '#score',
            path: '/data/library/js-plugins/raty/images/'
        });
    }





    $('#review').click(function() {
        $('.nav-tabs a[href="#nhanxet"]').tab('show');
        $("html, body").animate({ scrollTop: 515 }, 600);
    });

    $('#favorite').click(function(e) {
        var product = $(this).data('product');
        VNP.Ajax({
            url: 'Favorite/addFavorite',
            type: 'post',
            data: { product: product },
            success: function(res) {
                VNP.Loader.hide(function() {

                }, 3000);
                if (res == 'ok') {
                    $('#favorite').addClass('added');
                }

            }
        }, 'text');
        e.preventDefault();
    });


    /// menu scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.go-top').fadeIn('slow');
            $('body').addClass('fix-scroll');
        } else {
            $('.go-top').fadeOut('slow');
            $('body').removeClass('fix-scroll');
        }
    });
    $('.go-top-btn').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

function removeItem(e) {
    var id = e.data('product');
    var parent = e.data('parent');
    var index = e.data('index');
    VNP.Ajax({
        url: 'ServiceSys/removeItem',
        type: 'post',
        dataType: 'html',
        data: { id: id, parent: parent, index: index },
        success: function(res) {
            console.log('ASD', res)
            if (res != '0') {
                $('#contentCart').html(res);
            } else {
                $('#myCart').modal('hide');
            }
        }
    });
}

function changeItem(e) {
    var id = e.data('product');
    var qty = e.val();
    VNP.Ajax({
        url: 'ServiceSys/changeItem',
        type: 'post',
        dataType: 'html',
        data: { id: id, qty: qty },
        success: function(res) {
            if (res != '0') {
                $('#contentCart').html(res);
            } else {
                $('#myCart').modal('hide');
            }
        }
    });
}

function getDistrict(e) {
    var province = e.val();
    VNP.Ajax({
        url: 'ServiceSys/getDistrict',
        type: 'post',
        dataType: 'html',
        data: { province: province },
        success: function(res) {
            $('#District').html(res);
        }
    });
}

function getWard(e) {
    var district = e.val();
    VNP.Ajax({
        url: 'ServiceSys/getWard',
        type: 'post',
        dataType: 'html',
        data: { district: district },
        success: function(res) {
            $('#Ward').html(res);
        }
    });
}

function loadDistrict(province, district) {
    VNP.Ajax({
        url: 'ServiceSys/loadDistrict',
        type: 'post',
        dataType: 'html',
        data: { province: province, value: district },
        success: function(res) {
            $('#District').html(res);
        }
    });
}

function loadWard(district, ward) {
    VNP.Ajax({
        url: 'ServiceSys/loadWard',
        type: 'post',
        dataType: 'html',
        data: { district: district, value: ward },
        success: function(res) {
            $('#Ward').html(res);
        }
    });
}




function removeCartItem(e) {
    var id = e.data('product');
    var parent = e.data('parent');
    var index = e.data('index');

    VNP.Ajax({
        url: 'ServiceSys/removeItem',
        type: 'post',
        dataType: 'html',
        data: { id: id, parent: parent, index: index },
        success: function(res) {
            location.reload();
        }
    });
}

function changeCartItem(e) {
    var id = e.data('product');
    var qty = e.val();
    VNP.Ajax({
        url: 'ServiceSys/changeItem',
        type: 'post',
        dataType: 'html',
        data: { id: id, qty: qty },
        success: function(res) {
            // location.reload();
            location.href = '/gio-hang.html';
        }
    });
}