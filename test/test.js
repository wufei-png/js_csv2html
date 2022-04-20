var freqData=[
{State:'AL',freq:{low:4786, mid:1319, high:249}}
,{State:'AZ',freq:{low:1101, mid:412, high:674}}
,{State:'CT',freq:{low:932, mid:2149, high:418}}
,{State:'DE',freq:{low:832, mid:1152, high:1862}}
,{State:'FL',freq:{low:4481, mid:3304, high:948}}
,{State:'GA',freq:{low:1619, mid:167, high:1063}}
,{State:'IA',freq:{low:1819, mid:247, high:1203}}
,{State:'IL',freq:{low:4498, mid:3852, high:942}}
,{State:'IN',freq:{low:797, mid:1849, high:1534}}
,{State:'KS',freq:{low:162, mid:379, high:471}}
];

console.log(freqData[0])
console.log(freqData[0][0])
var freqtmp={}
freqtmp['low']=1;
freqtmp.high=2;
var wf='wf'
var tmp={}
tmp.State='ch'
tmp.freq=freqtmp
console.log(tmp);
var sum_data=(data)=>{
	// for (var i=0;i<data.length;i++){
			let sum=0;
	for(var key in data){
					//console.log(key,data[0][key]);
					//console.log("data[i][key]",data[i][key]);
					sum+=data[key];
					//console.log('sum',sum);
					
	}
;
	// data[i].sum=sum;
	// }
	return sum;
	}
	var x;
	var txt="";
	var person_key={};
	var person={fname:1,lname:"Gates",age:56};  //对象
	var i=0;
	for (x in person)
	{
		person_key[x]=i;
		i++;
	}

	console.log(person_key);