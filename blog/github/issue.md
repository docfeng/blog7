# issue[](https://developer.github.com/v3/issues/)
#### get
##### url
```
https://api.github.com/repos/{user}/{repos}/issues
https://api.github.com/repos/{user}/{repos}/issues/{issue_number}


```
#### 参数
|Name|Type|Description
|filter|string|Indicates which sorts of issues to return. Can be one of:* assigned: Issues assigned to you;created: Issues created by you;* mentioned: Issues mentioning you* subscribed: Issues you're subscribed to updates for* all: AllDefault: assigned|
|state|string|Indicates the state of the issues to return. Can be either open, closed, or all. Default: open							|
|labels|string|A list of comma separated label names. Example: bug,ui,@high|
|sort|string|What to sort results by. Can be either created, updated, comments. Default: created
|direction|string	|The direction of the sort. Can be either asc or desc. Default: desc
|since|string|Only issues updated at or after this time are returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.	|

|Name		|Type				|Description																																																			|
|milestone	|integer or string	|If an integer is passed, it should refer to a milestone by its number field. If the string * is passed, issues with any milestone are accepted. If the string none is passed, issues without milestones are returned.	|
|state		|string				|Indicates the state of the issues to return. Can be either open, closed, or all. Default: open																															|
|assignee	|string				|Can be the name of a user. Pass in none for issues with no assigned user, and * for issues assigned to any user.																										|
|creator	|string				|The user that created the issue.																																														|
|mentioned	|string				|A user that's mentioned in the issue.																																													|
|labels		|string				|A list of comma separated label names. Example: bug,ui,@high																																							|
|sort		|string				|What to sort results by. Can be either created, updated, comments. Default: created																																	|
|direction	|string				|The direction of the sort. Can be either asc or desc. Default: desc																																					|
|since		|string				|Only issues updated at or after this time are returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.																									|
##### 使用：
url?state=closed


#### Create
##### url
```
post https://api.github.com/repos/{user}/{repos}/issues
```
##### 参数
|Name		|Type				|Description																																															|
|title		|string				|Required. The title of the issue.																																										|
|body		|string				|The contents of the issue.																																												|
|assignee	|string				|Login for the user that this issue should be assigned to. NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise. This field is deprecated.	|
|milestone	|integer			|The number of the milestone to associate this issue with. NOTE: Only users with push access can set the milestone for new issues. The milestone is silently dropped otherwise.							|
|labels		|array of strings	|Labels to associate with this issue. NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise.															|
|assignees	|array of strings	|Logins for Users to assign to this issue. NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.												|
##### Example
```
{
  "title": "Found a bug",
  "body": "I'm having a problem with this.",
  "assignees": [
    "octocat"
  ],
  "milestone": 1,
  "labels": [
    "bug"
  ]
}
```
##### Response


#### Edit
##### url
```
PATCH  https://api.github.com/repos/{user}/{repos}/issues/{issue_number}
```
##### 参数
|Name		|Type				|Description																																																																						|
|title		|string				|The title of the issue.																																																																			|
|body		|string				|The contents of the issue.																																																																			|
|assignee	|string				|Login for the user that this issue should be assigned to. This field is deprecated.																																																				|
|state		|string				|State of the issue. Either open or closed.																																																															|
|milestone	|integer			|The number of the milestone to associate this issue with or null to remove current. NOTE: Only users with push access can set the milestone for issues. The milestone is silently dropped otherwise.																								|
|labels		|array of strings	|Labels to associate with this issue. Pass one or more Labels to replace the set of Labels on this Issue. Send an empty array ([]) to clear all Labels from the Issue. NOTE: Only users with push access can set labels for issues. Labels are silently dropped otherwise.							|
|assignees	|array of strings	|Logins for Users to assign to this issue. Pass one or more user logins to replace the set of assignees on this Issue. Send an empty array ([]) to clear all assignees from the Issue. NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.|


##### Example
```
{
  "title": "Found a bug",
  "body": "I'm having a problem with this.",
  "assignees": [
    "octocat"
  ],
  "milestone": 1,
  "state": "open",
  "labels": [
    "bug"
  ]
}
```
##### Response


Lock an issue





