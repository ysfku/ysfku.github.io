// 先等图片都加载完成
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
      link_video: 'https://youtube.com/watch?v=ZWcxNAKuY9E',
      link_gambar: 'https://i.ytimg.com/vi/ZWcxNAKuY9E/hqdefault.jpg',
      judul: 'How to install docker and ccminer in openwrt',
      kategori: 'Docker',
      deskripsi: 'Install docker and ccminer on openwrt',
    },
    {
      link_video: 'https://youtube.com/watch?v=vl0ononypOQ',
      link_gambar: 'https://i.ytimg.com/vi/vl0ononypOQ/hqdefault.jpg',
      judul: 'Top Secret: Ubuntu Installation for Duinocoin Mining',
      kategori: 'Termux',
      deskripsi: 'Install ubuntu and duino coin in termux.',
    },
    {
      link_video: 'https://youtube.com/watch?v=Pn1N_FfFE8s',
      link_gambar: 'https://i.ytimg.com/vi_webp/Pn1N_FfFE8s/hqdefault.webp',
      judul: 'cara hilangkan notif setelah pasang magisk',
      kategori: 'Magisk',
      deskripsi: 'Cara menghilangkan notifikasi magisk pada android.',
    },
    {
      link_video: 'https://youtube.com/watch?v=8b7ELH1VjIc',
      link_gambar: 'https://i.ytimg.com/vi/8b7ELH1VjIc/hqdefault.jpg',
      judul: 'Konfigurasi CFM Simaster',
      kategori: 'Magisk',
      deskripsi: 'Menjelaskan proses pemasangan dan cara pengaturan serta langkah untuk menjalankannya.',
    },
  ]

  contentInit(demoContent) //内容初始化
  initGrid()
}());

/**
 * 内容初始化
 * @return {[type]} [deskripsi]
 */
function contentInit(content) {
  var htmlArr = [];
  for (var i = 0; i < content.length; i++) {
      htmlArr.push('<div class="grid-item">')
      htmlArr.push('<a class="a-img" href="'+content[i].link_video+'">')
      if(content[i].link_gambar) {
        htmlArr.push('<img src="'+content[i].link_gambar+'" style="width: 100%">')
      }
      htmlArr.push('</a>')
      htmlArr.push('<h4 class="demo-title">')
      htmlArr.push('<a href="'+content[i].link_video+'">'+content[i].judul+'</a>')
      htmlArr.push('</h4>')
      if (content[i].kategori) {
        htmlArr.push('<p><b>Kategori:</b> '+content[i].kategori+'</p>')
      }
      htmlArr.push('<p><b>Deskripsi:</b> '+content[i].deskripsi)
      if (content[i].link_code) {
        htmlArr.push('<a href="'+content[i].link_code+'"> Sumber kode <i class="fa fa-code" aria-hidden="true"></i></a>')
      }
      htmlArr.push('</p>')
      htmlArr.push('</div>')
  }
  var htmlStr = htmlArr.join('')
  // var htmlStr = ''
  // for (var i = 0; i < content.length; i++) {
  //   htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].link_video + '">' + '       <img src="' + content[i].link_gambar + '">' + '   </a>' + '   <h3 class="demo-judul">' + '       <a href="' + content[i].link_video + '">' + content[i].judul + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].kategori + '</p>' + '   <p>' + content[i].deskripsi + '       <a href="' + content[i].link_code + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'

  //   // htmlStr += `
  //   //   <div class="grid-item">
  //   //     <a class="a-img" href="${content[i].link_video}">
  //   //     <img src="${content[i].link_gambar}">
  //   // `
  // }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 初始化栅格布局
 * @return {[type]} [deskripsi]
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
