(来自:https://blog.csdn.net/luyaran/article/details/86467862)[https://blog.csdn.net/luyaran/article/details/86467862]
[TOC]
#连接数据库
使用PHP连接到一个现有的数据库，如果数据库不存在，那么它就会被创建，最后将返回一个数据库对象，如下：
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
?>
```
#创建数据表
在先前创建的数据库中创建一个表，如下：
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
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
 
   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Table created successfully\n";
   }
   $db->close();
?>
```
#插入数据
在数据表中尝试插入一些数据，如下：
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
 
   $sql =<<<EOF
      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
      VALUES (1, 'Paul', 32, 'California', 20000.00 );
      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
      VALUES (2, 'Allen', 25, 'Texas', 15000.00 );
      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
      VALUES (3, 'Teddy', 23, 'Norway', 20000.00 );
      INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
      VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 );
EOF;
 
   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Records created successfully\n";
   }
   $db->close();
?>
```
#查询数据:
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
 
   $sql =<<<EOF
      SELECT * from COMPANY;
EOF;
 
   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "ID = ". $row['ID'] . "\n";
      echo "NAME = ". $row['NAME'] ."\n";
      echo "ADDRESS = ". $row['ADDRESS'] ."\n";
      echo "SALARY =  ".$row['SALARY'] ."\n\n";
   }
   echo "Operation done successfully\n";
   $db->close();
?>
```
#更新数据
如下：
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   $sql =<<<EOF
      UPDATE COMPANY set SALARY = 25000.00 where ID=1;
EOF;
   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo $db->changes(), " Record updated successfully\n";
   }
 
   $sql =<<<EOF
      SELECT * from COMPANY;
EOF;
   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "ID = ". $row['ID'] . "\n";
      echo "NAME = ". $row['NAME'] ."\n";
      echo "ADDRESS = ". $row['ADDRESS'] ."\n";
      echo "SALARY =  ".$row['SALARY'] ."\n\n";
   }
   echo "Operation done successfully\n";
   $db->close();
?>
```
#删除数据
如下：
```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   $sql =<<<EOF
      DELETE from COMPANY where ID=2;
EOF;
   $ret = $db->exec($sql);
   if(!$ret){
     echo $db->lastErrorMsg();
   } else {
      echo $db->changes(), " Record deleted successfully\n";
   }
 
   $sql =<<<EOF
      SELECT * from COMPANY;
EOF;
   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "ID = ". $row['ID'] . "\n";
      echo "NAME = ". $row['NAME'] ."\n";
      echo "ADDRESS = ". $row['ADDRESS'] ."\n";
      echo "SALARY =  ".$row['SALARY'] ."\n\n";
   }
   echo "Operation done successfully\n";
   $db->close();
?>
```
[TOC]

```
<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('test.db');
      }
      function createTable($sql){
          $ret = $this->exec($sql);
          if(!$ret){
              echo $this->lastErrorMsg();
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
          $re=[];
          while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
              $re[]= $row;
          }
          return $re;
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
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   /*
   $sql =<<<EOF
      CREATE TABLE COMPANY
      (ID INT PRIMARY KEY     NOT NULL,
      NAME           TEXT    NOT NULL,
      AGE            INT     NOT NULL,
      ADDRESS        CHAR(50),
      SALARY         REAL);
EOF;
 */
 
 $arr=Array("ID"=> "INT PRIMARY KEY     NOT NULL",
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
   //$sql= sqlcreate("test1",$arr);
   //$db->createTable($sql);
   
   
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
   
   
   $db->close();
?>
```