function BaseObject(A) {
    this.Protocol = window.location.protocol, this.Domain = window.location.host, this.BaseUrl = A, this.Loader = new BaseLoader, this.Upload = new Object, this.FileBoxUrl = this.BaseUrl + "ajax/text/FileManager/list_files", this.OpenFileBox = new Object, this.Ajax = function(A, e) {
        if ("undefined" == typeof e && (e = "text"), "text" != e && "json" != e && "state" != e) return alert("Invalid Data type!"), !1;
        var o = this.BaseUrl + "ajax/" + e + "/";
        A.url = o + A.url, A.dataType = e;
        var t = {
                beforeSend: this.Loader.show(),
                success: function() {},
                error: function() {}
            },
            A = $.extend({}, t, A);
        $.ajax(A)
    }, this.SugarBox = new SugarBox
}

function BaseLoader(A) {
    "undefined" == typeof A && (A = "body"), this.Container = A, this.LoaderImage = "data:image/gif;base64,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", this.show = function() {
        var A = 'style="background-image: url(' + this.LoaderImage + ');background-color: #333;background-repeat: no-repeat;background-position: 10px 6px;background-size: 26px;position: fixed;width: 46px;height: 38px;top: 0;right: 0;border-radius: 5px;border-top-right-radius: 0;border-top-left-radius: 0;border-bottom-right-radius: 0;color: #FFF;font-weight: bold;line-height: 35px;z-index:999999;text-align: right;"';
        $('<div class="Ajax_Loader" ' + A + "></div>").appendTo(this.Container)
    }, this.hide = function() {
        $(".Ajax_Loader", this.Container).remove()
    }, this.TextNotify = function(A, e, o) {
        return "undefined" == typeof o && (o = 2500), "undefined" == typeof e && (e = "success"), "error" == e && (A = '<span style="color: #CC0000;">' + A + "</span>"), "success" == e && (A = '<span style="color: #00AF00">' + A + "</span>"), "warn" == e && (A = '<span style="color: #f0ad4e">' + A + "</span>"), $(".Ajax_Loader", this.Container).append(A).animate({
            width: "300px",
            paddingRight: "10px"
        }, 200).fadeOut(o, function() {
            $(this).remove()
        }), this
    }
}

function SugarBox() {
    self = this, self.BoxData = {}, self.IncludeFooter = !0, self.EnableDrag = !0, self.SugarWrapper = ".Suger_Container", self.SugarHead = ".Suger_Head", self.BoxTitle = ".Sugar_Box-title", self.CloseBox = ".Sugar_Close-box", self.DragPanel = ".Sugar_Drag-box", self.SugarBody = ".Sugar_Body", self.BoxContent = ".box-content", self.BoxFoot = ".Sugar_Foot", self.BoxFunctions = ".foot-functions", self.Overlay = ".Sugar_Overlay", self.CloseRole = '[role="Close_SugarBox"]', self.PosX = 0, self.PosY = 0, self.BoxWidth = .418 * window.innerWidth, self.BoxHeight = 0, self.BackUpSugarBox = null, self.SugarBoxTemplate = function(A, e, o) {
        "undefined" == typeof A && (A = "VNP Sugar Box"), "undefined" == typeof e && (e = ""), "undefined" == typeof o && (o = "");
        var t = '           <div class="Suger_Head">                <div class="Sugar_Box-title">' + A + '</div>                <div class="Sugar_Close-box" role="Close_SugarBox">×</div>              <div class="Sugar_Drag-box">                </div>          </div>          <div class="Sugar_Body">                <div class="box-content" style="width:100%; height: 100%">' + e + "</div>           </div>";
        ("undefined" == typeof o || "" != o) && (t += '         <div class="Sugar_Foot">                <div class="foot-functions">' + o + "               </div>          </div>"), t += '<style type="text/css">div.Suger_Container *{border:0;outline:0;vertical-align:top;background:transparent;text-decoration:none;color:#333;font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;font-size:14px;text-shadow:none;float:none;position:static;width:auto;height:auto;white-space:nowrap;cursor:inherit;-webkit-tap-highlight-color:transparent;line-height:normal;font-weight:400;text-align:left;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;direction:ltr;margin:0;padding:0}div.Suger_Container{display: block;      border: 0 solid #9e9e9e;        background-color: #f0f0f0;      zoom: 1;        background: #fff;       position: fixed;        top: 0;     left: 0;        -webkit-transition: opacity 150ms ease-in;      transition: opacity 150ms ease-in;      opacity: 1;     -webkit-border-radius: 3px;     -webkit-box-shadow: 0 2px 26px rgba(0, 0, 0, .3), 0 0 0 1px rgba(0, 0, 0, .1);      font-family: "Helvetica Neue", Helvetica, Arial, "lucida grande",tahoma,verdana,arial,sans-serif;       border-radius: 3px;     border-color: transparent;}div.Suger_Head{position: relative;       padding: 9px 15px;      background-color: #f6f7f8;      border-bottom: 1px solid #e5e5e5;       -webkit-border-radius: 3px 3px 0 0;     color: #141823;     font-weight: bold;      line-height: 19px;      padding: 0 12px;        height: 35px;       line-height: 35px;      overflow: hidden;}div.Suger_Head div.Sugar_Box-title{line-height: 35px;     font-size: 13px;        font-weight: 700;       text-rendering: optimizelegibility;     padding-right: 10px;        text-transform: uppercase;}div.Suger_Head div.Sugar_Close-box{position:absolute;right:15px;top:9px;font-size:20px;font-weight:700;line-height:20px;color:#858585;cursor:pointer;height:20px;overflow:hidden}div.Suger_Head div.Sugar_Drag-box{position:absolute;top:0;left:0;cursor:move;width:90%;height:100%}div.Sugar_Body{position:relative;overflow:hidden;display:block}div.Sugar_Body div.box-content{border:0 solid #9e9e9e;background-color:#fff;zoom:1;left:0;top:0;position:absolute;display:block;white-space:normal;overflow-y:auto}div.Sugar_Foot{padding:7px;border:0 solid #9e9e9e;zoom:1;display:block;background-color:#fff;border-top:1px solid #c5c5c5;-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;left:0;top:0;border-width:1px 0 0}.Sugar_Overlay{position:fixed;left:0;top:0;width:100%;height:100%;background:#000;opacity:.68;filter:alpha(opacity=30);zoom:1}div.Suger_Container .btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:3px 12px;font-size:14px;line-height:1.428571429;border-radius:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}div.Suger_Container .btn.btn-primary{color:#fff;background-color:#428bca;border-color:#357ebd}div.Suger_Container .btn.btn-default{color:#333;background-color:#fff;border-color:#ccc}</style>', $("<div/>", {
            "class": "Suger_Container",
            role: "SugarBox",
            html: t
        }).appendTo("body"), self.Sugar = $(this.DragPanel)
    }, self.FinalBox = "", self.BuildSelector = function() {
        self.BoxTitle = self.SugarHead + " " + self.BoxTitle, self.CloseBox = self.SugarHead + " " + self.CloseBox, self.DragPanel = self.SugarHead + " " + self.DragPanel, self.BoxContent = self.SugarBody + " " + self.BoxContent, self.BoxFunctions = self.BoxFoot + " " + self.BoxFunctions
    }, self.Drag = {
        Element: null,
        x: 0,
        y: 0,
        State: !1
    }, self.DetectDrag = function() {
        self.Sugar.mousedown(function(A) {
            return self.Drag.State || (self.Drag.Element = self.SugarWrapper, self.Drag.x = A.pageX, self.Drag.y = A.pageY, self.Drag.State = !0), !1
        }), $(document).mousemove(function(A) {
            if (self.Drag.State) {
                self.PosX = A.pageX - self.Drag.x, self.PosY = A.pageY - self.Drag.y;
                var e = $(self.Drag.Element).offset();
                $(self.Drag.Element).offset({
                    left: e.left + self.PosX,
                    top: e.top + self.PosY
                }), self.Drag.x = A.pageX, self.Drag.y = A.pageY
            }
        }), $(document).mouseup(function() {
            self.Drag.State && (self.Drag.State = !1)
        })
    }, self.BuildSugarBox = function() {
        if (self.SugarBoxTemplate(self.BoxData.title, self.BoxData.content, self.BoxData.footer), $('div[role="SugarBox"]').css("display", "block"), $('div[role="SugarBox"]').css({
                "border-width": 0,
                "z-index": 65536,
                width: self.BoxWidth
            }), $(self.BoxContent, $('div[role="SugarBox"]')).width(self.BoxWidth), 0 == self.BoxHeight) var A = .8 * $(window).height();
        else var A = self.BoxHeight;
        $(self.SugarBody, $('div[role="SugarBox"]')).height(A), $(self.BoxContent, $('div[role="SugarBox"]')).height(A), $('div[role="SugarBox"]').height(self.IncludeFooter && "" != self.BoxData.footer ? A + 38 + 46 : A + 38), self.IncludeFooter || $(self.BoxFoot, $('div[role="SugarBox"]')).remove(), $("body").append('<div class="Sugar_Overlay" style="z-index: 65535;"></div>');
        var e = ($(window).width() - $('div[role="SugarBox"]').width()) / 2,
            o = ($(window).height() - $('div[role="SugarBox"]').height()) / 2;
        o = 10, $('div[role="SugarBox"]').css({
            left: e,
            top: o
        })
    }, self.CloseBoxAction = function() {
        $(self.CloseRole).click(function() {
            self.Close()
        })
    }, self.Close = function() {
        self.BoxData = {}, $('div[role="SugarBox"]').remove(), $(self.Overlay).remove(), $("body").css({
            overflow: "auto"
        })
    }, self.Open = function(A, e) {
        "FileManager" === A ? (A = {
            title: "Media manager",
            content: '<iframe src="' + VNP.BaseUrl + "ajax/text/FileManager/list_files/field/" + e + '/" tabindex="-1" style="width: 100% !important; height:100% !important"></iframe>',
            footer: ""
        }, self.BoxWidth = .818 * window.innerWidth, self.BoxHeight = 533) : "MultiImages" === A ? (A = {
            title: "Media manager",
            content: '<iframe src="' + VNP.BaseUrl + "ajax/text/FileManager/list_files/multi_images/" + e + '/" tabindex="-1" style="width: 100% !important; height:100% !important"></iframe>',
            footer: ""
        }, self.BoxWidth = .818 * window.innerWidth, self.BoxHeight = 533) : "ListNodesSelect" == A && (A = {
            title: "Get Nodes",
            content: '<iframe src="' + VNP.BaseUrl + "ajax/text/Node/getNodesFrame/target/" + e.field + "/table/" + e.ref_table + "/field/" + e.ref_field + '/" tabindex="-1" style="width: 100% !important; height:100% !important"></iframe>',
            footer: ""
        }, self.BoxWidth = .818 * window.innerWidth, self.BoxHeight = 533), self.BoxData = A, self.BuildSelector(), self.BuildSugarBox(), self.CloseBoxAction(), self.EnableDrag && self.DetectDrag(), $("body").css({
            overflow: "hidden"
        })
    }
}

function objToString(A) {
    var e = "";
    for (var o in A) A.hasOwnProperty(o) && (e += o + "::" + A[o] + "\n");
    return e
}
Array.prototype.getUnique = function() {
    for (var A = {}, e = [], o = 0, t = this.length; t > o; ++o) A.hasOwnProperty(this[o]) || (e.push(this[o]), A[this[o]] = 1);
    return e
};