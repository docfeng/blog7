# pdo学习之PHP连接(增删查改)
## 1. 判断是否支持
```
<?php
	if(class_exists("SQLite3")){
	    echo "exists SQLite3";
	}else{
	  echo "not SQLite3";
	}
	if(class_exists("PDO")){
		echo "exists PDO";
	}else{
		echo "not PDO";
	}
?>
```
## 2. 创建类
```
	class MyDB extends PDO
	{
	   function __construct()
	   {
	      parent::__construct('sqlite:'.'test.db');
	   }
	   function createTable($sql){
	       $ret = $this->exec($sql);
	       if(!$ret){
	           echo "fgggggg";
	           //echo $this->lastErrorMsg();
	       } else {
	           echo "Table created successfully\n";
	       }
	   }
	   function insert($sql){
	       $ret = $this->exec($sql);
	       if(!$ret){
	           echo $this->lastErrorMsg();
	       } else {
	           echo "Records created successfully\n";
	       }
	   }
	   function select($sql){
	       $ret = $this->query($sql);
	       $result = $ret->fetchAll();
	       //print_r($result);
	       return $result;
	       /*$re=[];
	       while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
	           $re[]= $row;
	       }
	       return $re;*/
	   }
	   function update($sql){
	       $ret = $this->exec($sql);
	       if(!$ret){
	           echo $this->lastErrorMsg();
	       } else {
	           echo "Table created successfully\n";
	       }
	   }
	   function delete($sql){
	       $ret = $this->exec($sql);
	       if(!$ret){
	           echo $this->lastErrorMsg();
	       } else {
	           echo "Table created successfully\n";
	       }
	   }
	}
```
## 3. 使用

1. 连接与关闭
```
	$db = new MyDB();
	if(!$db){
	   echo $db->lastErrorMsg();
	} else {
	   echo "Opened database successfully\n";
	}
	$db->close();
```
2. 创建表
```
	$sql =<<<EOF
		CREATE TABLE COMPANY
		(ID INT PRIMARY KEY NOT NULL,
		NAME TEXT NOT NULL,
		AGE INT NOT NULL,
		ADDRESS CHAR(50),
		SALARY REAL);
EOF;
	$db->createTable($sql);
```
3. 插入数据
```
	$sql =<<<EOF
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (5, 'Paul', 32, 'California', 20000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (6, 'Allen', 25, 'Texas', 15000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (7, 'Teddy', 23, 'Norway', 20000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (8, 'Mark', 25, 'Rich-Mond ', 65000.00 );
EOF;
	$ret = $db->insert($sql);
```
4. 查询数据
```
	$sql =<<<EOF
		SELECT * from COMPANY;
EOF;
	$arr=$db->select($sql);
	foreach($arr as $row ){
		echo "ID = ". $row['ID'] . "<br />\n";
		echo "NAME = ". $row['NAME'] ."<br/>\n";
		echo "ADDRESS = ". $row['ADDRESS'] ."<br/>\n";
		echo "SALARY =  ".$row['SALARY'] ."<br/><br/>\n\n";
	}
```
5. 修改数据
```
	
	$sql =<<<EOF
		UPDATE COMPANY SET NAME='Paul22'
		WHERE ID=5 AND NAME='Paul'
EOF;
	$ret = $db->update($sql);
```
6. 删除数据
```
	$sql =<<<EOF
		DELETE FROM COMPANY WHERE ID = 6;
EOF;
	$ret = $db->delete($sql);
```
注意：`EOF`顶格写
7. 实例代码
```
<?php
	if(class_exists("PDO")){
		echo "exists PDO";
	}else{
		die("not PDO");
	}
	
	class MyDB extends PDO
	{
		function __construct()
		{
		   parent::__construct('sqlite:'.'test.db');
		}
		function createTable($sql){
		    $ret = $this->exec($sql);
		    if(!$ret){
		        echo "fgggggg";
		        //echo $this->lastErrorMsg();
		    } else {
		        echo "Table created successfully\n";
		    }
		}
		function insert($sql){
		    $ret = $this->exec($sql);
		    if(!$ret){
		        echo $this->lastErrorMsg();
		    } else {
		        echo "Records created successfully\n";
		    }
		}
		function select($sql){
		    $ret = $this->query($sql);
		    $result = $ret->fetchAll();
		    //print_r($result);
		    return $result;
		    /*$re=[];
		    while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
		        $re[]= $row;
		    }
		    return $re;*/
		}
		function update($sql){
		    $ret = $this->exec($sql);
		    if(!$ret){
		        echo $this->lastErrorMsg();
		    } else {
		        echo "Table created successfully\n";
		    }
		}
		function delete($sql){
		    $count = $this->exec($sql);
		    if(!$count){
		        echo $this->lastErrorMsg();
		    } else {
		        echo "Table created successfully\n";
		    }
			return $count;
		}
	}
	$db = new MyDB();
	if(!$db){
		die($db->lastErrorMsg());
	} else {
		echo "Opened database successfully\n";
	}
	
	$sql =<<<EOF
	      CREATE TABLE COMPANY
	      (ID INT PRIMARY KEY     NOT NULL,
	      NAME           TEXT    NOT NULL,
	      AGE            INT     NOT NULL,
	      ADDRESS        CHAR(50),
	      SALARY         REAL);
	EOF;
	$db->createTable($sql);
   
   
   
   
 
 
/* $arr=Array("ID"=> "INT PRIMARY KEY     NOT NULL",
      "NAME"=>           "TEXT    NOT NULL",
      "AGE"=>            "INT     NOT NULL",
      "ADDRESS"=>        "CHAR(50)",
      "SALARY"=>         "REAL"
);
function sqlcreate($name,$arr){
    $str="";
    $re=[];
    foreach($arr as $a=>$d){
        //$str.=$a." ".$d.",";
        $re[]=$a." ".$d;
    }
    $str= join(",",$re);
    return "CREATE TABLE $name($str);";
}
	$sql= sqlcreate("test1",$arr);
	$db->createTable($sql);
*/
   
   
   
	$sql =<<<EOF
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (5, 'Paul', 32, 'California', 20000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (6, 'Allen', 25, 'Texas', 15000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (7, 'Teddy', 23, 'Norway', 20000.00 );
	      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
	      VALUES (8, 'Mark', 25, 'Rich-Mond ', 65000.00 );
	EOF;
	//$ret = $db->insert($sql);
	$sql =<<<EOF
		SELECT * from COMPANY;
	EOF;
	$arr=$db->select($sql);
	foreach($arr as $row ){
		echo "ID = ". $row['ID'] . "<br />\n";
		echo "NAME = ". $row['NAME'] ."<br/>\n";
		echo "ADDRESS = ". $row['ADDRESS'] ."<br/>\n";
		echo "SALARY =  ".$row['SALARY'] ."<br/><br/>\n\n";
	}
	
	$sql =<<<EOF
		DELETE FROM COMPANY WHERE ID = 6;
	EOF;
	$ret = $db->delete($sql);
	
	$db->close();
?>
```

```
	if(class_exists("PDO")){
		echo "exists PDO". "<br />\n";
	}else{
		die("not PDO");
	}
	try{
		$db = new PDO('sqlite:test.db');
		echo 'Create Db ok' . "<br />\n";
		//建表
		if(!$db){
			die($db->lastErrorMsg());
		} else {
			echo "Opened database successfully\n". "<br />\n";
		}
		
		echo "CREATE TABLE". "<br />\n";
		$sql =<<<EOF
			  CREATE TABLE COMPANY
			  (ID INT PRIMARY KEY     NOT NULL,
			  NAME           TEXT    NOT NULL,
			  AGE            INT     NOT NULL,
			  ADDRESS        CHAR(50),
			  SALARY         REAL);
EOF;
		//"CREATE TABLE itlife365(id integer,name varchar(255))"
		$db->exec($sql);

		echo "INSERT VALUES". "<br />\n";
		$sql =<<<EOF
			  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
			  VALUES (5, 'Paul', 32, 'California', 20000.00 );
			  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
			  VALUES (6, 'Allen', 25, 'Texas', 15000.00 );
			  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
			  VALUES (7, 'Teddy', 23, 'Norway', 20000.00 );
			  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
			  VALUES (8, 'Mark', 25, 'Rich-Mond ', 65000.00 );
EOF;
		//INSERT INTO COMPANY values(1,'itlife365.com')
		//$ret = $db->exec($sql);
		echo "UPDATE VALUES". "<br />\n";
		$sql =<<<EOF
				UPDATE COMPANY SET NAME='Paul22'
				WHERE ID=5 AND NAME='Paul'
EOF;
		$count=$db->exec($sql);
		echo "UPDATE VALUES $count". "<br />\n";
		
		echo "SELECT VALUES". "<br />\n";
		$sql =<<<EOF
			SELECT * from COMPANY;
EOF;
		$arr=$db->query($sql);
		foreach($arr as $row ){
			echo "ID = ". $row['ID'] . "<br />\n";
			echo "NAME = ". $row['NAME'] ."<br/>\n";
			echo "ADDRESS = ". $row['ADDRESS'] ."<br/>\n";
			echo "SALARY =  ".$row['SALARY'] ."<br/><br/>\n\n";
		}
		
		echo "DELETE VALUES". "<br />\n";
		$sql =<<<EOF
			DELETE FROM COMPANY WHERE ID = 6;
EOF;
		$ret = $db->exec($sql);

		$db=null;
	}catch (PDOException $e){
		$db = null;
		print $e->getMessage();
		echo "fffff";
	 }
```


```
	if(class_exists("PDO")){
		echo "exists PDO";
	}else{
		echo "not PDO";
	}
	try{
		$dbh = new PDO('sqlite:1.db');
		echo 'Create Db ok' ;
		//建表
		$dbh->exec("CREATE TABLE itlife365(id integer,name varchar(255))");
		echo 'Create Table itlife365 ok<BR>';
		$dbh->exec("INSERT INTO itlife365 values(1,'itlife365.com')");
		echo 'Insert Data ok<BR>';
		$dbh->beginTransaction();
		$sth = $dbh->prepare('SELECT * FROM itlife365');
		$sth->execute();
		//获取结果
		$result = $sth->fetchAll();
		print_r($result);
		$dbh=null;
	}catch (PDOException $e){
		$dbh = null;
		print $e->getMessage();
		echo "fffff";
	 }
```