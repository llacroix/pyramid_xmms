<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:tal="http://xml.zope.org/namespaces/tal">
<head>
  <title>The Pyramid Web Application Development Framework</title>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
  <script type="text/javascript">
      window.remote_addr = "${request.remote_addr}";
      window.api_url = "${route_url('api')}";
  </script>
  <script data-main="/static/scripts/config" type="text/javascript" src="${static_url('xmms:static/scripts/libs/require.js')}"></script>
  <style type="text/css">
      body {
        margin: 0 auto;
      }

      .header,
      .wrapper {
        width: 960px;
        margin: 0 auto;
      }

      .header {
        text-align: center;
        font-size: 2em;
      }

      .playlist .playlist-item {
        padding: 0.25em;
        margin-bottom: 1px;
        border-radius: 5px;
        border: 1px solid #336;
        cursor: pointer;ckground: #63b6db; /* Old browsers */
        background: -moz-linear-gradient(top,  #63b6db 0%, #309dcf 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#63b6db), color-stop(100%,#309dcf)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #63b6db 0%,#309dcf 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #63b6db 0%,#309dcf 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #63b6db 0%,#309dcf 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #63b6db 0%,#309dcf 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#63b6db', endColorstr='#309dcf',GradientType=0 ); /* IE6-9 */
      }
      .playlist .playlist-item:hover {
        background: transparent;
      }

      .playlist .playlist-item .id {
        width: 4em;
        display: inline-block;
      }
      .playlist .playlist-item .title {
        width: 50%;
        display: inline-block;
      }
      .playlist .playlist-item .artist {
        width: 40%;
        display: inline-block;
      }

      .playlist .items {
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
        padding: 0.5em;
      }

      .player {
        text-align: center;
      }

      .player button {
        font-size: 2em;
        border-radius: 0.5em;
      }

      .playlist-container {
        width: 48%;
        margin-right: 2%;
        float: left;
      }

      .push-right {
        float: right;
        margin-right: 0.5em;
      }
  </style>
</head>
<body>
    <div class="header">
        <h1>KT-Radio Miaou</h1>
        <input id="files" type="file" multiple="multiple" />
        <input type="button" value="upload" id="fileupload" />
    </div>
    <div class="wrapper">
        <div class="player-container"></div>
        <div class="playlist-container"></div>
        <div class="medialib-container"></div>
    </div>
</body>
</html>
