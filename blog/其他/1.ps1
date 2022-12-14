$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:5566/")
$listener.Prefixes.Add("http://77.com:8080/")
$listener.Prefixes.Add("http://localhost:8080/")
try {
    $listener.Start();
    while ($true) {   
        $context = $listener.GetContext()
        $request = $context.Request
		

        # Output the request to host
        # Write-Host $request | fl * | Out-String
		
		Write-Host $request.Url
		Write-Host $request.request.UrlReferrer
		Write-Host $request.HttpMethod
        # Parse Parameters from url
        $rawUrl = $request.RawUrl
		

        $Parameters = @{}
        $rawUrl = $rawUrl.Split("?")
        $Path = $rawUrl[0]
        $rawParameters = $rawUrl[1]
        if ($rawParameters) {
            $rawParameters = $rawParameters.Split("&")


            foreach ($rawParameter in $rawParameters) {
                $Parameter = $rawParameter.Split("=")

                $Parameters.Add($Parameter[0], $Parameter[1])
            }
        }

        # Create output string (dirty html)
        $output = "<html><body><p>"
        $output = $output + "Path is $Path" + "<br />"
        foreach ($Parameter in $Parameters.GetEnumerator()) {
            $output = $output + "$($Parameter.Name) is equal to $($Parameter.Value)" + "<br />"
        }

        $output = $output + "</p></body></html>"
		if($request.RawUrl -eq "/favicon.ico"){
			$output=""
		}
        # Send response
        $statusCode = 200
        $response = $context.Response
        $response.StatusCode = $statusCode
		# $response.Headers.Add("refresh", "20")
		$response.Headers.Add("Access-Control-Allow-Origin", "*")
		# byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($output)
        $response.ContentLength64 = $buffer.Length
        $output = $response.OutputStream
        $output.Write($buffer,0,$buffer.Length)
        $output.Close()
		# Write-Host $response | fl * | Out-String
    }
} finally {
    $listener.Stop()
}

function getHTTP($request){
	$url = "http://gear.docfeng.top/main1.php"
	$webReq = [System.Net.HttpWebRequest]::Create($url)
	$webReq.UserAgent =$request.UserAgent # "Mozilla/4.0 (compatible; MSIE8.0; Windows NT 6.1; Trident/4.0)"
	$webReq.Method = $request.HttpMethod;
	$headers=$request.Headers
	foreach ($key in $headers.AllKeys){
	    $values = $headers.GetValues($key);
	    if($values.Length -gt 0){
			foreach ($value in $values){
				Write-Host $key ":" $value
			}
		}
	}
	# $webReq.IfModifiedSince = Get-Date# ????????????????????????????????????????????????
	# $webReq.Date = Get-Date # ???????????????????????????????????????
	$webReq.Timeout = 10000 # ???????????????????????????10???
	$webReq.ReadWriteTimeout = 15000 # ???????????????????????????15???
	
	$webReq.Referer = "http://blog.sina.com.cn/test" # ???????????????????????????????????????????????????????????????
	$response = $webReq.GetResponse() # ????????????
	$stream = $response.GetResponseStream() # ???????????????
	$readStream = New-Object System.IO.StreamReader($stream , [System.Text.Encoding]::UTF8) 
	$content = $readStream.ReadToEnd(); # ?????????????????????
	$response.Close();
	$readStream.Close();
}
<#
get
Request.QueryString["key"]
$request.QueryString.HasKeys()
$request.QueryString.Item("command")
Request.Params["UserId"]

post:
Request.Form["UserId"]
Request.Params["UserId"]
-eq $Null
-not 




Request.RawUrl //?????????URL
Request.Path //???????????????URL
Request.Url.Query //URL??????
Request.ApplicationPath //??????
this.ResolveUrl(???~/???) //??????
#>