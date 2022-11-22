var issuesList;
var issuesHTML;
var blogPath = "blog";
var user = "docfeng";
var repos_name = "blog4";
var site_url = "https://raw.githubusercontent.com/" + user + '/' + repos_name + '/master/';

$(document).ready(function() {
	var hashObj=getHashObj();
    blogPath = hashObj.path || blogPath;
	var blogFileName=hashObj.file;
	baseBlogListUrl='https://api.github.com/repos/' + user + '/' + repos_name + '/contents/';
    blogListURL = 'https://api.github.com/repos/' + user + '/' + repos_name + '/contents/'+blogPath;
    issuesList = 'https://api.github.com/repos/' + user + '/' + repos_name + '/issues';
    issuesHTML = 'https://github.com/' + user + '/' + repos_name + '/issues'
    //readmeURL = '' + user + '/' + repos_name + '/master/About Me.md';
    readmeURL = site_url + 'About Me.md';

    $("#header").text(user + "'s Blog");
    $("#commentsList").removeAttr('data_comments_url');
    $("#tips").html("我们不会获取您的用户名和密码,评论直接通过 HTTPS 与 Github API交互,<br>如果您开启了两步验证,请在博客的<a  target=\"_blank\" href=\"" + issuesHTML + "\">Github issues</a>下添加 Comment");

   
	
	titleString = getTitleString();
    setBloglist(blogListURL);
	if(blogFileName){
		blogFilePath=site_url + blogPath + "/" + blogFileName;
		setBlogTxt(blogFilePath);
		setCommentURL(issuesList, blogFileName);
	}
	
});

//setBloglist and setReadme
function setBloglist(blogListURL){
	$('#nav').html("");
	$('#nav2').html("");
	$.getJSON(blogListURL, function(json) {
	    for (var i = 0; i < json.length; i++) {
	        var name = json[i].name; // Blog title
	        //var blogFilePath = json[i].download_url; //Blog Raw Url
			var blogFilePath = json[i].path;
			var link_type=json[i].type;//file dir
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
	            readmeURL = site_url + blogFilePath;
				setBlogTxt(readmeURL);
	        }
	
	        new_a.text(name);
	        //update content
	        new_a.attr("data_blogFilePath", blogFilePath);
	        new_a.attr("data_name", name);
	        //new_a.attr("href", "?title=" + name);
	        new_a.attr("href", "javascript:void(0);");
	        new_a.attr("data_type", type);
			new_a.attr("data_link_type", link_type);
	        new_a.attr("onclick", "onBlogListClick(this)");
	        new_li.append(new_a);
	        $('#nav').append(new_li);
	        $('#nav2').append(new_li.clone());
	    }
	});
}

//下拉列表点击事件
function onBlogListClick(obj) {
    // 隐藏Button
    if (!$('#btnNav').is(':hidden')) {
        $('#btnNav').click();
    }

    obj = $(obj);
    var blogName = obj.attr("data_name");
    var blogFilePath = obj.attr("data_blogFilePath");
    var type = obj.attr("data_type");
	var link_type = obj.attr("data_link_type");
    $("#title").text(blogName);
    $("#article").html("loading . . .");
	
	if(link_type=="dir"){
		window.blogPath=blogFilePath;
		var hashString="path="+window.blogPath+";"
		location.hash=hashString;
		blogFilePath=baseBlogListUrl+blogFilePath;
		setBloglist(blogFilePath);
		
		return 0;
	}else{
		// set blog content
		var hashString="path="+window.blogPath+";file="+blogName;
		location.hash=hashString;
		
		blogFilePath = site_url + blogFilePath;
		setBlogTxt(blogFilePath);
		//get comments_url
		setCommentURL(issuesList, blogName);
		
		
	}
	
    
}

function setBlogTxt(blogFilePath){
	var type = "markdown";
	if (blogFilePath.substr(-5, 5) == ".html") {
	    type = "html";
	}
	$.get(blogFilePath, function(result) {
	    $("#title").show();
	    if (type == "markdown") {
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
	
	    } else {
	        $("#title").hide();
	        $("#article").html(result);
	    }
	});
	
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
function getHashObj(){
	var re={};
	var hash=location.hash.substr(1).split(";");
	for(var i=0;i<hash.length;i++){
		var h=hash[i].split("=");
		if(h.length==2){
			re[h[0]]=h[1];
		}
	}
	return re;
}