var mbox = mbox || {};
mbox.CONF = function() {
    var t = 1,
        e = 0;
    if (T.browser.ie == 6) {
        t = t * 1
    }
    return {
        ENGINECONF: {
            audio: {
                constructorName: "PlayEngine_Audio"
            },
            fmp: {
                constructorName: "PlayEngine_FMP_MP3",
                args: {
                    swfPath: "/player/static/flash/fmp.swf",
                    instanceName: "player"
                }
            },
            aac: {
                constructorName: "PlayEngine_FMP_AAC",
                args: {
                    swfPath: "/player/static/flash/fmp_aac.swf",
                    instanceName: "player"
                }
            },
            wmp: {
                constructorName: "PlayEngine_WMP",
                args: {
                    instanceName: "player"
                }
            }
        },
        PRELOADCONF: {
            audio: {
                constructorName: "PlayEngine_Audio"
            },
            fmp: {
                constructorName: "PlayEngine_FMP_MP3",
                args: {
                    swfPath: "/player/static/flash/preLoad_fmp.swf",
                    instanceName: "preLoad"
                }
            },
            aac: {
                constructorName: "PlayEngine_FMP_AAC",
                args: {
                    swfPath: "/player/static/flash/preLoad_fmp_aac.swf",
                    instanceName: "preLoad"
                }
            }
        },
        MAXTITLE: 200,
        MAXLINK: 10,
        MAXLOCAL: 500,
        UPDATEMORE: 200,
        LOCALINIT: 200,
        PREBUFTIME: 10,
        BUFTIME: 10,
        MULTBUFTIME: 20,
        ERRTIME: 1,
        SAVETIME: 60,
        NOLINKTIME: 1,
        LOADERRTIME: 5,
        WMP: true,
        AAC: true,
        FMP: true,
        AUDIO: true,
        ZHANGMEN_IMPORT: true,
        ERRSTOP: 30,
        AD_ENABLE: true,
        ECOM_URL: "http://a.baidu.com/ecom",
        WEB_URL: "http://music.baidu.com",
        NEWAD_URL: "http://cbjs.baidu.com/js/m.js",
        YYR_URL: "http://y.baidu.com",
        CLOUD_URL: "http://yinyueyun.baidu.com",
        CLOUD_PAY_URL: "http://music.baidu.com/vip/payment/cloud?type=upgrade&level=gold&goldonly=1",
        RESTTIME: 50,
        LISTENBREAK: false,
        PLAYERRSTOP: 10,
        USEWMA: false,
        USEAAC: false,
        NOLOGINDOWNLOAD: false,
        XCODEINTERVAL: 11.5,
        XCODERETRY: 10,
        AJAXRETRY: 0
    }
}();
require.config({
    baseUrl: "/player/static/js/naga",
    paths: {
        widget: "ui/widget",
        views: "ui/views",
        bower: "../bower",
        muui: "../bower/muui",
        coffee: "../../coffee",
        tmpl: "../../tmpl",
        styl_path: "../../styl"
    }
});
var MboxBaseModel = Backbone.Model.extend({
    initialize: function(t) {
        Backbone.Model.prototype.initialize.call(this, t)
    }
});
var MboxBaseView = Backbone.View.extend({
    initialize: function(t) {
        Backbone.View.prototype.initialize.call(this, t)
    }
});
var SongModel = T.lang.createClass(function(t) {
    t = t || {};
    this.hasTitle = false;
    this.hasCollected = false;
    this.queryId = "";
    this.songId = 0;
    this.songName = "";
    this.artistId = 0;
    this.artistName = "";
    this.albumId = 0;
    this.albumName = "";
    this.songPicSmall = "";
    this.songPicBig = "";
    this.songPicRadio = "";
    this.fchar = "";
    this.lrcLink = "";
    this.version = "";
    this.copyType = 0;
    this.relateStatus = 0;
    this.resourceType = 0;
    this.lrcContent = "";
    this.del_status = 0;
    this.status = 0;
    this.linkCode = 0;
    this.allRate = "";
    this.distribution = "";
    this.area = 0;
    this._curKey = "";
    this.links = 0;
    this.xcodeTime = 0;
    this.expireTime = 0;
    this.resource_type_ext = 0;
    this.source = "";
    this.yyr_artist_id = "";
    this.sid = "";
    this.piao = 0;
    this.korean_bb_song = 0;
    this.has_mv = 0;
    this.encryptedSongid = "";
    for (var e in t) {
        var s = t[e];
        if (!_.isString(this[e])) {
            if (s != "") {
                var i = +s;
                if (i == s) {
                    s = i
                } else if (s == null) {
                    s = ""
                }
            }
        }
        this[e] = s
    }
}).extend({
    set: function(t, e) {
        for (var s in t) {
            var i = t[s];
            if (!_.isString(this[s])) {
                if (i != "") {
                    var n = +i;
                    if (n == i) {
                        i = n
                    } else if (i == null) {
                        i = ""
                    }
                }
            }
            this[s] = i
        }
    },
    setProp: function(t) {
        for (var e in t) {
            if (this.hasOwnProperty(e)) {
                var s = t[e];
                if (!_.isString(this[e])) {
                    if (s != "") {
                        var i = +s;
                        if (i == s) {
                            s = i
                        } else if (s == null) {
                            s = ""
                        }
                    }
                }
                this[e] = s
            }
        }
    },
    addLink: function(t, e) {
        if (!this.curKey) this._curKey = t;
        this.links[t] = {
            songLink: e.songLink,
            showLink: e.showLink,
            format: e.format,
            rate: e.rate,
            size: e.size,
            time: e.time,
            enhancement: e.enhancement || 0
        }
    },
    setCurKey: function(t) {
        this._curKey = t
    },
    get: function(t) {
        var e = ["format", "size", "rate", "time", "songLink", "showLink", "enhancement"],
            s = "",
            i = this.links[this._curKey] || {};
        if (_.indexOf(e, t) > -1) {
            s = i[t] || ""
        } else {
            s = this[t]
        }
        return s
    },
    unset: function(t) {
        delete this[t]
    },
    getLinkKeyDesc: function(t, e) {
        var s = t,
            i;
        while (s > -1) {
            i = SongDataModel.createLinkKey(s, e);
            if (this.links[i]) {
                return i
            }
            s--
        }
        return i
    },
    isInCloud: function(t, e) {
        e = e || false;
        $.ajax({
            url: "/data/user/iscloud",
            async: e,
            data: {
                songIds: this.songId
            },
            success: t
        })
    },
    hasBuy: function(t, e) {
        e = e || false;
        $.ajax({
            url: "/data/user/checkfee",
            async: e,
            data: {
                songIds: this.songId
            },
            success: t
        })
    },
    checkYyrInfo: function(t, e) {
        e = e || false;
        $.ajax({
            url: mbox.CONF.YYR_URL + "/data/user/songinfo",
            async: e,
            dataType: "jsonp",
            data: {
                songIds: this.songId,
                from: "play"
            },
            success: t
        })
    },
    getYyrActivity: function(t, e, s) {
        s = s || false;
        $.ajax({
            url: "http://y.baidu.com/data/artist/relatedevent",
            async: s,
            dataType: "jsonp",
            data: {
                artist_id: e,
                from: "play"
            },
            success: t
        })
    }
});
var SongDataModel = mbox.lang.createClass(function() {
    this.MAX_TITLE = mbox.CONF.MAXTITLE;
    this.MAX_LINK = mbox.CONF.MAXLINK;
    this.MAX_COLLECT = 50;
    this.allSongCache = {};
    this.lrctimestamp = 0;
    this.supportTypes = [];
    this.songlinkSupportTypes = ["m4a", "mp3"];
    this.defaultCfg = {
        type: "",
        rate: "",
        pt: 0,
        flag: -1,
        s2p: -1,
        prerate: -1,
        bwt: -1,
        dur: -1,
        bat: -1,
        bp: -1,
        pos: -1,
        auto: -1
    }
}, {
    className: "SongDataModel"
}).extend({
    createSongModel: function(t, e) {
        var s = [],
            i = this.allSongCache;
        _.each(t, function(t, e, n) {
            if (!t || t === "null" || t === "undefined") return;
            if (!i[t]) {
                i[t] = new SongModel({
                    queryId: t
                })
            }
            s.push(i[t])
        }, this);
        _.each(e, function(t, e, s) {
            if (i[t.queryId || t.id]) {
                i[t.queryId || t.id].set(t)
            }
        }, this);
        return s
    },
    fetchSongTitleData: function(t, e) {
        e = e || {};
        var s = {},
            i = [],
            n = 0;
        this._setSongLinkType();
        for (var a = t.length - 1; a >= 0; a--) {
            var o = t[a];
            if (!o.hasTitle) {
                var r = o.queryId;
                if (n < 200) s[r] = o;
                r = r.toString();
                i.push(r.replace(",", "^^"));
                n++
            }
        }
        if (i.length > this.MAX_TITLE) {
            var l = _.clone(e);
            e.success = _.bind(function() {
                this.fetchSongTitleData(t, l)
            }, this);
            i = i.slice(0, this.MAX_TITLE)
        }
        if (i.length > 0) {
            var u = "/data/music/songinfo",
                c = {
                    songIds: i.join(",")
                };
            $.ajax({
                url: u,
                data: c,
                dataType: "json",
                type: mbox.ajaxMethod,
                success: function(n, a, o) {
                    if (n.errorCode == 22e3) {
                        var r = n.data.songList;
                        var l = n.data.xcode || undefined;
                        _.each(r, function(t, e, i) {
                            var n = s[t.queryId];
                            if (n) {
                                n.hasTitle = true;
                                n.setProp(t)
                            }
                        }, this)
                    } else {
                        troubleLog.trigger("fetchSongTitle:errcodeErr", n.errorCode, i.join(","));
                        mbox.errorDispatch(n.errorCode, "songinfo", u + "?" + $.param(c))
                    }
                    _.each(s, function(t, e) {
                        if (!t.hasTitle) {
                            t.isBroken = true;
                            t.hasTitle = true
                        }
                    });
                    if (_.isFunction(e.success)) {
                        e.success(t, this)
                    }
                },
                error: function(t, s, i) {
                    if (_.isFunction(e.success)) {
                        e.success([], this)
                    }
                    troubleLog.trigger("fetchSongTitle:netErr");
                    var n = 0;
                    if (s.toLowerCase() === "not found") {
                        n = 404
                    } else if (s.toLowerCase() === "timeout") {
                        n = -1
                    }
                    mbox.errorDispatch(n, "songinfo", u + "?" + $.param(c))
                }
            })
        } else {
            if (_.isFunction(e.success)) {
                e.success(t, this)
            }
        }
    },
    fetchSongLinkData: function(t, e) {
        e = e || {};
        this._setSongLinkType();
        var s = {},
            i = [],
            n = ["songName", "artistId", "artistName", "albumId", "albumName"],
            a = this.createLinkKey(e.hq, e.isCloud),
            o = this.createConfig(this.defaultCfg, e);
        for (var r = t.length - 1; r >= 0; r--) {
            var l = t[r];
            if (!l.links[a] && !l.isBroken || (new Date).getTime() - l.xcodeTime >= l.expireTime * 1e3) {
                var u = l.queryId;
                s[u] = l;
                u = u.toString();
                i.push(u.replace(",", "^^"))
            }
        }
        i = i.slice(0, this.MAX_LINK);
        if (i.length > 0) {
            var c = _.defaults({
                    songIds: i.join(","),
                    hq: e.hq || 0
                }, o),
                h = e.isCloud ? "/data/cloud/songlink" : "/data/music/songlink";
            $.ajax({
                url: h,
                data: c,
                dataType: "json",
                type: mbox.ajaxMethod,
                timeout: 3e4,
                success: function(o, r, l) {
                    if (o.errorCode == 22e3) {
                        var u = o.data.songList,
                            g = o.data.xcode,
                            f = o.data.time;
                        _.each(u, function(t, i, o) {
                            var r = s[t.queryId];
                            if (r) {
                                r.xcodeTime = (new Date).getTime();
                                r.expireTime = f;
                                if (g && t.songId && t.songLink && t.songLink.indexOf("xcode=") === -1) {
                                    t.songLink += "?xcode=" + g
                                }
                                var l = {};
                                _.each(t, function(t, e) {
                                    if (_.indexOf(n, e) < 0) {
                                        l[e] = t
                                    }
                                });
                                r.setProp(l);
                                r.links = r.links || {};
                                if (!e.hq) {
                                    r.addLink(a, t);
                                    r.isBroken = false
                                } else {
                                    var u = e.isCloud ? 1 : 0;
                                    if (_.isEmpty(t.linkinfo)) {
                                        r.links["auto_" + u] = null;
                                        r.links["mp3_320_" + u] = null;
                                        r.links["mp3_320+_" + u] = null;
                                        r.isBroken = true
                                    } else {
                                        r.links["mp3_320_" + u] = t.linkinfo["320"] || null;
                                        r.links["mp3_320+_" + u] = t.linkinfo["321"] || null;
                                        if (t.linkinfo["128"]) {
                                            r.links["auto_" + u] = t.linkinfo["128"]
                                        } else {
                                            for (var c in t.linkinfo) {
                                                if (t.linkinfo.hasOwnProperty(c)) {
                                                    r.links["auto_" + u] = t.linkinfo[c]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }, this)
                    } else {
                        troubleLog.trigger("fetchLink:errcodeErr", o.errorCode, i.join(","));
                        mbox.errorDispatch(o.errorCode, "songlink", h + "?" + $.param(c))
                    }
                    _.each(s, function(t, s) {
                        if (t.del_status != 0 && !e.isCloud && t.links[a]) {
                            t.links[a].songLink = ""
                        }
                    });
                    if (_.isFunction(e.success)) {
                        e.success(t, this)
                    }
                },
                error: function(t, s, i) {
                    if (_.isFunction(e.success)) {
                        e.success([], this)
                    }
                    troubleLog.trigger("fetchLink:netErr");
                    var n = 0;
                    if (t.status === 404) {
                        n = 404
                    } else if (s.toLowerCase() === "timeout") {
                        n = -1
                    }
                    mbox.errorDispatch(n, "songlink", h + "?" + $.param(c))
                }
            })
        } else {
            if (_.isFunction(e.success)) {
                e.success(t, this)
            }
        }
    },
    fetchSongLrcContent: function(t, e) {
        e = e || {};
        var s = function(s) {
            var i = +new Date + Math.random();
            var n = e.success;
            s.lrctimestamp = i;
            s._lrc_fetch_id = t.queryId;
            return function(n, a, o) {
                t.lrcContent = n;
                t.hasLyric = true;
                if (i == s.lrctimestamp || t.queryId === s._lrc_fetch_id) {
                    if (_.isFunction(e.success)) {
                        e.success(t)
                    }
                }
            }
        }(this);
        var i = t;
        if (i.get("songLink") && i.lrcLink && !i.hasLyric) {
            var n = i.lrcLink,
                a = "";
            if (i.source == "yyr") {
                n = mbox.CONF.YYR_URL + i.lrcLink + "?from=play";
                a = "jsonp"
            }
            $.ajax({
                url: n,
                dataType: a,
                success: s,
                error: e.error
            })
        } else {
            if (_.isFunction(e.success)) {
                e.success(t, this)
            }
        }
    },
    fetchCollectedStatus: function(t, e) {
        e = e || {};
        if (t.length > 0) {
            for (var s = 0; s < t.length; s += this.MAX_COLLECT) {
                this._fetchCollectedOnce(t.slice(s, s + this.MAX_COLLECT), e)
            }
        } else {
            if (_.isFunction(e.success)) {
                e.success(t, this)
            }
        }
    },
    _fetchCollectedOnce: function(t, e) {
        var s = _.pluck(t, "queryId");
        var i = {};
        _.each(t, function(t) {
            i[t.queryId] = t
        });
        $.ajax({
            url: "data/user/iscollect",
            data: {
                songIds: s.join(","),
                type: "song"
            },
            dataType: "json",
            cache: false,
            type: mbox.ajaxMethod,
            success: function(s, n, a) {
                if (s.errorCode == 22e3) {
                    var o = s.data.songIdList;
                    _.each(o, function(t, e, s) {
                        var n = i[t];
                        if (n) {
                            n.hasCollected = true
                        }
                    }, this);
                    for (var r in i) {
                        if (i.hasOwnProperty(r)) {
                            i[r]["hasCollected"] = !!i[r]["hasCollected"]
                        }
                    }
                    if (_.isFunction(e.success)) {
                        e.success(t, this)
                    }
                }
            },
            error: e.error
        })
    },
    fetchSongByTop: function(t, e) {
        e = e || {};
        var s = _.isUndefined(e.period) ? "" : e.period;
        $.ajax({
            url: "/data/music/box/top?topId=" + t + "&p=" + s,
            dataType: "json",
            cahce: false,
            success: _.bind(function(t, s, i) {
                if (_.isFunction(e.success)) {
                    e.success(t.data)
                }
            }, this),
            error: e.error
        })
    },
    fetchSongByAlbum: function(t, e) {
        e = e || {};
        _.defaults(e, {
            type: "album"
        });
        $.ajax({
            url: "/data/music/box/album?albumId=" + t + "&type=" + e.type,
            dataType: "json",
            cache: false,
            success: _.bind(function(t, s, i) {
                if (_.isFunction(e.success)) {
                    e.success(t.data)
                }
            }, this),
            error: e.error
        })
    },
    fetchSongByArtist: function(t, e) {
        e = e || {};
        _.defaults(e, {
            order: 2,
            limits: 10
        });
        $.ajax({
            url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + t + "&offset=0&limits=" + e.limits + "&order=" + e.order,
            dataType: "jsonp",
            cache: false,
            success: _.bind(function(t, s, i) {
                var n = [];
                _.each(t.songlist, function(t) {
                    n.push(t.song_id)
                }, this);
                if (_.isFunction(e.success)) {
                    e.success(n)
                }
            }, this),
            error: e.error
        })
    },
    _setSongLinkType: function() {
        var t = this.songlinkSupportTypes;
        if (!this.hasSetLinkType && (this.hasSetLinkType = true)) {
            for (var e = 0, s = t.length; e < s; e++) {
                var i = t[e];
                if (player && player.canPlayType(i)) {
                    this.supportTypes.push(i)
                }
            }
            this.defaultCfg.type = this.supportTypes.join(",")
        }
    },
    createConfig: function(t, e) {
        var s = {};
        for (var i in t) {
            if (t.hasOwnProperty(i)) {
                if (e.hasOwnProperty(i)) {
                    s[i] = e[i]
                } else {
                    s[i] = t[i]
                }
            }
        }
        return s
    },
    createLinkKey: function(t, e) {
        var s, e = e ? 1 : 0;
        switch (t) {
            case 1:
                s = "mp3_320";
                break;
            case 2:
                s = "mp3_320+";
                break;
            default:
                s = "auto"
        }
        return s + "_" + e
    }
});
SongDataModel = new SongDataModel;
var SongListModel = MboxBaseModel.extend({
    defaults: {
        listName: "",
        songModels: [],
        total: 0,
        remain: 0,
        songIds: []
    },
    initialize: function(t) {},
    getSongModels: function() {
        return this.get("songModels")
    },
    getListId: function() {
        return this.get("listName")
    },
    fetchSong: function(t) {
        t = t || {};
        if (_.isFunction(t.success)) {
            t.success(this.getSongModels())
        }
    },
    saveSong: function(t) {
        var e = T.lang.toArray(t);
        this.trigger("save:songModels", this, e, {
            fromTop: true
        })
    },
    removeSong: function(t) {
        t = T.lang.toArray(t);
        var e = this.getSongModels();
        if (t != -1) {
            t.sort(function(t, e) {
                return t - e
            });
            var s = t.length;
            while (s--) {
                var i = t[s];
                e.splice(i, 1)
            }
        } else {
            e = []
        }
        this.trigger("remove:songModels", this, t)
    },
    updateSong: function(t) {
        var e = [];
        this.trigger("update:songModels", this, e, {
            fromTop: false,
            remain: 0
        })
    },
    getTotal: function() {
        return this.get("total")
    },
    getRemain: function() {
        return this.get("remain")
    },
    sort: function(t, e) {
        var s, i, n, a = [],
            o = [],
            r = e;
        t.sort(function(t, e) {
            return e - t
        });
        for (s = 0, i = t.length; s < i; s++) {
            if (t[s] === t[s + 1]) {
                continue
            }
            if (t[s] < r) {
                r--
            }
            n = t[s];
            a.unshift(this.get("songModels").splice(n, 1)[0]);
            o.unshift(this.get("songIds").splice(n, 1)[0])
        }
        a.unshift(r, 0);
        o.unshift(r, 0);
        [].splice.apply(this.get("songModels"), a);
        [].splice.apply(this.get("songIds"), o);
        this.trigger("sort", this, {
            newSongs: this.get("songModels"),
            fromRows: t,
            toRow: e
        })
    }
});
var PlayListModel = MboxBaseModel.extend({
    defaults: {
        MAX_LINK: 10,
        songModels: [],
        playIndexList: [],
        curPlayIndex: -1,
        playMode: 3,
        curSong: null,
        adPlaying: false
    },
    initialize: function() {
        this.curSongIndex = -1;
        this.isFirstLink = true;
        this.firstLink = 1
    },
    _rebuildPlayList: function(t, e, s) {
        var i = [],
            n = [],
            a = t.length,
            o = 0,
            r = -1;
        if (a !== 0 || e !== -1) {
            while (a--) {
                i.push(o++)
            }
            switch (s.toString()) {
                case "1":
                    n = [e];
                    r = 0;
                    break;
                case "2":
                    n = i.concat();
                    n.splice(e, 1);
                    n.sort(function() {
                        return Math.random() - .5
                    });
                    n.unshift(e);
                    r = 0;
                    break;
                case "3":
                default:
                    n = i.concat();
                    r = e;
                    break
            }
        }
        this.set({
            playIndexList: n,
            curPlayIndex: r
        })
    },
    reset: function() {
        this.set({
            songModels: [],
            playIndexList: [],
            curPlayIndex: -1,
            curSong: null
        });
        this.curSongIndex = -1;
        this.trigger("change:curSongIndex", this, -1)
    },
    setMode: function(t) {
        this.set({
            playMode: t
        });
        var e = this.getSongList(),
            s = this.getCurSongIndex();
        this._rebuildPlayList(e, s, t)
    },
    getMode: function() {
        return this.get("playMode")
    },
    addSong: function(t, e) {
        t = T.lang.toArray(t);
        e = e || {};
        var s = _.isUndefined(e.fromTop) ? true : e.fromTop;
        if (t.length) {
            var i = this.getSongList(),
                n = this.getCurSongIndex(),
                a = this.getMode();
            if (e.row !== undefined) {
                Array.prototype.splice.apply(i, [e.row, 0].concat(t));
                if (e.row <= n && n !== -1) {
                    n += t.length
                }
            } else if (s) {
                Array.prototype.unshift.apply(i, t);
                if (n !== -1) {
                    n += t.length
                }
            } else {
                Array.prototype.push.apply(i, t)
            }
            this._rebuildPlayList(i, n, a);
            this.trigger("add:songModels", this, t, e);
            this.set({
                songModels: i
            });
            this.curSongIndex = n
        }
    },
    removeSong: function(t) {
        var e = T.lang.toArray(t),
            s = e.length;
        if (s) {
            if (e != -1) {
                e.sort(function(t, e) {
                    return t - e
                });
                var i = this.getSongList(),
                    n = this.getCurSongIndex(),
                    a = n,
                    o = this.getMode(),
                    r = false;
                while (s--) {
                    var l = e[s];
                    i.splice(l, 1);
                    if (a !== -1) {
                        if (l === n) {
                            r = true
                        }
                        if (l <= n) {
                            n--
                        }
                    }
                }
                if (r) {
                    n++
                }
                if (a !== -1) {
                    if (n < 0 && i.length > 0) {
                        n = 0;
                        r = true
                    } else if (n > i.length - 1) {
                        n = 0;
                        this.trigger("change:scrollTo", this, 0)
                    }
                }
                this._rebuildPlayList(i, n, o);
                if (r) {
                    this.unset("curSong", {
                        silent: true
                    });
                    this.set({
                        curSong: i[n]
                    });
                    this.curSongIndex = n;
                    this.trigger("change:curSongIndex", this, n)
                }
                this.set({
                    songModels: i
                });
                this.curSongIndex = n;
                this.trigger("remove:songModels", this, e)
            } else {
                this.reset();
                this.trigger("remove:songModels", this, e)
            }
        }
    },
    setCurSongIndex: function(t) {
        var e = this.getSongList(),
            s = this.getMode();
        if (!t && t !== 0) {
            t = s.toString() === "2" ? parseInt(Math.random() * e.length) : 0
        }
        t = t < 0 ? e.length - 1 : t > e.length - 1 ? 0 : t;
        this._rebuildPlayList(e, t, s);
        this.unset("curSong", {
            silent: true
        });
        this.set({
            curSong: e[t] || null
        });
        this.curSongIndex = t;
        this.trigger("change:curSongIndex", this, t);
        return t
    },
    getCurSongIndex: function() {
        return this.curSongIndex
    },
    autoNext: function() {
        if (this.getMode() == 1) {
            var t = this.getCurSong();
            this.unset("curSong", {
                silent: true
            });
            this.set({
                curSong: t
            })
        } else {
            this.next()
        }
    },
    next: function() {
        var t = this.getMode(),
            e = this.getSongList(),
            s = this.getCurSongIndex(),
            i = this.get("curPlayIndex"),
            n = this.get("playIndexList"),
            a = null;
        if (e.length !== 0) {
            var o = {};
            this.trigger("next:start", o, s);
            if (o.ret) {
                return
            }
            if (!_.isUndefined(window.ADS) && ADS.readyToPlayAd) {
                this.trigger("next:adplaying");
                return
            }
            switch (t.toString()) {
                case "1":
                    this.setCurSongIndex(s + 1);
                    this.trigger("change:scrollTo", this, s + 1 > e.length - 1 ? 0 : s + 1);
                    break;
                default:
                    if (s === -1) {
                        this.trigger("change:scrollTo", this, this.setCurSongIndex(null))
                    } else {
                        if (++i > n.length - 1) {
                            var r = {};
                            this.trigger("playlist:end", r);
                            if (r.ret) {
                                return
                            }
                            i = 0
                        }
                        s = n[i];
                        a = e[s];
                        this.unset("curSong", {
                            silent: true
                        });
                        this.set({
                            curPlayIndex: i,
                            curSong: a
                        });
                        this.curSongIndex = s;
                        this.trigger("change:curSongIndex", this, s);
                        this.trigger("change:scrollTo", this, s)
                    }
                    break
            }
        }
    },
    prev: function() {
        var t = this.getMode(),
            e = this.getSongList(),
            s = this.getCurSongIndex(),
            i = this.get("curPlayIndex"),
            n = this.get("playIndexList"),
            a = null;
        if (e.length !== 0) {
            switch (t.toString()) {
                case "1":
                    this.setCurSongIndex(s - 1);
                    this.trigger("change:scrollTo", this, s - 1 < 0 ? e.length - 1 : s - 1);
                    break;
                default:
                    if (s === -1) {
                        this.setCurSongIndex(s - 1);
                        this.trigger("change:scrollTo", this, s - 1)
                    } else {
                        if (--i < 0) {
                            i = n.length - 1
                        }
                        s = n[i];
                        a = e[s];
                        this.unset("curSong", {
                            silent: true
                        });
                        this.set({
                            curPlayIndex: i,
                            curSong: a
                        });
                        this.curSongIndex = s;
                        this.trigger("change:curSongIndex", this, s);
                        this.trigger("change:scrollTo", this, s)
                    }
                    break
            }
        }
    },
    getNextPlayIndex: function(t) {
        t = _.isUndefined(t) ? 1 : t;
        var e = this.get("curPlayIndex");
        var s = e + t;
        if (s > this.get("playIndexList").length - 1) {
            s = 0
        }
        return this.get("playIndexList")[s]
    },
    getPrevPlayIndex: function(t) {
        t = _.isUndefined(t) ? 1 : t;
        var e = this.get("curPlayIndex");
        var s = e - t;
        if (s < 0) {
            s = this.get("playIndexList").length - 1
        }
        return this.get("playIndexList")[s]
    },
    getCurSong: function() {
        return this.get("curSong")
    },
    getPlayIndexList: function() {
        return this.get("playIndexList")
    },
    getNextPlaySong: function(t) {
        return this.getSongList()[this.getNextPlayIndex(t)]
    },
    getPrevPlaySong: function(t) {
        return this.getSongList()[this.getPrevPlayIndex(t)]
    },
    getSongList: function(t) {
        var e = [],
            s = this.get("songModels");
        if (_.isUndefined(t)) {
            e = s
        } else {
            t = T.lang.toArray(t);
            for (var i = 0, n = t.length; i < n; i++) {
                e.push(s[t[i]])
            }
        }
        return e
    },
    getPlayList: function() {
        var t = [],
            e = this.getPlayIndexList(),
            s = this.getSongList();
        for (var i = 0, n = e.length; i < n; i++) {
            t.push(s[e[i]])
        }
        return t
    },
    fetchLink: function(t) {
        t = t || {};
        var e = this.getPlayList(),
            s = this.get("curPlayIndex"),
            i = this.getPlayIndexList().length,
            n = [].concat(e, e),
            a = t.maxlink < 10 ? t.maxlink : this.get("MAX_LINK");
        i = Math.min(i, a);
        n = n.slice(s, s + i);
        SongDataModel.fetchSongLinkData(n, t);
        this.isFirstLink = false
    },
    sort: function(t) {
        this.set("songModels", t.newSongs.concat([]));
        var e = this.getCurSong();
        if (e) {
            var s = _.indexOf(this.get("songModels"), e);
            this.curSongIndex = s
        }
        if (_.isEmpty(t.fromRows)) {
            this.trigger("change:curSongIndex", this, this.curSongIndex)
        }
        this._rebuildPlayList(t.newSongs, s || this.getCurSongIndex(), this.getMode())
    },
    getIndexes: function(t) {
        var e = this.getSongList();
        var s = [];
        _.each(e, function(e, i, n) {
            _.each(t, function(t) {
                if (t.queryId == e.queryId) {
                    s.push(i);
                    return
                }
            })
        });
        return s
    }
});
var ShowListModel = MboxBaseModel.extend({
    defaults: {
        songModels: []
    },
    initialize: function(t) {},
    reset: function(t) {
        this.set({
            songModels: []
        })
    },
    addSong: function(t, e) {
        t = T.lang.toArray(t);
        e = e || {};
        _.defaults(e, {
            fromTop: true,
            remain: 0
        });
        SongDataModel.fetchSongTitleData(t, {
            success: _.bind(function(t) {
                var s = this.getSongList();
                if (e.row !== undefined) {
                    Array.prototype.splice.apply(s, [e.row, 0].concat(t))
                } else if (e.fromTop) {
                    Array.prototype.unshift.apply(s, t)
                } else {
                    Array.prototype.push.apply(s, t)
                }
                this.set({
                    songModels: s
                });
                this.trigger("add:songModels", this, t, e);
                if (_.isFunction(e.success)) {
                    e.success(t, e)
                }
            }, this)
        })
    },
    removeSong: function(t, e) {
        var s = T.lang.toArray(t),
            i = s.length;
        if (i) {
            if (s != -1) {
                s.sort(function(t, e) {
                    return t - e
                });
                var n = this.getSongList();
                while (i--) {
                    var a = s[i];
                    n.splice(a, 1)
                }
                this.set({
                    songModels: n
                });
                this.trigger("remove:songModels", this, s, e)
            } else {
                this.reset();
                this.trigger("remove:songModels", this, s, e)
            }
        }
    },
    getSongList: function(t) {
        var e = [],
            s = this.get("songModels");
        if (_.isUndefined(t)) {
            e = s
        } else {
            t = T.lang.toArray(t);
            for (var i = 0, n = t.length; i < n; i++) {
                e.push(s[t[i]])
            }
        }
        return e
    },
    getIndexes: function(t) {
        var e = this.getSongList();
        var s = [];
        _.each(e, function(e, i, n) {
            _.each(t, function(t) {
                if (t.queryId == e.queryId) {
                    s.push(i);
                    return
                }
            })
        });
        return s
    },
    sort: function(t) {
        this.set("songModels", t.newSongs.concat([]))
    }
});
var ListCtrl = MboxBaseModel.extend({
    defaults: {
        showlist: new ShowListModel,
        playlist: new PlayListModel,
        showlistReference: new SongListModel,
        playlistReference: new SongListModel,
        playcore: null,
        showtimestamp: 0,
        playtimestamp: 0,
        playlistEvents: {},
        showlistEvents: {},
        listMode: 0,
        playInfo: {}
    },
    initialize: function(t) {
        t = t || {};
        this.brokenCount = 0;
        this.set({
            playcore: t.playcore
        });
        var e = this.get("playlist"),
            s = this.get("showlist"),
            i = this.get("playcore");
        s.on("add:songModels", function(t, e, s) {
            this.trigger("showlist:add:songModels", this, e, s)
        }, this);
        s.on("remove:songModels", function(t, e, s) {
            this.trigger("showlist:remove:songModels", this, e, s);
            if (this.get("showlistReference").getListId() === this.get("playlistReference").getListId()) {
                var i = this.get("playlist").getCurSongIndex();
                if (_.indexOf(e, i) != -1) {
                    this.trigger("change:curSongIndex", this, i)
                }
            }
        }, this);
        e.on("change:curSong", function(t, e) {
            var s = this.get("playlistReference").getListId(),
                n = s == "list_allfavor" || /^subList_\d+/.test(s) || /^artist_\d+/.test(s) || /^album_\d+/.test(s),
                a = VIP.get("HQPrivileges"),
                o = VIP.get("HQMode");
            n = n || !n && e && e.hasCollected && e.del_status != 0;
            var r = SongDataModel.createLinkKey(o, n),
                l = _.bind(function() {
                    if (this.brokenCount <= t.getSongList().length) {
                        statsRecorder.set("auto", 1);
                        statsRecorder.set("link", "");
                        setTimeout(function() {
                            t.next()
                        }, 10)
                    }
                    this.brokenCount = this.brokenCount + 1
                }, this);
            if (this.getListMode() === 0) {
                this.trigger("change:curSong", this, e)
            } else if (this.getListMode() === 1) {
                this.trigger("change:fmCurSong", this, e)
            }
            if (!e) return;
            e.start2load = -1;
            var u = _.bind(function() {
                if (this.getListMode() === 0) {
                    this.trigger("change:songLink", this, e)
                } else if (this.getListMode() === 1) {
                    this.trigger("change:fmSongLink", this, e)
                }
                var t = e.get("songLink");
                i.setUrl(t).play();
                this.brokenCount = 0
            }, this);
            if (!n && e.distribution && e.distribution.substring(0, 1) != "0") {
                l();
                return
            }
            if (e.isBroken || !n && e.del_status && e.del_status != 0) {
                l()
            } else if (e.links[r] && (new Date).getTime() - e.xcodeTime < e.expireTime * 1e3) {
                e.setCurKey(r);
                u()
            } else if (e.links[r] === null && (new Date).getTime() - e.xcodeTime < e.expireTime * 1e3) {
                var c = e.getLinkKeyDesc(o, n);
                if (c) {
                    e.setCurKey(c);
                    u()
                } else {
                    l()
                }
            } else {
                var h = statsRecorder.get("preSongState"),
                    g = h ? {
                        flag: h.start2play != -1 ? 1 : 0,
                        s2p: h.start2play == -1 ? h.prebufferTime : h.start2play,
                        prerate: h.rate ? h.rate : -1,
                        bwt: h.prebufferTime,
                        dur: h.songdur,
                        bat: h.buftotal,
                        bp: h.bufp,
                        pos: h.position,
                        auto: h.auto,
                        hq: 1,
                        isCloud: n
                    } : {
                        hq: 1,
                        isCloud: n
                    },
                    f = +new Date;
                if (!n && e.hasCollected && e.del_status != 0) {
                    g.maxlink = 1;
                    n = true;
                    g.isCloud = true
                }
                t.fetchLink(_.extend({
                    success: _.bind(function() {
                        e.start2load = +new Date - f;
                        if (e.isBroken || !n && e.del_status && e.del_status != 0) {
                            l()
                        } else {
                            if (e.links[r]) {
                                e.setCurKey(r);
                                u()
                            } else if (e.links[r] === null) {
                                var t = e.getLinkKeyDesc(o, n);
                                if (t) {
                                    e.setCurKey(t);
                                    u()
                                } else {
                                    l()
                                }
                            }
                        }
                    }, this)
                }, g))
            }
        }, this);
        e.on("change:curSongIndex", function(t, e) {
            if (this.get("showlistReference").getListId() === this.get("playlistReference").getListId()) {
                this.trigger("change:curSongIndex", this, e);
                localstorage.set("lastplay", {
                    list: this.get("showlistReference").getListId(),
                    index: e
                })
            }
        }, this);
        e.on("change:scrollTo", function(t, e) {
            if (this.get("showlistReference").getListId() === this.get("playlistReference").getListId()) {
                this.trigger("change:scrollTo", this, e)
            }
        }, this);
        var n = this;
        i.on("ended", function() {
            if (n.get("playlistReference")) {
                e.autoNext()
            }
            n.trigger("playcomplete", n)
        })
    },
    _bindPlaylistEvent: function(t, e) {
        var s = this.get("playlistEvents");
        if (t) {
            if (s.save) {
                t.off("save:songModels", s.save)
            }
            if (s.update) {
                t.off("update:songModels", s.update)
            }
            if (s.remove) {
                t.off("remove:songModels", s.remove)
            }
            if (s.sort) {
                t.off("sort", s.sort)
            }
        }
        s.save = function(t, e, s) {
            this.get("playlist").addSong(e, s)
        };
        s.update = function(t, e, s) {
            this.get("playlist").addSong(e, _.defaults(s || {}, {
                fromTop: false
            }))
        };
        s.remove = function(t, e, s) {
            this.get("playlist").removeSong(e, s)
        };
        s.sort = function(t, e) {
            if (t.getListId() === this.get("playlistReference").getListId()) {
                this.get("playlist").sort(e)
            }
        };
        e.on("save:songModels", s.save, this);
        e.on("update:songModels", s.update, this);
        e.on("remove:songModels", s.remove, this);
        e.on("sort", s.sort, this)
    },
    _bindShowlistEvent: function(t, e) {
        var s = this.get("showlistEvents");
        if (t) {
            if (s.save) {
                t.off("save:songModels", s.save)
            }
            if (s.update) {
                t.off("update:songModels", s.update)
            }
            if (s.remove) {
                t.off("remove:songModels", s.remove)
            }
            if (s.sort) {
                t.off("sort", s.sort)
            }
        }
        s.save = function(t, e, s) {
            this.get("showlist").addSong(e, s)
        };
        s.update = function(t, e, s) {
            this.get("showlist").addSong(e, _.defaults(s || {}, {
                fromTop: false
            }))
        };
        s.remove = function(t, e, s) {
            this.get("showlist").removeSong(e, s)
        };
        s.sort = function(t, e) {
            this.get("showlist").sort(e)
        };
        e.on("save:songModels", s.save, this);
        e.on("update:songModels", s.update, this);
        e.on("remove:songModels", s.remove, this);
        e.on("sort", s.sort, this)
    },
    setPlayList: function(t, e, s) {
        var i = this.get("playlist"),
            n = this.get("playlistReference");
        var a;
        if (n.getListId() !== t.getListId() || s) {
            this._bindPlaylistEvent(n, t);
            this.set({
                playlistReference: t
            });
            i.removeSong(-1);
            var o = t.get("songModels");
            i.addSong(o);
            a = i.setCurSongIndex(e);
            this.trigger("change:scrollTo", this, a, false)
        } else {
            a = i.setCurSongIndex(e);
            this.trigger("change:scrollTo", this, a, false)
        }
    },
    setShowList: function(t, e) {
        var s = this.get("showlist"),
            i = this.get("playlist"),
            n = this.get("showlistReference"),
            a = this.get("playlistReference");
        e = e || {};
        if (n.getListId() !== t.getListId() || e.forceRefresh) {
            this._bindShowlistEvent(n, t);
            s.removeSong(-1);
            var o = n === t;
            this.set({
                showlistReference: t
            });
            if (o) this.trigger("change:showlistReference", this, t);
            if (a && a.getListId() === t.getListId()) {
                this.set({
                    showtimestamp: +new Date
                });
                s.addSong(i.getSongList(), {
                    total: a.getTotal(),
                    remain: a.getRemain(),
                    success: _.bind(function() {
                        this.trigger("change:curSongIndex", this, i.getCurSongIndex());
                        this.trigger("change:scrollTo", this, i.getCurSongIndex(), true)
                    }, this)
                })
            } else {
                var r = function(t) {
                    var i = +new Date;
                    t.set({
                        showtimestamp: i
                    });
                    return function(n, a) {
                        if (i == t.get("showtimestamp")) {
                            s.addSong(n, _.defaults({
                                success: function() {
                                    _.isFunction(e.success) && e.success(n)
                                }
                            }, a))
                        }
                    }
                }(this);
                t.fetchSong({
                    success: r,
                    failure: function(t) {
                        r([]);
                        if (_.isFunction(e.failure)) {
                            e.failure(t)
                        }
                    },
                    data: e.data
                })
            }
        }
    },
    setShowListAndPlay: function(t, e, s) {
        var i = this.get("showlist"),
            n = this.get("playlist"),
            a = this.get("showlistReference"),
            o = this.get("playlistReference");
        s = s || {};
        if (a.getListId() !== t.getListId()) {
            this._bindShowlistEvent(a, t);
            i.removeSong(-1);
            this.set({
                showlistReference: t
            });
            var r = function(s) {
                var n = +new Date;
                s.set({
                    showtimestamp: n
                });
                return function(a, o) {
                    if (n == s.get("showtimestamp")) {
                        i.addSong(a, _.defaults({
                            success: _.bind(function() {
                                this.setPlayList(t, e)
                            }, s)
                        }, o))
                    }
                }
            }(this);
            t.fetchSong({
                success: r,
                data: s.data
            })
        } else {
            this.setPlayList(t, e)
        }
    },
    setListMode: function(t) {
        if (t == 0 || t == 1) {
            this.set({
                listMode: t
            })
        }
    },
    getListMode: function() {
        return this.get("listMode")
    },
    setPlayInfo: function(t) {
        if (!!t) {
            this.set({
                playInfo: t
            })
        }
    },
    getPlayInfo: function() {
        return this.get("playInfo")
    }
});
var CollectionModel = SongListModel.extend({
    defaults: {
        listName: "list_allfavor",
        songIds: [],
        songModels: [],
        start: 0,
        size: mbox.CONF.UPDATEMORE,
        total: 0
    },
    initialize: function(t) {
        this.options = t || {}
    },
    saveSong: function(t, e) {
        e = e || {};
        var s = _.pluck(t, "queryId");
        var i = t[0].source == "yyr" && t[0].resource_type_ext == 4 ? {
            url: mbox.CONF.YYR_URL + "/data/song/favorite/add",
            dataType: "jsonp",
            data: {
                songId: s[0],
                from: "play"
            }
        } : undefined;
        $.ajax(_.extend({
            url: "/data/user/collect",
            dataType: "json",
            data: {
                ids: s.join(","),
                type: "song",
                cloud_type: 0
            },
            type: mbox.ajaxMethod,
            cache: false,
            content: this,
            success: _.bind(function(t) {
                if (t.errorCode == 22e3 || t.errorCode == 22322) {
                    var i = s,
                        n;
                    i = _.isArray(i) ? i : [i];
                    n = SongDataModel.createSongModel(i);
                    _.each(n, function(t, e) {
                        t.set({
                            hasCollected: true
                        })
                    });
                    this.set({
                        songIds: i.concat(this.get("songIds")),
                        songModels: n.concat(this.get("songModels")),
                        total: this.get("total") + i.length,
                        start: this.get("start") + i.length
                    });
                    var a = {
                        fromTop: true,
                        total: this.get("songIds").length,
                        quota: this.get("quota")
                    };
                    this.trigger("save:songModels", this, n, a);
                    if (_.isFunction(e.success)) {
                        e.success(n, a, t.errorCode)
                    }
                } else {
                    if (_.isFunction(e.failure)) {
                        e.failure(t.errorCode)
                    }
                }
            }, this),
            failure: function(t) {
                if (_.isFunction(e.failure)) {
                    e.failure(t.errorCode)
                }
            },
            error: function(t) {
                if (_.isFunction(e.error)) {
                    e.error(t.errorCode)
                }
            }
        }, i))
    },
    removeSong: function(t, e) {
        e = e || {};
        var s = this,
            i = t || [],
            n = this.get("songIds"),
            a = this.get("songModels"),
            o = [];
        for (var r = 0, l = i.length; r < l; r++) {
            var u = i[r];
            if (n[u]) {
                o.push(a[u])
            }
        }
        this._deleteCollect(o, e)
    },
    removeSongBySongModel: function(t, e) {
        this._deleteCollect(t, e)
    },
    _deleteCollect: function(t, e) {
        var s = _.find(t, function(t) {
            return t.source == "yyr" && t.resource_type_ext == 4
        });
        var i = _.pluck(t, "songId");
        var n = s ? {
            url: mbox.CONF.YYR_URL + "/data/song/favorite/mv",
            dataType: "jsonp",
            data: {
                songId: i[0],
                from: "play"
            }
        } : undefined;
        $.ajax(_.extend({
            url: "/data/user/deletecollectsong",
            dataType: "json",
            data: {
                songIds: i.join(","),
                type: "song"
            },
            type: mbox.ajaxMethod,
            content: this,
            cache: false,
            success: _.bind(function(s) {
                if (s.errorCode == 22e3) {
                    var n = this.get("songIds"),
                        a = [];
                    for (var o = i.length; o; o--) {
                        var r = _.indexOf(n, i[o - 1]);
                        if (r > -1) {
                            a.push(r)
                        }
                    }
                    a.sort(function(t, e) {
                        return t - e
                    });
                    for (o = a.length; o; o--) {
                        n.splice(a[o - 1], 1)
                    }
                    var l = SongDataModel.createSongModel(n),
                        u = this.getTotal() - a.length;
                    this.set({
                        songIds: n,
                        start: n.length,
                        songModels: l,
                        total: u
                    });
                    _.each(t, function(t, e) {
                        t.set({
                            hasCollected: false
                        })
                    });
                    var c = {
                        total: u,
                        quota: this.get("quota")
                    };
                    this.trigger("remove:songModels", this, a, c);
                    if (_.isFunction(e.success)) {
                        e.success(l, c, s.errorCode)
                    }
                } else {
                    if (_.isFunction(e.failure)) {
                        e.failure(s.errorCode)
                    }
                }
            }, this),
            failure: e.failure,
            error: e.error
        }, n))
    },
    updateSong: function(t) {
        t = t || {};
        var e = this,
            s = this.get("start");
        if (_.isFunction(t.success)) {
            var i = t.success
        }
        t["success"] = function(s) {
            var n = e.get("remain"),
                a = e.get("total"),
                o = e.get("quota");
            var r = {
                fromTop: false,
                remain: n,
                total: a,
                quota: o
            };
            e.trigger("update:songModels", e, s, r);
            if (_.isFunction(i)) {
                t["success"] = i;
                t.success(s, r)
            }
        };
        this.fetchSong(t, s)
    },
    fetchSong: function(t, e) {
        t = t || {};
        var s = this,
            i = 0,
            n = this.size = this.get("size");
        !!e && (i = e);
        var a = function(n) {
            var a = n.data.songList,
                o = _.pluck(a, "id");
            var r = SongDataModel.createSongModel(o, a);
            var l = [],
                u = [];
            _.each(r, function(t, e) {
                t.set({
                    hasCollected: true
                })
            });
            if (!!e) {
                l = s.get("songModels").concat(r);
                u = s.get("songIds").concat(o)
            } else {
                l = r;
                u = o
            }
            var c = n.data.total - u.length,
                h = parseInt(n.data.total),
                g = parseInt(n.data.quota) || 0;
            s.set({
                songModels: l,
                songIds: u,
                start: i + o.length,
                remain: c,
                total: h,
                quota: g
            });
            var f = {
                remain: c,
                total: h,
                quota: g
            };
            if (_.isFunction(t.success)) {
                t.success(r, f)
            }
        };
        if (t.data && !_.isEmpty(t.data)) {
            a(t.data)
        } else {
            $.ajax({
                url: "/data/mbox/collectlist?cloud_type=0&type=song&start=" + i + "&size=" + n,
                dataType: "json",
                content: this,
                cache: false,
                success: function(e) {
                    if (e.errorCode == 22e3) {
                        a(e)
                    } else {
                        if (_.isFunction(t.failure)) {
                            t.failure(e.errorCode)
                        }
                    }
                },
                failure: t.failure,
                error: t.error
            })
        }
    },
    updateLocalSong: function(t, e) {
        e = e || {};
        if (!t) {
            return false
        }
        if (e.cancel) {
            var s = [],
                i = [],
                n = {},
                a;
            _.each(t, function(t, e) {
                t.set({
                    hasCollected: false
                });
                n[t.get("songId")] = 1
            });
            var o = this.get("songIds"),
                r = this.get("songModels");
            _.each(r, function(t, e) {
                if (n[t.get("songId")]) {
                    s.push(e)
                }
            });
            for (var l = 0, u = s.length; l < u; l++) {
                o[s[l]] = ""
            }
            for (var l = 0, u = o.length; l < u; l++) {
                if (o[l] != "") {
                    i.push(o[l])
                }
            }
            var c = SongDataModel.createSongModel(i);
            a = this.getTotal() - s.length || c.length;
            this.set({
                songIds: i,
                start: i.length,
                songModels: c,
                total: a
            });
            var h = {
                total: a,
                quota: this.get("quota")
            };
            this.trigger("remove:songModels", this, s, h)
        } else {
            var g = [];
            _.each(t, function(t, e) {
                t.set({
                    hasCollected: true
                });
                g.push(t.get("songId"))
            });
            this.set({
                songIds: g.concat(this.get("songIds")),
                songModels: t.concat(this.get("songModels")),
                total: this.get("total") + g.length,
                start: this.get("start") + g.length
            });
            var h = {
                fromTop: true,
                total: this.get("songIds").length,
                quota: this.get("quota")
            };
            this.trigger("save:songModels", this, t, h);
            if (_.isFunction(e.success)) {
                e.success(t, h)
            }
        }
    },
    getTotal: function() {
        return this.get("total")
    },
    getRemain: function() {
        return this.get("remain")
    },
    getQuota: function() {
        return this.get("quota")
    }
});
var AllListDataModel = MboxBaseModel.extend({
    defaults: {
        allList: {},
        list_temp: null,
        list_allfavor: null,
        list_late: null,
        list_often: null,
        list_local_artist: null,
        list_local_small_artist: null,
        list_local_album: null,
        list_download: null
    },
    initialize: function(t) {
        t = t || {};
        this.set({
            list_temp: t.temp,
            list_allfavor: t.allfavor,
            list_local_late: t.list_local_late,
            list_local_often: t.list_local_often
        })
    },
    getAllList: function() {
        return this.get("allList")
    },
    createSongListModel: function(t) {
        var e = this.get(t);
        if (!e) {
            switch (t) {
                case "list_late":
                case "list_often":
                    e = new HistoryListModel({
                        type: t.replace("list_", "")
                    });
                    break;
                case "list_download":
                    e = new DownloadListModel({
                        type: t.replace("list_", "")
                    });
                    break;
                default:
                    if (t.indexOf("subList_") > -1) {
                        e = new SubCollectionModel({
                            listName: t,
                            listId: t.replace("subList_", "")
                        })
                    } else if (t.indexOf("local_artist") > -1) {
                        e = new LocalArtistViewModel({
                            listName: t,
                            listId: t.replace("local_artist", "")
                        })
                    } else if (t.indexOf("local_small_artist") > -1) {
                        e = new LocalArtistViewModel({
                            listName: t,
                            listId: t.replace("local_small_artist", "")
                        })
                    } else if (t.indexOf("artist_") > -1) {
                        e = new ArtistDetailModel({
                            listName: t,
                            listId: t.replace("artist_", "")
                        })
                    } else if (t.indexOf("local_album") > -1) {
                        e = new LocalAlbumViewModel({
                            listName: t,
                            listId: t.replace("local_album", "")
                        })
                    } else if (t.indexOf("album_") > -1) {
                        e = new AlbumDetailModel({
                            listName: t,
                            listId: t.replace("album_", "")
                        })
                    } else if (t.indexOf("list_similar") > -1) {
                        e = new SimilarListModel({
                            listId: t.replace("list_similar", "")
                        })
                    } else if (t.indexOf("list_fm_default") > -1) {
                        e = new FmListModel({
                            listId: t.replace("list_fm_default", "")
                        })
                    }
            }
            this.set(t, e)
        }
        return e
    }
});
var UserModel = MboxBaseModel.extend({
    defaults: {
        hasLogin: false,
        userInfo: null,
        listenCount: null
    },
    initialize: function() {
        this.initUserInfo()
    },
    passportArgs: {
        mbox: true,
        ref: "tingbox",
        operation: false,
        songLimit: false,
        optype: ""
    },
    setSTokenCookie: function(t) {
        if (t) {
            var e = "",
                s = 183 * 24 * 60 * 60 * 1e3;
            if ("number" == typeof s) {
                var i = s;
                s = new Date;
                s.setTime(s.getTime() + i)
            }
            document.cookie = "STOKEN=" + t + (e ? "; path=" + e : "") + (s ? "; expires=" + s.toGMTString() : "")
        } else {
            document.cookie = "STOKEN=" + "0" + "; expires=Mon, 22 Oct 2012 12:00:00 GMT"
        }
    },
    login: function(t) {
        t = t || {};
        var e = this;
        $.ajax({
            url: "/data/user/info",
            dataType: "json",
            cache: false,
            context: this,
            success: function(s) {
                if (s.errorCode == 22e3) {
                    this.set("userInfo", this._getUserInfo(s));
                    this.set("hasLogin", true);
                    if (_.isFunction(t.success)) {
                        t.success({
                            username: this.get("userInfo").username
                        })
                    }
                } else {
                    require(["http://passport.baidu.com//passApi/js/uni_login_wrapper.js?cdnversion=" + +new Date], _.bind(function() {
                        this.loginFuze = new mbox.Fuze;
                        if (!this.bdpass) {
                            this.bdpass = passport.pop.init({
                                tangram: true,
                                img: t.leftImg || "",
                                apiOpt: {
                                    product: "music",
                                    staticPage: "http://" + window.location.host + "/player/v2Jump.html",
                                    u: "http://" + window.location.host
                                },
                                authsite: ["tsina", "renren", "qzone"],
                                authsiteCfg: {
                                    act: "optional",
                                    u: "http://" + window.location.host,
                                    onBindSuccess: function() {
                                        e.bdpass.hide();
                                        e.login()
                                    },
                                    jumpUrl: "http://" + window.location.host + "/player/xd.html",
                                    display: "popup"
                                },
                                onLoginSuccess: function(t, s, i) {
                                    t.returnValue = false;
                                    e.login();
                                    e.loginFuze.fire();
                                    e.bdpass.hide()
                                },
                                onhide: function() {
                                    e.loginFuze.clear();
                                    if (!e.get("hasLogin")) {
                                        _.isFunction(t.cancel) && t.cancel()
                                    }
                                }
                            })
                        }
                        this.bdpass.onhide = function() {
                            e.loginFuze.clear();
                            if (!e.get("hasLogin")) {
                                _.isFunction(t.cancel) && t.cancel()
                            }
                        };
                        if (_.isFunction(t.success)) {
                            this.loginFuze(_.bind(function() {
                                t.success(this.get("userInfo"))
                            }, this))
                        }
                        this.bdpass.show()
                    }, this))
                }
            },
            error: function() {
                _.isFunction(t.cancel) && t.cancel()
            }
        })
    },
    logout: function(t) {
        t = t || {};
        var e = "https://passport.baidu.com";
        var s = $("#logout_iframe");
        if (!s.length) {
            var i = $('<div style="position:absolute;top:-20px;left:0;width:10px;height:10px;"></div>').appendTo($("body"));
            s = $('<iframe id="logout_iframe" width="2" height="2" frameborder="0"></iframe>').appendTo(i)
        }
        s[0].contentWindow.location.href = e + "/?logout&u=about%3Ablank";
        var n = this;
        ! function() {
            var s = 0;
            window.checkUserLogout = function(i) {
                if (i && i.uName == "") {
                    n.setSTokenCookie(0);
                    n.set("userInfo", null);
                    n.set("hasLogin", false);
                    if (_.isFunction(t.success)) {
                        t.success()
                    }
                    window.checkUserLogout = null
                } else {
                    setTimeout(function() {
                        if (s++ > 50) {
                            if (_.isFunction(t.error)) {
                                t.error()
                            }
                        } else {
                            $.getScript(e + "?checkuser&tpl=ti&callback=checkUserLogout&tangram=true&r=" + Math.random())
                        }
                    }, 50)
                }
            };
            window.checkUserLogout()
        }()
    },
    checkLogin: function(t, e) {
        if (!_.isFunction(t)) return;
        if (this.get("hasLogin")) {
            t(this.get("userInfo"))
        } else {
            this.login({
                success: t,
                error: e
            })
        }
    },
    initUserInfo: function() {
        $.ajax({
            url: "/data/user/info",
            dataType: "json",
            cache: false,
            context: this,
            success: function(t) {
                if (t.errorCode == 22e3) {
                    this.set("userInfo", this._getUserInfo(t));
                    this.set("hasLogin", true)
                } else {
                    this.setSTokenCookie(0);
                    this.set("userInfo", null);
                    this.unset("hasLogin", {
                        silent: true
                    });
                    this.set("hasLogin", false)
                }
            }
        })
    },
    _getUserInfo: function(t) {
        var t = t.data,
            e = t.pathInfo;
        return {
            username: !_.isEmpty(e.displayname) ? e.displayname : !_.isEmpty(t.userName) ? t.userName : !_.isEmpty(t.bdEmail) ? t.bdEmail : t.bdMobile,
            quota: t.cloud_limit,
            vip: t.vip,
            incompleteUser: e.incomplete_user,
            sourceIcon: e.source_icon,
            isShowSourceIcon: _.isEmpty(t.userName) && _.isEmpty(t.bdEmail) && _.isEmpty(t.bdMobile) && e.incomplete_user == 1,
            pathInfo: e,
            avatarSmall: t.avatarSmall || e.avatar_small
        }
    },
    getFmListenCount: function() {
        utils.api("usercounts", {}, {
            handle_err: function() {}
        }).done(function(t) {
            if (userModel.get("hasLogin")) {
                if (t.counts) {
                    userModel.set("listenCount", t.counts)
                }
            } else {
                userModel.set("listenCount", null)
            }
        }).fail(function() {
            if (userModel.get("hasLogin")) {
                userModel.getFmListenCount()
            } else {
                userModel.set("listenCount", null)
            }
        })
    }
});
var PlayerRuleCtrl = MboxBaseModel.extend({
    defaults: {
        prebufferCount: 0,
        firstBufferCount: 0,
        exceptionCount: 0,
        play60sCount: 0,
        play100msCount: 0,
        nolinkCount: 0,
        loadExceptionCount: 0
    },
    playerRules: {},
    initialize: function(t) {
        t = t || {};
        this.player = t.player || player;
        this.listCtrl = t.listCtrl || listCtrl;
        this.playListCtrl = this.listCtrl.get("playlist");
        this.PLAYRULES = t.PLAYRULES || {};
        this.PLAYCTRL = t.PLAYCTRL || {};
        this.initPlayRules()
    },
    initPlayRules: function() {
        var t = this;
        this.playerRules.prebuffer = new PlayEngineRules.Prebuffer({
            handler: function() {
                t.set("prebufferCount", t.get("prebufferCount") + 1);
                t.trigger("playerRule:prebuffer", t);
                t.playListCtrl.next()
            },
            time: this.PLAYRULES.PREBUFTIME
        });
        this.playerRules.firstBuffer = new PlayEngineRules.FirstBuffer({
            handler: function() {
                t.set("firstBufferCount", t.get("firstBufferCount") + 1);
                t.trigger("playerRule:firstBuffer", t);
                t.playListCtrl.next()
            },
            time: this.PLAYRULES.BUFTIME
        });
        this.playerRules.exception = new PlayEngineRules.Exception({
            handler: function() {
                t.set("exceptionCount", t.get("exceptionCount") + 1);
                t.trigger("playerRule:exception", t);
                if (t.PLAYCTRL.PLAYERRSTOP && t.get("exceptionCount") > t.PLAYCTRL.PLAYERRSTOP) {
                    t.playListCtrl.reset();
                    t.player.reset()
                } else {
                    t.playListCtrl.next()
                }
            },
            time: this.PLAYRULES.ERRTIME
        });
        this.playerRules.play60s = new PlayEngineRules.Play60s({
            handler: function() {
                t.set("play60sCount", t.get("play60sCount") + 1);
                t.trigger("playerRule:play60s", t)
            },
            time: this.PLAYRULES.SAVETIME
        });
        this.playerRules.play100ms = new PlayEngineRules.Play100ms({
            handler: function() {
                t.set("play100msCount", t.get("play100msCount") + 1);
                t.trigger("playerRule:play100ms", t)
            }
        });
        this.playerRules.noLink = new PlayEngineRules.NoLink({
            handler: function() {
                t.set("nolinkCount", t.get("nolinkCount") + 1);
                t.trigger("playerRule:nolinkCount", t);
                if (t.get("nolinkCount") < mbox.CONF.ERRSTOP) {
                    t.playListCtrl.next()
                }
            },
            time: this.PLAYRULES.NOLINKTIME
        });
        this.playerRules.loadException = new PlayEngineRules.LoadException({
            handler: function() {
                t.set("loadExceptionCount", t.get("loadExceptionCount") + 1);
                t.playListCtrl.next()
            },
            time: this.PLAYRULES.LOADERRTIME
        });
        this.playerRuleController = new PlayEngineRulesController({
            playEngine: this.player
        });
        _.each(this.playerRules, function(e) {
            t.playerRuleController.addRule(e)
        })
    }
});
var StatsRecorder = MboxBaseModel.extend({
    defaults: {
        lid: Math.random() * +new Date,
        position: 0,
        linkerr: "",
        auto: 0,
        start2load: -1,
        load2play: -1,
        start2play: -1,
        fromload: -1,
        fromstart: -1,
        buftime: -1,
        buftotal: -1,
        isclosed: 0,
        bufp: -1,
        bufc: -1,
        songdur: 0,
        link: "",
        prebufferTime: -1,
        rate: "",
        playlist: "",
        showlist: "",
        preStatus: "",
        curStatus: "",
        curSong: null,
        playedTimes: 0,
        playErrTimes: 0,
        linkErrTimes: 0,
        open2play: -1,
        open2load: -1,
        open2close: -1,
        prevSongState: null,
        module: ""
    },
    stopwatches: {
        playStart: new mbox.StopWatch,
        loadLink: new mbox.StopWatch,
        bufTotal: new mbox.StopWatch,
        bufCost: new mbox.StopWatch
    },
    initialize: function(t) {
        t = t || {};
        this.player = t.player || player;
        this.playerRuleCtrl = t.playerRuleCtrl || playerRuleCtrl;
        this.listCtrl = t.listCtrl || listCtrl;
        this.playListCtrl = this.listCtrl.get("playlist");
        this.listenPlayer();
        this.listenPlayerRules();
        this.listenPlayList();
        this.listenFmPlayList();
        this._openTime = window._boxOpenTime || +new Date;
        this.sendDelStatus = true;
        var e = this;
        $(window).on("beforeunload", function() {
            if (window.audioAd && window.audioAd.running) {
                window.audioAd.sendLog("ad_voice_quit", {
                    page: "tingbox",
                    time: T.cookie.get("audioAd") >> 0
                })
            }
            if (e.get("curSong")) {
                e.set("isclosed", 1);
                e.set("open2close", +new Date - e._openTime);
                e._setCurStatus("playend")
            }
        })
    },
    listenPlayer: function() {
        var t = this,
            e = this.stopwatches,
            s = _mu.cfg.engine.STATES;
        this.player.on("player:statechange", function(i) {
            switch (i.newState) {
                case s.END:
                    break;
                case s.PLAYING:
                    e.bufTotal.pause();
                    e.playStart.pause();
                    e.loadLink.pause();
                    if (t.get("open2load") < 0) {
                        t.set("open2load", +new Date - t._openTime)
                    }
                    if (t.get("open2play") < 0) {
                        t.set("open2play", +new Date - t._openTime)
                    }
                    break;
                case s.PREBUFFER:
                    e.bufTotal.start();
                    e.playStart.start();
                    e.loadLink.start();
                    if (t.get("open2load") < 0) {
                        t.set("open2load", +new Date - t._openTime)
                    }
                    if (t.get("open2play") < 0) {
                        t.set("open2play", +new Date - t._openTime)
                    }
                    break;
                case s.BUFFERING:
                    e.bufTotal.start();
                    e.playStart.start();
                    e.loadLink.start();
                    t.set("buftime", t.get("buftime") + 1);
                    break;
                case s.PAUSE:
                    e.bufTotal.pause();
                    e.playStart.pause();
                    e.loadLink.pause();
                    break;
                case s.STOP:
                    e.bufTotal.pause();
                    e.playStart.pause();
                    e.loadLink.pause();
                    break;
                default:
            }
        }).on("player:retry:max", function() {
            t.listCtrl.get("playlist").next()
        }).on("player:waiting_timeout", function() {
            t.set("block", 1)
        }).on("error", function() {
            e.bufTotal.pause();
            t.set("playErrTimes", t.get("playErrTimes") + 1);
            t._setCurStatus("playerr")
        }).on("progress", function(s) {
            var i = s * 100;
            t.set("bufp", i);
            if (!t.get("songdur")) {
                t.set("songdur", t.player.duration())
            }
            t.set("bufc", e.bufCost.getTime());
            if (i == 100) {
                e.bufCost.pause()
            }
        }).on("timeupdate", function(e) {
            t.set("position", e)
        })
    },
    listenPlayerRules: function() {
        var t = this;
        this.playerRuleCtrl.bind("playerRule:prebuffer", function() {
            t._setCurStatus("loadfileerr")
        });
        this.playerRuleCtrl.bind("playerRule:firstBuffer", function() {
            t._setCurStatus("buferr")
        });
        this.playerRuleCtrl.bind("playerRule:exception", function() {
            t._setCurStatus("playerr");
            t.set("playErrTimes", t.get("playErrTimes") + 1)
        });
        this.playerRuleCtrl.bind("playerRule:play60s", function() {
            t._setCurStatus("60play");
            t.set("playedTimes", t.get("playedTimes") + 1)
        });
        this.playerRuleCtrl.bind("playerRule:play100ms", function() {
            if (!t.get("module")) {
                var e = window.location.search;
                if (!e) {
                    t.set("module", "private_btn")
                } else if (e.search(/mboxCtrl\.(playLocal|playLatest|playCollection)/) >= 0) {
                    t.set("module", "private_major")
                } else if (e.indexOf("mboxCtrl") >= 0) {
                    t.set("module", "other")
                } else {
                    t.set("module", "private_btn")
                }
            }
            t._setCurStatus("playsong100ms");
            t.set("start2play", t.stopwatches.playStart.getTime());
            t.set("load2play", t.stopwatches.loadLink.getTime());
            t.set("prebufferTime", t.stopwatches.bufTotal.getTime());
            t.set("playErrTimes", 0);
            t.set("linkErrTimes", 0)
        });
        this.playerRuleCtrl.bind("playerRule:prebuffer", function() {
            t.set("prebufferTime", t.stopwatches.bufTotal.getTime())
        })
    },
    listenPlayList: function() {
        var t = this.stopwatches;
        this.listCtrl.bind("playcomplete", function() {
            this.set("auto", 1);
            t.bufTotal.pause();
            this._setCurStatus("playcomplete")
        }, this);
        this.listCtrl.bind("change:curSong", function(e, s) {
            if (this.get("curSong")) {
                this._setCurStatus("playend");
                this._setPrevSongState()
            }
            if (s) {
                this.set("auto", 0);
                t.playStart.reset();
                t.loadLink.reset();
                t.bufTotal.reset();
                t.bufCost.reset();
                this.set("load2play", -1);
                this.set("start2play", -1);
                this.set("bufp", 0);
                this.set("buftime", -1);
                this.set("linkerr", "");
                this.set("bufc", 0);
                this.set("songdur", 0);
                this.set("block", 0);
                t.playStart.start();
                this.set("curSong", s);
                this._setCurStatus("playstart")
            }
        }, this);
        this.listCtrl.bind("change:songLink", function(e, s) {
            if (s.get("songLink")) {
                t.loadLink.start();
                t.bufCost.start();
                this.set("songdur", s.get("time") * 1e3);
                this.set("link", s.get("songLink"));
                this.set("rate", s.get("rate"));
                this._setCurStatus("load")
            } else {
                this.set("linkerr", "blank");
                this._setCurStatus("linkfail");
                this.set("linkErrTimes", this.get("linkErrTimes") + 1)
            }
        }, this);
        this.listCtrl.bind("change:playlistReference", function(t, e) {
            this.set("playlist", e.getListId());
            if (this.get("open2load") < 0) {
                this.set("open2load", +new Date - this._openTime)
            }
        }, this);
        this.listCtrl.bind("change:showlistReference", function(t, e) {
            var s = e.getListId();
            this.set("showlist", e.getListId());
            this.sendDelStatus = s === "list_temp" || s === "list_late" || s === "list_often";
            if (this.get("open2load") < 0) {
                this.set("open2load", +new Date - this._openTime)
            }
        }, this);
        this.listCtrl.bind("showlist:add:songModels", function(t, e, s) {
            if (this.sendDelStatus && e.length) {
                this.sendDelStatus = false;
                for (var i = e.length; i; i--) {
                    if (e[i - 1].del_status && e[i - 1].del_status != 0) {
                        this.trigger("list_status", this, 1);
                        return
                    }
                }
                this.trigger("list_status", this, 0)
            }
        }, this)
    },
    listenFmPlayList: function() {
        var t = this.stopwatches;
        this.listCtrl.on("change:fmCurSong", function(e, s) {
            if (this.get("curSong")) {
                this._setCurStatus("playend");
                this._setPrevSongState()
            }
            if (s) {
                s.from = localstorage.get("fm_from") || "fm";
                this.set("auto", 0);
                t.playStart.reset();
                t.loadLink.reset();
                t.bufTotal.reset();
                t.bufCost.reset();
                this.set("load2play", -1);
                this.set("start2play", -1);
                this.set("bufp", 0);
                this.set("buftime", -1);
                this.set("linkerr", "");
                this.set("bufc", 0);
                this.set("songdur", 0);
                t.playStart.start();
                this.set("curSong", s);
                this._setCurStatus("playstart")
            }
        }, this);
        this.listCtrl.on("change:fmSongLink", function(e, s) {
            if (s.get("songLink")) {
                t.loadLink.start();
                t.bufCost.start();
                this.set("songdur", s.get("time") * 1e3);
                this.set("link", s.get("songLink"));
                this.set("rate", s.get("rate"));
                this._setCurStatus("load")
            } else {
                this.set("linkerr", "blank");
                this._setCurStatus("linkfail");
                this.set("linkErrTimes", this.get("linkErrTimes") + 1)
            }
        }, this)
    },
    _setCurStatus: function(t) {
        if (this.get("curStatus") === t) return;
        this.set("fromstart", this.stopwatches.playStart.getTime());
        this.set("fromload", this.stopwatches.loadLink.getTime());
        this.set("buftotal", this.stopwatches.bufTotal.getTime());
        this.set("bufc", this.stopwatches.bufCost.getTime());
        this.set("preStatus", this.get("curStatus"));
        this.set("curStatus", t);
        this.trigger("status:" + t, this)
    },
    _setPrevSongState: function() {
        this.set("preSongState", {
            start2play: this.get("start2play"),
            prebufferTime: this.get("prebufferTime"),
            rate: this.get("rate"),
            songdur: this.get("songdur"),
            buftotal: this.get("buftotal"),
            bufp: this.get("bufp"),
            position: this.get("position"),
            auto: this.get("auto"),
            buftime: this.get("buftime")
        })
    }
});
var VIPModel = MboxBaseModel.extend({
    defaults: {
        hasLogin: false,
        vip: 0,
        cloudLimit: 500,
        HQMode: 0,
        HQPrivileges: 0,
        cloud: {
            service_id: "",
            baidu_id: "",
            service_ident: "",
            service_type: "",
            service_level: "",
            start_time: 0,
            end_time: 0,
            xrank: "",
            service_quota: "",
            wallet_bill: ""
        }
    },
    initialize: function(t) {
        t = t || {};
        this.userModel = t.userModel || userModel;
        this.userModel.on("change:hasLogin", function(t, e) {
            var s;
            if (e) {
                s = t.get("userInfo").vip;
                if (s) {
                    this.setVipInfo(s, t.get("userInfo").quota);
                    this.set("hasLogin", true)
                } else {
                    this.fetchVipInfo()
                }
            } else {
                this.setVipInfo(0);
                this.set("hasLogin", false)
            }
        }, this);
        this.on("change:HQMode", function(t, e) {
            T.cookie.set("hq", e, {
                expires: 1e3 * 60 * 60 * 24 * 365
            })
        }, this)
    },
    fetchVipInfo: function() {
        $.ajax({
            url: "/data/user/info",
            dataType: "json",
            cache: false,
            context: this,
            success: function(t) {
                this.setVipInfo(t.data.vip);
                this.set("hasLogin", true)
            }
        })
    },
    setVipInfo: function(t, e) {
        if (t) {
            if (t.cloud) {
                this.set("cloud", t.cloud)
            }
            this.set("vip", 1);
            this.set("HQPrivileges", 1);
            var s = parseInt(T.cookie.get("hq"));
            if (s) {
                this.set("HQMode", s)
            }
        } else {
            this.set("cloud", 0);
            this.set("HQPrivileges", 0);
            this.set("HQMode", 0);
            this.set("vip", 0)
        }
        listView && listView.footer.footerTool("updateAmount");
        if (e) {
            this.set("cloudLimit", e)
        }
    },
    isGold: function() {
        return this.get("cloud") && this.get("cloud").service_level === "gold"
    }
});
var FmListModel = SongListModel.extend({
    defaults: {
        listId: "list_fm_default",
        listName: "list_fm_default",
        total: 0,
        songIds: [],
        songModels: [],
        defaultChannel: "public_yuzhong_huayu",
        channelType: "",
        channelName: "",
        channelId: "",
        isSimilarFail: false
    },
    initialize: function() {
        this.timer = new _mu.Timer(25);
        this.timer.start()
    },
    getReqType: function(t) {
        var e = t.split("_")[1] ? t.split("_")[1] : t.split("_")[0],
            s = {
                similar: "similar",
                tagsearch: "similar",
                songsearch: "similar",
                song: "similar",
                scene: "scene",
                "default": "default"
            },
            i = "channel";
        if (_.has(s, e)) {
            i = s[e]
        }
        return i
    },
    setPlayInfo: function(t, e, s) {
        var i, n, a, o, r = this.getReqType(e);
        if (r == "default") {
            i = t.data.songList.splice(0, 50);
            n = t.ch_name || "";
            a = n == "private" ? "私人频道" : "随便听听";
            o = "songid"
        } else if (r == "channel") {
            i = t.list.splice(0, 50);
            n = t.channel_id || "";
            a = t.channel_name || "";
            o = "id"
        } else if (r == "scene") {
            var l = e.split("_")[2];
            i = t.list.splice(0, 50);
            n = e;
            a = l == "一个人" ? "寂寞" : l;
            o = "song_id"
        } else if (r == "similar") {
            var u = e.split("_")[3];
            i = t.splice(0, 20);
            n = e;
            a = u;
            o = "songId"
        }
        var c = _.pluck(i, o);
        if (s) {
            if (!_.isArray(s)) {
                s = [s]
            }
            c = s.concat(c)
        }
        var h = SongDataModel.createSongModel(c, i);
        this.set({
            total: h.length,
            songIds: c,
            channelType: r,
            channelId: n,
            channelName: a
        });
        SongDataModel.fetchSongTitleData(h, {
            success: _.bind(function(t) {
                this.set({
                    songModels: t
                });
                listCtrl.setPlayList(this, 0, true);
                this.timer.reset().start();
                if (r != "similar") {
                    localstorage.set("fm_channel", this.get("channelId"))
                }
                if (userModel.get("hasLogin")) {
                    SongDataModel.fetchCollectedStatus(this.get("songModels"))
                }
            }, this)
        })
    },
    insertSong: function(t) {
        if (!_.isArray(t)) {
            t = [t]
        }
        var e = SongDataModel.createSongModel(t);
        SongDataModel.fetchSongTitleData(e, {
            success: _.bind(function(t) {
                var e = listCtrl,
                    s = this.get("songModels"),
                    i = e.get("playlist").getCurSongIndex();
                _.each(t, function(t, e) {
                    s.splice(i + 1 + e, 0, t)
                });
                e.setPlayList(this, i + 1, true);
                if (userModel.get("hasLogin")) {
                    SongDataModel.fetchCollectedStatus(this.get("songModels"))
                }
            }, this)
        })
    },
    fetchList: function(t, e) {
        var s = t ? t : this.get("defaultChannel"),
            i = s.split("_"),
            n = this.getReqType(s);
        if (n == "similar") {
            var a = i[2];
            this.fetchSimilarSonglist({
                cid: s,
                query: a,
                songIds: e
            })
        } else if (n == "scene") {
            var o = i[2];
            this.fetchSceneList({
                cid: s,
                query: o,
                songIds: e
            })
        } else {
            this.fetchChannelList({
                cid: s,
                songIds: e
            })
        }
    },
    fetchDefaultList: function(t) {
        var e = this,
            s = "default";
        $.ajax({
            url: "/data/mbox/listenfm",
            dataType: "json",
            cache: false
        }).done(function(i) {
            e.setPlayInfo(i, s, t)
        })
    },
    fetchChannelList: function(t) {
        var e = this,
            s = t || {},
            i = s.cid || "",
            n = s.songIds || "";
        var a = i.indexOf("artist") > -1,
            o = i.split("_"),
            r = o[1] == "artistid" ? "id" : "name",
            l = o[2];
        utils.api("playlist", {
            id: i
        }).done(function(t) {
            if (t.list) {
                if (s.success && _.isFunction(s.success)) {
                    s.success(t, i, n)
                } else {
                    e.setPlayInfo(t, i, n)
                }
                if (a) {
                    logCtrl.sendFmLog("click", {
                        page: "singer_" + l,
                        pos: 1,
                        sub: r
                    })
                }
            } else {
                e.fetchDefaultList(n);
                if (a) {
                    logCtrl.sendFmLog("click", {
                        page: "singer_" + l,
                        pos: 0,
                        sub: r
                    })
                }
            }
        }).fail(function() {
            e.fetchDefaultList(n);
            if (a) {
                logCtrl.sendFmLog("click", {
                    page: "singer_" + l,
                    pos: 0,
                    sub: r
                })
            }
        })
    },
    fetchSceneList: function(t) {
        var e = this,
            s = t || {},
            i = s.cid || "",
            n = s.songIds || "",
            a = "/scene/",
            o = {
                cmd: "rpp",
                mrp_sid: 10,
                rf: 0,
                cmd_no: 1,
                count: 50,
                baiduid: T.cookie.get("BAIDUID") || "",
                scene: s.query || ""
            };
        if (userModel.get("userInfo")) {
            var r = _.merge(o, {
                userid: userModel.get("userInfo").pathInfo.uid
            });
            a = a + $.param(r)
        } else {
            a = a + $.param(o)
        }
        $.ajax({
            url: a,
            dataType: "json"
        }).done(function(t) {
            if (t.status == 0) {
                if (s.success && _.isFunction(s.success)) {
                    s.success(t, i, n)
                } else {
                    e.setPlayInfo(t, i, n)
                }
            } else {
                e.fetchDefaultList(n)
            }
        }).fail(function() {
            e.fetchDefaultList(n)
        })
    },
    fetchSimilarSonglist: function(t) {
        var e = this,
            s = t || {},
            i = s.cid || "",
            n = s.query || 0,
            a = s.songIds || "";
        $.ajax({
            url: "/data/mbox/recommend",
            dataType: "json",
            data: {
                item_id: n
            }
        }).done(function(t) {
            if (t.error == 22e3 && t.data) {
                if (s.success && _.isFunction(s.success)) {
                    s.success(t.data, i, a)
                } else {
                    e.setPlayInfo(t.data, i, a)
                }
            } else {
                e.set("isSimilarFail", true);
                e.fetchDefaultList(a)
            }
        }).fail(function() {
            e.set("isSimilarFail", true);
            e.fetchDefaultList(a)
        })
    },
    requestUserAction: function(t) {
        var e = this,
            s = this.get("channelType"),
            i = t || {},
            n = "/data4/",
            a = s == "scene" || s == "similar" ? "public_shiguang_erge" : this.get("channelId"),
            o = {
                ch_name: a,
                item_id: i.sid || 0,
                action_no: i.act || 0,
                userid: userModel.get("userInfo") ? userModel.get("userInfo").pathInfo.uid : 0,
                baiduid: T.cookie.get("BAIDUID") || ""
            },
            r = i.hasIu ? {
                iu: 1
            } : {};
        n = n + $.param(_.merge(o, r));
        $.ajax({
            url: n,
            dataType: "json",
            cache: false
        }).done(function(t) {
            if (s == "scene" || s == "similar") {
                return
            }
            if (t && t.list && t.list.length > 0) {
                if (i.success && _.isFunction(i.success)) {
                    i.success(t)
                } else {
                    e.updateFmSonglist(t.list)
                }
            }
        })
    },
    updateFmSonglist: function(t) {
        var e = t.slice(0, 50),
            s = _.pluck(e, "songid"),
            i = SongDataModel.createSongModel(s, e);
        SongDataModel.fetchSongTitleData(i, {
            success: _.bind(function(t) {
                if (listCtrl.getListMode() == 1) {
                    var e = listCtrl.get("playlist"),
                        s = e.get("curPlayIndex"),
                        i = s + 1,
                        n = e.get("songModels"),
                        a = [];
                    if (n[s].songId == t[0].songId) {
                        t.splice(0, 1)
                    }
                    _.each(t, function(t, e) {
                        n.splice(i + e, 1, t)
                    });
                    _.each(n, function(t, e) {
                        a.push(e)
                    });
                    e.set({
                        playIndexList: a,
                        songModels: n
                    });
                    if (userModel.get("hasLogin")) {
                        SongDataModel.fetchCollectedStatus(e.get("songModels"))
                    }
                }
            }, this)
        })
    },
    reqTrashCan: function(t) {
        var e = listCtrl.get("playlist"),
            s = e.getCurSong().songId || 0;
        $.ajax({
            url: "/data/user/dislike",
            dataType: "json",
            cache: false,
            data: {
                item_id: s
            }
        }).done(function(e) {
            if (e.errorCode === 22e3 || e.errorCode === 22322) {
                if (t.success && _.isFunction(t.success)) {
                    t.success(e)
                }
            } else if (t.error && _.isFunction(t.error)) {
                t.error()
            }
        }).fail(function() {
            if (t.error && _.isFunction(t.error)) {
                t.error()
            }
        })
    },
    getCurType: function() {
        var t, e = this.get("channelType");
        if (e == "scene") {
            t = this.get("channelId").split("_")[2]
        } else {
            t = this.get("channelId")
        }
        return {
            type: e,
            id: t
        }
    },
    getChannelDuration: function() {
        return this.timer.ticks()
    }
});
var LocalListModel = SongListModel.extend({
    defaults: {
        listName: "list_temp",
        songModels: [],
        songIds: [],
        cacheIds: [],
        start: 0,
        remain: 0,
        INIT: mbox.CONF.LOCALINIT,
        SIZE: mbox.CONF.UPDATEMORE,
        MAX: mbox.CONF.MAXLOCAL
    },
    localService: null,
    initialize: function(t) {
        t = t || {};
        this.localService = t.localService
    },
    fetchSong: function(t) {
        this.localService.fetchSong({
            success: _.bind(function(e) {
                var s, i;
                s = SongDataModel.createSongModel(e);
                i = s.length > this.get("INIT") && !this.searchReady ? s.slice(0, this.get("INIT")) : s;
                this.set({
                    songIds: e,
                    start: i.length,
                    remain: s.length - i.length,
                    songModels: i,
                    total: s.length
                });
                _.isFunction(t.success) && t.success(i, {
                    remain: this.getRemain(),
                    total: s.length
                })
            }, this),
            error: t.error
        })
    },
    updateSong: function(t) {
        t = t || {};
        var e = this.get("start"),
            s = this.get("total"),
            i = this.get("songIds"),
            n, a, o, r, l;
        if (e < s) {
            o = e + this.get("SIZE");
            n = i.slice(e, o);
            a = SongDataModel.createSongModel(n);
            r = this.get("songModels").concat(a);
            l = s - r.length;
            this.set({
                start: o > s ? s : o,
                remain: l,
                songModels: r
            });
            var u = {
                remain: l,
                total: s,
                fromTop: false
            };
            this.trigger("update:songModels", this, a, u);
            _.isFunction(t.success) && t.success(a, u)
        }
    },
    saveSong: function(t, e) {
        e = e || {};
        e.row = e.row || 0;
        this.localService.saveData(t, {
            success: _.bind(function(s, i) {
                var n = _.pluck(s, 0),
                    a = this.get("songIds"),
                    o = this.get("MAX");
                if (i > 0 && n.length > o && a.length <= o) {
                    this.trigger("save:overflow", this, i)
                }
                var r = this.get("songModels");
                Array.prototype.splice.apply(r, [e.row, 0].concat(t));
                this.set({
                    start: this.get("start") + t.length,
                    songModels: r,
                    total: this.get("total") + t.length,
                    songIds: n
                });
                var l = {
                    fromTop: true,
                    total: this.get("total"),
                    remain: this.getRemain(),
                    row: e.row
                };
                this.trigger("save:songModels", this, t, l);
                _.isFunction(e.success) && e.success(t, l)
            }, this),
            error: e.error,
            row: e.row
        })
    },
    removeSong: function(t, e) {
        e = e || {};
        var s = this.get("songModels"),
            i = this.get("songIds"),
            n;
        if (t === -1) {
            s = [];
            i.splice(0, s.length)
        } else {
            t.sort(function(t, e) {
                return t - e
            });
            n = t.length;
            while (n--) {
                var a = t[n];
                s.splice(a, 1);
                i.splice(a, 1)
            }
        }
        this.set({
            start: s.length,
            songModels: s,
            songIds: i,
            total: i.length
        });
        this.localService.removeData(t === -1 ? _.range(0, s.length) : t);
        this.trigger("remove:songModels", this, t, {
            total: i.length
        });
        _.isFunction(e.success) && e.success(t, {
            total: i.length
        })
    },
    getTotal: function() {
        return this.get("total")
    },
    getRemain: function() {
        return this.get("remain")
    },
    getDuplicate: function() {
        var t = this.get("songModels");
        var e = {};
        var s = [];
        _.each(t, function(t, i) {
            var n = t.queryId;
            if (e[n]) {
                s.push(i)
            } else {
                e[n] = true
            }
        }, this);
        return s
    },
    sort: function(t, e) {
        var s, i, n, a = [],
            o = [],
            r = e;
        t.sort(function(t, e) {
            return e - t
        });
        for (s = 0, i = t.length; s < i; s++) {
            if (t[s] === t[s + 1]) {
                continue
            }
            if (t[s] < r) {
                r--
            }
            n = t[s];
            a.unshift(this.get("songModels").splice(n, 1)[0]);
            o.unshift(this.get("songIds").splice(n, 1)[0])
        }
        a.unshift(r, 0);
        o.unshift(r, 0);
        [].splice.apply(this.get("songModels"), a);
        [].splice.apply(this.get("songIds"), o);
        this.localService.saveSort(t, e);
        this.trigger("sort", this, {
            newSongs: this.get("songModels"),
            fromRows: t,
            toRow: e
        })
    },
    searchInit: function() {
        this.fetchSong({
            success: _.bind(function(t) {
                var t = SongDataModel.createSongModel(this.get("songIds")),
                    e = this;
                SongDataModel.fetchSongTitleData(t, {
                    success: function() {
                        e.searchReady = true
                    }
                })
            }, this)
        })
    },
    qSearch: function(t) {
        if (!this.searchReady) {
            return []
        }
        var e, s = SongDataModel.createSongModel(this.get("songIds")),
            i = {},
            n = [];
        e = this.findByKey(s, "songName", t).concat(this.findByKey(s, "artistName", t), this.findByKey(s, "albumName", t));
        var a = e.length,
            o = -1;
        while (++o < a) {
            var r = e[o];
            if (!i[r.songId]) {
                i[r.songId] = 1;
                n.push(r)
            }
        }
        return n
    },
    findByKey: function(t, e, s) {
        var i = [];
        s = s.toLowerCase();
        for (var n = 0, a = t.length; n < a; n++) {
            if (t[n][e].toLowerCase().indexOf(s) > -1) {
                i.push({
                    index: n,
                    type: e,
                    songId: t[n].songId,
                    songName: t[n].songName,
                    artistName: t[n].artistName,
                    albumName: t[n].albumName
                })
            }
        }
        return i
    }
});
var LocalService = MboxBaseModel.extend({
    defaults: {
        orgData: [],
        cacheData: [],
        artistMap: null,
        albumMap: null,
        MAX: mbox.CONF.MAXLOCAL
    },
    allDataCache: {},
    ls: null,
    isReady: false,
    initialize: function(t) {
        t = t || {};
        this.ls = t.ls
    },
    fetchData: function(t) {
        if (this.isReady) {
            _.isFunction(t.success) && t.success(this.get("orgData"))
        } else {
            var e = _.bind(function() {
                var e = this.ls.get("defaultIdList"),
                    s = this.get("cacheData");
                e = _.isUndefined(e) ? [] : e;
                this.isReady = true;
                if (s.length > 0) {
                    this.set("orgData", this.get("cacheData").concat(e));
                    this.set("cacheData", []);
                    this.saveData()
                } else {
                    this.set("orgData", e)
                }
                _.isFunction(t.success) && t.success(this.get("orgData"))
            }, this);
            this.ls.onready(e).onerror(e).ontimeout(e)
        }
    },
    changeDataStructure: function() {
        var t = _.pluck(this.get("orgData"), 0),
            e = SongDataModel.createSongModel(t);
        SongDataModel.fetchSongTitleData(e, {
            success: _.bind(function(t) {
                var e = [],
                    s;
                _.each(t, function(t) {
                    s = t.songId && t.songId != 0 ? t.songId : t.queryId;
                    e.push([s, t.artistId || 0, t.albumId || 0, t.fchar])
                });
                this.set("orgData", e);
                this.ls.set("defaultIdList", e);
                this.ls.set("_has_change_", 1)
            }, this)
        })
    },
    saveData: function(t, e) {
        e = e || {};
        var s = [],
            i = this,
            n = 0;
        _.each(t, function(t, e) {
            if (t.hasTitle || t.artistId) {
                s.push([t.songId && t.songId != 0 ? t.songId : t.queryId, t.artistId, t.albumId, t.fchar])
            } else {
                s.push([t.queryId, 0, 0, ""])
            }
        });
        s.length && i._addNewData(s);
        if (this.isReady) {
            e.row = e.row || 0;
            var a = this.get("orgData");
            Array.prototype.splice.apply(a, [e.row, 0].concat(s));
            if (a.length > this.get("MAX")) {
                a = a.slice(0, this.get("MAX"))
            }
            this.set("orgData", a);
            this.ls.set("defaultIdList", a);
            n = a.length - this.get("MAX")
        } else {
            this.set("cacheData", this.get("cacheData").concat(s))
        }
        _.isFunction(e.success) && e.success(a, n)
    },
    removeData: function(t) {
        t.sort(function(t, e) {
            return t - e
        });
        var e = t.length,
            s, i = [],
            n = this.get("orgData");
        while (e--) {
            s = t[e];
            i.push(n.splice(s, 1)[0])
        }
        i.length && this._delData(i);
        this.saveData()
    },
    removeById: function(t) {
        var e = [],
            s = this.get("orgData");
        _.each(t, function(t, i) {
            var n = s.length;
            while (n--) {
                if (s[n][0] == t) {
                    e.push(n);
                    break
                }
            }
        });
        this.removeData(e)
    },
    saveSort: function(t, e) {
        var s, i, n = [],
            a = e;
        for (s = 0, len = t.length; s < len; s++) {
            if (t[s] === t[s + 1]) {
                continue
            }
            if (t[s] < a) {
                a--
            }
            i = t[s];
            n.unshift(this.get("orgData").splice(i, 1)[0])
        }
        n.unshift(a, 0);
        [].splice.apply(this.get("orgData"), n);
        this.saveData()
    },
    fetchSong: function(t) {
        t = t || {};
        if (this.isReady) {
            _.isFunction(t.success) && t.success(_.pluck(this.get("orgData"), 0))
        } else {
            this.fetchData({
                success: function(e) {
                    _.isFunction(t.success) && t.success(_.pluck(e, 0))
                }
            })
        }
    },
    fetchArtist: function(t) {
        if (this.isReady && this.get("artistMap")) {
            _.isFunction(t) && t(this.get("artistMap"))
        } else {
            this.fetchData({
                success: _.bind(function(e) {
                    this._addNewData(e, 1);
                    _.isFunction(t) && t(this.get("artistMap"))
                }, this)
            })
        }
    },
    fetchAlbum: function(t) {
        if (this.isReady && this.get("albumMap")) {
            _.isFunction(t) && t(this.get("albumMap"))
        } else {
            this.fetchData({
                success: _.bind(function(e) {
                    this._addNewData(e, 1);
                    _.isFunction(t) && t(this.get("albumMap"))
                }, this)
            })
        }
    },
    _addNewData: function(t, e) {
        var s, i = t.length,
            n = false;
        var a, o = false;
        if (e) {
            s = {};
            a = {}
        } else {
            s = this.get("artistMap");
            a = this.get("albumMap");
            if (!s) {
                return
            }
        }
        while (i--) {
            var r = t[i][3],
                l = t[i][1].toString().split(",")[0],
                u = t[i][2];
            if (!s[l]) {
                s[l] = {};
                s[l].fchar = r;
                s[l]["songlist"] = [];
                n = true
            }
            s[l]["songlist"].push(t[i][0]);
            r = u == 0 ? "ZZ" : r;
            if (!a[u]) {
                a[u] = {};
                a[u]["fchar"] = r;
                a[u]["songlist"] = [];
                o = true
            }
            a[u]["songlist"].push(t[i][0])
        }
        this.set("artistMap", s);
        this.set("albumMap", a)
    },
    _delData: function(t) {
        var e = +new Date;
        var s = false,
            i = false,
            n = this.get("artistMap"),
            a = this.get("albumMap"),
            o = t.length;
        if (!n) {
            return
        }
        while (o--) {
            var r = t[o][1].toString().split(",")[0],
                l = t[o][3],
                u = t[o][2];
            if (n[r] && n[r]["songlist"]) {
                n[r]["songlist"] = _.without(n[r]["songlist"], t[o][0]);
                if (!n[r]["songlist"].length) {
                    delete n[r];
                    s = true
                }
            }
            l = u == 0 ? "ZZ" : l;
            if (a[u] && a[u]["songlist"]) {
                a[u]["songlist"] = _.without(a[u]["songlist"], t[o][0]);
                if (!a[u]["songlist"].length) {
                    delete a[u];
                    i = true
                }
            }
        }
        this.set("artistMap", n);
        this.set("albumMap", a)
    }
});
var LocalHistoryModel = SongListModel.extend({
    defaults: {
        listName: "list_local_late",
        songIds: "",
        songModels: "",
        maxNum: 50,
        overflow: 200,
        allData: {},
        LSReady: false
    },
    initialize: function(t) {
        t = t || {};
        this.saveKey = "localHistory";
        this.type = t.type || "late";
        this.set("listName", "list_local_" + this.type);
        this.localStorage = t.localStorage;
        this.allLength = 0;
        var e = _.bind(function() {
            var t = this.localStorage.get(this.saveKey) || {};
            this.set("allData", t);
            for (var e in t) {
                if (t.hasOwnProperty(e)) {
                    this.allLength++
                }
            }
        }, this);
        this.localStorage.onready(e).onerror(e).ontimeout(e)
    },
    ready: function() {
        this.set("LSReady", true)
    },
    isReady: function() {
        return !!this.get("LSReady")
    },
    fetchSong: function(t) {
        t = t || {};
        var e = this.localStorage,
            s = this,
            i = function() {
                var i = e.get(s.saveKey) || {},
                    n = s.type === "late" ? 1 : s.type === "often" ? 2 : 0,
                    a = s.dataToArray(i);
                if (n) {
                    a.sort(function(t, e) {
                        return e[n] - t[n]
                    })
                }
                var o = [],
                    r = Math.min(a.length, s.get("maxNum"));
                for (var l = 0; l < r; l++) {
                    if (!n || a[l][n] > 0) {
                        o.push(a[l][0])
                    }
                }
                var u = SongDataModel.createSongModel(o);
                s.allLength = a.length;
                s.set({
                    allData: i,
                    songIds: o,
                    songModels: u
                });
                if (_.isFunction(t.success)) {
                    t.success(u, {
                        remain: 0,
                        total: o.length
                    })
                }
            };
        if (this.isReady()) {
            e.onready(i).onerror(i).ontimeout(i)
        } else {
            i()
        }
    },
    dataToArray: function(t) {
        var e = [],
            s;
        for (var i in t) {
            if (t.hasOwnProperty(i)) {
                s = _.isArray(t[i]) ? [i].concat(t[i]) : [i, t[i]];
                e.push(s)
            }
        }
        return e
    },
    addToHistory: function(t) {
        var e = this.get("allData"),
            s = e[t];
        if (s) {
            s[0] = +new Date;
            s[1] = s[1] > 0 ? s[1] + 1 : 1
        } else {
            e[t] = [+new Date, 1, 0];
            this.allLength = this.allLength + 1;
            if (this.allLength > this.get("overflow")) {
                this.handleOverflow()
            }
        }
        this._save()
    },
    _save: function() {
        this.localStorage.set(this.saveKey, this.get("allData"))
    },
    handleOverflow: function() {
        var t = this.get("allData"),
            e = this.dataToArray(t).sort(function(t, e) {
                return t[1] - e[1]
            }),
            s = e.sort(function(t, e) {
                return t[2] - e[2]
            }),
            i = e.length,
            n = this.get("maxNum");
        if (i <= n) return;
        var a = _.intersection(e.slice(0, i - n), s.slice(0, i - n));
        a.sort(function(t, e) {
            return t[1] - e[1] >= 0 && t[2] - e[2] >= 0 ? 1 : -1
        });
        for (var o = 0, r = i - this.get("overflow") + 10; o < r; o++) {
            delete t[a[o][0]]
        }
        this.allLength = this.allLength - r
    },
    removeSong: function(t, e) {
        var s = this.get("songIds"),
            i = this.get("allData"),
            n = this.get("songModels"),
            a;
        if (t !== -1) {
            t = _.isArray(t) ? t : [t];
            t.sort(function(t, e) {
                return t - e
            });
            var o = t.length;
            while (o--) {
                var r = t[o];
                a = s.splice(r, 1);
                n.splice(r, 1);
                i[a][this.type === "late" ? 0 : 1] = -1;
                if (i[a][0] < 0 && i[a][1] < 0) {
                    delete i[a]
                }
            }
        } else {
            for (var l = s.length; l; l--) {
                a = s[l - 1];
                i[a][this.type === "late" ? 0 : 1] = -1;
                if (i[a][0] < 0 && i[a][1] < 0) {
                    delete i[a];
                    this.allLength--
                }
            }
            s = [];
            n = []
        }
        this._save();
        var u = {
            total: s.length
        };
        this.trigger("remove:songModels", this, t, u);
        if (_.isFunction(e.success)) {
            e.success(t, u)
        }
    },
    submitList: function(t, e) {
        var s = this.get("allData")
    }
});
var FavorListsModel = MboxBaseModel.extend({
    defaults: {
        favorList: []
    },
    initialize: function() {},
    fetchFavorList: function(t) {
        t = t || {};
        if (t.data && !_.isEmpty(t.data)) {
            this.set({
                favorList: t.data
            });
            if (_.isFunction(t.success)) {
                t.success(t.data)
            }
            this.trigger("fetch:favorList", this, t.data)
        } else {
            $.ajax({
                url: "/data/playlist/getlist",
                dataType: "json",
                context: this,
                cache: false,
                success: function(e, s, i) {
                    if (e.errorCode == 22e3) {
                        _.each(e.data.play_list, function(t, e) {
                            t.listTotal = parseInt(t.listTotal) || 0
                        });
                        this.set({
                            favorList: e.data.play_list
                        });
                        if (_.isFunction(t.success)) {
                            t.success(e)
                        }
                        this.trigger("fetch:favorList", this, e.data.play_list)
                    }
                },
                error: t.error
            })
        }
    },
    addFavorList: function(t, e) {
        e = e || {};
        if (this.get("favorList").length >= 200) {
            this.trigger("favorList:overflow", this);
            return
        }
        $.ajax({
            url: "/data/mbox/addplaylist",
            data: {
                title: t
            },
            type: "POST",
            dataType: "json",
            cache: false,
            context: this,
            success: function(t) {
                if (t.errorCode == 22e3) {
                    var s = this.get("favorList"),
                        i = t.data;
                    i.listTotal = parseInt(i.listTotal) || 0;
                    s.push(i);
                    this.set({
                        favorList: s
                    });
                    this.trigger("add:favorList", this, i);
                    if (_.isFunction(e.success)) {
                        e.success(i)
                    }
                }
            },
            error: e.error
        })
    },
    addLocalFavorList: function(t) {
        if (t && !!t.listTitle) {
            var e = this.get("favorList"),
                s = t;
            s.listTotal = parseInt(s.listTotal) || 0;
            e.push(s);
            this.set({
                favorList: e
            });
            this.trigger("add:favorList", this, s)
        }
    },
    removeFavorList: function(t, e) {
        e = e || {};
        $.ajax({
            url: "/data/mbox/deletelist",
            dataType: "json",
            data: {
                list_id: t
            },
            type: "POST",
            context: this,
            cache: false,
            success: function(s) {
                if (s.errorCode == 22e3) {
                    var i = this.get("favorList");
                    var n = -1;
                    _.any(i, function(e, s) {
                        if (e.listId == t) {
                            n = s;
                            return true
                        }
                        return false
                    }, this);
                    if (n != -1) {
                        i.splice(n, 1);
                        this.set({
                            favorList: i
                        });
                        this.trigger("remove:favorList", this, t);
                        if (_.isFunction(e.success)) {
                            e.success(n)
                        }
                    }
                }
            },
            error: e.error
        })
    },
    renameFavorList: function(t, e, s) {
        s = s || {};
        $.ajax({
            url: "/data/mbox/renameplaylist",
            data: {
                title: e,
                list_id: t
            },
            type: "POST",
            dataType: "json",
            context: this,
            cache: false,
            success: function(e) {
                if (e.errorCode == 22e3) {
                    var i = this._getListById(t);
                    var n = e.data.listTitle;
                    if (i) {
                        i.listTitle = n;
                        this.set({
                            favorList: this.get("favorList")
                        });
                        this.trigger("rename:favorList", this, t, n);
                        if (_.isFunction(s.success)) {
                            s.success(t, n)
                        }
                    }
                }
            },
            error: function(t) {}
        })
    },
    getListTotal: function(t) {
        return this._getListById(t).listTotal
    },
    setListTotal: function(t, e) {
        this._getListById(t).listTotal = e;
        this.trigger("change:total", this, t, e)
    },
    _getListById: function(t) {
        var e = this.get("favorList");
        var s = -1;
        _.any(e, function(e, i) {
            if (e.listId == t) {
                s = i;
                return true
            }
            return false
        }, this);
        return s > -1 ? e[s] : null
    },
    reset: function() {
        this.trigger("remove:favorList", this, -1)
    }
});
var LocalArtistModel = MboxBaseModel.extend({
    defaults: {
        total: 0,
        start: 0,
        pageNum: 50
    },
    artist: [],
    cacheArtist: {},
    localService: null,
    initialize: function(t) {
        this.localService = t.localService
    },
    createArtistModels: function(t) {
        var e = [],
            s, i = this;
        _.each(t, function(t) {
            var n = _.isObject(t) ? t.artistId : t;
            if (!n) return;
            s = i.cacheArtist[n] || {
                artistId: n
            };
            if (_.isObject(t) && t.artistId) {
                _.extend(s, t)
            }
            i.cacheArtist[n] = s;
            e.push(s)
        });
        return e
    },
    fetchArtist: function(t) {
        this.localService.fetchArtist(_.bind(function(e) {
            var s = [];
            _.each(e, function(t, e) {
                if (e != 0) {
                    s.push({
                        artistId: e,
                        fchar: t.fchar,
                        songs: _.unique(t.songlist)
                    })
                }
            });
            var i = {
                total: s.length,
                start: 50
            };
            this.set(i);
            this.artist = this.createArtistModels(s);
            this.artist.sort(function(t, e) {
                var s = t.fchar.localeCompare(e.fchar);
                if (s > 0) {
                    return 1
                } else if (s < 0) {
                    return -1
                } else {
                    return (t.artistName || "").localeCompare(e.artistName || "")
                }
            });
            _.isFunction(t) && t(this.artist.slice(0, this.get("pageNum")))
        }, this))
    },
    updateArtist: function() {
        var t = this.get("total"),
            e = this.get("pageNum"),
            s = this.get("start");
        if (t > s) {
            this.set({
                start: s + e > t ? t : s + e
            });
            return this.artist.slice(s, s + this.get("pageNum"))
        } else {
            return []
        }
    },
    fetchArtistInfo: function(t, e) {
        var s = [],
            i = {};
        e = e || {};
        _.each(t, function(t) {
            if (!t.hasInfo && t.artistId != 0) {
                s.push(t.artistId);
                i[t.artistId] = t
            }
        });
        if (!s.length) {
            _.isFunction(e.success) && e.success(t);
            return
        }
        $.ajax({
            url: "/data/mbox/tmplistview",
            data: {
                type: "artist",
                itemIds: s.join(",")
            },
            dataType: "json",
            context: this,
            success: function(s) {
                if (s.error === 22e3) {
                    _.each(s.data, function(t) {
                        if (i[t.artistId]) {
                            i[t.artistId] = _.extend(i[t.artistId], t);
                            i[t.artistId].hasInfo = true
                        }
                    });
                    t.sort(function(t, e) {
                        var s = t.fchar.localeCompare(e.fchar);
                        if (s > 0) {
                            return 1
                        } else if (s < 0) {
                            return -1
                        } else {
                            return (t.artistName || "").localeCompare(e.artistName || "")
                        }
                    });
                    _.isFunction(e.success) && e.success(t)
                } else {
                    _.isFunction(e.error) && e.error(s)
                }
            },
            error: function(t) {
                _.isFunction(e.error) && e.error(t)
            }
        })
    },
    getTotal: function() {
        return this.get("total")
    }
});
var LocalAlbumModel = MboxBaseModel.extend({
    defaults: {
        total: 0,
        start: 0,
        pageNum: 50
    },
    album: [],
    cacheAlbum: {},
    localService: null,
    initialize: function(t) {
        this.localService = t.localService
    },
    createAlbumModels: function(t) {
        var e = [],
            s, i = this;
        _.each(t, function(t) {
            var n = _.isObject(t) ? t.albumId : t;
            if (!n) return;
            s = i.cacheAlbum[n] || {
                albumId: n
            };
            if (_.isObject(t) && t.albumId) {
                _.extend(s, t)
            }
            i.cacheAlbum[n] = s;
            e.push(s)
        });
        return e
    },
    fetchAlbum: function(t) {
        this.localService.fetchAlbum(_.bind(function(e) {
            var s = [];
            _.each(e, function(t, e) {
                if (e != 0) {
                    s.push({
                        albumId: e,
                        fchar: t.fchar,
                        songs: _.unique(t.songlist)
                    })
                }
            });
            s.sort(function(t, e) {
                return t.fchar.localeCompare(e.fchar)
            });
            var i = {
                total: s.length,
                start: 50
            };
            this.set(i);
            this.album = this.createAlbumModels(s);
            _.isFunction(t) && t(this.album.slice(0, this.get("pageNum")))
        }, this))
    },
    updateAlbum: function() {
        var t = this.get("total"),
            e = this.get("pageNum"),
            s = this.get("start");
        if (t > s) {
            this.set({
                start: s + e > t ? t : s + e
            });
            return this.album.slice(s, s + this.get("pageNum"))
        } else {
            return []
        }
    },
    fetchAlbumInfo: function(t, e) {
        var s = [],
            i = {};
        e = e || {};
        _.each(t, function(t) {
            if (!t.hasInfo && t.albumId != 0) {
                s.push(t.albumId);
                i[t.albumId] = t
            }
        });
        if (!s.length) {
            _.isFunction(e.success) && e.success(t);
            return
        }
        $.ajax({
            url: "/data/mbox/tmplistview",
            data: {
                type: "album",
                itemIds: s.join(",")
            },
            dataType: "json",
            context: this,
            success: function(s) {
                if (s.error === 22e3) {
                    _.each(s.data, function(t) {
                        if (i[t.albumId]) {
                            i[t.albumId] = _.extend(i[t.albumId], t);
                            i[t.albumId].hasInfo = true
                        }
                    });
                    _.isFunction(e.success) && e.success(t)
                } else {
                    _.isFunction(e.error) && e.error(s)
                }
            },
            error: function(t) {
                _.isFunction(e.error) && e.error(t)
            }
        })
    },
    getDetail: function(t, e) {
        var s = this.createAlbumModels([t])[0];
        if (s.albumId == 0 || s.hasDetail) {
            s.remains = _.filter(s.allSong, function(t) {
                for (var e = 0, i = s.songs.length; e < i; e++) {
                    if (t.songId.toString() == s.songs[e].toString()) {
                        return false
                    }
                }
                return true
            });
            _.isFunction(e.success) && e.success(s);
            return
        }
        $.ajax({
            url: "data/mbox/tmplistviewdetail",
            data: {
                type: "album",
                item_id: t
            },
            dataType: "json",
            context: this,
            success: function(t) {
                if (t.error === 22e3) {
                    s.remains = _.filter(t.data, function(t) {
                        for (var e = 0, i = s.songs.length; e < i; e++) {
                            if (t.songId.toString() == s.songs[e].toString()) {
                                return false
                            }
                        }
                        return true
                    });
                    s.allSong = t.data;
                    s.hasDetail = 1
                }
                _.isFunction(e.success) && e.success(s)
            },
            error: function(t) {
                _.isFunction(e.error) && e.error(t)
            }
        })
    },
    getTotal: function() {
        return this.get("total")
    }
});
var LocalArtistViewModel = SongListModel.extend({
    defaults: {
        listName: "",
        listId: "",
        songIds: [],
        songModels: [],
        start: 0,
        size: mbox.CONF.UPDATEMORE,
        total: 0
    },
    initialize: function(t) {
        this.options = t || {};
        this.set({
            listId: t.listId || "",
            listName: t.listName || "list_local_artist"
        })
    },
    updateSong: function(t, e) {
        var s = [],
            i;
        if (t) {
            i = t.length;
            while (i--) {
                s.push(t[i].songId)
            }
            this.set({
                songIds: s
            });
            this.set({
                songModels: t
            });
            this.trigger("update:songModels", this, t, {})
        }
    },
    addSong: function(t, e) {
        this.set({
            songModels: this.get("songModels").concat(t)
        });
        this.set({
            total: this.get("songModels").length
        });
        var s = [];
        for (var i = 0, n = t.length; i < n; i++) {
            s.push(t[i].songId)
        }
        this.set({
            songIds: this.get("songIds").concat(s)
        });
        this.trigger("update:songModels", this, t, {})
    },
    removeSong: function(t, e) {
        e = e || {};
        var s = this.get("songModels"),
            i = this.get("songIds"),
            n;
        if (t === -1) {
            s = [];
            i.splice(0, s.length)
        } else {
            t.sort(function(t, e) {
                return t - e
            });
            n = t.length;
            while (n--) {
                var a = t[n];
                s.splice(a, 1);
                i.splice(a, 1)
            }
        }
        this.set({
            start: s.length,
            songModels: s,
            songIds: i,
            total: i.length
        });
        this.trigger("remove:songModels", this, t, {
            total: i.length
        })
    },
    fetchSong: function(t, e) {
        t = t || {};
        var s = this,
            i = 0,
            n = [],
            a = this.size = t.data.length;
        this.set({
            songModels: t.data
        });
        for (var o = 0, r = t.data.length; o < r; o++) {
            n.push(t.data[o].songId)
        }
        this.set({
            songIds: n
        });
        this.set({
            total: n.length
        });
        if (_.isFunction(t.success)) {
            t.success(t.data)
        }
    },
    getTotal: function() {
        return this.get("total")
    },
    getRemain: function() {
        return this.get("remain")
    },
    getQuota: function() {
        return this.get("quota")
    }
});
var LocalAlbumViewModel = SongListModel.extend({
    defaults: {
        listName: "",
        listId: "",
        songIds: [],
        songModels: [],
        start: 0,
        size: mbox.CONF.UPDATEMORE,
        total: 0
    },
    initialize: function(t) {
        this.options = t || {};
        this.set({
            listId: t.listId || "",
            listName: t.listName || "list_local_album"
        })
    },
    updateSong: function(t, e) {
        var s = [],
            i;
        if (t) {
            i = t.length;
            while (i--) {
                s.push(parseInt(t[i].songId, 10))
            }
            this.set({
                songIds: s
            });
            this.set({
                songModels: t
            });
            this.trigger("update:songModels", this, t, {})
        }
    },
    addSong: function(t, e) {
        this.set({
            songModels: this.get("songModels").concat(t)
        });
        this.set({
            total: this.get("songModels").length
        });
        var s = [];
        for (var i = 0, n = t.length; i < n; i++) {
            s.push(t[i].songId)
        }
        this.set({
            songIds: this.get("songIds").concat(s)
        });
        this.trigger("update:songModels", this, t, {})
    },
    removeSong: function(t, e) {
        e = e || {};
        var s = this.get("songModels"),
            i = this.get("songIds"),
            n;
        if (t === -1) {
            s = [];
            i.splice(0, s.length)
        } else {
            t.sort(function(t, e) {
                return t - e
            });
            n = t.length;
            while (n--) {
                var a = t[n];
                s.splice(a, 1);
                i.splice(a, 1)
            }
        }
        this.set({
            start: s.length,
            songModels: s,
            songIds: i,
            total: i.length
        });
        this.trigger("remove:songModels", this, t, {
            total: i.length
        })
    },
    fetchSong: function(t, e) {
        t = t || {};
        var s = this,
            i = 0,
            n = [],
            a = this.size = t.data.length;
        this.set({
            songModels: t.data
        });
        for (var o = 0, r = t.data.length; o < r; o++) {
            n.push(t.data[o].songId)
        }
        this.set({
            songIds: n
        });
        this.set({
            total: n.length
        });
        if (_.isFunction(t.success)) {
            t.success(t.data)
        }
    },
    getTotal: function() {
        return this.get("total")
    },
    getRemain: function() {
        return this.get("remain")
    },
    getQuota: function() {
        return this.get("quota")
    }
});
/** If u are interested in our code and would like to make it robust, just contact us^^ <@音乐前端> **/
/** Generated by M3D. **/