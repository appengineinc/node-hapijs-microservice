/*
this example demonstrate fictitious recordset pagination */ 
var recordIndexStart = recordIndex = 2,  pageSize = 3 /* num of records to fetch*/,  output="", cachedRecords;  	
(function test(a) {
  //caculate the ending record index 	
  var recordIndexEnd = recordIndexStart + pageSize;
  cachedRecords = cachedRecords || Array.prototype.slice.call(arguments); // cache the record set, so we dont need to hit the database again   
  //alert(args);
  if (recordIndex < recordIndexEnd) { // get each record from cache recordset until we hit page size/ req num of records
	//get first record in the recordset, and advance index pointer to the next one   
    output += cachedRecords[recordIndex++] + ",";
    //call recursively to the the other records (loop not included :) 
    test(a); //test(1,2,3,4,5,6,7,8,9); 
  } else // we have got the records
	//out put the page of records  
    alert(output);
})(1,2,3,4,5,6,7,8,9); // pass in large set of records