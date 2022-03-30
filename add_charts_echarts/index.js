    // 基于准备好的dom，初始化echarts实例
      //刚打开的时候  1
      //点击行的时候  1
      //修改元素的时候  1
      //add但是没有修改的时候也初始化为0 
      //deleteline的时候 

//定时更新还是检测鼠标点击 前者简单后者性能好
      //show chart 函数输入数据绘制图像、
      //init 调用showchart 输入第一行的
var option = {
  // color:["#00ff00","#0000ff"],
  title: {
    text: 'echarts'
  },
  tooltip: {},

  xAxis: {
    name:'month',
    data: null
  },
  yAxis: {},
  series: [
    {
      name: 'data',
      type: 'bar',
      data: null
    },
    {itemStyle:{color:'#ff0000'},
      name: 'data',
      type: 'line',
      data: null,
     
    }
  ]
};
var j_index=1;
function addrow(row_index,row_element_arr){
      var tab=document.getElementById('tab');
      var html="<tr>";
      //这里比较智能html为""效果一样，自动填充tr(如果有td)
      if (row_index==0)html+='<td>'+'month'+'</td>';
      else html+='<td>'+String(row_index)+'</td>';
      for(let i=0;i<row_element_arr.length;i++){
          //else html+='<td>'+String(i)+'</td>';
          html+='<td>'+String(row_element_arr[i])+'</td>';
          if(i==row_element_arr.length-1){
            //console.log(6666666);
            if(row_index!=0)
            html+='<td>'+"<input type='button' class='delete' value='Delete'> </input>"+'</td>';
             else html+='<td>'+"<span>操作</span>"+'</td>';
          }
        }
       html+="</tr>";
       //这里同上文，把这个注释掉一样可以
      tab.innerHTML+=html;
  }
var remove_reason=()=>{
  document.body.removeChild(document.getElementById('reason'));
}
  var delete_elect_btn=()=>{
    var btn=document.getElementById("elect_file");
    // console.log("btn.parentNode",btn.parentNode===document.body);
    btn.parentNode.removeChild(btn);
  };
  var openFile = function()
  {
    var resultFile = document.getElementById("elect_file").files[0];
      // var input = this.target;
      // console.log("event.target.files[0]",this.target.files[0]);
      // console.log("event.target.files",this.target.files);
      // console.log("event.target",this.target);
      // console.log("event",this);
      if(resultFile){
      var reader = new FileReader();
      reader.onload = function() 
      //读取完异步调用
      {   
      // console.log('tab.rows.length',tab.rows.length);
      //   setInterval(function () {
      //   show_chart(j_index);
      // }, 1000);  
      
          //初始化一些按钮
          //console.log("reader",reader);
          if(reader.result) 
          {
              //文件内容:reader.result
              var arr=reader.result.split("\n");
              //console.log("arr",arr);
              // $("#output").html(reader.result);
              for (let index=0; index < arr.length; index++)
              {
                // arr[index],一行数据
                  row_element_arr=arr[index].split(",");
                  //console.log('arr[',index,']',row_element_arr)
                  addrow(index,row_element_arr);
              }
          }
          tips();

          remove_reason();  
          delete_elect_btn();
            add_btn();
            save_btn();
          // var tab=document.getElementById('tab');
          // console.log('table',tab.rows);
          modify();
          delete_init();
          init_chart();
          // tabletoarr();
      };
      
      reader.readAsText(resultFile,'UTF-8');//异步函数，挂载到onload执行回调
    }
    else{
      alert("文件打不开")
    }
  };

  var init =()=>{
    var input=document.getElementById('elect_file');
    input.addEventListener('change',openFile);
    }
    init();

var modify=()=>{
  var tb = document.getElementById('tab');
//遍历出表格和单元格
for(var i=1;i<tb.rows.length;i++){
//循环出所有的表格
for(var j=0;j<tb.rows[i].cells.length-1;j++){
//tb.rows[i].cells.length-1这个减1很关键 delete按钮不会modify

  // document.getElementById('inp').addEventListener("focus", enter,document.getElementById('inp'));
  // document.getElementById('inp').addEventListener("blur", document.getElementById('inp'));
  // console.log(" tb.rows[i].cells[j]", tb.rows[i].cells[j]);
  tb.rows[i].cells[j].onclick = function(){
  //使得这个被点击的事件变成一个input标签
  //console.log("出错了吧");
  //console.log("this.style.width",this.offsetWidth);
  //console.log("点击后，this.innerHTML",this.innerHTML);
  
  this.innerHTML = '<input type="number" value="'+this.innerHTML+'" id="inp">';
  //通过type="number"实现限制输入只能是数,不足之处在于没有根据数据类型来判断数据大小是否合理，这个实现复杂但是逻辑简单，因此没有选择做这个功能
  
  var inp = document.getElementById('inp');

  inp.style.width=this.offsetWidth+''+'px';
  //通过这个来美化界面，实现focus后的长度智能化

  //获取焦点事件
  inp.focus();
  
  //失去焦点事件,也就是这个元素被删除了,可以通过下面的注释setInterval验证
  inp.onblur = function(){
    

  //需要将当前input理念的内容放置到td当中

  // console.log("this.parentNode123",this.parentNode);
  // console.log("this.parentNode123",this.parentNode);
  var parent=this.parentNode;
  this.parentNode.innerHTML = this.value;
  // console.log("this.parentNode321",parent);
  //直接没了？this.parentNode321 null为什么 因为我把innerhtml改了，本来里面是一个子元素也就是this，改了自然没了，因此用一个parent保存，类似于指针的作用

  if(j_index==child_get_order(parent)||child_get_order(parent)==0)
  //后一个判断是修改x坐标
{
  show_chart(j_index);
}


  
}

//如果此时修改的是当前展示的图表，那么直接更新，否则不管。
}
}
}
}
// var double_timer = setInterval(function () {
//   console.log("document.getElementById('inp');", document.getElementById('inp'));
// }, 1000);

var modify_line=(element)=>{
  //添加一行后也设置为元素可修改
  element.onclick = function(){
    //使得这个被点击的事件变成一个input标签
    // console.log("出错了吧");
    this.innerHTML = '<input type="number"  value="'+this.innerHTML+'" id="inp">';

    var inp = document.getElementById('inp');
    

    inp.style.width=this.offsetWidth+''+'px';
    //获取焦点事件
    inp.focus();
    //失去焦点事件
    inp.onblur = function(){
    //需要将当前input理念的内容放置到td当中
    var parent=this.parentNode;
  this.parentNode.innerHTML = this.value;
  // console.log("this.parentNode321",parent);
  //直接没了？this.parentNode321 null为什么 因为我把innerhtml改了，本来里面是一个子元素也就是this，改了自然没了，因此用一个parent保存，类似于指针的作用

  if(j_index==child_get_order(parent)||child_get_order(parent)==0)//如果修改了month x轴坐标或者当前正在显示的那一列的数据，update图表
{
  show_chart(j_index);
}
  }
  }
}





{/* <tbody><tr><td>12</td><td>40</td><td>72</td><td>8</td><td>0</td><td>17</td><td>1</td><td>2</td><td>80</td><td>20</td><td>75</td><td>15</td><td>10</td><td>5</td><td>30</td><td>43</td><td>22</td><td>156</td><td>1.44</td><td>55</td><td>1</td><td><input type="button" class="delete" value="Delete"> </td></tr></tbody> */}
var add_btn=()=>{
  //添加add按钮
  // <input type='button' class='delete' value='Delete'> </input>
var add=document.createElement('input');
add.type='button';
add.id='add';
add.value='Add a Row';
document.body.insertBefore(add,document.getElementById('exportExcel'));
add=document.getElementById('add');
add.addEventListener('click',addline);
//也可以通过上面的html+=来添加元素
}


var save_btn=()=>{
  //添加保存文件按钮
  // <input type='button' class='delete' value='Delete'> </input>
var add=document.createElement('input');
add.type='button';
add.id='save';
add.value='Save to A New File';
document.body.insertBefore(add,document.getElementById('exportExcel'));
add=document.getElementById('save');
add.addEventListener('click',savefile);
//也可以通过上面的html+=来添加元素
}
var savefile=()=>{
  {
    var table = document.getElementById('exportExcel').innerHTML;
    var template = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            ${table}
        </body>
    </html>`;
    var excelBlob = new Blob([template], { type: "application/vnd.ms-excel" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(excelBlob);
    link.download = "导出Excel.xls";
    document.body.appendChild(link);
    link.click();
    //模拟点击link实现下载，然后再remove....奇特的手法
    document.body.removeChild(link);
  }
}


var addline=()=>{
  var tab=document.getElementById('tab');
  console.log("tab.lastElementChild",tab.lastElementChild);
// tab.appendChild("<tbody><tr><td>12</td><td>40</td><td>72</td><td>8</td><td>0</td><td>17</td><td>1</td><td>2</td><td>80</td><td>20</td><td>75</td><td>15</td><td>10</td><td>5</td><td>30</td><td>43</td><td>22</td><td>200</td><td>1.44</td><td>56</td><td>1</td><td><input type=\"button\" class=\"delete\" value=\"Delete\"> </td></tr></tbody>");
var new_tr=document.createElement('tr');
new_tbody=document.createElement('tbody');
for (let i = 0; i < 21; i++) {
  var new_td=document.createElement('td');
  new_td.innerHTML=0;
  modify_line(new_td);
  new_tr.appendChild(new_td);
}
var del_btn=document.createElement('input')
//<td>'+"<input type='button' class='delete' value='Delete'> </input>"+'</td>'}
del_btn.type='button';
del_btn.className='delete';
del_btn.value='Delete';
del_td=document.createElement('td');
del_td.appendChild(del_btn);
new_tr.appendChild(del_td);
new_tbody.appendChild(new_tr);
tab.appendChild(new_tbody);
add_deleteline();
show_chart(j_index);
//更新表格
}
var delete_handle=function(){
  // console.log("typeof(element)",this);
 deleteline(this);//this传参，比较重要的知识点
}
var delete_init=()=>{
var Deletes = document.getElementsByClassName('delete');
 //console.log(Deletes,1);
for (let i = 0; i < Deletes.length; i++) {
  //console.log("typeof(Deletes[i])",Deletes[i]);
Deletes[i].addEventListener("click", delete_handle
);
//console.log("Deletes.length",i);

}
}

var add_deleteline=()=>{
  //在添加line里使用，因此Deletes[Deletes.length-1]即可
  var Deletes = document.getElementsByClassName('delete');
  // console.log(Deletes,1);
  
    //console.log("typeof(Deletes[i])",Deletes[i]);
  Deletes[Deletes.length-1].addEventListener("click", delete_handle
  );
  // console.log("Deletes.length",i);
  
  
  }
var tips=()=>{
  var tip=document.createElement('span');
  tip.innerHTML='(也可以用浏览器自带的ctrl s保存为html格式)';
  tip.style="position: absolute;  top: 125px;left: 1350px;fontsize:'20px'"
  document.body.appendChild(tip);
}

var deleteline=(element)=>{
  //console.log("typeof(element)",element);
  // console.log("Delete第",i,"i行");
  element.removeEventListener("click",delete_handle);
  console.log("element",element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode));
  show_chart(j_index);
//更新chart
  //table remove tbody

 //parentNode.removeChild(element.parentNode.parentNode.parentNode);
}

//从下往上没问题，从上往下，第一个正常
var init_chart=()=>{

  //设置元素
  var block_chart=document.createElement('div');
  block_chart.id='chart';
  //block_chart.innerHTML='12313';
  block_chart.style="position: absolute;  top: 850px;left: 200px; width:600px; height:400px;";
  document.body.appendChild(block_chart);
  Chart = echarts.init(document.getElementById('chart'));
   //全局变量
  var tab=document.getElementById('tab');
  console.log('table2',tab.rows);
    for(var j=1;j<tab.rows[0].cells.length-1;j++){//第一列是x轴
     tab.rows[0].cells[j].addEventListener("click",function(){
      console.log('j',this);
      var order=child_get_order(this);
      j_index=order;
      //同步全局变量,只有点击的时候才会更新，表示当前应该选择哪类数据来显示
       show_chart(order);
     }); 
  }
  show_chart(1);
  //初始显示第一列
}
var child_get_order=(element)=>{
  //console.log("这是第",)
  var i=0;
  while( (element = element.previousSibling) != null ) 
      i++;
  //console.log("这是第",i,'个');
  return i;
}


var show_chart=(j)=>{
 
var data=tabletoarr(j);
option.xAxis.data=data.xarr;
option.series[0].data=data.yarr;
option.series[1].data=data.yarr;
Chart.setOption(option,true);
}
var tabletoarr=(j)=>{
  var tab=document.getElementById('tab');
  option.yAxis.name=tab.rows[0].cells[j].innerHTML;
  //y轴名称
  // var arr
  var yarr=[];
  var xarr=[];
  //console.log('j',j);
  //console.log('tab.rows[0].length',tab.rows[0].cells.length);
  if(j>=tab.rows[0].cells.length-1)console.log('程序内部错误');
  for(var i=1;i<tab.rows.length;i++){
    //循环出所有的表格
      xarr.push(Number(tab.rows[i].cells[0].innerHTML)); 
      //console.log(typeof(tab.rows[i].cells[j].innerHTML)); string 
      console.log("tab.rows[i].cells[j].innerHTML",tab.rows[i].cells[j].innerHTML);
      yarr.push(Number(tab.rows[i].cells[j].innerHTML)); 
      //if (j==0) xarr[i-1]=  Number(tab.rows[i].cells[j].innerHTML);
  }
  console.log('yarr',yarr);
  return {xarr:xarr,yarr:yarr}
}

