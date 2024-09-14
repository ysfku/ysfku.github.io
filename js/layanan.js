// 先等图片都加载完成
// 再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
   * 内容JSON
   */
  var demoContent = [
    {
      linkshop: 'https://youtube.com/watch?v=ZWcxNAKuY9E',
      gambar: 'https://i.ytimg.com/vi/ZWcxNAKuY9E/hqdefault.jpg',
      judul: 'How to install docker and ccminer in openwrt',
      kategori: 'Docker',
      harga: 'Install docker and ccminer on openwrt',
    },
    {
      linkshop: 'https://youtube.com/watch?v=vl0ononypOQ',
      gambar: 'https://i.ytimg.com/vi/vl0ononypOQ/hqdefault.jpg',
      judul: 'Top Secret: Ubuntu Installation for Duinocoin Mining',
      kategori: 'Termux',
      harga: 'Install ubuntu and duino coin in termux.',
    },
    {
      linkshop: 'https://youtube.com/watch?v=Pn1N_FfFE8s',
      gambar: 'https://i.ytimg.com/vi_webp/Pn1N_FfFE8s/hqdefault.webp',
      judul: 'cara hilangkan notif setelah pasang magisk',
      kategori: 'Magisk',
      harga: 'Cara menghilangkan notifikasi magisk pada android.',
    },
    {
      linkshop: 'https://youtube.com/watch?v=8b7ELH1VjIc',
      gambar: 'https://i.ytimg.com/vi/8b7ELH1VjIc/hqdefault.jpg',
      judul: 'Konfigurasi CFM Simaster',
      kategori: 'Magisk',
      harga: 'Menjelaskan proses pemasangan dan cara pengaturan serta langkah untuk menjalankannya.',
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
      htmlArr.push('<a class="a-img" href="'+content[i].linkshop+'">')
      if(content[i].gambar) {
        htmlArr.push('<img src="'+content[i].gambar+'" style="width: 100%">')
      }
      htmlArr.push('</a>')
      htmlArr.push('<h3 class="demo-title">')
      htmlArr.push('<a href="'+content[i].linkshop+'">'+content[i].judul+'</a>')
      htmlArr.push('</h3>')
      if (content[i].kategori) {
        htmlArr.push('<p><b>Kategori</b> '+content[i].kategori+'</p>')
      }
      htmlArr.push('<p><b>Keterangan:</b> '+content[i].harga)
      if (content[i].code_link) {
        htmlArr.push('<a href="'+content[i].link+'"> Download <i class="fa fa-code" aria-hidden="true"></i></a>')
      }
      htmlArr.push('</p>')
      htmlArr.push('</div>')
  }
  var htmlStr = htmlArr.join('')
  // var htmlStr = ''
  // for (var i = 0; i < content.length; i++) {
  //   htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'

  //   // htmlStr += `
  //   //   <div class="grid-item">
  //   //     <a class="a-img" href="${content[i].demo_link}">
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
