_.Module.define({
    path: "puser/widget/MonthIcon",
    sub: {
        iconTitle: {
            201401: "\u6469\u7FAF\u5EA7",
            201402: "\u6C34\u74F6\u5EA7",
            201403: "\u53CC\u9C7C\u5EA7",
            201404: "\u767D\u7F8A\u5EA7",
            201405: "\u91D1\u725B\u5EA7",
            201406: "\u53CC\u5B50\u5EA7",
            201407: "\u5DE8\u87F9\u5EA7",
            201408: "\u72EE\u5B50\u5EA7",
            201409: "\u5904\u5973\u5EA7",
            201410: "\u5929\u79E4\u5EA7",
            201411: "\u5929\u874E\u5EA7",
            201412: "\u5C04\u624B\u5EA7"
        },
        initial: function() {},
        getMonthIcon: function(n, t) {
            t = t || 1;
            for (var i = '<div class="month_icon_theme_' + t + '">', o = "", e = 201401; 201412 >= e; e++) o = n && n[e] ? " month_icon_" + e : " month_icon_gray_" + e, i += '<a href="/tbmall/monthicon" target="_blank" title="' + this.iconTitle[e] + '" class="' + o + '"></a>';
            return i += "</div>"
        }
    }
});
_.Module.define({
    path: "puser/widget/Residual",
    requires: [],
    sub: {
        initial: function(i) {
            this.dataObj = i, this.initOptions()
        },
        initOptions: function() {
            this.options = {
                1070001: "worship",
                1070002: "egg"
            }
        },
        getResidualKey: function(i) {
            for (var e = i.props || {}, s = null, n = "", t = ["1070002", "1070001"], a = 0; a < t.length; a++)
                if (s = e[t[a]], s && s.num > 0 && s.end_time > Env.server_time / 1e3) {
                    n = this.options[t[a]];
                    break
                }
            return n
        },
        showUI: function(i) {
            var e = i.wrap,
                s = "",
                n = null,
                t = i.key || this.getResidualKey(i);
            t && (s = "residual_wrap residual_wrap_" + t, n = e.find(".residual_wrap"), n[0] ? n.removeClass().addClass(s) : (n = $('<div class="' + s + '"></div>'), e.append(n)))
        }
    }
});
_.Module.define({
    path: "pcommon/widget/JoinVipDialog",
    sub: {
        _body: null,
        _agreeKnown: !0,
        _dataMap: {},
        _badgeLv: "month_v2",
        _monthNum: 3,
        _use_left_bean: 0,
        _all_scores: 0,
        _user_scores: 0,
        _packet_id: 0,
        _tbs: "",
        _price: "0",
        _dialog: null,
        _badge1_tpl: ['	<div class=" tshow_join_vip_block_btn tshow_join_vip_badge_btn "  data-id="month_v1">', '<div class="tshow_join_vip_block_btn_info">', '<img class="tshow_join_vip_badge_icon" src="http://tieba.baidu.com/tb/cms/tbmall/jzxz_icon.png" /><span class="badge_lv1 ">\u8D34\u5427\u4F1A\u5458</span></div>', "</div>"].join(""),
        _badge2_tpl: ['<div class="tshow_join_vip_block_btn tshow_join_vip_badge_btn badge_lv2  tshow_join_vip_block_btn_active "  data-id="month_v2">', '<div class="tshow_join_vip_block_btn_info">', '<img class="tshow_join_vip_badge_icon" src="http://tieba.baidu.com/tb/cms/tbmall/wxxz_icon.png" /><span class="badge_lv1 ">\u8D34\u5427\u8D85\u7EA7\u4F1A\u5458</span>', "</div>", '<div class="tshow_join_vip_recommend_tip"></div>', "</div>"].join(""),
        initial: function() {
            this._tbs = PageData.tbs, this._bindEvent()
        },
        getMemberDialog: function() {
            return PageData.user.is_login ? (this._flowRateTest(), !1) : (_.Module.use("pcommon/widget/LoginDialog"), !1)
        },
        _bindEvent: function() {
            var _ = this;
            $("body").off("click.j_join_vip"), $("body").delegate(".j_tbmall_join_vip_btn", "click.j_join_vip", function() {
                return _.getMemberDialog(), !1
            }).delegate(".tshow_join_vip_badge_btn", "click.j_join_vip", function() {
                _._badgeBtnClickAction(this)
            }).delegate(".tshow_join_vip_month_count_btn", "click.j_join_vip", function() {
                _._monthBtnClickAction(this)
            }).delegate(".j_tshow_join_vip_use_leave", "click.j_join_vip", function() {
                _._useLeftBtnClickAction(this)
            }).delegate("#j_agree_known", "click", function() {
                _._agreeKnown = $(this)[0].checked, 1 == _._agreeKnown ? $(".tshow_join_vip_open_btn_disable").removeClass("tshow_join_vip_open_btn_disable").addClass("tshow_join_vip_open_btn") : $(".tshow_join_vip_open_btn").removeClass("tshow_join_vip_open_btn").addClass("tshow_join_vip_open_btn_disable")
            }).delegate(".tshow_join_vip_open_btn_content .tshow_join_vip_open_btn", "click.j_join_vip", function() {
                _._getOrderId()
            }).delegate(".tshow_join_vip_j_charge_success_btn", "click.j_join_vip", function() {
                _._dialog.close(), _._confirmChargeState()
            }).delegate(".tshow_join_vip_j_charge_fail_btn", "click.j_join_vip", function() {
                _._dialog.close()
            })
        },
        _badgeBtnClickAction: function(_) {
            _ = $(_), $(".tshow_join_vip_badge_btn").removeClass("tshow_join_vip_block_btn_active"), this._badgeLv = _.tbattr("data-id"), $(_).addClass("tshow_join_vip_block_btn_active");
            var i = this;
            this._getBadgeInfo("need_bean", function(_) {
                i._updatePriceAction(_)
            })
        },
        _monthBtnClickAction: function(_) {
            _ = $(_), $(".tshow_join_vip_month_count_btn").removeClass("tshow_join_vip_block_btn_active"), this._monthNum = _.tbattr("data-id"), $(_).addClass("tshow_join_vip_block_btn_active");
            var i = this;
            this._getBadgeInfo("need_bean", function(_) {
                i._updatePriceAction(_)
            })
        },
        _useLeftBtnClickAction: function() {
            var _ = this;
            _._use_left_bean = $(".tshow_join_vip_use_leave")[0].checked ? 1 : 0, this._getBadgeInfo("need_bean", function(i) {
                _._updatePriceAction(i)
            })
        },
        _updatePriceAction: function(_) {
            this._price = _, $(".j_cost_total").html(_);
            var i;
            this._use_left_bean = $(".tshow_join_vip_use_leave")[0].checked ? 1 : 0, i = this._use_left_bean ? Math.max(0, _ - this._dataMap.use_scores) : _, $(".tshow_join_vip_red").html(Math.ceil(i / 1e3))
        },
        _initDataMap: function() {
            var _ = this;
            $.get("/tbmall/bwstshow", function(i) {
                if (0 == i.no) {
                    _._dataMap = i.data;
                    var t = $(".j_month_content"),
                        o = $(".j_badge_content");
                    $(".j_tshow_join_vip_block_use_scores").html(_._dataMap.use_scores), $(".j_tshow_join_vip_block_all_scores").html(_._dataMap.all_scores);
                    for (var n = 0; n < i.data.month_v1.length; n++) t.append('	<div class="tshow_join_vip_block_btn tshow_join_vip_month_count_btn ' + (3 == n ? "tshow_join_vip_block_btn_active" : "") + '"  data-id="' + i.data.month_v1[n].month_num + '" >' + i.data.month_v1[n].month_num + "\u4E2A\u6708" + (3 == n ? '<div class="tshow_join_vip_recommend_tip"></div>' : "") + "</div>");
                    _._dataMap.user.Parr_props && _._dataMap.user.Parr_props.level && 2 == _._dataMap.user.Parr_props.level.props_id && 1e3 * _._dataMap.user.Parr_props.level.end_time > (new Date).getTime() || o.append(_._badge1_tpl), o.append(_._badge2_tpl), _._use_left_bean = $(".badge_lv2").trigger("click"), $(".tshow_join_vip_month_count_btn").eq(3).trigger("click")
                } else _._showDialog("\u9519\u8BEF\u63D0\u793A", "\u83B7\u53D6\u4FE1\u606F\u5931\u8D25", 200)
            })
        },
        _build: function() {
            var _ = ['<div id="tshow_join_vip_wrapper">', '<div class="tshow_join_vip_block clearfix">', '<div class="tshow_join_vip_block_title">\u5F00\u901A\u4F1A\u5458\u7C7B\u578B\uFF1A</div>', '<div class="tshow_join_vip_block_content j_badge_content">', "</div>", "</div>", '<div class="tshow_join_vip_block clearfix">', '<div class="tshow_join_vip_block_title">\u5F00\u901A\u65F6\u957F\uFF1A</div>', '<div class="tshow_join_vip_block_content j_month_content">', "</div>", "</div>", '<div class="tshow_join_vip_block clearfix">', '<div class="tshow_join_vip_block_title tshow_join_vip_block_bottom"></div>', '<div class="tshow_join_vip_block_content tshow_join_vip_block_bottom">', '<span class="contsigncard_tip"><span class="red_sign">*</span>\u5F00\u901A12\u4E2A\u6708\u8D85\u7EA7\u4F1A\u5458\u8D60\u9001<span class="strong_txt">\u8FDE\u7EED\u7B7E\u5230\u53613\u5F20</span></span>', "</div>", "</div>", '<div class="tshow_join_vip_block clearfix">', '<div class="tshow_join_vip_block_title tshow_join_vip_block_bottom">\u603B\u4EF7\uFF1A</div>', '<div class="tshow_join_vip_block_content tshow_join_vip_block_bottom">', '<div class="tshow_join_vip_block_info"><span class="j_cost_total tshow_cost_total">360000</span>T\u8C46 <input type="checkbox" class="tshow_join_vip_use_leave j_tshow_join_vip_use_leave" name="use_leave" /><span class="tshow_join_vip_block_tip" >\u4F7F\u7528T\u8C46\u4F59\u989D(\u53EF\u7528\u4F59\u989D<span class="j_tshow_join_vip_block_use_scores" >\u52A0\u8F7D\u4E2D..</span> \u603B\u4F59\u989D<span  class="j_tshow_join_vip_block_all_scores" >\u52A0\u8F7D\u4E2D..</span>)</span></div >', "</div>", "</div>", '<div class="tshow_join_vip_block clearfix">', '<div class="tshow_join_vip_block_title tshow_join_vip_block_bottom">\u9700\u8981\u82B1\u8D39\uFF1A</div>', '<div class="tshow_join_vip_block_content tshow_join_vip_block_bottom">', '<div class="tshow_join_vip_block_info"><span class="tshow_join_vip_info"><span class="tshow_join_vip_red">360</span>\u767E\u5EA6\u70B9\u5238(1\u70B9\u5238 = 1000T\u8C46 = 1\u5143\u4EBA\u6C11\u5E01)</span></div >', "</div>", "</div>", '<div class="tshow_join_vip_block tshow_join_vip_open_btn_section">', '<div class="tshow_join_vip_open_btn_content clearfix">', '<div class="tshow_join_vip_open_btn"><i  class="tshow_join_vip_open_btn_left"></i>\u7ACB\u5373\u5F00\u901A</div>', '<div class="tshow_join_vip_open_btn_tip"><input type="checkbox" checked id="j_agree_known" name="agree" /><a href="/tb/tdouprecautions.html" target="_blank">\u540C\u610FT\u8C46\u4F7F\u7528\u987B\u77E5</a></div>', "</div>", "</div>", "</div>", '<div class="tshow_cont_sign_intro"><div class="question"><span class="question-icon"></span>\u4EC0\u4E48\u662F\u8FDE\u7EED\u7B7E\u5230\u5361</div> <div class="answer">\u4F7F\u7528\u8FDE\u7EED\u7B7E\u5230\u5361,\u53EF\u628A\u67D0\u4E2A\u5427\u6240\u6709\u7684\u7B7E\u5230\u5929\u6570\u8FDE\u7EED\u5728\u4E00\u8D77!</div></div> '].join("");
            this._body = $(_), this._showDialog("\u5F00\u901A\u8D34\u5427\u4F1A\u5458", this._body, 650)
        },
        _chargingDialog: function() {
            var _ = "<p class='tshow_join_vip_dialog_content'>\u8BF7\u5728\u65B0\u6253\u5F00\u7684\u9875\u9762\u4E0A\u5B8C\u6210\u5F00\u901A\u4F1A\u5458\u7684\u652F\u4ED8\u64CD\u4F5C</p><p class='tshow_join_vip_dialog_second_content'>\u652F\u4ED8\u5B8C\u6210\u524D&nbsp;&nbsp;&nbsp;&nbsp;\u8BF7\u52FF\u5173\u95ED\u7A97\u53E3</p><div class='tshow_join_vip_dialog_btn_wrap'><a class='tshow_join_vip_charge_btns tshow_join_vip_j_charge_success_btn'>\u652F\u4ED8\u6210\u529F</a><a class='tshow_join_vip_charge_btns tshow_join_vip_j_charge_fail_btn'>\u652F\u4ED8\u5931\u8D25</a></div>";
            this._showDialog("\u5145\u503CT\u8C46", _, 500)
        },
        _getBadgeInfo: function(_, i) {
            for (var t = 0; t < this._dataMap[this._badgeLv].length; t++)
                if (this._dataMap[this._badgeLv][t].month_num == this._monthNum) {
                    if (!i) return this._dataMap[this._badgeLv][t][_];
                    i(this._dataMap[this._badgeLv][t][_]);
                    break
                }
        },
        _getOrderId: function() {
            var _ = this,
                i = _._price <= _._dataMap.all_scores && _._use_left_bean;
            if (this._dialog.close(), !i) {
                this._chargingDialog();
                var t = window.open("about:blank")
            }
            this._getBadgeInfo("packet_id", function(i) {
                _._packet_id = i
            });
            var o = {
                ie: "utf-8",
                tbs: this._tbs,
                packet_id: this._packet_id
            };
            o.use_left_bean = _._use_left_bean, $.ajax({
                type: "POST",
                url: "/tbmall/buytshow",
                dataType: "json",
                data: o,
                success: function(o) {
                    switch (o.no) {
                        case 0:
                            !i && o.data.dubi_url ? (_._order_id = o.data.order_id, t.location = o.data.dubi_url) : _._bubble = _._showBubble("<span class='tshow_join_vip_charge_btns success_bubble_icon' ></span><span class='small_bubble_content'>\u5DF2\u6210\u529F\u5F00\u901A\u4F1A\u5458", 1500, "canClose", function() {
                                $.tb.location.reload()
                            });
                            break;
                        default:
                            _._showDialog("\u64CD\u4F5C\u5931\u8D25", o.no, 200)
                    }
                }
            })
        },
        _confirmChargeState: function() {
            var _ = this,
                i = 6;
            this._bubble = this._showBubble("\u6B63\u5728\u9A8C\u8BC1\u652F\u4ED8\u4E2D\uFF0C\u8BF7\u7A0D\u5019" + i + "\u79D2...");
            var t = setInterval(function() {
                if (i--, _._bubble.html("\u6B63\u5728\u9A8C\u8BC1\u652F\u4ED8\u4E2D\uFF0C\u8BF7\u7A0D\u5019" + i + "\u79D2..."), i % 2 == 0) {
                    var o = {
                        ie: "utf-8",
                        tbs: _._tbs,
                        order_id: _._order_id
                    };
                    $.ajax({
                        type: "POST",
                        url: "/tbmall/checkorder",
                        dataType: "json",
                        data: o,
                        success: function(o) {
                            switch (o.no) {
                                case 0:
                                    1e4 == o.data.result_code && (_._closeBubble(_._bubble), _._bubble = _._showBubble("<span class='tshow_join_vip_charge_btns success_bubble_icon' ></span><span class='small_bubble_content'>\u5DF2\u6210\u529F\u5F00\u901A\u4F1A\u5458", 1500, "canClose", function() {
                                        $.tb.location.reload()
                                    }), clearInterval(t)), 0 >= i && (_._closeBubble(_._bubble), _._bubble = _._showBubble("<span class='tshow_join_vip_charge_btns fail_bubble_icon' ></span><span class='small_bubble_content'>\u62B1\u6B49,\u5F00\u901A\u4F1A\u5458\u6CA1\u6709\u6210\u529F</span>", 1500, "canClose"), clearInterval(t));
                                    break;
                                case 1:
                                case 2:
                                default:
                                    0 >= i && (_._closeBubble(_._bubble), _._bubble = _._showBubble("<span class='tshow_join_vip_charge_btns fail_bubble_icon' ></span><span class='small_bubble_content'>\u62B1\u6B49,\u7CFB\u7EDF\u51FA\u73B0\u5F02\u5E38,\u8BF7\u5237\u65B0\u9875\u9762\u67E5\u770B\u4EA4\u6613\u8BB0\u5F55</span>", 1500, "canClose"), clearInterval(t))
                            }
                        },
                        error: function() {
                            _._bubble.html("<p>\u672A\u77E5\u9519\u8BEF</p>"), clearInterval(t)
                        }
                    })
                }
                0 >= i && clearInterval(t)
            }, 1e3)
        },
        _showDialog: function(_, i, t) {
            this._dialog = new $.dialog({
                html: i,
                title: _,
                width: t,
                hideOnclose: !1,
                draggable: !1,
                closeable: !0
            })
        },
        _showBubble: function(_, i, t, o) {
            var n = $("<div class='small_bubble_block'  ></div>");
            return n.append(_), $("body").append(n), n.css({
                left: $(window).width() / 2 - n.width() / 2,
                top: $(window).height() / 2
            }), $(window).resize(function() {
                n.css({
                    left: $(window).width() / 2 - n.width() / 2,
                    top: $(window).height() / 2
                })
            }), t && n.click(function() {
                $(this).remove()
            }), i ? (this._closeBubble(n, i, o), void 0) : n
        },
        _closeBubble: function(_, i, t) {
            i && i > 0 ? setTimeout(function() {
                _.fadeOut("normal", function() {
                    _.remove(), "function" == typeof t && t()
                })
            }, i) : _.fadeOut("normal", function() {
                _.remove()
            })
        },
        _flowRateTest: function() {
            var _ = window.open("");
            $.get("/tbmall/getPayUrl?terminal=pc&pay_type=1", function(i) {
                i.data && (_.location.href = i.data)
            })
        }
    }
});
_.Module.define({
    path: "puser/widget/UserVisitCard",
    requires: ["pcommon/widget/Card", "UserVisitCardBase", "puser/widget/Interaction", "puser/widget/Residual", "pcommon/widget/JoinVipDialog"],
    sub: {
        _visit_card: null,
        _visit_card_ajax: null,
        _option: {
            width: 370
        },
        initial: function(i, a) {
            window.Page && Page.checkLoadedModules("UserVisitCard") || (this.dataObj = i, this._wrap = $("body"), this._util = this.use("userVisitCardBase"), this._interaction = this.use("puser/widget/Interaction"), this._residual = this.use("puser/widget/Residual"), a || this.bindEvents())
        },
        bindEvents: function() {
            var i = this;
            this._wrap.delegate(".j_user_card", "mouseenter", function() {
                return i.buildCard($(this)), !1
            }), this._wrap.delegate(".j_user_card", "mouseleave", function() {
                return i._visit_card_ajax && i._visit_card_ajax.abort(), i._visit_card && i._visit_card.closeCard({
                    type: "delayClose",
                    time: 200
                }), i._visit_card = null, !1
            }), this._wrap.delegate(".card_userinfo_close", "click", function() {
                return $("#user_visit_card").remove(), !1
            })
        },
        buildCard: function(i) {
            var a = this;
            a._visit_card && (a._visit_card.closeCard(), a._visit_card = null);
            var t = '<div class="user_card_loading"><img src="/tb/static-ihome/img/loading2.gif"/>\u6B63\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E...</div>',
                e = {
                    content: t,
                    card_css: {
                        width: a._option.width,
                        zIndex: $.getcurzIndex()
                    },
                    auto_positon: !0,
                    event_target: i,
                    attr: "id='user_visit_card'",
                    wrap: $("body")
                };
            a._visit_card = a.use("pcommon/widget/Card", e), a._visit_card.showCard({
                type: "delayShow",
                time: 200
            }), a.buildVisitCard(i)
        },
        getVisitCardContent: function(i) {
            var a = this,
                t = {
                    ie: "utf-8"
                };
            i.un ? t.un = i.un : t.id = i.id, $.ajax({
                type: "get",
                url: "/home/get/panel",
                data: t,
                dataType: "json"
            }).success(function(t) {
                if (t && 0 === t.no) {
                    var e = t.data;
                    e.bg_id = i.bg_id;
                    var r = a._util.getVisitCardTpl(1, e, !0);
                    i.wrap.html(r)
                } else {
                    var r = '<div class="user_card_loading">\u7F51\u7EDC\u9519\u8BEF<a href="#" id="user_card_reload" class="user_card_reload">\u5237\u65B0</a></div>';
                    i.wrap.html(r)
                }
                i.callBack && $.isFunction(i.callBack) && i.callBack()
            })
        },
        buildVisitCard: function(i) {
            var a = this,
                t = {
                    ie: "utf-8"
                };
            i.getData().un ? t.un = i.getData().un : t.id = i.getData().id, a._visit_card_ajax && a._visit_card_ajax.abort(), a._visit_card_ajax = $.ajax({
                type: "get",
                url: "/home/get/panel",
                data: t,
                dataType: "json"
            }).success(function(t) {
                if (t && 0 === t.no) {
                    var e = t.data,
                        r = e.name == a.dataObj.uname,
                        s = a._util.getVisitCardTpl(r, e, !0);
                    a._visit_card.setContent(s), a._visit_card._j_card.bindData({
                        un: e.name
                    }), a._visit_card.showCard(), a._interaction._resetDataObj({
                        is_login: PageData.user.is_login,
                        un: e.name,
                        tbs: PageData.tbs
                    }), a._residual.showUI({
                        wrap: $("#user_visit_card .userinfo_head_wrap"),
                        props: e.appraise || {}
                    }), a._visit_card._j_card.find(".j_user_visit_card_joinvip").on("click", function() {
                        _.Module.use("pcommon/widget/JoinVipDialog", [], function(i) {
                            i.getMemberDialog()
                        })
                    }), $.stats.track("cardinfo", "ihome_v1")
                } else {
                    var s = '<div class="user_card_loading">\u7F51\u7EDC\u9519\u8BEF<a href="#" id="user_card_reload" class="user_card_reload">\u5237\u65B0</a></div>';
                    a._visit_card.setContent(s), $("#user_card_reload").on("click", function() {
                        return a.buildCard(i), !1
                    })
                }
            })
        },
        bindVisitCardEvent: function() {
            var i = this;
            i._visit_card.showCard({
                type: "delayShow",
                time: 200
            }), $.stats.track("cardinfo", "ihome_v1")
        }
    }
});;
_.Module.define({
    path: "puser/widget/UserVisitCard/UserVisitCardBase",
    requires: ["puser/widget/Icons", "pcommon/widget/UserHead", "pcommon/widget/MemberApi", "puser/widget/MonthIcon"],
    sub: {
        countLen: 0,
        initial: function() {},
        getVisitCardTpl: function(e, a, r) {
            var i = PageData.product || "",
                t = this.use("puser/widget/Icons"),
                n = this.use("pcommon/widget/UserHead"),
                s = this.use("puser/widget/MonthIcon"),
                o = this.use("pcommon/widget/MemberApi"),
                _ = n.getHeadFrameStyle(a, "105"),
                c = {
                    head_img: "/tb/static-ihome/img/panel_" + a.bg_id + ".jpg",
                    concernClass: "0" == a.can_followed ? "btn_concern_done" : "btn_concern",
                    un: encodeURIComponent(a.name),
                    btn_group: r ? this.getBtnGroup(a) : "",
                    frameClass: _.hasFrame ? "card_userinfo_left_frame" : "",
                    frameStyle: _.stylestr,
                    portrait: n.getHeadUrl(a),
                    fr: i,
                    icon_pre: t.getPreIconHtml(a.mParr_props, a.free_flag),
                    member_class: o.getMemberNameClass(a.mParr_props, a.free_flag),
                    name: a.name_show,
                    icon: t.getIconsHtml(a),
                    sex: a.sex,
                    tb_age: "-" == a.tb_age ? a.tb_age : a.tb_age + "\u5E74",
                    post_num: a.post_num,
                    good_num: a.good_num,
                    honor: s.getMonthIcon(a.tbmall_month_icon, 2),
                    honor_margin: this.getHonorMargin(),
                    vip_tips: this.getVipTips(a)
                };
            a.is_verify && "0" !== a.is_verify && (c.verify_info = this.getVerifyHTML(a.identify_info));
            var l = "";
            e || (l = '<div class="interaction_wrap interaction_wrap_theme2"><a class="#{concernClass}" target="_blank" href="#" onclick="return false"></a><a class="btn_sendmsg" target="_blank" href="http://msg.baidu.com/ms?ct=21&cm=1&tn=bmSendMessage&un=#{un}"></a></div>');
            var m = ['<div class="card_headinfo_wrap" id="card_headinfo_wrap">', '<img class="card_userinfo_img" src="#{head_img}"/>', '<a class="card_userinfo_guide" target="_blank" href="/tbmall/propslist?category=113"></a>', l, "</div>", '<div class="card_userinfo_wrap clearfix">', '<div class="card_userinfo_left #{frameClass}">', '<div class="userinfo_head_wrap">', '<div class="userinfo_head" style="#{frameStyle}"></div>', '<a href="/home/main?un=#{un}&fr=#{fr}&ie=utf-8" class="j_avatar" target="_blank"><img src="#{portrait}"/></a>', "</div>", "</div>", '<div class="card_userinfo_middle">', '<div class="card_userinfo_title clearfix">', '#{icon_pre}<a href="/home/main?un=#{un}&fr=#{fr}&ie=utf-8" target="_blank" class="userinfo_username #{member_class}">#{name}</a>#{icon}', "</div>", '<div class="card_userinfo_num clearfix">', '<span class="userinfo_sex userinfo_sex_#{sex}"></span>', "<span>\u5427\u9F84:#{tb_age}</span>", '<span class="userinfo_split"></span>', "<span>\u53D1\u8D34:#{post_num}</span>", "</div>", '<div class="card_userinfo_honor honor_margin_#{honor_margin} clearfix">', "#{honor}", "</div>", "#{vip_tips}", "</div>", "</div>", "#{verify_info}"].join("");
            return $.tb.format(m, c)
        },
        getBtnGroup: function(e) {
            var a = "";
            if (e.id !== PageData.user.id) {
                var r = e.can_begcard,
                    i = "";
                0 == r ? i = '<a class="btn_begcard j_begcard" href="#"></a>' : 1 == r ? i = '<a class="btn_begcard btn_forbidden">\u5DF2\u7533\u8BF7</a>' : 2 == r && (i = '<a class="btn_begcard btn_forbidden">\u5DF2\u4EA4\u6362</a>');
                var t = {
                    private_msg: "http://msg.baidu.com/ms?ct=21&cm=1&tn=bmSendMessage&un=" + encodeURIComponent(e.name),
                    btn_begcard: i
                };
                a = ['<div class="card_btn_grounps">', '<a class="btn_privatemsg" target="_blank" href="#{private_msg}"></a>', "#{btn_begcard}", "</div>"].join(""), a = $.tb.format(a, t)
            }
            return a
        },
        getIcon: function(e) {
            var a = "";
            return e.identity && (a += '<span title="\u8D34\u5427\u5B9E\u540D\u8BA4\u8BC1" class="card_userinfo_icon card_icon_verify"></span>'), e.meizhi_level > 0 && (a += '<a href="/p/' + e.meizhi_thread_id + '" target="_blank" title="\u8D34\u5427\u59B9\u7EB8\u8BA4\u8BC1" class="card_userinfo_icon meizhi_vip card_icon_meizhi_vip' + e.meizhi_level + '"></a>'), a
        },
        getHonor: function(e) {
            if (e.novice) return '<div class="grade_level grade_level_novice" title="\u8D34\u5427\u83DC\u9E1F">\u8D34\u5427\u83DC\u9E1F</div>';
            var a = {
                    manager: {
                        title: "\u5427\u4E3B",
                        level: 19
                    },
                    assist: {
                        title: "\u5C0F\u5427\u4E3B",
                        level: 20
                    },
                    picadmin: {
                        title: "\u56FE\u7247\u5C0F\u7F16",
                        level: 21
                    },
                    videoadmin: {
                        title: "\u89C6\u9891\u5C0F\u7F16",
                        level: 22
                    },
                    novice: {
                        title: "\u83DC\u9E1F",
                        level: 23
                    }
                },
                r = e.manager,
                i = null,
                t = "",
                n = "";
            this.countLen = 0;
            for (var s in r) {
                i = r[s];
                var o = i.forum_list.join("\u3001"),
                    _ = a[s];
                o = i.count > 2 ? o + "\u7B49\u5427" + _.title : o + "\u5427" + _.title, t += this.getHonorItem(_.level, i.count, o), this.countLen += String(i.count).length
            }
            var c = e.grade,
                l = [];
            for (var m in c) l.push(m);
            l.sort(function(e, a) {
                return a - e
            });
            for (var d = 0, f = l.length; f > d; d++) {
                i = c[l[d]];
                var o = i.forum_list.join("\u3001");
                i.count > 2 && (o += "\u5427\u7B49"), n += this.getHonorItem(l[d], i.count, o), this.countLen += String(i.count).length
            }
            return t + n
        },
        getHonorMargin: function() {
            var e = {
                    2: "8px",
                    3: "6px",
                    4: "4px"
                },
                a = this.countLen - 4;
            return e[a] || ""
        },
        getHonorItem: function(e, a, r) {
            var i = {
                    level: e,
                    title: r,
                    count: a
                },
                t = ['<div class="grade_level grade_level_#{level}" title="#{title}">', "<span>#{count}</span>", "</div>"].join("");
            return $.tb.format(t, i)
        },
        getVerifyHTML: function(e) {
            for (var a = {
                    verify_reason: e[0] && e[0].v_reason,
                    verify_forums: ""
                }, r = ['<div class="verify_wrap">', '<div class="verify_content">', '<div class="verify_desc">', "<span>\u5B98\u65B9\u8BA4\u8BC1\uFF1A</span>", "<span>#{verify_reason}</span>", "</div>", '<div class="verify_forum">', '<a class="verify_home" href="http://v.tieba.baidu.com/" target="_blank">\u7533\u8BF7\u4F01\u4E1A\u5B98\u65B9\u5427</a>', "<span>\u5165\u9A7B\u5427\uFF1A</span>", "#{verify_forums}", "<span>\u5B98\u65B9\u5427\u4E3B</span>", "</div>", "</div>", "</div>"].join(""), i = 0; i < e.length; i++) a.verify_forums += this.getVForumItem(i, e[i].forum_name);
            return $.tb.format(r, a)
        },
        getVForumItem: function(e, a) {
            var r = "",
                i = {},
                t = [];
            return a.length > 5 ? (r = a.substring(0, 5), r += "...") : r = a, i = {
                index: e,
                verify_forum_name: r,
                origin_forum_name: encodeURIComponent(a)
            }, t = ['<span class="verify_forum_info">', '<a target="_blank" class="verify_forum_name_#{index}" href="/f?ie=utf-8&kw=#{origin_forum_name}">#{verify_forum_name}</a>', '<a target="_blank" href="http://v.tieba.baidu.com/">', '<img class="verify_forum_icon" src="/tb/static-ihome/img/platform_blue_icon14.gif" alt="\u5B98\u65B9\u8BA4\u8BC1\u56FE\u6807" title="\u767E\u5EA6\u8D34\u5427\u5B98\u65B9\u5E73\u53F0\u8BA4\u8BC1">', "</a>", "</span>"].join(""), $.tb.format(t, i)
        },
        getVipTips: function(e) {
            var a = "",
                r = (new Date).getTime() / 1e3;
            return e.mParr_props && e.mParr_props.level && e.mParr_props.level.end_time > r && (a = '<p class="user_card_vip_tips"><a href="javascript:;" class="j_user_visit_card_joinvip" target="_blank">\u5F00\u901A\u4F1A\u5458</a>\u5C0A\u4EAB\u6635\u79F0\u7EA2\u540D\u7279\u6743 <a href="/tbmall/tshow?tab=detail&c=15" target="_blank">\u4E86\u89E3\u7279\u6743</a> </p>'), a
        }
    }
});
_.Module.define({
    path: "pfrs/widget/piaowu_tj",
    sub: {
        initial: function() {
            this._tongji()
        },
        _tongji: function() {
            $.stats.track("frs_\u5E16\u5B50\u5165\u53E3", "\u660E\u661F\u7968\u52A1\u4E8C\u671F", "frs", "\u5C55\u73B0");
            var i = $(".j_piao_info_buy_btn");
            len = i.size(), len > 0 && i.bind("click", function() {
                $.stats.track("frs_\u5E16\u5B50\u5165\u53E3", "\u660E\u661F\u7968\u52A1\u4E8C\u671F", "frs", "\u70B9\u51FB")
            })
        }
    }
});
_.Module.define({
    path: "pfrs/widget/ForumRecommend",
    requires: ["pcommon/component/SlideShow"],
    sub: {
        _slideShow: null,
        _slideConfig: {
            nav: ".slide_nav",
            target: "#slide_show",
            activeClass: "active",
            interval: 5e3,
            auto: !1,
            next: ".exchange",
            prev: "",
            delayLoadPic: !0,
            slide: {
                speed: 1e3
            }
        },
        initial: function() {
            $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {});
            var e = this,
                t = $("#forum_recommend"),
                i = t.find(".slide_nav li").length;
            e._slideShow = e.use("pcommon/component/SlideShow", e._slideConfig), 2 > i && t.find(".exchange").hide(), t.on("click", ".j_recommend_flow_click", function(e) {
                var t = $(e.currentTarget);
                if (!PageData.user.is_login) return TbCom.process("User", "buildLoginFrame"), !1;
                if ("1" === $(this).tbattr("is_clicked")) return !1;
                var i = {
                    fid: $(this).getData("data-fid").fid,
                    fname: $.tb.escapeHTML($(this).tbattr("title")),
                    uid: PageData.user.user_id,
                    ie: "gbk",
                    tbs: $.getPageData("tbs")
                };
                $.post("/f/like/commit/add", i, function(e) {
                    "undefined" == typeof e.no ? $.dialog.alert("<p style='text-align: center;'>\u8BF7\u6C42\u5F02\u5E38\uFF0C\u8BF7\u91CD\u8BD5\uFF01</p>", {
                        title: "\u5173\u6CE8\u7ED3\u679C",
                        acceptValue: "\u786E\u5B9A"
                    }) : ($.dialog.alert("<p style='text-align: center;'>\u5173\u6CE8\u6210\u529F\uFF01</p>", {
                        title: "\u5173\u6CE8\u7ED3\u679C",
                        acceptValue: "\u786E\u5B9A"
                    }), t.css("background-position", " -2px -140px"), t.tbattr("is_clicked", "1"))
                }, "json"), $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {})
            }), t.find(".all_attention").bind("click", function() {
                if (!PageData.user.is_login) return TbCom.process("User", "buildLoginFrame"), !1;
                $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {});
                for (var a = t.find(".active"), n = t.find(".list" + a.text()), c = n.children(".recommend_item"), o = 0; o < c.length; o++) {
                    var s = c.eq(o).find(".recommend_flow a"),
                        r = {
                            fid: s.getData("data-fid").fid,
                            fname: $.tb.escapeHTML(s.tbattr("title")),
                            uid: PageData.user.user_id,
                            ie: "gbk",
                            tbs: $.getPageData("tbs")
                        };
                    $.post("/f/like/commit/add", r)
                }
                return $.dialog.alert("<p style='text-align: center;'>\u5173\u6CE8\u6210\u529F\uFF01</p>", {
                    title: "\u5173\u6CE8\u7ED3\u679C",
                    acceptValue: "\u786E\u5B9A"
                }), 1 == i ? (t.hide(), void 0) : (n.remove(), a.remove(), i -= 1, e._slideShow = e.use("pcommon/component/SlideShow", e._slideConfig), 1 == i ? t.find(".exchange").hide() : e._slideShow.next(), void 0)
            }), t.on("click", ".exchange", function() {
                $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {})
            }), t.on("click", ".recommend_forum_pic", function() {
                $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {})
            }), t.on("click", ".recommend_item_p .name", function() {
                $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {})
            }), t.on("click", ".recommend_item", function() {
                $.stats.track("\u76F8\u5173\u5427\u63A8\u8350", "\u5B98\u65B9\u63A8\u8350\u7684\u5427", "frs", "click", {})
            })
        }
    }
});
_.Module.define({
    path: "pfrs/widget/localMutiImg",
    requires: [],
    sub: {
        initial: function(i) {
            this.option = i, this.$root = $(i.root), this.bindEvents(), this.showDotSlide()
        },
        bindEvents: function() {
            var i = this;
            i.use("pcommon/component/SlideShow", {
                target: i.$root.find(".tbui_slideshow_container"),
                activeClass: "turn_icon_active",
                interval: 5e3,
                auto: !0,
                nav: i.$root.find(".img_page"),
                delayLoadPic: !0,
                slide: {
                    speed: 500
                }
            })
        },
        showDotSlide: function() {
            var i = this,
                o = i.$root.find(".tbui_slideshow_container").find("li").size();
            2 > o && i.$root.find(".slide_img_toolbar").hide()
        }
    }
});
_.Module.define({
    path: "pfrs/widget/localSingleImg",
    requires: [],
    sub: {
        initial: function() {
            this.bindEvents()
        },
        bindEvents: function() {}
    }
});
_.Module.define({
    path: "pfrs/widget/localSpecialRcmd",
    requires: [],
    sub: {
        initial: function() {
            this.bindEvents()
        },
        bindEvents: function() {}
    }
});
_.Module.define({
    path: "pfrs/widget/localSeller",
    requires: [],
    sub: {
        initial: function() {
            this.bindEvents()
        },
        bindEvents: function() {}
    }
});
_.Module.define({
    path: "pfrs/widget/localSpreadLink",
    requires: [],
    sub: {
        initial: function() {
            this.bindEvents()
        },
        bindEvents: function() {}
    }
});
_.Module.define({
    path: "tbmall/widget/TbeanSafeAjax",
    requires: ["tbmall/widget/TbeanSafe"],
    sub: {
        initial: function() {},
        ajax: function(a) {
            var e = this,
                t = a.success || function() {},
                n = a.data || {},
                s = function(s) {
                    var u = e.use("tbmall/widget/TbeanSafe", {
                        json: s,
                        sucCallback: function(t) {
                            var s = $.extend({}, n, t),
                                u = $.extend({}, a);
                            u.data = s, e.ajax(u)
                        }
                    });
                    u.needCheck() || t(s)
                };
            return a.success = s, a.type = a.type || "post", a.dataType = a.dataType || "json", $.ajax(a)
        },
        post: function(a, e, t) {
            var n = {
                url: a,
                data: e,
                success: t
            };
            return this.ajax(n)
        }
    }
});
_.Module.define({
    path: "tbmall/widget/forumMemberDialog",
    requires: ["tbmall/widget/tbean_safe_ajax"],
    sub: {
        opts: {},
        initial: function(e) {
            var t = this,
                s = {
                    is_show_features: !0,
                    is_show_forum: !0,
                    current_time_order: 1,
                    current_option: null,
                    current_time_unit: 3,
                    current_forum_id: "",
                    current_forum_name: ""
                };
            this.opts = $.extend({}, s, e), this.tpl_data.forums = this.opts.forums, this.opts.scores = this.opts.scores || PageData.scores, this.safeAjax = this.use("tbmall/widget/tbean_safe_ajax"), this.showDialog({
                showTitle: !1,
                width: 886,
                height: t.opts.cnt_height || 295,
                html: t.buildInitHtml()
            }), t.opts.current_option = $($(".sel_time .j_pertime_unit")[t.opts.current_time_order]), t.opts.current_option.addClass("current_time_unit"), t.bindEvents()
        },
        bindEvents: function() {
            var e = this,
                t = $(".excharge_bd"),
                s = $("#customForum");
            t.delegate(".j_charge_tdou", "click", function(t) {
                var o = e.getTimeValue(),
                    a = e.opts.scores,
                    i = 0;
                a && (i = a.scores_money + a.scores_other);
                var r = parseInt(5e3 * o),
                    n = $("#customTime").val();
                return t.preventDefault(), e.opts.is_show_forum ? e.util._isEmpty($("#customForum").val()) ? (e.showErrorForum("empty"), void 0) : $.trim(n).length > 0 && !e.util._isPositiveDigital(n) ? (e._printTimeErrorInfo("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u503C"), void 0) : parseInt($.trim(n), 10) > 120 ? (e._printTimeErrorInfo("\u6700\u591A\u5145\u503C120\u4E2A\u6708"), $(this).val(120), void 0) : e.opts.isClickByUser ? r > i ? (e.initTdouNotEnough(i, r), void 0) : (e.initBuyMember(), void 0) : (e.checkHasForum(s.val(), function(t) {
                    e.opts.current_forum_id = t.data.forum_id, e.opts.current_forum_name = t.data.forum_name, r > i ? e.initTdouNotEnough(i, r) : e.initBuyMember()
                }), void 0) : r > i ? (e.initTdouNotEnough(i, r), void 0) : (e.initBuyMember(), void 0)
            }), $(".j_close_excharge").on("click", function(t) {
                t.preventDefault(), e.closeDialog()
            }), $(".excharge_bd").delegate(".j_pertime_unit", "click", function(t) {
                t.preventDefault(), e.changeCurrentOpt($(this), "current_time_unit"), e._close_tip_bubble(), e.changeTdouNum(), $("#customTime").val("")
            }), $(".excharge_bd").delegate("#customTime", "focus", function() {
                e.changeCurrentOpt($(this).closest(".j_customTime_unit"), "current_time_unit"), e.changeTdouNum()
            }), $(".excharge_bd").delegate("#customTime", "keyup", function() {
                var t = $(this).val();
                return $.trim(t).length > 0 && !e.util._isPositiveDigital(t) ? (e._printTimeErrorInfo("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u503C"), void 0) : parseInt($.trim(t), 10) > 120 ? (e._printTimeErrorInfo("\u6700\u591A\u5145\u503C120\u4E2A\u6708"), $(this).val(120), e.changeTdouNum(), void 0) : (e._close_tip_bubble(), e.changeTdouNum(), void 0)
            }), $(".sel_forum").delegate(".j_forum_unit", "click", function(t) {
                t.preventDefault();
                var o = $(this),
                    a = o.data("forumid"),
                    i = decodeURIComponent(o.text());
                e.hideErrorForum(), e.opts.current_forum_id = a, e.opts.current_forum_name = i, e.opts.isClickByUser = !0, s.val(i), $(".j_show_more").hasClass("show_more_forums_list") && $(".j_show_more").removeClass("show_more_forums_list")
            }), $(".sel_forum").delegate("#customForum", "keyup", function() {
                var t = e.opts.current_forum_name,
                    o = $.trim(s.val());
                t !== o && (e.opts.isClickByUser = !1), "" === o && e.hideErrorForum()
            }), $(".sel_forum").delegate("#customForum", "blur", function() {
                var t = s.val();
                return e.util._isEmpty(t) ? (e.showErrorForum("empty"), void 0) : $.trim(t).length > 0 && !e.util._isPositiveDigital(t) ? (e._printTimeErrorInfo("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u503C"), void 0) : parseInt($.trim(t), 10) > 120 ? (e._printTimeErrorInfo("\u6700\u591A\u5145\u503C120\u4E2A\u6708"), $(this).val(120), void 0) : (e._close_tip_bubble(), e.checkHasForum(t), void 0)
            }), $(".sel_forum").delegate(".j_get_more_f", "click", function(e) {
                e.preventDefault(), $(".j_show_more").toggleClass("show_more_forums_list")
            }), $(".excharge_bd").delegate(".j_get_tdou", "click", function(t) {
                t.preventDefault(), e.closeDialog(), _.Module.use("common/widget/JoinVipDialog", [], function(e) {
                    e.getMemberDialog()
                })
            })
        },
        initTdouNotEnough: function(e, t) {
            var s = this,
                o = s.getTimeValue(),
                a = {
                    month: o,
                    baidu_charge: t,
                    tdou_num: e
                };
            s.closeDialog(), s.chargeFailFn($.extend({}, a, {
                f_name: s.opts.current_forum_name
            }))
        },
        initBuyMember: function() {
            var e = this,
                t = e.getTimeValue(),
                s = PageData.user ? PageData.user.mParr_props ? PageData.user.mParr_props.forum_member ? PageData.user.mParr_props.forum_member[e.opts.current_forum_id] : null : null : null,
                o = function() {
                    e.safeAjax.ajax({
                        url: "/tbmall/mall/buyForumMember",
                        data: {
                            tbs: PageData.tbs,
                            forum_id: e.opts.current_forum_id,
                            buy_num: t
                        },
                        success: function(t) {
                            e.closeDialog(), e.chargeSuccessFn(t)
                        }
                    })
                },
                a = PageData.user ? PageData.user.mParr_props ? PageData.user.mParr_props.level ? 2 === PageData.user.mParr_props.level.props_id ? PageData.user.mParr_props.level.end_time : 0 : null : null : null,
                i = s ? s.end_time : 0,
                r = i || a,
                r = Math.max(Math.max(i, a), 1 * new Date / 1e3);
            if (t >= 24 || r && parseInt(r) + 31 * t * 24 * 60 * 60 - 1 * new Date / 1e3 >= 64281600) {
                var n = new $.dialog({
                        html: ['<a class="outpage_close j_close_excharge" href="#"></a>', '<div class="long_time_area">', '<p class="long_time_msg">\u5F00\u901A<b>\u3010' + e.opts.current_forum_name + "\u5427\u7279\u6743\u5305\u3011</b></p>", '<p class="long_time_msg"><b>\u7279\u6743\u65F6\u957F\u6700\u591A\u8FDE\u7EED\u5151\u636224\u4E2A\u6708\uFF0C\u8D85\u51FA\u90E8\u5206\u53EA\u8D60\u9001\u7ECF\u9A8C\u548C\u9053\u5177\u3002</b></p>', '<p class="long_time_msg">\u672C\u6B21\u5151\u6362\u9700\u8981<span class="tdou_num">' + 5e3 * t + "</span></p>", '<div class="long_time_operation">', '<a href="#" class="long_time_cancel_btn j_close_excharge">\u53D6&nbsp;\u6D88</a>', '<a href="#" class="long_time_accept_btn j_accept_excharge">\u786E&nbsp;\u8BA4</a>', "</div>", "</div>"].join(""),
                        width: 460,
                        height: 170,
                        showTitle: !1
                    }),
                    u = n.element;
                u.on("click", ".j_close_excharge", function(e) {
                    e.preventDefault(), n.close()
                }).on("click", ".j_accept_excharge", function(e) {
                    e.preventDefault(), o(), n.close()
                })
            } else o()
        },
        changeCurrentOpt: function(e, t) {
            var s = this;
            s.opts.current_option && s.opts.current_option.removeClass(t), s.opts.current_option = e, s.opts.current_option.addClass(t)
        },
        changeTdouNum: function() {
            var e = this;
            $(".sel_tdou .tdou_num").text(5e3 * e.getTimeValue())
        },
        getTimeValue: function() {
            var e = $.trim($("#customTime").val());
            return this.opts.current_option && this.opts.current_option.data("value") ? this.opts.current_option.data("value") : 0 === e.length && "" === e ? 0 : e
        },
        chargeSuccessFn: function(e) {
            var t = this,
                s = {
                    0: {
                        html: t.buildSuccessHtml(e.data),
                        height: 456
                    },
                    2270046: {
                        html: t.buildEnoughHtml(),
                        height: 216
                    }
                };
            0 == e.no && (t.opts.scores = $.extend(t.opts.scores, e.data.left_scores)), t.showDialog({
                width: 537,
                height: s[e.no].height,
                showTitle: !1,
                html: s[e.no].html
            }), $(".j_close_excharge, .j_excharge_confirm").on("click", function(e) {
                e.preventDefault(), t.closeDialog(), $.tb.location.reload()
            })
        },
        chargeFailFn: function(e) {
            var t = this;
            t.showDialog({
                width: 537,
                height: 226,
                showTitle: !1,
                html: t.buildFailHtml(e)
            }), $(".j_close_excharge").on("click", function(e) {
                e.preventDefault(), t.closeDialog()
            }), $(".j_get_tdou").on("click", function(e) {
                e.preventDefault(), t.closeDialog(), _.Module.use("common/widget/tcharge_dialog")
            })
        },
        buildInitHtml: function() {
            var e = this,
                t = baidu.template,
                s = e.opts.is_show_forum ? "\u5151\u6362\u7279\u6743\u5305" : "\u5151\u6362\u3010" + e.opts.current_forum_name + "\u5427\u3011\u7279\u6743\u5305";
            return ['<a class="outpage_close j_close_excharge" href="#"></a>', '<div class="excharge_hd">', $.tb.format(e.tpl.hd, {
                title: s
            }), "</div>", '<div class="excharge_bd">', '<div class="lp">', e.tpl.bd_lp_t, e.opts.is_show_features ? t(e.tpl.features, e.tpl_data) : "", "</div>", '<div class="rp">', e.opts.is_show_forum ? t(e.tpl.bd_rp_forum, e.tpl_data) : "", t(e.tpl.bd_rp_time, e.tpl_data), '<p class="long_time_warning">\u7279\u6743\u5305\u65F6\u957F(\u7D2F\u8BA1\u8D85\u7EA7\u4F1A\u5458)\u6700\u591A\u8FDE\u7EED24\u4E2A\u6708\uFF0C\u8D85\u51FA\u90E8\u5206\u53EA\u8D60\u9001\u7ECF\u9A8C\u548C\u9053\u5177\u3002</p>', $.tb.format(e.tpl.bd_rp_tdou, {
                tdou_num: 5e3 * e.opts.current_time_unit
            }), e.tpl.bd_rp_btn, "</div>", "</div>"].join("")
        },
        buildSuccessHtml: function(e) {
            {
                var t = this;
                baidu.template
            }
            return ['<a class="outpage_close j_close_excharge" href="#"></a>', '<div class="excharge_hd">', $.tb.format(t.tpl.hd, {
                title: "\u5151\u6362\u3010" + t.opts.current_forum_name + "\u5427\u3011\u7279\u6743\u5305"
            }), "</div>", '<div class="excharge_bd excharge_succ_bd">', $.tb.format(t.tpl.charge_success, $.extend(e, {
                end_time: t.util._getDate(e.end_time)
            })), "</div>"].join("")
        },
        buildEnoughHtml: function() {
            return ['<a class="outpage_close j_close_excharge" href="#"></a>', '<div class="excharge_bd excharge_enough_bd">', '<p class="main_intro">\u60A8\u5DF2\u5F00\u901A25\u4E2A\u5427\u7684\u7279\u6743\u5305\uFF0C\u8FBE\u5230\u7279\u6743\u5305\u6570\u91CF\u4E0A\u9650</p>', '<p class="sub_intro">\u7ACB\u5373\u5F00\u901A\u8D34\u5427\u4F1A\u5458\uFF0C\u5C3D\u4EAB\u8D34\u5427\u7279\u6743\u65E0\u4E0A\u9650</p>', '<a class="j_charge_confirm charge_tdou" href="#">\u5F00\u901A\u8D85\u7EA7\u4F1A\u5458</a>', "</div>"].join("")
        },
        buildFailHtml: function(e) {
            var t = this;
            return ['<a class="outpage_close j_close_excharge" href="#"></a>', '<div class="excharge_hd">', $.tb.format(t.tpl.hd, {
                title: "\u5151\u6362\u3010" + t.opts.current_forum_name + "\u5427\u3011\u7279\u6743\u5305"
            }), "</div>", '<div class="excharge_bd excharge_fail_bd">', '<div class="lp">', t.tpl.bd_lp_t, "<p>\u65F6\u957F\uFF1A" + e.month + "\u4E2A\u6708</p>", "</div>", '<div class="rp">', $.tb.format(t.tpl.charge_fail, e), "</div>", "</div>"].join("")
        },
        tpl_data: {
            forums: null,
            features: [{
                type: "\u7EA2\u8272\u6807\u9898"
            }, {
                type: "\u7ECF\u9A8C\u52A0\u901F"
            }, {
                type: "\u76F4\u9001\u7ECF\u9A8C"
            }, {
                type: "\u8865\u7B7E\u5361",
                num: "1"
            }, {
                type: "\u9B54\u62DC",
                num: "1"
            }, {
                type: "\u9B54\u86CB",
                num: "1"
            }],
            bd_rp_time: [1, 3, 6, 12]
        },
        tpl: {
            hd: '<p class="title">#{title}</p>',
            bd_lp_t: ['<div class="intro">', "<h5>\u3010\u7279\u6743\u5305\u3011</h5>", '<span class="forum_img_box"></span>', '<p class="tdou_num"><strong>5000</strong>/\u6708</p>', "</div>"].join(""),
            features: ['<ul class="features">', "<%for(var i = 0; i< features.length; i++){%>", '<li class="feature_<%=i%>"><%=features[i].type%>', "<%if (!!features[i].num) {%>", "<strong>X<%= features[i].num %></strong>", "<%}%>", "</li>", "<%}%>", "</ul>"].join(""),
            bd_rp_forum: ['<div class="sel_forum">', '<span class="sel_label">\u8BF7\u9009\u62E9\u5427:</span>', '<div class="sel_cnt">', '<input id="customForum" type="text" value=""/>\u5427', '<span class="error_forum_tip empty_forum_tip">\u8BF7\u9009\u62E9\u4E00\u4E2A\u5427</span>', '<span class="error_forum_tip hasNot_forum_tip">\u8BE5\u5427\u4E0D\u5B58\u5728</span>', "</div>", '<div class="forum_lists j_show_more">', "<%if (forums.length <= 6) {%>", "<%for(var i = 0; i < forums.length; i++) {%>", '<a class="per_forum_unit j_forum_unit" data-forumId="<%=forums[i].id%>" href="#"><%=forums[i]["f_name"]%></a>', "<%}%>", "<%}else {%>", '<a class="j_get_more_f">', '<span class="more_forum_btn"><ins></ins>\u66F4\u591A</span>', '<span class="less_forum_btn"><ins></ins>\u5173\u95ED</span>', "</a>", "<%for(var i = 0; i < 6; i++) {%>", '<a class="per_forum_unit j_forum_unit" data-forumId="<%=forums[i].id%>" href="#"><%=forums[i]["f_name"]%></a>', "<%}%>", '<div class="more_forums">', "<%for(var i = 6; i < forums.length; i++) {%>", '<a class="j_forum_unit per_forum_unit" data-forumId="<%=forums[i].id%>" href="#"><%=forums[i].f_name%></a>', "<%}%>", "</div>", "<%}%>", "</div>", "</div>"].join(""),
            bd_rp_time: ['<div class="sel_time">', '<span class="sel_label">\u8BF7\u9009\u62E9\u65F6\u957F:</span>', '<span class="sel_cnt">', "<%for(var i = 0; i< bd_rp_time.length; i++){%>", '<a class="j_pertime_unit per_time_unit" data-value="<%=bd_rp_time[i]%>">', "<strong><%=bd_rp_time[i]%></strong>\u4E2A\u6708", '<span class="decorate_icon"></span>', "</a>", "<%}%>", '<a class="j_customTime_unit per_time_unit custom_time">', '<input id="customTime" type="text" value=""/><span>\u4E2A\u6708</span>', '<span class="decorate_icon"></span>', "</a>", "</span>", "</div>"].join(""),
            bd_rp_tdou: ['<div class="sel_tdou">', '<span class="sel_label">\u9700\u8981T\u8C46:</span>', '<span class="tdou_num">#{tdou_num}</span>', "</div>"].join(""),
            bd_rp_btn: ['<a class="j_charge_tdou charge_tdou" href="#">\u7ACB\u5373\u5151\u6362</a>', '<p class="be_svip"><a class="j_get_tdou" href="#">\u8D85\u7EA7\u4F1A\u5458\u514D\u8D39\u4F7F\u7528\u7279\u6743</a></p>'].join(""),
            charge_success: ['<div class="charge_success_info">', '<p class="charge_month_num">\u60A8\u5DF2\u7ECF\u6210\u529F\u5151\u6362<strong class="forum_name">\u3010#{forum_name}\u5427\u7279\u6743\u5305\u3011</strong></p>', '<p class="expire_date">\u6709\u6548\u671F\u81F3#{end_time}</p>', "</div>", '<ul class="charge_success_feature">', '<li class="s_feature_1">', "<p>\u7EA2\u8272\u6807\u9898</p>", "<span></span>", "</li>", '<li class="s_feature_2">', "<p>\u7ECF\u9A8C\u52A0\u901F</p>", "<span></span>", "</li>", '<li class="s_feature_3">', "<p>\u76F4\u9001\u7ECF\u9A8C</p>", "<span></span>", "</li>", '<li class="s_feature_4">', "<p>\u9053\u5177\u8D60\u9001</p>", '<span class="props_1">\u8865\u7B7E\u5361X1</span>', '<span class="props_2">\u9B54\u62DCX1</span>', '<span class="props_3">\u9B54\u86CBX1</span>', "</li>", "</ul>", '<p class="success_btns">', '<a class="charge_tdou" href="/tbmall/mall/forumMember">\u8BE6\u7EC6\u4E86\u89E3\u7279\u6743</a>', '<a class="j_excharge_confirm charge_tdou" href="#">\u5173\u95ED</a>', "</p>"].join(""),
            charge_fail: ['<div class="fail_cnt">', '<p>\u5F00\u901A<strong class="forum_name">\u3010#{f_name}\u3011</strong>#{month}\u4E2A\u6708</p>', '<p>\u8BE5\u7279\u6743\u9700\u8981<span class="orange_num">#{baidu_charge}</span></p>', '<p>\u5F53\u524D\u60A8\u4EC5\u6709<span class="orange_num">#{tdou_num}</span></p>', "</div>", '<a class="j_get_tdou charge_tdou" href="#">\u83B7\u53D6T\u8C46</a>'].join("")
        },
        showErrorForum: function(e) {
            $(".error_forum_tip").hide(), $("." + e + "_forum_tip").css("display", "inline-block")
        },
        hideErrorForum: function() {
            $(".error_forum_tip").hide()
        },
        checkHasForum: function(e, t) {
            var s = this;
            $.post("../get/checkForum", {
                forum_name: encodeURIComponent(e),
                tbs: PageData.tbs
            }).done(function(e) {
                0 === e.no && (0 === e.data.forum_id && null === e.data.forum_name ? s.showErrorForum("hasNot") : (s.hideErrorForum(), $.isFunction(t) && t(e)))
            })
        },
        showDialog: function(e) {
            this._dialog = new $.dialog(e)
        },
        closeDialog: function() {
            this._dialog && this._dialog.close()
        },
        _build_tip_bubble: function(e) {
            var t = this,
                s = {
                    content: e,
                    arrow_dir: "up",
                    bubble_css: {
                        top: t.opts.is_show_forum ? 124 : 52,
                        right: 45,
                        width: 130,
                        "z-index": 9999
                    },
                    arrow_pos: {
                        left: 10
                    },
                    attr: "",
                    wrap: $(".sel_time"),
                    closeBtn: !0
                };
            this.opts.tip_bubble = new UiBubbleTipBase(s);
            var o = this.opts.tip_bubble;
            o.showBubble(), o.bind("onclose", function() {
                t._close_tip_bubble()
            })
        },
        _close_tip_bubble: function() {
            this.opts.tip_bubble && this.opts.tip_bubble.hideBubble()
        },
        _show_tip_bubble: function() {
            this.opts.tip_bubble && this.opts.tip_bubble.showBubble()
        },
        _printTimeErrorInfo: function(e) {
            this.opts.tip_bubble ? this._show_tip_bubble() : this._build_tip_bubble(e)
        },
        util: {
            _isEmpty: function(e) {
                return 0 === $.trim(e).length
            },
            _isPositiveDigital: function(e) {
                return /^[1-9]+[0-9]*]*$/.test(e)
            },
            _getDate: function(e) {
                var t = new Date(1e3 * e),
                    s = t.getFullYear(),
                    o = t.getMonth() + 1,
                    a = t.getDate();
                return s + "\u5E74" + o + "\u6708" + a + "\u65E5"
            }
        }
    }
});
_.Module.define({
    path: "puser/widget/myCurrentForum",
    requires: ["pcommon/widget/JoinVipDialog", "tbmall/widget/forumMemberDialog"],
    sub: {
        initial: function() {
            this.joinVipDialogInstance = this.use("pcommon/widget/JoinVipDialog"), this.user = PageData.user, this.forum = PageData.forum, this.bindEvents()
        },
        bindEvents: function() {
            var e = this;
            $(".user_level .badge, .user_level .badge_block").bind("click", function() {
                return window.open("/f/like/level?kw=" + PageData.forum.name_url + "&lv_t=lv_nav_intro"), !1
            }), $(".user_level .exp_bar").bind("click", function() {
                return window.open("/f/like/level?kw=" + PageData.forum.name_url + "&lv_t=lv_nav_who"), !1
            }), $(".user_level").on("click", ".j_exp_speedup", function(n) {
                if (n && n.preventDefault(), e.user.mParr_props && e.user.mParr_props.level && e.user.mParr_props.level.props_id > 0 && 1e3 * e.user.mParr_props.level.end_time > +new Date) return e.joinVipDialogInstance.getMemberDialog(), !1;
                new $.dialog({
                    html: '<h2 style="text-align:center;margin: 20px 0;">\u5F00\u901A\u9AD8\u7EA7\u4F1A\u5458,\u83B7\u7B7E\u5230<span style="color:orange">6</span>\u500D\u7ECF\u9A8C!</h2><div  style="text-align:center;margin: 20px 0;"><a class="j_join_vip ui_btn ui_btn_m" style="margin-right:20px;"><span><em>\u7ACB\u5373\u5F00\u901A</em></span></a><a class="ui_btn ui_btn_sub_m" target="_blank" href="http://tieba.baidu.com/tbmall/tshow"><span><em>\u4E86\u89E3\u4F1A\u5458</em></span></a></div>',
                    title: "\u63D0\u793A",
                    width: 500
                });
                return $(".j_join_vip").click(function(n) {
                    n && n.preventDefault(), e.joinVipDialogInstance.getMemberDialog()
                }), !1
            }), $(".j_beFMember").on("click", function(n) {
                n.preventDefault();
                var r = ($(this), {
                    scores_money: 0,
                    scores_other: 0
                });
                e.use("tbmall/widget/forumMemberDialog", {
                    is_show_features: !1,
                    is_show_forum: !1,
                    current_forum_id: e.forum.forum_id,
                    current_forum_name: e.forum.forum_name,
                    scores: e.user.Parr_scores ? e.user.Parr_scores : r,
                    cnt_height: 225,
                    callback: function() {
                        $.tb.location.reload()
                    }
                })
            }), $(".fMember_cnt").on("mouseover", function() {
                $(".feature_panel").is(":visible") || $(".feature_panel").show()
            }).on("mouseout", function() {
                $(".feature_panel").hide()
            })
        }
    }
});
_.Module.define({
    path: "pfrs/widget/star_platform_aside_offical_fans",
    require: ["common/widget/LoginDialog"],
    sub: {
        initial: function() {
            this.$wrap = $(".official_fans_wrap"), this.bindEvent()
        },
        bindEvent: function() {
            var i = this;
            i.$wrap.find(".login_btn").on("click", function(n) {
                return n.preventDefault(), PageData.is_login ? void 0 : void i.bindLogin()
            })
        },
        bindLogin: function() {
            this.requireInstanceAsync("common/widget/LoginDialog", [])
        }
    }
});
_.Module.define({
    path: "pplatform/widget/starPlatformAsideOfficalActivity",
    requires: ["pcommon/component/SlideShow"],
    sub: {
        _slideConfig: {
            target: "#platform_official_activity_container .official_activity_item_container",
            nav: "#official_activity_carousel_dot",
            activeClass: "turn_icon_active",
            interval: 3e3,
            auto: !0,
            effect: "slide",
            slide: {
                speed: 400
            }
        },
        initial: function(i) {
            this.args = i, this.slideCtrls = $(".official_activity_item_ctrl_container"), i.activity_length > 1 ? (this.slideShow = this.requireInstance("pcommon/component/SlideShow", this._slideConfig), this.slideCtrls.show()) : this.slideCtrls.hide()
        }
    }
});
_.Module.define({
    path: "pcommon/component/Card",
    requires: [],
    sub: {
        _option: {},
        _j_card: null,
        _open_timer: null,
        _close_timer: null,
        _is_show: !1,
        _is_first_show: !0,
        _default_option: {
            content: "",
            arrow_dir: "down",
            arrow_pos: {},
            card_css: {
                width: 170,
                "z-index": 1001
            },
            arrow_req: !0,
            auto_positon: !1,
            event_target: null,
            offset: {
                x: 0,
                y: 0
            },
            card_leave_display: !1,
            card_hover_show: !0,
            card_leave_hide: !1,
            attr: "",
            wrap: $("body")
        },
        initial: function(t) {
            var i = this;
            i._option = $.extend(!0, {}, i._default_option, t), this._buildCard()
        },
        _buildCard: function() {
            var t = this._option,
                i = this._genericTpl(),
                e = t.wrap;
            this._j_card = $(i), this._j_card.find(".j_content").html(t.content), e.append(this._j_card), delete t.card_css.height, this._j_card.css(t.card_css), t.card_css.height = this._j_card.find(".j_content").outerHeight(!0), this._arrow = this._j_card.find(".j_ui_white_arrow"), void 0 === t.arrow_pos.left && (this._arrow_left = t.card_css.width / 2 - 10, this._arrow.css({
                left: this._arrow_left
            })), this._arrow.css(t.arrow_pos), t.arrow_req || this._j_card.find(".j_ui_white_arrow").hide(), t.auto_positon && this._autoPosition()
        },
        _autoPosition: function() {
            var t = this._option,
                i = {},
                e = $(window).height(),
                _ = $(window).width(),
                o = ($(document).scrollLeft(), $(document).scrollTop()),
                r = (t.event_target.innerWidth(), t.event_target.innerHeight()),
                s = "",
                a = {
                    x: t.event_target.offset().left - t.card_css.width / 2 + t.event_target.outerWidth(!0) / 2,
                    y: t.event_target.offset().top - t.card_css.height - 10,
                    width: this._j_card.innerWidth(),
                    height: this._j_card.innerHeight() + this._arrow.innerHeight()
                };
            i.left = a.x, i.top = a.y;
            var n = t.arrow_pos.left || this._arrow_left,
                d = 15,
                h = _;
            _ < $(document).width() && (h = $(document).width());
            var c = h - (t.card_css.width + d);
            i.left < d ? (n += i.left - d, i.left = d) : i.left > c && (n += i.left - c, i.left = c), i.top < o ? (s = "up", i.top += r + (a.height || 0), i.top -= t.offset.y) : (i.top += i.top + r > o + e ? -r - (a.height || 0) : 0, s = "down", i.top += t.offset.y), this._arrow.removeClass("ui_white_down").removeClass("ui_white_up").addClass("ui_white_" + s).css({
                left: n
            }), this._j_card.css(i)
        },
        _genericTpl: function() {
            var t = this._option.attr,
                i = this._option.arrow_dir,
                e = ['<div class="ui_card_wrap" ' + t + ' style="visibility: hidden">', '<div class="j_content ui_card_content ">', "</div>", '<span class="j_ui_white_arrow arrow ui_white_' + i + '"></span>', "</div>"].join("");
            return e
        },
        showCard: function(t) {
            var i = this;
            i._close_timer && clearTimeout(i._close_timer), t && "delayShow" == t.type ? (i._open_timer && clearTimeout(i._open_timer), i._open_timer = setTimeout(function() {
                i._showCardDo()
            }, t.time)) : i._showCardDo()
        },
        closeCard: function(t) {
            var i = this;
            i._open_timer && clearTimeout(i._open_timer), t && "delayClose" == t.type ? i._close_timer = setTimeout(function() {
                i._closeCardDo()
            }, t.time) : i._closeCardDo()
        },
        hideCard: function(t) {
            var i = this;
            i._open_timer && clearTimeout(i._open_timer), t && "delayHide" == t.type ? i._close_timer = setTimeout(function() {
                i._hideCardDo()
            }, t.time) : i._hideCardDo()
        },
        _showCardDo: function() {
            var t = this;
            t._is_first_show && (this._j_card.bind("mouseenter", function() {
                t._option.card_hover_show && (t._is_show = !0)
            }), this._j_card.bind("mouseleave", function() {
                return t._option.card_leave_display ? !1 : (t._is_show = !1, t._option.card_leave_hide ? t.hideCard() : t.closeCard(), void 0)
            }), t._is_first_show = !1), this._j_card.css({
                visibility: "visible"
            })
        },
        _closeCardDo: function() {
            var t = this;
            this._j_card && !this._is_show && t._j_card.remove()
        },
        _hideCardDo: function() {
            var t = this;
            this._j_card && !this._is_show && t._j_card.css({
                visibility: "hidden"
            })
        },
        setContent: function(t) {
            var i = this._option;
            if (null !== this._j_card) {
                var e = this._j_card.find(".j_content");
                e.html(t), i.card_css.height = e.outerHeight(!0), this._j_card.css({
                    height: i.card_css.height
                }), i.auto_positon && this._autoPosition()
            }
        }
    }
});
_.Module.define({
    path: "pcommon/component/JsPager",
    sub: {
        _cfg: {},
        _amount: 0,
        _center_pos: 0,
        _jwrapper: null,
        _isNew: !0,
        _page_template: {
            normal: '<a href="#url#" index="#page#" #special#>#page#</a>',
            current: "<span #special#>#page#</span>",
            prev: '<a href="#url#" index="#page#" #special#>\u4E0A\u4E00\u9875</a>',
            next: '<a href="#url#" index="#page#" #special#>\u4E0B\u4E00\u9875</a>',
            head: '<a href="#url#" index="#page#" #special#>\u9996\u9875</a>',
            tail: '<a href="#url#" index="#page#" #special#>\u5C3E\u9875</a>',
            prev_disable: '<a href="#url#" index="#page#" #special#>\u4E0A\u4E00\u9875</a>',
            next_disable: '<a href="#url#" index="#page#" #special#>\u4E0B\u4E00\u9875</a>',
            head_disable: '<a href="#url#" index="#page#" #special#>\u9996\u9875</a>',
            tail_disable: '<a href="#url#" index="#page#" #special#>\u5C3E\u9875</a>',
            status: '<span #special#><span class="js_pager_idx">#page#</span>/<span class="js_pager_total">#total#</span></span>'
        },
        _default_cfg: {
            container: $("body"),
            amount: 10,
            isHtml: !1,
            current: 1,
            total: 10,
            mode: 0,
            url: "##",
            openInNew: !1,
            showStatus: !1,
            statusPos: "head",
            showDisableItem: !1,
            template: {},
            classname: {
                wrapper: "tbui_js_pager",
                normal: "",
                current: "current",
                prev: "prev",
                next: "next",
                head: "head",
                tail: "tail",
                status: "status",
                prev_disable: "prev_disable",
                next_disable: "next_disable",
                head_disable: "head_disable",
                tail_disable: "tail_disable"
            }
        },
        initial: function(e) {
            var a = this;
            if (a._isNew) {
                a._cfg = $.extend({}, a._default_cfg, e);
                var t = a._cfg;
                t.template = $.extend({}, a._page_template, t.template), t.amount = parseInt(t.amount), t.current = parseInt(t.current), t.total = parseInt(t.total), a._amount = t.total > t.amount ? t.amount : t.total, a._center_pos = parseInt((a._amount + 1) / 2)
            } else a._cfg = $.extend(a._cfg, e);
            a._amount <= 1 || (a._cfg.isHtml || a._render(), a._isNew = !1)
        },
        _render: function() {
            var e = this,
                a = e._cfg,
                t = [],
                r = "";
            if (a.showStatus && "head" === a.statusPos && t.push(e._generateHtml("status", a.current, a.total)), a.current > 1 ? (t.push(e._generateHtml("head", 1)), t.push(e._generateHtml("prev", a.current - 1))) : a.showDisableItem && (t.push(e._generateHtml("head_disable", 1)), t.push(e._generateHtml("prev_disable", a.current - 1))), e._amount) {
                var n, s, l, p;
                n = a.current - parseInt((e._amount - 1) / 2), s = a.current + e._center_pos, 1 > n ? (l = 1 - n, n = 1, s += l, s = s > a.total ? a.total : s) : s > a.total && (l = s - a.total, s = a.total, n -= l, n = 1 > n ? 1 : n);
                for (var i = n; s >= i; i++) p = i == a.current ? "current" : "normal", t.push(e._generateHtml(p, i))
            }
            if (a.current < a.total ? (t.push(e._generateHtml("next", a.current + 1)), t.push(e._generateHtml("tail", a.total))) : a.showDisableItem && (t.push(e._generateHtml("next_disable", a.current + 1)), t.push(e._generateHtml("tail_disable", a.total))), a.showStatus && "tail" === a.statusPos && t.push(e._generateHtml("status", a.current, a.total)), r = t.join(""), e._isNew && (e._jwrapper = $("<div>", {
                    "class": a.classname.wrapper
                }), e._jwrapper.bind("click", function(t) {
                    return "A" == t.target.nodeName && ("0" !== $(t.target).tbattr("ok") && e.trigger("pageChange", parseInt($(t.target).tbattr("index"))), 0 == a.mode) ? !1 : void 0
                }), !a.isHtml)) {
                var u = "string" == typeof a.container ? $("#" + a.container) : $(a.container);
                u.empty(), u.append(this._jwrapper)
            }
            return a.isHtml ? r : (e._jwrapper.html(r), void 0)
        },
        _generateHtml: function(e, a, t) {
            var r = "",
                n = this._cfg;
            r = n.template[e], r = r.replace(/#page#/g, a), r = r.replace(/#url#/g, n.url.replace(/\{page\}/g, a)), "undefined" != typeof t && (r = r.replace(/#total#/g, t));
            var s = "";
            return n.classname[e] && (s += 'class="' + n.classname[e] + '"'), n.openInNew && (s += " target=_blank"), -1 !== e.indexOf("disable") && (s += ' ok="0"'), r = r.replace(/#special#/, s)
        }
    }
});
_.Module.define({
    path: "pcommon/widget/wallet_dialog",
    requires: ["pcommon/component/Card", "pcommon/component/JsPager"],
    sub: {
        _dialog: null,
        _html: null,
        _pushPager: null,
        _popPager: null,
        _options: null,
        _pager_option: {
            container: null,
            amount: 3,
            current: 1,
            total: 0,
            mode: 0,
            showDisableItem: !0,
            template: {
                prev: '<a href="#url#" index="#page#" #special#>&lt;</a>',
                next: '<a href="#url#" index="#page#" #special#>&gt;</a>',
                prev_disable: '<a href="#url#" index="#page#" #special#>&lt;</a>',
                next_disable: '<a href="#url#" index="#page#" #special#>&gt;</a>',
                head: "",
                tail: "",
                head_disable: "",
                tail_disable: ""
            },
            classname: {
                wrapper: "tbui_js_pager wallet_js_pager",
                normal: "normal",
                current: "current",
                prev: "prev j_wallet_list_prev",
                next: "next j_wallet_next_prev",
                status: "status",
                prev_disable: "prev_disable",
                next_disable: "next_disable"
            }
        },
        initial: function() {},
        show: function(a) {
            var l = this;
            l._options = a || {}, l._dialog ? l._dialog.show() : l._buildCard()
        },
        hide: function() {
            this._dialog && this._dialog.hide()
        },
        _buildCard: function() {
            var a = this;
            $.ajax({
                url: "/tbmall/history?ie=utf8&c=1&pn=1&_t=" + (new Date).valueOf(),
                type: "get",
                dateType: "json",
                success: function(l) {
                    if (0 === l.no) {
                        a._buildInitHtml(l.data.user);
                        var t = {
                            html: a._html,
                            title: "\u6211\u7684T\u8C46\u94B1\u5305",
                            draggable: !1,
                            width: 700,
                            hideOnclose: !0
                        };
                        a._dialog = new $.dialog(t), a._buildPager(1, $("#wallet_dialog_msg_pop_pager"), a._popPager, a._popChange, l), a._buildPager(1, $("#wallet_dialog_msg_push_pager"), a._pushPager, a._pushChange), $("#wallet_dialog_tab").on("click", ".j_wallet_dialog_tab_item", function(a) {
                            var l = $(a.currentTarget);
                            $(".j_wallet_dialog_tab_item").removeClass("wallet_dialog_tab_current"), l.addClass("wallet_dialog_tab_current");
                            var t = l.tbattr("attr-show");
                            $(".j_wallet_dialog_msg_list").hide(), $(t).show()
                        }), $("#wallet_dialog_return").on("click", function(a) {
                            a.preventDefault(), $("#wallet_dialog_main").show(), $("#wallet_dialog_rules").hide()
                        }), $("#wallet_dialog_medal").on("click", ".j_wallet_dialog_medal_btn", function(l) {
                            l.preventDefault(), _.Module.use("pcommon/widget/JoinVipDialog", [], function(a) {
                                a.getMemberDialog()
                            }), a.hide()
                        }), $("#j_wallet_tcharge_dialog").on("click", function() {
                            a.hide(), _.Module.use("pcommon/widget/tcharge_dialog")
                        })
                    }
                },
                error: function() {}
            })
        },
        _popChange: function(a, l, t) {
            var e = this,
                s = 10;
            return t ? (e._buildPopPage.call(e, t), l(Math.ceil(t.data.total_count / s)), void 0) : ($.ajax({
                url: "/tbmall/history?ie=utf8&c=" + s + "&pn=" + a + "&_t=" + (new Date).valueOf(),
                type: "get",
                dateType: "json",
                success: function(t) {
                    0 === t.no && (e._buildPopPage.call(e, t, a), l(Math.ceil(t.data.total_count / s)))
                },
                error: function() {}
            }), void 0)
        },
        _formatDateTime: function(a) {
            var l = a || Date.now(),
                t = [];
            return t.push(l.getFullYear() + "\u5E74"), t.push(parseInt(l.getMonth() + 1) + "\u6708"), t.push(l.getDate() + "\u65E5&nbsp;"), t.push(l.getHours() + ":"), t.push(l.getMinutes()), t = t.join("")
        },
        _buildPopPage: function(a, l) {
            for (var t = a.data.order_info || [], e = [], s = 0; s < t.length; s++) {
                var _ = t[s],
                    i = new Date(1e3 * _.create_time),
                    n = this._formatDateTime(i);
                e.push('<li class="wallet_dialog_msg_list_item wallet_dialog_msg_list_item_pop">'), e.push('\u60A8\u6D88\u8D39\u4E86<span class="wallet_dialog_msg_tbean">' + _.scores + "T\u8C46</span>\uFF0C");
                var r = 0 == _.props_id.indexOf("105") ? "\u8D2D\u4E70" : "\u5151\u6362";
                e.push(r + '\u4E86\u9053\u5177<span class="wallet_dialog_msg_buy">' + _.props_name + "</span>"), e.push('<span class="wallet_dialog_msg_list_date">' + n + "</span>"), e.push("</li>")
            }
            0 == t.length && 1 == l && (e.push('<div class="wallet_dialog_msg_empty">'), e.push("\u60A8\u8FD8\u6CA1\u8D2D\u4E70\u8FC7\u4E1C\u897F\u54E6~\uFF0C<br>\u8D34\u5427\u65B0\u73A9\u6CD5\u4ECE\u9177\u70AB\u7279\u6743\u9053\u5177\u5F00\u59CB\u3002<br>"), e.push('<a target="_blank" href="/tbmall/home">\u8FDB\u5165\u5546\u57CE\u8D2D\u4E70&gt;&gt;</a>'), e.push("</div>")), e = e.join(""), $("#wallet_pop_list_main").html(e)
        },
        _pushChange: function(a, l) {
            var t = this,
                e = 5;
            $.ajax({
                url: "/tbmall/bwsdubiorder?ie=utf8&c=" + e + "&pn=" + a + "&_t=" + (new Date).valueOf(),
                type: "get",
                dateType: "json",
                success: function(s) {
                    0 === s.no && (t._buildPushPage.call(t, s, a), l(Math.ceil(s.data.total_num / e)))
                },
                error: function() {}
            })
        },
        _buildPushPage: function(a, l) {
            for (var t = a.data.order || [], e = [], s = 0; s < t.length; s++) {
                var _ = t[s],
                    i = new Date(1e3 * _.create_time),
                    n = this._formatDateTime(i),
                    r = parseInt(_.given_scores || 0, 10) + parseInt(_.scores || 0, 10);
                e.push('<li class="wallet_dialog_msg_list_item wallet_dialog_msg_list_item_push">'), e.push('<div class="wallet_dialog_order">\u8BA2\u5355\u53F7\uFF1A' + _.order_id + "</div>"), e.push('\u6D88\u8D39<span class="wallet_dialog_msg_tbean">' + _.db_money / 100 + "</span>\u767E\u5EA6\u70B9\u5238"), e.push("\u8D2D\u4E70\u3010\u8D34\u5427\u5370\u8BB0\u3011</span>"), parseInt(_.given_scores) && e.push('\u83B7\u8D60<span class="wallet_dialog_msg_tbean">' + r + "T\u8C46</span>"), e.push('<span class="wallet_dialog_msg_list_date">' + n + "</span>"), e.push("</li>")
            }
            0 == t.length && 1 == l && (e.push('<div class="wallet_dialog_msg_empty">'), e.push("\u60A8\u8FD8\u6CA1\u6709T\u8C46\u5145\u503C\u8BB0\u5F55\uFF0C<br>T\u8C46\u53EF\u4EE5\u8D2D\u4E70\u8D34\u5427\u4F1A\u5458\u4EE5\u53CA\u4F17\u591A\u9177\u70AB\u7279\u6743\u9053\u5177\u3002<br>"), e.push('<a target="_blank" href="/tbmall/home">\u67E5\u770B\u7279\u6743\u9053\u5177&gt;&gt;</a>'), e.push("</div>")), e = e.join(""), $("#wallet_push_list_main").html(e)
        },
        _buildPager: function(a, l, t, e) {
            var s = this;
            "function" == typeof e && e.call(s, a, function(_) {
                if (_ > 1) {
                    t = s.use("pcommon/component/JsPager", $.extend(s._pager_option, {
                        current: a,
                        total: _,
                        container: l
                    })), t.bind("pageChange", function(a, _) {
                        s._buildPager.call(s, _, l, t, e)
                    });
                    var i = ['<div class="wallet_js_pager_skip">', '<input type="text" class="wallet_pager_skip_text j_wallet_pager_skip_text" placeholder="\u8DF3\u8F6C\u5230" value="' + a + '"/>', '<a class="wallet_pager_skip_btn j_wallet_pager_skip_btn" href="#">\u8DF3\u8F6C</a>', "</div>"].join("");
                    pagerTotal = '<div class="wallet_js_pager_total">\u5171' + _ + "\u9875</div>", $(pagerTotal).prependTo(l), $pagerSkip = $(i), $pagerSkip.on("click", ".j_wallet_pager_skip_btn", function(i) {
                        i.preventDefault();
                        var n = parseInt($pagerSkip.find(".j_wallet_pager_skip_text").val());
                        return n > _ || !(n > 0) ? ($pagerSkip.find(".j_wallet_pager_skip_text").val(a), void 0) : (s._buildPager.call(s, n, l, t, e), void 0)
                    })
                }
            })
        },
        _buildInitHtml: function(a) {
            var l = a.Parr_scores || [],
                t = a.Parr_props ? a.Parr_props.level ? a.Parr_props.level : [] : [],
                e = t.end_time ? parseInt((new Date).valueOf() / 1e3) > t.end_time ? 0 : t.props_id : 0,
                s = a.setpass,
                _ = [];
            _.push('<div id="wallet_dialog_medal" class="wallet_dialog_medal clearfix">'), e ? 1 == t.props_id ? (_.push('<span class="wallet_dialog_medal_text"><span class="showicon showicon_low"></span>\u4F1A\u5458\u4E13\u5C5E\u7279\u6743</span>'), _.push('<a class="wallet_dialog_continue_btn  j_wallet_dialog_medal_btn" href="#">\u7EED\u8D39</a>')) : (_.push('<span class="wallet_dialog_medal_text"><span class="showicon showicon_high"></span>\u4F1A\u5458\u4E13\u5C5E\u7279\u6743</span>'), _.push('<a class="wallet_dialog_continue_btn  j_wallet_dialog_medal_btn" href="#">\u7EED\u8D39</a>')) : (_.push('<a href="#" class="wallet_dialog_medal_open_btn  j_wallet_dialog_medal_btn"><span class="showicon showicon_high"></span>\u5F00\u901A\u4F1A\u5458</a>'), _.push('<span class="wallet_dialog_medal_text">\u5C0A\u4EAB\u7279\u6743</span>')), _.push("</div>"), _ = _.join("");
            var i = this._getInfoHtml(l, s),
                n = this._getIntroHtml(),
                r = this._getMsgHtml(),
                o = this._getRuleHtml(),
                d = ['<div class="wallet_dialog_main clearfix" id="wallet_dialog_main">', '<div class="wallet_dialog_user">', i, '<div class="wallet_dialog_user_power">', _, n, "</div>", "</div>", r, "</div>", o];
            this._html = d.join("")
        },
        _getIntroHtml: function() {
            var a = ['<div class="wallet_dialog_power_list clearfix">', '<a href="/tbmall/tshow?tab=detail&c=0"   target="_blank" class="wallet_dialog_power_item power_identity">\u5C0A\u8D35\u8EAB\u4EFD</a>', '<a href="/tbmall/tshow?tab=detail&c=112" target="_blank" class="wallet_dialog_power_item power_nameplate">\u4E2A\u6027\u94ED\u724C</a>', '<a href="/tbmall/tshow?tab=detail&c=110" target="_blank" class="wallet_dialog_power_item power_dress">\u70AB\u9177\u88C5\u626E</a>', '<a href="/tbmall/tshow?tab=detail&c=103" target="_blank" class="wallet_dialog_power_item power_post">\u8DA3\u5473\u53D1\u8D34</a>', '<a href="/tbmall/tshow?tab=detail&c=108" target="_blank" class="wallet_dialog_power_item power_magic">\u9B54\u6CD5\u9053\u5177</a>', "</div>"].join("");
            return a
        },
        _parseInt: function(a) {
            return a = parseInt(a), a > 0 ? a : 0 >= a ? a : 0
        },
        _getInfoHtml: function(a, l) {
            var t = this._parseInt(a.scores_money),
                e = this._parseInt(a.scores_other),
                s = this._parseInt(t + e),
                _ = ['<div class="wallet_dialog_user_info clearfix">', '<div class="wallet_dialog_my_tbean">', '<span class="wallet_dialog_tbean_label">\u6211\u7684T\u8C46\uFF1A</span>', '<span class="wallet_dialog_tbean_num"><span class="wallet_dialog_tbean_icon"></span>' + s + "</span>", "</div>", '<div class="wallet_dialog_recharge">', '<a href="javascript:;" id="j_wallet_tcharge_dialog" class="wallet_dialog_recharge_btn">\u83B7\u53D6T\u8C46</a>', '<a href="/tbmall/pass/set" class="wallet_dialog_paykey_set_btn" target="_blank">' + (l ? "\u4FEE\u6539\u5BC6\u7801" : "\u8BBE\u7F6E\u652F\u4ED8\u5BC6\u7801") + "</a>", "</div>", "</div>"].join("");
            return _
        },
        _getMsgHtml: function() {
            var a = ['<div class="wallet_dialog_msg">', '<div class="wallet_dialog_tab clearfix" id="wallet_dialog_tab">', '<a class="j_wallet_dialog_tab_item wallet_dialog_tab_item wallet_dialog_tab_current" attr-show="#wallet_pop_list">\u652F\u51FA\u8BB0\u5F55</a>', '<a class="j_wallet_dialog_tab_item wallet_dialog_tab_item" attr-show="#wallet_push_list">\u5145\u503C\u8BB0\u5F55</a>', "</div>", '<div class="wallet_dialog_tbody">', '<div class="j_wallet_dialog_msg_list wallet_dialog_msg_list wallet_pop_list clearfix" id="wallet_pop_list">', '<ul id="wallet_pop_list_main">', "</ul>", '<div class="clearfix"></div>', '<div class="wallet_dialog_msg_pager clearfix" id="wallet_dialog_msg_pop_pager"></div>', "</div>", '<div class="j_wallet_dialog_msg_list wallet_dialog_msg_list wallet_push_list " id="wallet_push_list">', '<ul id="wallet_push_list_main">', "</ul>", '<div class="clearfix"></div>', '<div class="wallet_dialog_msg_pager " id="wallet_dialog_msg_push_pager"></div>', "</div>", "</div>", "</div>"].join("");
            return a
        },
        _getRuleHtml: function() {
            var a = ['<div class="wallet_dialog_rules" id="wallet_dialog_rules">', '<a class="wallet_dialog_change_link" id="wallet_dialog_return" href="#">\u8FD4\u56DE\u6211\u7684T\u8C46\u94B1\u5305&gt;</a>', "<br><br>", "<h4>1.\u8C46\u7968\u8BF4\u660E</h4><hr>", "<p>\u8C46\u7968\u53EF\u4EE5\u8D2D\u4E70\u90E8\u5206\u8D34\u5427T\u8C46\u5546\u57CE\u5546\u54C1\uFF0C\u5177\u4F53\u53EF\u89C1\u5546\u57CE\u8D2D\u4E70\u65F6\u63D0\u793A\u3002</p><hr>", "<p>\u8C46\u7968\u53EF\u4F5C\u4E3A\u90E8\u5206\u8D34\u5427\u5546\u54C1(\u5305\u62EC\u8D34\u5427\u4F1A\u5458)\u7684\u62B5\u4EF7\u5238\u3002</p><hr>", "<h4>2.\u5728\u7EBF\u65F6\u95F4</h4><hr>", "<p>\u7528\u6237\u5728\u8D34\u5427\u6B63\u5E38\u5728\u7EBF\uFF08\u6709\u6D4F\u89C8\u5668\u884C\u4E3A\uFF09\uFF0C\u5373\u53EF\u6309\u5728\u7EBF\u7684\u65F6\u957F\u83B7\u5F97\u5BF9\u5E94\u7684\u8C46\u7968</p><hr>", "<table>", "<tbody>", '<tr><td class="no_rb">\u5728\u7EBF\u65F6\u957F</td><td class="no_rb">\u8C46\u7968\u83B7\u53D6\u6570\u91CF</td><td>\u8C46\u7968\u83B7\u53D6\u65E5\u4E0A\u9650</td></tr>', "<tr>", "<td>10\u5206\u949F</td>", '<td><span class="tbean"></span>10</td>', '<td rowspan="4"><span class="tbean"></span>100</td>', "</tr>", "<tr>", "<td>30\u5206\u949F</td>", '<td><span class="tbean"></span>20</td>', "</tr>", "<tr>", "<td>50\u5206\u949F</td>", '<td><span class="tbean"></span>30</td>', "</tr>", "<tr>", "<td>90\u5206\u949F</td>", '<td><span class="tbean"></span>40</td>', "</tr>", "</tbody>", "</table><hr>", '<p class="explain">\u8BF4\u660E\uFF1A\u5728\u5173\u6CE8\u7684\u5427\u5185\uFF0C\u53F3\u4FA7\u4E2A\u4EBA\u4FE1\u606F\u680F\u4E2D\u5F00\u542F\u5728\u7EBF\u793C\u5305\uFF0C\u5373\u53EF\u83B7\u5F97\u5956\u52B1\u8C46\u7968\u3002</p><hr>', '<img src="http://tb1.', 'bdstatic.com/tb/zt/tshow/wallet_dialog_explain_img.jpg" alt=""><hr>', "<h4>3.\u968F\u673A\u5F69\u86CB</h4><hr><hr>", "<p>\u6D4F\u89C8\u8D34\u5427\u6216\u6D4F\u89C8\u5176\u4ED6\u4F1A\u5458\u7684\u4E3B\u9875\uFF0C\u90FD\u6709\u673A\u4F1A\u83B7\u5F97\u8C46\u7968\u5F69\u86CB\uFF0C\u6BCF\u65E5\u4E0A\u9650170\u8C46\u7968\u3002</p><hr>", "<h4>4.\u53D1\u8D34\u56DE\u8D34</h4><hr>", "<p>\u7528\u6237\u6BCF\u5929\u7684\u53D1\u8D34/\u56DE\u8D34\u884C\u4E3A\u90FD\u53EF\u83B7\u5F97\u4E00\u5B9A\u7684\u8C46\u7968</p><hr>", "<table>", "<tbody>", '<tr><td class="no_rb">\u53D1\u8D34/\u56DE\u8D34</td><td class="no_rb">\u83B7\u5F97\u8C46\u7968</td><td>\u8C46\u7968\u83B7\u53D6\u65E5\u4E0A\u9650</td></tr>', "<tr>", "<td>PC\u9996\u6B21\u53D1\u8D34</td>", '<td><span class="tbean"></span>10</td>', '<td rowspan="2"><span class="tbean"></span>15</td>', "</tr>", "<tr>", "<td>PC\u9996\u6B21\u56DE\u8D34</td>", '<td><span class="tbean"></span>5</td>', "</tr>", "<tr>", "<td>\u591A\u6B21\u53D1\u8D34</td>", '<td><span class="tbean"></span>1/\u8D34\uFF08PC\uFF09<br><span class="tbean"></span>2/\u8D34\uFF08\u79FB\u52A8\u7AEF\uFF09</td>', '<td><span class="tbean"></span>10</td>', "</tr>", "</tbody>", "</table><hr>", '<p class="explain">\u8BF4\u660E\uFF1A\u6BCF\u5929\u53D1\u8D34\u7684\u8BA1\u7B97\u8D77\u6B62\u65F6\u95F4\u4E3A00:00--23:59</p><hr>', "<h4>5.\u70ED\u95E8\u8D34\u5956\u52B1</h4><hr>", "<p>\u7528\u6237\u6240\u53D1\u4E3B\u9898\u8D34\u8FBE\u5230\u70ED\u95E8\u8D34\u8981\u6C42\uFF0C\u53EF\u83B7\u5F97\u5956\u52B1\u8C46\u7968\uFF0C\u6700\u9AD8\u53EF\u8FBE20\u8C46\u7968\u3002</p><hr>", '<p class="explain">\u70ED\u95E8\u8D34\u8BF4\u660E\uFF1A\u6709\u6548\u56DE\u590D\u8FBE\u5230\u4E00\u5B9A\u6570\u91CF\uFF0C\u5177\u4F53\u6570\u91CF\u7531\u6240\u5728\u5427\u7684\u6D3B\u8DC3\u7528\u6237\u6570\u51B3\u5B9A\u3002</p><hr>', '<p class="explain">\uFF08\u5373\u5927\u578B\u8D34\u5427\u7684\u70ED\u95E8\u8D34\u6240\u9700\u56DE\u590D\u6570\u5927\u4E8E\u5C0F\u578B\u8D34\u5427\uFF09</p><hr>', "<h4>5.\u79FB\u52A8\u7AEF\u53D1\u8D34\u56DE\u8D34</h4><hr>", "<p>\u5728\u79FB\u52A8\u7AEF\u767B\u5F55\u540E\u6D3B\u8DC3\uFF08\u53D1\u8D34\uFF0C\u56DE\u8D34\uFF09\u5373\u53EF\u83B7\u5F9715\u8C46\u7968/\u5929\uFF0C\u6B64\u9879\u4E0E\u7B2C3\u9879\u5956\u52B1\u4E0D\u51B2\u7A81\u3002</p><hr>", "<h4>\u8C46\u7968\u4E0A\u9650\u8BF4\u660E</h3><hr>", "<p>1.\u6D3B\u8DC3\u83B7\u53D6\u8C46\u7968\u6BCF\u65E5\u603B\u83B7\u53D6\u4E0A\u9650\u4E3A330\u8C46\u7968/\u5929</p><hr>", "<p>2.\u6D3B\u8DC3\u8C46\u7968\u83B7\u53D6\u4E0A\u9650\u4E3A8000\uFF0C\u82E5\u65E0\u6D88\u8017\u5C06\u4E0D\u518D\u83B7\u5F97\u6D3B\u8DC3\u8C46\u7968</p>", "</div>"].join("");
            return a
        }
    }
});
window.__discarding && __discarding("pcommon/component/icons"), _.Module.define({
    path: "pcommon/component/Icons",
    sub: {
        initial: function() {},
        getIconsHtml: function(e, a) {
            var a = a || 1,
                n = e.iconinfo,
                i = PageUnit.load("icons_cfg"),
                t = 50,
                l = "";
            if (n && n.length > 0) {
                l = '<div class="icon_wrap icon_wrap_theme1">';
                for (var c, o, r, s, _, m = null, p = 0; p < n.length; p++) switch (m = n[p], s = i[m.name + "_" + m.value], c = m.sprite[m.value].split(","), o = c[0], r = c[1], _ = 'style="background: url(http://tb1.bdstatic.com/tb/cms/com/icon/icon_sprite.png?stamp=' + o + ") no-repeat -" + r * t + "px  -" + (a - 1) * t + 'px;"', m.name) {
                    case "meizhi_level":
                        var d = m.value;
                        d = d ? d : 0, d >= 2 && (d -= 2, l += "<a " + _ + ' class="maizhi_link" href="/p/' + m.meizhi_thread_id + '" target="_blank" title="\u8D34\u5427\u59B9\u7EB8\u8BA4\u8BC1"><span class="icon_meizhi meizhi_level_' + d + '"></span></a>');
                        break;
                    case "is_member":
                        l += "<a " + _ + ' target="_blank"  class=" icon_fanclub" ></a>';
                        break;
                    default:
                        s && (l += s[1] ? "<a " + _ + ' target="_blank" href="' + s[1] + '" title="' + s[0] + '" locate="' + m.name + "_" + m.value + '"></a>' : "<span " + _ + ' title="' + s[0] + '" locate="' + m.name + "_" + m.value + '"></span>')
                }
                return l += "</div>"
            }
        },
        getPreIconHtml: function(e) {
            var a = e,
                n = ["\u8D34\u5427\u4F1A\u5458", "\u8D34\u5427\u8D85\u7EA7\u4F1A\u5458"],
                i = "",
                t = Math.round((new Date).getTime() / 1e3);
            if (a && a.level && a.level.end_time > t) {
                i = '<div class="pre_icon_wrap pre_icon_wrap_theme1">';
                var l = null;
                for (var c in a) switch (c) {
                    case "level":
                        l = a[c];
                        var o = l.props_id;
                        i += '<a class="icon_tbworld tbworld_lv' + o + '" href="/tbmall/home" target="_blank" title="' + n[o - 1] + '"></a>'
                }
                i += "</div>"
            }
            return i
        }
    }
});
_.Module.define({
    path: "pcommon/widget/LoginDialog",
    sub: {
        _config: {
            apiOpt: {
                staticPage: "http://" + $.tb.location.getHost() + "/tb/static-common/html/pass/v3Jump.html",
                product: "tb",
                charset: PageData.charset ? PageData.charset : "GBK",
                u: "",
                memberPass: !0,
                safeFlag: 0
            },
            cache: !1,
            img: "",
            onLoginSuccess: function(t) {
                t.returnValue = !1, $.stats.sendRequest("st_type=login_succeed&fr=tb0&st_pos="), $.tb.location.reload()
            },
            onSubmitStart: function() {
                $.stats.sendRequest("st_type=login_click&fr=tb0&st_pos=")
            },
            registerLink: "https://passport.baidu.com/v2/?reg&tpl=tb&u=http://tieba.baidu.com",
            tangram: !0
        },
        initial: function(t, s, i) {
            var a = this,
                o = 1;
            if (a._config.apiOpt.u = "string" == typeof t && "" != t ? t : $.tb.location.getHref(), "string" == typeof s) {
                switch (s) {
                    case "userBar":
                        o = 1;
                        break;
                    case "editor1":
                    case "lzl":
                        o = 2;
                        break;
                    case "editor":
                        o = 3;
                        break;
                    case "lzonly":
                        o = 4;
                        break;
                    case "ilike":
                        o = 5;
                        break;
                    default:
                        o = 1
                }
                a._config.img = "http://tb2.bdstatic.com/tb/static-common/img/passport/logindlg_pic" + o + ".png"
            } else a._config.img = "http://tb2.bdstatic.com/tb/static-common/img/passport/logindlg_pic" + o + ".png";
            PageData && (a._config.apiOpt.isQuickUser = PageData.is_quick_user || 0), i && (a._config.onLoginSuccess = i),
                function(t) {
                    var s = "undefined" != typeof Env && Env.server_time ? Env.server_time : (new Date).getTime();
                    t.JsLoadManager.use(["http://passport.bdimg.com/passApi/js/uni_login_wrapper.js?cdnversion=" + Math.floor(s / 6e4), "http://passport.bdimg.com/passApi/js/wrapper.js?cdnversion=" + Math.floor(s / 6e4)], function() {
                        t.passPopInstance || (t.passPopInstance = passport.pop.init(a._config)), t("#passport-login-pop").find(".pass-login-pop-img img").tbattr("src", a._config.img), t.passPopInstance.show(), setTimeout(function() {
                            t("#passport-login-pop").find("input.pass-button-submit").tbattr("alog-alias", "login")
                        }, 1e3)
                    }, !0, "utf-8")
                }(window.jQuery)
        }
    }
});
_.Module.define({
    path: "pcommon/widget/Tdou",
    requires: ["pcommon/widget/Tdou/TdouView", "pcommon/widget/Tdou/TdouViewAutoRedirect"],
    sub: {
        initial: function() {},
        factory: function(e, i, t, o) {
            switch (e) {
                case "get_icon":
                    this.view = this.use("pcommon/widget/Tdou/TdouView"), this.view.createMain(i, t, o);
                    break;
                case "auto_direct":
                    this.autoDirect = this.use("pcommon/widget/Tdou/TdouViewAutoRedirect"), this.autoDirect.createMain(i, t, o)
            }
        }
    }
});
_.Module.define({
    path: "pcommon/widget/tchargeDialog",
    requires: ["pcommon/widget/Tdou"],
    sub: {
        initial: function(t) {
            var e = this;
            t && (e.consumption_path = t.consumption_path, e.desc = t.desc, e.desc = t.desc, e.current_need_tdou = t.current_need_tdou, e.is_direct_cashier = t.is_direct_cashier);
            var i = this.use("pcommon/widget/Tdou");
            t && e.is_direct_cashier ? i.factory("auto_direct", e.consumption_path, e.desc, e.current_need_tdou) : i.factory("get_icon", e.consumption_path)
        },
        _tbmallCashier: function() {
            var t = window.open("");
            $.get("/tbmall/getPayUrl?terminal=pc&pay_type=2", function(e) {
                e.data && (t.location.href = e.data)
            })
        }
    }
});
_.Module.define({
    path: "puser/widget/LikeTip",
    sub: {
        initial: function(e, s, i) {
            var t = this,
                a = "http://tb2.bdstatic.com/tb/static-puser/widget/like_tip/img/like_back_58420c2.png";
            if (i && i.like_no && i.like_no >= 1) {
                var r = $.dialog.alert('<img src="' + a + '" alt="\u6B22\u8FCE\u56DE\u6765" />', {
                    width: 320,
                    height: 131,
                    acceptValue: "\u77E5\u9053\u4E86"
                });
                $(r.element[0]).find(".dialogJcontent").css("padding-bottom", "0px"), $(r.element[0]).find(".dialogJanswers").css("padding-top", "0px"), r.bind("onaccept", function() {
                    t.reloadAndGotop()
                }).bind("onclose", function() {
                    t.reloadAndGotop()
                })
            } else {
                var l = this.getTipContent(e, s, i),
                    n = {
                        title: "\u6210\u529F\u63D0\u793A",
                        width: 418,
                        modal: !e
                    };
                this.isSuperMember() && (n.width = 535);
                var r = $.dialog.open(l, n);
                e && $(r.element[0]).css("padding", "2px"), $(r.element[0]).find(".dialogJcontent").tbattr("id", "balv_first_like_dialog"), $(r.element[0]).find(".userlike_tip_span a").click(function() {
                    Stats.sendRequest("fr=tb0_forum&st_mod=frs&st_type=entryimallinpop")
                }), $(r.element[0]).find(".lvlup_pop_btn").eq(0).bind("click", function() {
                    t.reloadAndGotop()
                }), $(r.element[0]).on("click", ".userlike_supermember_btn", function() {
                    window.open("/tbmall/mall/forumMember"), t.reloadAndGotop()
                }), r.bind("onclose", function() {
                    t.reloadAndGotop()
                })
            }
        },
        getTipContent: function(e, s, i) {
            var t = PageData,
                a = t.user.level_id ? t.user : t.user.balv,
                r = "<span>";
            e && (r += e + "\uFF0C"), r += "\u606D\u559C\u4F60\u6210\u4E3A\u672C\u5427\u7B2C</span>", r += "<span class='tip_font_orange'>" + i.index + "</span>", r += "<span>\u4F4D\u4F1A\u5458</span>";
            var l = "";
            l += '<div class="userlike_tip_join" id="userlike_tip_join">', l += '<div class="userlike_tip_info" id="userlike_tip_info">' + r + "</div>", e ? l += '<div class="user_rights_msg"><span class="user_rights_msg_gray">\u83B7\u5F97\u5934\u8854&nbsp;</span><img class="user_rights_msg_img" src="/tb/static-frs/img/balv/lv_join.png">&nbsp;' + a.level_name + '<span class="user_rights_msg_gray">&nbsp;\u5347\u7EA7\u4EAB\u7279\u6743\uFF0C<span><a class="user_rights_msg_link" target="_blank" href="/f/like/level?kw=' + t.forum.name_url + '">\u67E5\u770B\u4F1A\u5458\u6743\u5229</a></div>' : 1 == a.level_id ? l += '<div class="user_rights_msg">\u83B7\u5F97\u5934\u8854&nbsp;<img class="user_rights_msg_img" src="/tb/static-frs/img/balv/lv_join.png">&nbsp;' + a.level_name + '\uFF0C\u5347\u7EA7\u4EAB\u7279\u6743\uFF0C<a target="_blank" href="/f/like/level?kw=' + t.forum.name_url + '">\u67E5\u770B\u5347\u7EA7\u79D8\u7C4D</a></div>' : (l += '<div class="user_rights_msg">\u6839\u636E\u4F60\u5728\u672C\u5427\u7684\u6D3B\u8DC3\u8868\u73B0\uFF0C\u76F4\u63A5\u6388\u4E88<img src="http://tb2.bdstatic.com/tb/static-member/img/badges/' + a.level_id + '.png">&nbsp;' + a.level_name + "\uFF0C\u7ED9\u529B\uFF01</div>", l += '<div class="userlike_tip_span">\u672C\u5427\u767E\u5B9D\u7BB1\u5BF9\u4F60\u5F00\u653E\u4E86\uFF0C<a target="_blank" href="/imall/mall?kw=' + t.forum.name_url + '">\u53BB\u767E\u5B9D\u7BB1\u770B\u770B\u6709\u54EA\u4E9B\u7279\u6743\u548C\u5B9D\u8D1D</a></div>'), this.isSuperMember() && (l += this.getSuperMemberHtml()), l += '<div class="lvlup_tip_btnzone">';
            var n = "";
            return this.isSuperMember() && (l += '<input class="userlike_supermember_btn userlike_sm_btn_style" type="button" value="\u8BE6\u7EC6\u4E86\u89E3\u7279\u6743"/>', n = "userlike_sm_btn_style"), l += '<input class="lvlup_pop_btn ' + n + '" type="button" value="\u77E5\u9053\u4E86"/>', e && (l += '<a class="userlike_tip_cancel" target="_blank" href="/home/forum?id=' + t.user.portrait + "&fr=" + t.product + '">\u5982\u4F55\u53D6\u6D88\u4F1A\u5458</a>'), l += "</div></div>"
        },
        reloadAndGotop: function() {
            $.tb.location.setHref($.tb.location.getHref().split("#")[0])
        },
        getSuperMemberHtml: function() {
            var e = [],
                s = PageData.user ? PageData.user.Parr_props ? PageData.user.Parr_props.level ? PageData.user.Parr_props.level : {} : {} : {},
                i = PageData.forum.name || PageData.forum.forum_name;
            return e.push('<div class="userlike_supermember">'), e.push('<div class="userlike_sm_up clearfix">'), e.push('<div class="userlike_sm_up_gift"></div>'), e.push('<div class="userlike_sm_up_info">'), e.push('<h3>\u5C0A\u8D35\u7684<span class="userlike_sm_up_icon">\u8D34\u5427\u8D85\u7EA7\u4F1A\u5458</span></h3>'), e.push("<h2>\u60A8\u5DF2\u6210\u529F\u83B7\u5F97<b>\u3010" + i + "\u5427\u7279\u6743\u5305\u3011</b></h2>"), e.push("<p>\u6709\u6548\u671F\u81F3" + this.getFormatZhTime(1e3 * s.end_time) + "</p>"), e.push("</div>"), e.push("</div>"), e.push('<div class="userlike_sm_down clearfix">'), e.push('<div class="userlike_sm_down_item">'), e.push('<div class="userlike_sm_down_title">\u7EA2\u8272\u6807\u9898</div>'), e.push('<div class="userlike_sm_down_pic userlike_sm_down_pic_1"></div>'), e.push("</div>"), e.push('<div class="userlike_sm_down_item">'), e.push('<div class="userlike_sm_down_title">\u7ECF\u9A8C\u52A0\u901F</div>'), e.push('<div class="userlike_sm_down_pic userlike_sm_down_pic_2"></div>'), e.push("</div>"), e.push("</div>"), e.push("</div>"), e.join("")
        },
        isSuperMember: function() {
            var e = PageUnit.load("like_tip_svip_black_list");
            if (e) return !1;
            var s = PageData.user ? PageData.user.Parr_props ? PageData.user.Parr_props.level ? PageData.user.Parr_props.level : {} : {} : {};
            return 1e3 * s.end_time > 1 * new Date && 2 === s.props_id && !PageData.forum.is_star
        },
        getFormatZhTime: function(e) {
            return "number" != typeof e ? "" : (e = new Date(e), [e.getFullYear() + "\u5E74", parseInt(e.getMonth() + 1) + "\u6708", e.getDate() + "\u65E5"].join(""))
        }
    }
});
_.Module.define({
    path: "puser/widget/tbSpam",
    requires: [],
    sub: {
        initial: function() {
            $("body").append($("#tb_spam_notice_html").html())
        }
    }
});
_.Module.define({
    path: "puser/widget/myTieba",
    requires: ["pcommon/widget/wallet_dialog", "pcommon/widget/Card", "pcommon/widget/tcharge_dialog"],
    sub: {
        config: {
            url: {
                dolike: "/f/like/commit/add",
                undolike: "/f/like/commit/delete",
                closetip: "/f/like/commit/notice/delete"
            }
        },
        initial: function(e) {
            var i = this,
                t = e || {};
            i.user = PageData.user, i.forum = PageData.forum, i.balvInfo = t.balvInfo, i.style = t.style || "", i.isBySys = t.isBySys || !0, i.scoreTip = null, i.daysTofree = 0, i.block_bubble = null, i.product = t.product || null
        },
        init: function() {
            var e = this;
            e.user.forbidden ? e.daysTofree = e.user.forbidden.days_to_free : e.user.balv && (e.daysTofree = e.user.balv.days_tofree), -1 != $.inArray(e.product, ["frs", "pb"]) && (_.Module.use("ueglibs/widget/Ban", [], function(i) {
                e.BanLib = i
            }), this.user.is_login && e.showOfflineCard()), this.user.is_login && (this.bindEvents(), $(".user_profile .sign_highlight").length > 0 && this.show_orange_tip(), this.showNewpropsTip()), this.dolikeEvent()
        },
        showOfflineCard: function() {
            var e = this,
                i = 1 * new Date;
            i > 1408032e6 || $.tb.Storage.get("balv_tdou_update") > i || (this.offline_card = this.use("pcommon/widget/Card", {
                content: '<span style="cursor:pointer;position: absolute;width: 10px; height: 10px; right: 5px; top: 6px;" class="j_close"></span><a target="_blank" class="j_link" href="/p/3199708402"><img style="margin: 4px 4px 0;" src="http://tb1.bdstatic.com/tb/static-ucenter/img/offline1.png"></a>',
                clazz: "doupiao_offline",
                arrow_dir: "left",
                card_css: {
                    width: 172,
                    "z-index": 1010,
                    left: 198,
                    top: 9
                },
                arrow_pos: {
                    left: -7,
                    top: 20
                },
                wrap: $(".user_profile"),
                card_leave_display: !0
            }), this.offline_card._j_card.on("click", ".j_close", function() {
                $.tb.Storage.set("balv_tdou_update", i + 864e5), e.offline_card._j_card.remove()
            }).on("click", ".j_link", function() {
                $.tb.Storage.set("balv_tdou_update", i + 864e5), e.offline_card._j_card.remove()
            }), this.offline_card.showCard())
        },
        bindEvents: function() {
            var e = this;
            $("#user_info").on("click", ".j_score_num", function(i) {
                i.preventDefault(), e.getInstance("pcommon/widget/wallet_dialog").show()
            }), $(".userliked_ban_content").on("click.bawuAppealLink", ".j_appealLink", function() {
                $.stats.track("balvAppealLink", "uegCount", "bawuAppeal", "click")
            }), $(".userlike_blacked").bind("mouseover", function() {
                e.show_black_tip($(this))
            }), $(".userlike_prisoned").bind("mouseover", function() {
                e.daysTofree > 0 && e.daysTofree < 360 ? e.show_shortblock_tip($(this), e.daysTofree, e.isBySys ? "\u7CFB\u7EDF" : "\u5427\u4E3B", e.isBySys ? "system" : "bawu") : e.show_block_tip($(this))
            }), $("body").delegate(".tbmall_tip_close", "click", function() {
                return $("#tbmall_tip_card").remove(), e.tbmallTip = null, $.cookie("close_tbmall_tip", "1", {
                    expires: 365
                }), !1
            }), $("#j_tcharge_dialog").on("click", function() {
                e.use("pcommon/widget/tcharge_dialog")
            }), (this.user.balv && this.user.balv.has_liked || this.user.is_like) && (PageData.is_ipad ? $("a.p_balv_btnmanager").show() : $(".balv_mod").hover(function() {
                $(".p_balv_btnmanager").show()
            }, function() {
                $(".p_balv_btnmanager").hide()
            }))
        },
        dolikeEvent: function() {
            var e = this;
            $(".balv_dolike_comforum,.balv_dolike_star").bind("click", function() {
                return e.user.is_login ? e.user.balv && e.user.balv.is_block || e.user.forbidden && e.user.forbidden.isForbid ? e.showAlert(e.BanLib.render("balvLike")) : e.user.balv && e.user.balv.is_black || e.user.is_black ? e.showAlert("\u4F60\u88AB\u5427\u4E3B\u52A0\u5165\u672C\u5427\u9ED1\u540D\u5355\uFF0C\u6682\u65F6\u4E0D\u80FD\u8FDB\u884C\u64CD\u4F5C") : e.dolike() : _.Module.use("pcommon/widget/LoginDialog", ["", "ilike"]), !1
            })
        },
        showAlert: function(e) {
            var i = '<div style="padding:20px 20px; text-align:cente; line-height:20px;font-size:13px;">' + e + "</div>";
            $.dialog.open(i, {
                title: "\u64CD\u4F5C\u5931\u8D25",
                width: 380
            })
        },
        howtojoin: function() {
            $.dialog.alert("<div style='padding:20px;line-height:30px;padding-bottom:0px;'>\u70B9\u51FB\u53F3\u4FA7\u4E0A\u65B9\u201C<img align='absmiddle' src='" + PageData.staticDomain + "tb/static-member/img/whatlevel.png'></img>\u201D<br/>\u5373\u53EF\u52A0\u5165\u672C\u5427\uFF0C\u70B9\u4EAE\u5934\u8854\uFF0C\u4ECE\u521D\u7EA7\u7C89\u4E1D\u5F00\u59CB\u6210\u957F\uFF01</div>", {
                title: "\u5982\u4F55\u52A0\u5165",
                width: 325
            })
        },
        dolike: function() {
            var e = this;
            if (this.user.is_login && this.user.no_un) return TbCom.process("User", "buildUnameFrame", "\u586B\u5199\u7528\u6237\u540D", "\u6709\u7528\u6237\u540D\u624D\u80FD\u70B9\u4EAE\u201C\u6211\u5173\u6CE8\u201D\uFF0C\u8D76\u5FEB\u7ED9\u81EA\u5DF1\u8D77\u4E00\u4E2A\u5427~"), !1;
            var i = {
                fid: this.forum.forum_id,
                fname: this.forum.forum_name,
                uid: this.user.name_url,
                ie: "gbk",
                tbs: PageData.tbs
            };
            $.post(this.config.url.dolike, i, function(i) {
                if (i && 0 == i.no) _.Module.use("puser/widget/LikeTip", ["", !1, {
                    index: i.data.ret.index,
                    like_no: i.like_no
                }]);
                else {
                    var t = "";
                    t = 8 == i.no || 9 == i.no ? e.BanLib.render("balvLike") : 220 == i.no ? "\u4F60\u88AB\u5427\u4E3B\u52A0\u5165\u9ED1\u540D\u5355\uFF0C\u6682\u65F6\u4E0D\u80FD\u8FDB\u884C\u64CD\u4F5C" : 221 == i.no ? "\u4F60\u5DF2like\u4E86\u672C\u5427,\u8BF7\u4E0D\u8981\u91CD\u590D\u64CD\u4F5C" : "\u62B1\u6B49\uFF0C\u5F02\u5E38\u9519\u8BEF\uFF0C\u5EFA\u8BAE\u5237\u65B0\u9875\u9762\u91CD\u8BD5\u4E00\u4E0B", e.showAlert(t)
                }
            }, "json")
        },
        undolike: function() {
            var e = {
                fid: this.forum.forum_id,
                fname: this.forum.name_url,
                uid: this.user.name_url,
                ie: "utf-8",
                tbs: PageData.tbs
            };
            $.tb.post(this.config.url.undolike, e, function(e) {
                e && 0 == e.no && $.tb.location.reload(!0)
            })
        },
        show_shortblock_tip: function(e) {
            this.block_render(e, this.BanLib.render("balvAside"))
        },
        show_block_tip: function(e) {
            this.block_render(e, this.BanLib.render("balvAside"))
        },
        show_black_tip: function(e) {
            var i = new Array;
            i.push("<div style='width:180px;text-align:left;margin:6px 0px 6px 10px;'>"), i.push("<span>\u4F60\u5DF2\u88AB\u5427\u4E3B\u62C9\u5165\u9ED1\u540D\u5355\uFF0C</span></br><span>\u4F60\u5728\u672C\u5427\u7684\u5934\u8854\u548C\u6743\u9650\u4E5F\u88AB\u6536\u56DE\u3002</span>"), i.push("</div>"), this.block_render(e, i.join(""))
        },
        show_lvup_tip: function(e, i) {
            var t = this,
                o = new Array;
            if (o.push("<div class='lvup_tip_container'>"), o.push("<div class='lvlup_con_msg'>\u5347\u7EA7\u5566!\u4F60\u5DF2\u62E5\u6709\u672C\u5427" + e + "\u7EA7\u5934\u8854!</div>"), o.push('<div class="lvlup_pop_rights">' + i + "</div>"), "\u52A0\u6CB9~\u7EE7\u7EED\u6512\u7ECF\u9A8C\uFF01" == i) o.push("<a style='float:left;' href='/f/like/level?kw=" + this.forum.name_url + "' target='_blank'>\u67E5\u770B\u5347\u7EA7\u79D8\u7B08</a>");
            else {
                var s = 'Stats.sendRequest("fr=tb0_forum&st_mod=frs&st_type=balvupguide&lv=' + e + '")';
                o.push("<a href='#sub' style='float:left;' onclick='rich_postor.jumpToTry(" + e + ");" + s + "'>\u73B0\u5728\u53BB\u8BD5\u8BD5~~</a>")
            }
            o.push("</div>");
            var l = o.join(""),
                n = {
                    content: l,
                    arrow_dir: "up",
                    bubble_css: {
                        top: 4,
                        right: -5,
                        width: 232,
                        "z-index": 9999
                    },
                    arrow_pos: {
                        left: 209
                    },
                    attr: "lvup_tip_table",
                    wrap: $("#userlike_info_tip"),
                    closeBtn: !0
                },
                r = new UiBubbleTipBase(n);
            r.j_bubble.find(".j_content").css("padding", "2px").addClass("lvup_tip_table"), r.showBubble(), r.bind("onclose", function() {
                t.close_lvup_tip()
            }, !0), this.user.is_block || setTimeout(function() {
                r.closeBubble(), t.close_lvup_tip()
            }, 8e3)
        },
        block_render: function(e, i) {
            if (!this.block_bubble) {
                var t = this,
                    o = {
                        content: i,
                        arrow_dir: "up",
                        bubble_css: {
                            top: 36,
                            right: 4,
                            width: 232,
                            "z-index": 9999
                        },
                        arrow_pos: {
                            left: 209
                        },
                        attr: "",
                        wrap: e,
                        closeBtn: !0
                    };
                this.block_bubble = new UiBubbleTipBase(o), this.block_bubble.j_bubble.find(".j_content").css("padding", "2px"), this.block_bubble.showBubble(), this.block_bubble.bind("onclose", function() {
                    t.block_bubble.closeBubble(), t.block_bubble = null
                }); {
                    setTimeout(function() {
                        t.block_bubble && (t.block_bubble.closeBubble(), t.block_bubble = null)
                    }, 5e3)
                }
            }
        },
        close_lvup_tip: function() {
            var e = {
                fid: this.forum.forum_id,
                fname: this.forum.name_url,
                uid: this.user.name_url,
                ie: "utf-8",
                tbs: PageData.tbs,
                type: 2
            };
            $.tb.post(this.config.url.closetip, e, function(e) {
                e && 0 == e.no
            })
        },
        show_orange_tip: function() {
            if ("false" != $.cookie("close_sign_tip_o")) {
                $.cookie("close_sign_tip_o", !0, {
                    expires: 14
                });
                var e = {
                        content: "\u8FDE\u7EED\u7B7E\u523030\u5929ID\u5373\u53EF\u9AD8\u4EAE\u5C55\u793A\uFF0C\u4E00\u8D77\u95EA\u8000\u5427\uFF01",
                        arrow_dir: "down",
                        bubble_css: {
                            top: 3,
                            right: 25,
                            width: 145,
                            "z-index": 9999
                        },
                        arrow_pos: {
                            left: 88
                        },
                        attr: " ",
                        wrap: $(".user_profile .user_name"),
                        closeBtn: !0
                    },
                    i = new UiBubbleTipBase(e);
                i.j_bubble.find(".j_body").css("padding-right", "3px"), i.showBubble(), i.bind("onclose", function() {
                    $.cookie("close_sign_tip_o", !1, {
                        expires: 14
                    })
                }, !0); {
                    setTimeout(function() {
                        $(".j_wrap .j_close").click()
                    }, 8e3)
                }
            }
        },
        showNewpropsTip: function() {
            var e = $.cookie("NEWS_PROPS_NOTICE"),
                i = this.user.global && this.user.global.tbmall_newprops || "";
            (!e && i > 0 || e && i > e) && this.buildNewpropsTip()
        },
        buildNewpropsTip: function() {
            var e = this,
                i = {
                    content: '<a class="j_newprops_tip" href="/tbmall/home?sn=1" target="_blank" style="text-align:center;display:block;">\u6709\u65B0\u9053\u5177\u4E0A\u7EBF\u54E6~</a>',
                    arrow_dir: "up",
                    arrow_pos: {
                        left: 40
                    },
                    bubble_css: {
                        top: -35,
                        left: 100,
                        width: 100
                    },
                    wrap: $("#j_profile_pop"),
                    closeBtn: !0
                },
                t = new UiBubbleTipBase(i),
                o = "";
            t.bind("onclose", function() {
                t.closeBubble(), o = e.user.global && e.user.global.tbmall_newprops || "", $.cookie("NEWS_PROPS_NOTICE", o, {
                    expires: 30,
                    path: "/"
                })
            }), t.showBubble(), t.j_bubble.find(".j_newprops_tip").on("click", function() {
                $.post("/tbmall/post/addpropstoucenter", null, function() {}), t.closeBubble(), o = e.user.global && e.user.global.tbmall_newprops || "", $.cookie("NEWS_PROPS_NOTICE", o, {
                    expires: 30,
                    path: "/"
                })
            })
        },
        hasLevel: function() {
            var e = Math.floor((new Date).getTime() / 1e3);
            return this.user.Parr_props && this.user.Parr_props.level && this.user.Parr_props.level.end_time > e
        }
    }
});
_.Module.define({
    path: "puser/widget/myApp",
    sub: {
        MY_APP_THEME_KEY: "my_app_theme_cls",
        initial: function(t) {
            var a = this;
            a._root = $("#encourage_entry"), $.extend(a, t), a.setTheme(), "1" == a.is_pull_recommendation && a.pullRecommendation(), a._stats()
        },
        _stats: function() {
            var t = this,
                a = t._root.find(".list50").length > 0;
            t._root.on("click", "a", function() {
                var e = $(this).data("log"),
                    n = $(this).closest(".j_app_item").find(".j_app_recommend").length > 0 || "1" != t.is_pull_recommendation,
                    p = {
                        is_recommendation: n,
                        is_50: a
                    };
                $.stats.track(e, "\u53F3\u4FA7\u5165\u53E3-\u6211\u7684\u5E94\u7528", PageData.product, "click", p)
            }), t._viewStats(t._root, {
                is_50: a
            })
        },
        _viewStats: function(t, a) {
            var e = !1,
                n = null,
                p = function() {
                    e || ($.stats.track("\u5C55\u73B0", "\u53F3\u4FA7\u5165\u53E3-\u6211\u7684\u5E94\u7528", PageData.product, "show", a), e = !0)
                },
                i = function() {
                    var a = t.offset().top,
                        e = t.offset().top + t.height(),
                        n = $("body").scrollTop(),
                        p = $(window).height() + n,
                        i = !1;
                    return (a > n && p >= a || e > n && p >= e) && (i = !0), i
                };
            i() ? p() : $(window).on("scroll", function() {
                i() && (clearTimeout(n), n = setTimeout(p, 200))
            })
        },
        setTheme: function() {
            var t = this,
                a = "list50",
                e = "list60",
                n = $.tb.Storage.get(t.MY_APP_THEME_KEY);
            n || (n = "1" == t.is_pull_recommendation ? t.user_id % 2 == 0 ? a : e : t.random(0, 99) % 2 == 0 ? a : e, $.tb.Storage.set(t.MY_APP_THEME_KEY, n)), t._root.find(".j_app_list").addClass(n)
        },
        random: function(t, a) {
            return null == a && (a = t, t = 0), t + Math.floor(Math.random() * (a - t + 1))
        },
        pullRecommendation: function() {
            var t = this,
                a = {
                    ie: "utf-8",
                    tbs: PageData.tbs
                };
            t._ajax && t._ajax.abort(), t._ajax = $.ajax({
                type: "post",
                url: "/tbapp/user/getRecommendApp",
                data: a,
                dataType: "json"
            }).success(function(a) {
                a && 0 === a.no && t.renderAppList(a.data)
            })
        },
        renderAppList: function(t) {
            var a = this,
                e = 0;
            a.wrapper = $("#encourage_entry");
            for (var n = "", p = '<li  class="app_item j_app_item"><div class="app_icon_wrap"><a href="/f?ie=utf-8&kw=#{app_name}" data-log="#{app_name}" target="_blank" class="app_icon_link"  title="#{app_name}"><img src="#{app_img}"></a>#{recommend_title}</div><a href="/f?ie=utf-8&kw=#{app_name}" data-log="#{app_name}" target="_blank"  class="app_title"  title="#{app_name}">#{app_name}</a></li>', i = 0, o = t.length; o > i && 12 > i; i++) {
                var r = t[i],
                    _ = {
                        app_name: r.forum_name,
                        app_img: r.forum_portrait_image,
                        recommend_title: 1 == r.type ? (e++, '<span  class="j_app_recommend app_recommend">\u8350</span>') : ""
                    };
                n += $.tb.format(p, _)
            }
            var s = a.wrapper.find(".j_add_app_item");
            12 == t.length ? s.hide() : s.show(), a.wrapper.find(".j_app_list").prepend(n), e == t.length ? (a.wrapper.find(".j_encourage_title").html("\u63A8\u8350\u5E94\u7528"), a.wrapper.find(".j_app_recommend").hide()) : (a.wrapper.find(".j_encourage_title").html("\u6211\u7684\u5E94\u7528"), a.wrapper.find(".j_app_recommend").show())
        }
    }
});
_.Module.define({
    path: "puser/widget/HistoryGame",
    sub: {
        initial: function() {
            this._bindEvents(), this._showTrack()
        },
        _showTrack: function() {
            var t = "";
            "frs" === PageData.product ? t = "FRS\u9875" : "pb" === PageData.product && (t = "PB\u9875");
            var a = $(".game_content .game_h .game_link");
            if (a.length > 0) {
                var e = [];
                a.each(function() {
                    e.push($(this).tbattr("title"))
                }), $.stats.track(t + "_\u6211\u7684\u6E38\u620F", "PC\u7AEF\u5546\u4E1A\u5316\u6E38\u620F\u7EDF\u8BA1", PageData.product || "", "\u5C55\u73B0", {
                    obj_name: e.join(","),
                    obj_type: "\u6211\u7684\u6E38\u620F"
                })
            }
            var n = $(".game_content .game_s .game_link");
            if (n.length > 0) {
                var i = [];
                n.each(function() {
                    i.push($(this).tbattr("title"))
                }), $.stats.track(t + "_\u63A8\u8350\u6E38\u620F", "PC\u7AEF\u5546\u4E1A\u5316\u6E38\u620F\u7EDF\u8BA1", PageData.product || "", "\u5C55\u73B0", {
                    obj_name: i.join(","),
                    obj_type: "\u63A8\u8350\u6E38\u620F"
                })
            }
        },
        _bindEvents: function() {
            var t = "",
                a = $(".game_tab"),
                e = $(".game_content");
            "frs" === PageData.product ? t = "FRS\u9875" : "pb" === PageData.product && (t = "PB\u9875"), a.on("click", "li", function() {
                var n = $(this).data("game"),
                    i = "game_h" == n ? "\u6211\u7684\u6E38\u620F" : "\u63A8\u8350\u6E38\u620F";
                a.children("li").removeClass("sel"), $(this).addClass("sel"), e.children("ul").removeClass("sel").end().children("ul." + n).addClass("sel"), $.stats.track(t + "_" + i + "_tab", "PC\u7AEF\u5546\u4E1A\u5316\u6E38\u620F\u7EDF\u8BA1", PageData.product || "", "\u70B9\u51FB", {
                    obj_type: i
                })
            }), e.on("click", ".j_stats", function() {
                var a = $(this).data("category"),
                    e = "h" == a ? "\u6211\u7684\u6E38\u620F" : "\u63A8\u8350\u6E38\u620F",
                    n = $(this).find("img").tbattr("src"),
                    i = $(this).tbattr("title");
                "undefined" == typeof n && (n = ""), $.stats.track(t + "_" + e, "PC\u7AEF\u5546\u4E1A\u5316\u6E38\u620F\u7EDF\u8BA1", PageData.product || "", "\u70B9\u51FB", {
                    obj_url: n,
                    obj_name: i,
                    obj_type: e
                })
            }), $("#game_login_btn").on("click", function() {
                return PageData.user.is_login || _.Module.use("pcommon/widget/LoginDialog", [], function() {}), !1
            }), $(".j_privilege_btn").on("click", function() {
                $.stats.track("\u6E38\u620F\u7279\u6743", "\u6E38\u620F\u7279\u6743", "", "\u70B9\u51FB", {
                    obj_type: "\u6E38\u620F\u7279\u6743",
                    obj_name: "\u6E38\u620F\u7279\u6743",
                    obj_url: "-"
                })
            })
        }
    }
});