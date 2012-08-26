<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:tal="http://xml.zope.org/namespaces/tal">
<head>
    <title>The Pyramid Web Application Development Framework</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <script type="text/javascript">
        window.api_url = "${route_url('api')}";
    </script>
    <script data-main="/static/scripts/config" type="text/javascript" src="${static_url('xmms:static/scripts/libs/require.js')}"></script>
    <link href="${static_url('xmms:static/css/bootstrap.min.css')}" rel="stylesheet" type="text/css" />
    <link href="${static_url('xmms:static/css/main.css')}" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand">KTRadio</a>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span3">
                <input id="files" type="file" multiple="multiple" />
                <input type="button" value="upload" id="fileupload" />
            </div>
            <div class="span9">
                <div class="hero-unit player-container"></div>
                <div class="row-fluid">
                    <div class="span6 playlist-container"></div>
                    <div class="span6 medialib-container"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
