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
        font-size: 2.5em;
      }

      .playlist .playlist-item {
        padding: 0.25em;
        background: #ccc;
        margin-bottom: 1px;
        border-radius: 3px;
        cursor: pointer;
      }
      .playlist .playlist-item:hover {
        background: #efefef;
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

      .player {
        text-align: center;
      }

      .player button {
        font-size: 2em;
        border-radius: 0.5em;
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
