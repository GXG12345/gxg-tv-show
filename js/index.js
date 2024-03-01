// 设置点击出水波效果
let mx, my, timer;
let z = 2;
$('html').click(function (e) {
    mx = e.clientX - 50;
    my = e.clientY - 50;
    z = z + 1;
    if ($(e.target).closest("#calendar").length == 0 && $(e.target).closest("#pageBar").length == 0) {
        _click_wave(mx, my, z);
    }
});

function _click_wave(i, j, k) {
    $('body').prepend(
        '<div class="click_wave click_wave_' + k + '" style="z-index:' + k + ';top:' + j + 'px;left:' + i + 'px;">' +
        '<span class="click_wave__back"></span>' +
        '<span class="click_wave__back"></span>' +
        '</div>'
    );
    setTimeout(function () {
        $('.click_wave_' + k).fadeToggle(2000, function () { $('.click_wave_' + k).remove(); });
    }, 1000);
}


setTimeout(function(){
  $("#up").css("display",'inline-block');
},800);
//设置回到顶部
let scroll_top=0;
	$(window).scroll(function() {
		$("#up").css("opacity",Number($("body,html").scrollTop())*10/Number($('#imgList').height()));
　　	});
$('#up').on('click', function(event){
  event.preventDefault();
  $("body,html").animate({scrollTop: 0 ,},700);
});

	// 下面是美化title属性
    let sweetTitles = {
        x: 10,
        y: 20,
        tipElements: "a,span,img,div,li",
        noTitle: false,
        init: function() {
            let noTitle = this.noTitle;
            $(this.tipElements).each(function() {
                $(this).mouseover(function(e) {
                    if (noTitle) {
                        isTitle = true;
                    } else {
                        isTitle = $.trim(this.title) != '';
                    }
                    if (isTitle) {
                        this.myTitle = this.title;
                        this.title = "";
                        let tooltip =
                            "<div class='tooltip'><div class='tipsy-inner'>" + this.myTitle +
                            "</div></div>";
                        $('body').append(tooltip);
                        $('.tooltip').css({
                            "top": (e.clientY + 20) + "px",
                            "left": (e.clientX - 20) + "px"
                        }).show('fast');
                    }
                }).mouseout(function() {
                    if (this.myTitle != null) {
                        this.title = this.myTitle;
                        $('.tooltip').remove();
                    }
                }).mousemove(function(e) {
                    $('.tooltip').css({
                        "top": (e.clientY + 20) + "px",
                        "left": (e.clientX - 20) + "px"
                    });
                });
            });
        }
    };
  $(document).ready(function () {
      sweetTitles.init();
  });
// 设置日间模式还是夜间模式
if (document.cookie.indexOf("day_mode") != -1) {
    if (document.cookie.match(new RegExp("(^| )" + 'day_mode' + "=([^;]*)(;|$)"))[2] == 'moon') {
        document.getElementById("blogTitle_switch_input").checked = true;
        change_day_mode('moon');
    }
}
function change_day_mode(value) {
    // 先加上cookies
    let exp = new Date();
    exp.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
    document.cookie = "day_mode=" + encodeURI(value) + ";expires=" + exp.toUTCString();
    if (value == 'moon') {
        // 再加上夜间模式滤镜样式
        let style = document.createElement("style");
        style.id = "dark-mode-style";
        style.textContent = "@media screen {html {text-shadow: 0 0 0 !important;filter: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"dark-mode-filter\" color-interpolation-filters=\"sRGB\"><feColorMatrix type=\"matrix\" values=\"0.283 -0.567 -0.567 0 0.925 -0.567 0.283 -0.567 0 0.925 -0.567 -0.567 0.283 0 0.925 0 0 0 1 0\"/></filter></svg>#dark-mode-filter') !important;scrollbar-color: #454a4d #202324;}}@media print {.no-print {display: none !important;}}";
        document.getElementsByTagName("head").item(0).appendChild(style);
    }
    else {
        // 再去除夜间模式滤镜样式
        if (document.getElementById('dark-mode-style')) {
            document.getElementById('dark-mode-style').remove();
        }
    }
}

$('#dark-mode-change').click(function (e) {
    if (!document.getElementById("blogTitle_switch_input").checked) {
        change_day_mode('moon');
    }
    else {
        change_day_mode('sun');
    }
});

// 下面开始设置DPlayer
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: true,                                                   // 可选，自动播放视频，不支持移动浏览器
    theme: '#FADFA3',                                                  // 可选，主题颜色，默认: #b7daff
    loop: false,                                                        // 可选，循环播放音乐，默认：true
    // lang: 'en',                                                        // 可选，语言，`zh'用于中文，`en'用于英语，默认：Navigatorlanguage
    // screenshot: true,                                                  // 可选，启用截图功能，默认值：false，注意：如果设置为true，视频和视频截图必须启用跨域
    logo: './img/gxg.jpg',
    hotkey: true,                                                      // 可选，绑定热键，包括左右键和空格，默认值：true
    preload: 'auto',
    video: {
        // url: 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Bastion_TheLastBastion.mp4',
        // url:'https://gitlab.com/GXG12345/show/-/raw/main/show.mp4',
        url:'https://jihulab.com/GXG12345/show/-/raw/main/show2.mp4',
        // url:'/static/shijian/3/index.m3u8',
    },
    // danmaku: {                                                         // 可选，显示弹幕，忽略此选项以隐藏弹幕
    //     id: '',                                        // 必需，弹幕 id，注意：它必须是唯一的，不能在你的新播放器中使用这些： `https://api.prprpr.me/dplayer/list`
    //     api: '',                             // 必需，弹幕 api
    //     token: '',                                            // 可选，api 的弹幕令牌
    //     maximum: 1000,                                                 // 可选，最大数量的弹幕
    //     addition: [''],   // 可选的，额外的弹幕，参见：`Bilibili弹幕支持`
    //     unlimited:true
    //      },
    
    // contextmenu: [
    //     {
    //         text: '戈小戈个人博客',
    //         link: 'https://www.cnblogs.com/wsgxg',
    //     },
    //     {
    //         text: 'custom2',
    //         click: (player) => {
    //             console.log(player);
    //         },
    //     },
    // ],
    
});
function sw() {
    dp.switchVideo({
    url: './media/show.mp4',
			})

}
dp.on('ended', function () {
    // console.log('player ended');
    sw();
    
});

//Echarts显示开始
let myChart = echarts.init(document.getElementById('header-title'));
// 指定图表的配置项和数据
let option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'GXG TV项目效果展示',
          fontSize: remFontSize(0.5),
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#2759a8',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: '#2759a8'
              }
            }
          ]
        }
      }
    ]
  }
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
function remFontSize(res) {
    let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res*fontSize;
 }
 //下面是见监控设备宽度发生变化时的函数
 window.onresize = function(){
    let options = {
        graphic: {
            elements: [
              {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                  text: '离散数学课程知识脉络可视化项目效果展示',
                  fontSize: remFontSize(0.5),
                  fontWeight: 'bold',
                  lineDash: [0, 200],
                  lineDashOffset: 0,
                  fill: 'transparent',
                  stroke: '#2759a8',
                  lineWidth: 1
                },
                keyframeAnimation: {
                  duration: 3000,
                  loop: false,
                  keyframes: [
                    {
                      percent: 0.7,
                      style: {
                        fill: 'transparent',
                        lineDashOffset: 200,
                        lineDash: [200, 0]
                      }
                    },
                    {
                      // Stop for a while.
                      percent: 0.8,
                      style: {
                        fill: 'transparent'
                      }
                    },
                    {
                      percent: 1,
                      style: {
                        fill: '#2759a8'
                      }
                    }
                  ]
                }
              }
            ]
          }
      };
    myChart.setOption(options);
}