// 再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [deskripsi]
 * @return {[type]}           [deskripsi]
 */
(function() {

  /**
   * 内容JSON
   */
  var demoContent = [
    {
      link_doc: '/openclash/',
      judul: 'Openclash',
      kategori: 'Openwrt',
      deskripsi: 'Edukasi openclash di openwrt',
    },
    {
      link_doc: '/clashforandroid/',
      judul: 'Clash For Android',
      kategori: 'Android',
      deskripsi: 'Edukasi cfa di android.',
    },
    {
      link_doc: '/clashformagisk/',
      judul: 'Clash For Magisk',
      kategori: 'Android',
      deskripsi: 'Edukasi cfm di android.',
    },
    {
      link_doc: '/clashforwindows/',
      judul: 'Clash For Windows',
      kategori: 'Windows',
      deskripsi: 'Edukasi cfw di windows.',
    },
    {
      link_doc: '/passwall/',
      judul: 'Passwall',
      kategori: 'Openwrt',
      deskripsi: 'Edukasi passwall di openwrt.',
    },
    {
      link_doc: '/openwrt/',
      judul: 'Openwrt',
      kategori: 'Openwrt',
      deskripsi: 'Edukasi setiing dan tools di openwrt.',
    },
    {
      link_doc: '/mikrotik/',
      judul: 'Mikrotik',
      kategori: 'Mikrotik',
      deskripsi: 'Edukasi setting dan tools di mikrotik.',
    },
    {
      link_doc: '/linux/',
      judul: 'Linux',
      kategori: 'Linux',
      deskripsi: 'Edukasi setting dan program di linux.',
    },
    {
      link_doc: '/modem/',
      judul: 'Modem',
      kategori: 'Modem',
      deskripsi: 'Edukasi setting dan instalasi pada modem.',
    },
    {
      link_doc: '/router/',
      judul: 'Router',
      kategori: 'Router',
      deskripsi: 'Edukasi setting dan instalasi pada router.',
    },
  ]

  contentInit(demoContent) //内容初始化
  initGrid()
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  var htmlArr = [];
  for (var i = 0; i < content.length; i++) {
      htmlArr.push('<div class="grid-item">')
      htmlArr.push('<a class="a-img" href="'+content[i].doc+'">')
      if(content[i].gambar) {
        htmlArr.push('<img src="'+content[i].gambar+'" style="width: 100%">')
      }
      htmlArr.push('</a>')
      htmlArr.push('<h3 class="demo-title">')
      htmlArr.push('<a href="'+content[i].link_doc+'">'+content[i].judul+'</a>')
      htmlArr.push('</h3>')
      if (content[i].kategori) {
        htmlArr.push('<p><b>Kategori</b> '+content[i].kategori+'</p>')
      }
      htmlArr.push('<p><b>Deskripsi:</b> '+content[i].deskripsi)
      if (content[i].code_link) {
        htmlArr.push('<a href="'+content[i].link+'"> Download <i class="fa fa-code" aria-hidden="true"></i></a>')
      }
      htmlArr.push('</p>')
      htmlArr.push('</div>')
  }
  var htmlStr = htmlArr.join('')
  // var htmlStr = ''
  // for (var i = 0; i < content.length; i++) {
  //   htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].link_doc + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'

  //   // htmlStr += `
  //   //   <div class="grid-item">
  //   //     <a class="a-img" href="${content[i].link_doc}">
  //   //     <img src="${content[i].img_link}">
  //   // `
  // }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var grid = document.querySelector('.grid');
  var msnry = new Masonry(grid, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    // percentPosition: true,
    isFitWidth: true,
    gutter: 20
  })

  imagesLoaded(grid).on('progress', throttle(function() {
    // layout Masonry after each image loads
      msnry.layout();
  }, 1600, {
    leading: false,
    trailing: true,
  }));
}

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}
