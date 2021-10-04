import { AfterViewInit, Component, OnInit } from '@angular/core';

//import * as $ from 'jquery';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.scss']
})

export class BiometricsComponent implements AfterViewInit {


  //constructor() { }

  // if (numImg == 0)
  //   idImg ='a'


  ngAfterViewInit(): void {
    $(function () {

      let idImg = '';
      const urlImg = 'http://localhost:5000/ImageHandler.ashx';
      let numImg = 10;
      let pic_src = '';

      $('#wsqDialog').dialog({
        autoOpen: false,
        show: 'slide',
        hide: 'fadeOut',
        resizable: false,
        height: 'auto',
        width: 'auto',
        //height: 685,
        //width: 456,
        position: ['center', 'top'],
        //modal: true,
        buttons: {
        }
      });
      //

      $('.wsq').hover(
        function (event) {
          const $current = $(this);
          const ratio = $current[0].naturalHeight / $current[0].naturalWidth;
          const height = Math.floor($current[0].naturalWidth / 1.5 * ratio);
          const width = Math.floor($current[0].naturalWidth / 1.5);
          $('#wsqDialogImage').height(height);
          $('#wsqDialogImage').width(width);

          // if (jQuery.browser.webkit) {
          //   $('#wsqDialog').dialog('option', 'height', height + 55);
          //   $('#wsqDialog').dialog('option', 'width', width + 35);
          // } else {
          //   $('#wsqDialog').dialog('option', 'height', height + 40);
          //   $('#wsqDialog').dialog('option', 'width', width + 30);
          // }

          //$('#wsqDialog').dialog("option", "height", height + 40);
          //$('#wsqDialog').dialog("option", "width", width + 30);

          $('#wsqDialogText').text('( ' + $current.prop('title') + ' )   click to close');
          //$('#wqsDialog').width(Math.floor($current[0].naturalWidth / 2));
          //$('#wqsDialog').height(Math.floor($current[0].naturalWidth / 2 * ratio));
          $('#wsqDialogImage').prop('src', $current.prop('src'));
          $('#wsqDialog').dialog('open');

          //$('#info').text('open');
          // eslint-disable-next-line @typescript-eslint/no-empty-function
        }, function (event) { }
      );

      $('#wsqDialog').click(
        function (event) {
          //$('#wsqDialogImage').removeProp('src');
          $('#wsqDialog').dialog('close');
          //$('#info').text('close');
        }
      );


      $('.wsq').on('load', function () {
        if ($('#div_wsq').css('display') == 'none')
          //$('#div_wsq').slideDown(500);
          $('#div_wsq').attr('style', 'display: inline-block !important;')
        if (--numImg == 0)
          $.unblockUI();
        /*
                $.unblockUI(function(){
                    $(':visible').each(function(idx, item) {
                            if($(item).css("cursor")) {
                                $(item).css("cursor", $(item).css("cursor"));
                            }
                    });
                });
        */
        //$('#bio').css('cursor', 'default');
        //$('#info2').text(numImg.toString());
      })
      .on('error', function (e) {
        if ($('#div_wsq').css('display') == 'none')
          //$('#div_wsq').slideDown(500);
          $('#div_wsq').attr('style', 'display: inline-block !important;')

        //$('#info').text(e.type);
        if (--numImg == 0)
          $.unblockUI();
      });

      const $wanted_picture = $('#wanted-picture');
      $wanted_picture.on('load', function () {
        if (idImg == 'id=103')
          $('#animal').html($('#pig').html())
        else if (idImg == 'id=105')
          $('#animal').html($('#rooster').html())
        else if (idImg == 'id=104')
          $('#animal').html($('#monkey').html())

        if ($('#div_pic').css('display') == 'none')
          $('#div_pic').slideDown(500);
          //$('#div_pic').attr('style', 'display: inline-block !important;')
        //if ($wanted_picture.parent.css('display') == 'none')
        //      $wanted_picture.parent.slideDown(500);
      });

      $(function () {
        //$('#accordionDiv').height($('#accordionDiv').height() - 125);
        //alert('kuku: ' + $('#accordionDiv').height());
        //$('#bio->li:first-child a img').css('padding-top', '4px');
        //$('#bio li a:hover').css({ 'color': 'blue' });
        const $bio = $('#bio');
        $bio.css({ 'box-shadow': '2px 2px 4px #888', '-moz-box-shadow': '2px 2px 4px #888', '-webkit-box-shadow': '2px 2px 4px #888' });
        $bio.height($bio.parent().height());
        $bio.slideDown(500);
        //$bio.attr('style', 'display: inline-block !important;')

        let bio_li_background;
        $('#bio li').hover(
          function (event) {
            const $current = $(this);
            bio_li_background = $current.css('background');
            $current.css('background', '#c8c8c8');
          },
          function (event) {
            //$current = $(this);
            $(this).css('background', bio_li_background);
          }
        );

        $('#bio li').click(function () {
          pic_src = $(this).children('img').prop('src');
          const id = pic_src.substring(pic_src.lastIndexOf('id='));
          if (id == idImg)
            return;

          idImg = id;
          numImg = 10;

          // if (jQuery.browser.mozilla)
          //   $.blockUI();
          // else
          //   $.blockUI({
          //     //timeout: 3000,
          //     css: { cursor: 'default' },
          //     overlayCSS: { cursor: 'default' }
          //   });

          //$wanted_picture = $('#wanted-picture');
          pic_src = $wanted_picture.prop('src');
          //alert(pic_src);
          if (pic_src == '') {
            $wanted_picture.prop('src', urlImg + '?' + id);
          } else {
            //str = pic_src.substring(0, pic_src.lastIndexOf('id=')) + id;
            $wanted_picture.prop('src', pic_src.substring(0, pic_src.lastIndexOf('id=')) + id);
            //alert(str);
          }

          $('.wsq').each(function () {
            pic_src = $(this).prop('src');
            if (pic_src == '')
              $(this).prop('src', urlImg + '?wsq=' + $(this).prop('id') + '&' + id);
            else
              $(this).prop('src', pic_src.substring(0, pic_src.lastIndexOf('id=')) + id);
          });


          //$('.wsq')[1].complete(function () {
          //    alert("complete 111");
          //});


          return false;
        });
      })
    });
  }
}

