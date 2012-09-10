<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:tal="http://xml.zope.org/namespaces/tal">
<head>
    <title>The Pyramid Web Application Development Framework</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <script type="text/javascript">
        window.api_url = "${route_url('api')}";
        window.base_url = "${route_url('home')}";
        window.socket_url = "${route_url('socket').replace('http', 'ws')}";
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
            <div class="left-menu span3">
                <div class="accordion" id="accord">
                    <div class="accordion-group">
                        <div class="accordion-heading"> 
                            <a class="accordion-toggle" href="#playlists" data-toggle='collapse' data-parent='#accord'>PlayLists</a>
                        </div>
                        <div id="playlists" class="accordion-body collapse in">
                            <div class="accordion-inner">
                                <input id="newPlayList" type="text" class="input-xlarge" placeholder="create a new playlist"/>
                                <ul id="list" class="nav nav-stacked nav-pills">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading"> 
                            <a class="accordion-toggle" href="#collections" data-toggle='collapse' data-parent='#accord'>Collections</a>
                        </div>
                        <div id="collections" class="accordion-body collapse in">
                            <div class="accordion-inner">
                                <ul id="list" class="nav nav-stacked nav-pills">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" href="#fileUploads" data-toggle="collapse" data-parent="#accord">Upload</a>
                        </div>
                        <div id="fileUploads" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <button class="btn">
                                    <input id="files" type="file" multiple="multiple" style="position: absolute; left: -100000px;"/>
                                    <label for="files">
                                        <i class="icon-download"></i>Download
                                    </label>
                                </button>
                                <button class="btn" type="button" id="fileupload">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span9">
                <div class="player-container"></div>
                <div class="row-fluid">
                    <div class="span6 playlist-container"></div>
                    <div class="span6 medialib-container"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
