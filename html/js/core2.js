var issuesList;
var issuesHTML;
$(document).ready(function() {
    var webURL = window.location.href;
    var splitFlag = "http://";
    if (webURL.substring(0, 5) == "https") {
        splitFlag = "https://";
    }
    var user = "docfeng";//webURL.split(splitFlag)[1].split(".")[0];
    //var repos_name=user + '.github.io';
    var repos_name="blog4";
    var path=location.pathname.replace(/^(\/)|(\/)$/g, '');
    var url="https://cdn.jsdelivr.net/gh/"+user+"/"+repos_name +"/"+ path;
    //user = 'yanghanqing';
    blogListURL = 'https://api.github.com/repos/' + user + '/' + repos_name + '/contents/blog';
    if(!location.pathname.substr(-5).match(/\./)){
        blogListURL = 'https://api.github.com/repos/' + user + '/' + repos_name + '/contents/'+location.pathname.replace(/^(\/)|(\/)$/g, '');
    }
    issuesList = 'https://api.github.com/repos/' + user + '/' + repos_name + '/issues';
    issuesHTML = 'https://github.com/' + user + '/' + repos_name + '/issues'
    readmeURL = 'https://raw.githubusercontent.com/' + user + '/' + repos_name + '/master/About Me.md';

    $("#header").text(user + "'s Blog");
    $("#commentsList").removeAttr('data_comments_url');
    $("#tips").html("我们不会获取您的用户名和密码,评论直接通过 HTTPS 与 Github API交互,<br>如果您开启了两步验证,请在博客的<a  target=\"_blank\" href=\"" + issuesHTML + "\">Github issues</a>下添加 Comment");

    var titleString = getTitleString();

    //set Blog list    
    $.get(url, function(html) {
           var arr=formatCND(html);
           console.log(arr);
           var dir=arr[0];
           var file=arr[1];
           for (var i = 0; i < dir.length; i++) {
            var name = dir[i]; // Blog title
            var blogURL = url+"/"+name; //Blog Raw Url
            // add blog list elements
            var new_li = $("<li></li>");
            var new_a = $("<a></a>")

            var type = "markdown";
            // delete '.md'
            if (name.substr(-3, 3) == ".md") {
                name = name.substr(0, name.length - 3);
            } else if (name.substr(-5, 5) == ".html") {
                name = name.substr(0, name.length - 5);
                type = "html";
            }
            new_a.text(name);
            //update content
            new_a.attr("data_blogURL", blogURL);
            new_a.attr("data_name", name);
            //new_a.attr("href", "?title=" + name);
            new_a.attr("href", "javascript:void()");
            new_a.attr("data_type", type);
            new_a.attr("data_type2", "dir");
            
                new_a.attr("data_path", path+"/"+name);
                
            new_a.attr("onclick", "listClick(this)");
            new_li.append(new_a);
            $('#nav').append(new_li);
            $('#nav2').append(new_li.clone());
        }
        for (var i = 0; i < file.length; i++) {
            var name = file[i]; // Blog title
            var blogURL = url+"/"+name; //Blog Raw Url
            // add blog list elements
            var new_li = $("<li></li>");
            var new_a = $("<a></a>")

            var type = "markdown";
            // delete '.md'
            if (name.substr(-3, 3) == ".md") {
                name = name.substr(0, name.length - 3);
            } else if (name.substr(-5, 5) == ".html") {
                name = name.substr(0, name.length - 5);
                type = "html";
            }
            new_a.text(name);
            //update content
            new_a.attr("data_blogURL", blogURL);
            new_a.attr("data_name", name);
            //new_a.attr("href", "?title=" + name);
            new_a.attr("href", "javascript:void()");
            new_a.attr("data_type", type);
            new_a.attr("data_type2", "file");
                
            new_a.attr("onclick", "listClick(this)");
            new_li.append(new_a);
            $('#nav').append(new_li);
            $('#nav2').append(new_li.clone());
        }
    });
    /*
    $.getJSON(blogListURL, function(json) {
        for (var i = 0; i < json.length; i++) {
            var name = json[i].name; // Blog title
            var blogURL = json[i].download_url; //Blog Raw Url
            // add blog list elements
            var new_li = $("<li></li>");
            var new_a = $("<a></a>")

            var type = "markdown";
            // delete '.md'
            if (name.substr(-3, 3) == ".md") {
                name = name.substr(0, name.length - 3);
            } else if (name.substr(-5, 5) == ".html") {
                name = name.substr(0, name.length - 5);
                type = "html";
            }
            // console.log(name);
            // console.log(titleString);
            if (name == titleString) {
                $("#title").text(name);
                readmeURL = blogURL;
            }

            new_a.text(name);
            //update content
            new_a.attr("data_blogURL", blogURL);
            new_a.attr("data_name", name);
            //new_a.attr("href", "?title=" + name);
            new_a.attr("href", "javascript:void()");
            new_a.attr("data_type", type);
            new_a.attr("data_type2", json[i].type);
            if(json[i].type=="dir"){
                new_a.attr("data_path", json[i].path);
            }
            new_a.attr("onclick", "listClick(this)");
            new_li.append(new_a);
            $('#nav').append(new_li);
            $('#nav2').append(new_li.clone());
        }
        //set readme 
        $.get(readmeURL, function(result) {
            $("#title").show();
            $("#article").html("");

            testEditormdView = editormd.markdownToHTML("article", {
                markdown: result, //+ "\r\n" + $("#append-test").text(),
                // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
                htmlDecode: "style,script,iframe", // you can filter tags decode
                //toc             : false,
                tocm: true, // Using [TOCM]
                //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                //gfm             : false,
                //tocDropdown     : true,
                // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                emoji: true,
                taskList: true,
                tex: true, // 默认不解析
                flowChart: true, // 默认不解析
                sequenceDiagram: true, // 默认不解析
            });
        });
    });*/
});
var formatCND=function(html){
    var str=html.replace(/(\t|\n\r)/g,"");
    var str1=str.match(/<tbody>([\s\S]*?)<\/tbody>/)[1];
    var arr=str1.match(/<tr>([\s\S]*?)<\/tr>/g);
    var dir=[];
    var file=[];
    for(var i=0;i<arr.length;i++){
      var arr1= arr[i].match(/<td[^>]*?><a[^>]*?>([\s\S]*?)<\/a><\/td>[^<]*?<td[^>]*?>([\s\S]*?)<\/td>[^<]*?<td[^>]*?>([\s\S]*?)<\/td>/);
      if(arr1&&arr1.length==4){
       //arr1.shift();
       if(arr1[2]==""){
           dir.push(arr1[1])
       }else{
           file.push(arr1[1]);
       }
       //console.log(arr1)
       //console.log([arr1[1],arr1[2],arr1[3]])
    }
    }
    return [dir,file];
}
function listClick(obj){
    if($(obj).attr("data_type2")=="dir"){
        location.href=location.origin+"/"+$(obj).attr("data_path");
    }else{
       setBlogTxt(obj);
    }
}
function setBlogTxt(obj) {
    // 隐藏Button
    if (!$('#btnNav').is(':hidden')) {
        $('#btnNav').click();
    }

    obj = $(obj);
    var blogName = obj.attr("data_name");
    var blogURL = obj.attr("data_blogURL");
    var type = obj.attr("data_type");
    $("#title").text(blogName);
    $("#article").html("loading . . .");
    // set blog content     
    $.get(blogURL, function(result) {
        $("#title").show();
        if (type == "markdown") {
            $("#article").html("");
            testEditormdView = editormd.markdownToHTML("article", {
                markdown: result, //+ "\r\n" + $("#append-test").text(),
                // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
                htmlDecode: "style,script,iframe", // you can filter tags decode
                //toc             : false,
                tocm: true, // Using [TOCM]
                tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                //gfm             : false,
                //tocDropdown     : true,
                // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                emoji: true,
                taskList: true,
                tex: true, // 默认不解析
                flowChart: true, // 默认不解析
                sequenceDiagram: true, // 默认不解析
            });

        } else {
            $("#title").hide();
            $("#article").html(result);
        }
    });
    //get comments_url
    setCommentURL(issuesList, blogName);
}

function setCommentURL(issuesList, blogName) {
    $("#comments").show();
    console.log("获取并设置评论区");
    $.ajax({
        type: "GET",
        url: issuesList,
        dataType: 'json',
        async: false,
        success: function(json) {
            for (var i = 0; i < json.length; i++) {
                var title = json[i].title; // Blog title
                var comments_url = json[i].comments_url;
                if (title == blogName) {
                    console.log("该文章存在评论")
                    $('#commentsList').attr("data_comments_url", comments_url);
                    setComment(comments_url);
                    break;
                }
                $("#commentsList").children().remove();
                $("#commentsList").removeAttr('data_comments_url');

            }
        }
    });


}



function setComment(commentURL) {
    $('#commentsList').children().remove();

    $.getJSON(commentURL, function(json) {
        for (var i = 0; i < json.length; i++) {
            var avatar_url = json[i].user.avatar_url; // avatar_url
            var user = json[i].user.login;
            //var updated_at = json[i].updated_at;
            var updated_at = new Date(json[i].updated_at).toLocaleString();
            var body = json[i].body;

            // add blog list elements
            var commentHtml =
                "<li class=\"comment\">" +
                "<a class=\"pull-left\" href=\"#\"><img class=\"avatar\" src=\"" + avatar_url +
                "\" alt=\"avatar\"></a><div class=\"comment-body\"><div class=\"comment-heading\"><h4 class=\"user\">" + user +
                "</h4><h5 class=\"time\">" + updated_at +
                "</h5></div><p>" + body +
                "</p></div></li>";

            var new_obj = $(commentHtml);
            $('#commentsList').append(new_obj);
        }
    });
}

//显示登录框
function login() {
  var data=localStorage.getItem("data");
  if(data){
      data=JSON.parse(data);
      $("#txt_token").val(data.token);
      subComment(data);
  }else{
    $('#myModal').modal();
  }
}

function setData(){
    var data={};
    var USERNAME = data.username = $("#txt_username").val();
    var PASSWORD = data.password = document.getElementById("txt_password").value; //
    var TOKEN = data.token = $("#txt_token").val();
    alert(JSON.stringify(data));
    subComment(data);
}
function subComment(data) {
    //var console={};
    //console.log=function(txt){alert(txt)}
    var title = $("#title").text();
    var author="";
    if (data.token == undefined || data.token == null || data.token == "") {
       author="Basic " + btoa(data.username + ":" + data.password);
    }else{
      author="token "+data.token;
    }
    // 未开启评论
    if (typeof($("#commentsList").attr("data_comments_url")) == "undefined") {
        if (title == undefined || title == null || title == "") {
            return;
        }

        var createIssueJson = "{\"title\": \"" + title + "\"}";
        $.ajax({
            type: "POST",
            url: issuesList,
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": author//"Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            data: createIssueJson,
            success: function() {
                console.log('开启评论成功:' + title);
                //重新遍历issue list
                setCommentURL(issuesList, title);
                console.log('重新遍历 issuesList 完成');

            }
        });
    }
    console.log("准备提交评论");
    // 已开启评论
    if (typeof($("#commentsList").attr("data_comments_url")) != "undefined") {
        var issueURL = $("#commentsList").attr("data_comments_url");
        var comment = $("#comment_txt").val();
        var commentJson = "{\"body\": \"" + comment + "\"}";
        console.log(comment);
        if (comment == "") {
            alert("评论不能为空");
            return;
        }

        $.ajax({
            type: "POST",
            url: issueURL,
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": author//"Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            data: commentJson,
            success: function() {
                console.log('评论成功');

                // 更新评论区
                if (title != null) {
                    setCommentURL(issuesList, title);
                    localStorage.setItem("data",JSON.stringify(data));
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("账号密码错误,或者开启了两步验证");
            }
        });
    } else {
        console.log("未开启评论")
    }
}


function getTitleString() {
    var reg = new RegExp("(^|&)" + "title" + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
