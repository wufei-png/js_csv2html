    // 基于准备好的dom，初始化echarts实例
      //刚打开的时候  1
      //点击行的时候  1
      //修改元素的时候  1
      //add但是没有修改的时候也初始化为0 
      //deleteline的时候 <script src="d3.min.js"></script>

//定时更新还是检测鼠标点击 前者简单后者性能好
      //show chart 函数输入数据绘制图像、
      //init 调用showchart 输入第一行的

      var j_index=1;
      function addrow(row_index,row_element_arr){
            var tab=document.getElementById('tab');
            var html="<tr>";
            //这里比较智能html为""效果一样，自动填充tr(如果有td)
            if (row_index==0)html+='<td>'+'month'+'</td>';
            else html+='<td>'+String(row_index)+'</td>';
            for(let i=0;i<row_element_arr.length;i++){
                //else html+='<td>'+String(i)+'</td>';
                if (row_index==0){
                  html+='<td id="can_click" col='+(i+1)+'>'+String(row_element_arr[i])+'</td>';//由于没有找到dom类似通过this遍历左兄弟,设置属性了，但是其他不是第一行的数据我就不设置了，还是用原来的dom操作把，原理有一个实现了就好
                }
                else
                {
                  //html+='<td col='+(i+1)+'>'+String(row_element_arr[i])+'</td>';
                  html+='<td>'+String(row_element_arr[i])+'</td>';
                }
                  
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
                add_change_style();
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
      var change_style_handle=()=>{
        if(Number(change_style.getAttribute('flag')))
        change_style.setAttribute('flag',0);
        else 
        change_style.setAttribute('flag',1);
        //console.log("change_style.getAttribute('flag')",Number(change_style.getAttribute('flag')));
        show_chart(j_index);
      }
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
      
      
      var add_change_style=()=>{
        var change_style=document.createElement('input');
        change_style.type='button';
        change_style.id='change_style';
        change_style.value='柱状图渐入样式切换';
        // change_style.flag='0';
        change_style.setAttribute('flag',0);
        // change_style.getAttribute('flag');
        // console.log("change_style.getAttribute('flag')",Number(change_style.getAttribute('flag')));
        document.body.appendChild(change_style);
        change_style.addEventListener('click',change_style_handle);
        //<input type='button' id='change_style' value='柱状图渐进样式切换' flag='0'> </input>
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
        // var block_chart=document.createElement('svg');
        // block_chart.id='chart';
        //block_chart.innerHTML='12313';
    
        //svg.style="position: absolute;  top: 850px;left: 200px; width:600px; height:400px;";
        //document.body.appendChild(block_chart);
        //Chart = echarts.init(document.getElementById('chart'));
         //全局变量   
         var block_chart = d3.select("body").append("svg").attr("id",'chart').attr("width",600).attr("height",400).attr('transform','translate(500,750)');
         //.style('background-color','red');
        //  $("svg").css({top: 200, left: 200, position:'absolute'});
        //var tab1=document.getElementById('tab');
        var tab=d3.select('#tab');//我不太好遍历子元素啊
        var first_row_tab=tab.select('tbody');
        first_row_tab.selectAll('#can_click').on("click",function(){
//console.log("可以选啊");
//console.log("选的是第",d3.select(this).attr("col"),"列");//string
//console.log("选的是第",Number(d3.select(this).attr("col")),"列");
        // var order=child_get_order(this);
        j_index=Number(d3.select(this).attr("col"));
        //同步全局变量,只有点击的时候才会更新，表示当前应该选择哪类数据来显示
        show_chart(j_index);
        });
        // console.log("tab1:",tab1);
        // console.log("tab2:",tab2);
        // console.log("tab1==tab2?",tab1==tab2);false
        // console.log('table2',tab.rows);
        //   for(var j=1;j<tab.rows[0].cells.length-1;j++){//第一列是x轴
        //    tab.rows[0].cells[j].addEventListener("click",function(){//我这里不能用d3啊
        //     console.log('j',this);
        //     var order=child_get_order(this);
        //     j_index=order;
        //     //同步全局变量,只有点击的时候才会更新，表示当前应该选择哪类数据来显示
        //      show_chart(order);
        //    }); 
        // }
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
      
      // var add_line_chart=()=>{//其实可以不用add，delete和modify，当发生这两种情况的时候直接show_chart重新绘制即可，但是影响性能
      //但是万一添加的数据更新了最大值，必须要重新绘制，而且添加数据等scale就要变了，还是必须要读入一遍所有数据，那这个方法就暂时搁置，重新绘制一列


      //   var result=d3.select("#chart").select('g').append("rect")
      //   // .attr("width",xScale(d.value))
      //   .attr("width",xScale.bandwidth())
      //   .attr("x",xScale(d.month))
      //   .attr("height",yScale(d3.max(data, d => d.value)-d.value))//bandwidth = 一个柱子的高度
      //   .attr("fill","green")
      //   .transition()//添加过渡
      //   .duration(2000)//持续时间
      //   // .delay(function(d,i){//延迟
      //   // return i*400;
      //   //   })
      //   .attr("opacity",0.8)  // 透明度
      //   .attr("y",yScale(d.value));
      // }
            
      // var delete_line_chart=(i)=>{
        
      // }
      // var modify_line_chart=(i)=>{
        
      // }
      var show_chart=(j)=>{
        var data=tabletoarr(j);
        var svg=d3.select("#chart");
       if(svg.select("g"))
       svg.select("g").remove();//避免覆盖

      // option.xAxis.data=data.xarr;
      // option.series[0].data=data.yarr;
      // option.series[1].data=data.yarr;
      // Chart.setOption(option,true);
      svg = d3.select("#chart");  // 取出svg的id号
      const width = +svg.attr("width");  // + 表示将字符串转成数值
      const height= +svg.attr("height");  // 比较两种定义方法

      // 3. 定义margin：4个属性
      // SVG指的是整个作画的空间，定义了margin之后，将作画空间控制在svg-margin之内
      const margin = {top:60, right:30, left:100, bottom:60};
      const innerWidth = width - margin.left - margin.right;  // 整个画布减去margin的左右两边
      const innerHeight = height - margin.top - margin.bottom;  // 整个画布的高减去mrgin的上下

      // 4. 定义两种比例尺：线性和离散型
      const xScale = d3.scaleBand()
                        .domain(data.map(d => d.month))  //由于data修改后，这些标尺必须要重新定义，所以不能用全局变量
                        .range([0,innerWidth])
                        .padding(0.1);  // 指定每个矩形的间隔
                        //有一个bug或者不舒服的地方，month一样的时候显示在一个列，不过正常逻辑也不会出现月份一样，其中的值不一样，两列,相当于自动给我修复bug了
      const yScale = d3.scaleLinear()
                        .domain([0,d3.max(data, d => d.value)])  
                        .range([innerHeight,0])
console.log("d3.max(data, d => d.value)",d3.max(data, d => d.value));

      // 5. 定义分组元素g
      const g = svg.append("g")
                    .attr("id","maingroup")
                    .attr("transform",`translate(${margin.left},${margin.top})`);

      // 6. 定义两个坐标轴，并且利用元素g进行回调
      const yAxis = d3.axisLeft(yScale)
                            .tickSize(10);//虽然坐标轴看起来比较丑，但是好像没有api美化
      g.append("g").call(yAxis);   // 通过分组元素g进行回调
//xAxis是我们定义的一个坐标轴， 其实它本身也是一个函数，所以这句话的意思是将新建的分组<g>传给xAxis()函数，用以绘制，所以这句代码等价于xAixs (g.append("g") ) ;
      const xAxis = d3.axisBottom(xScale)
                            .tickSize(10);
      g.append("g").call(xAxis).attr("transform",`translate(0,${innerHeight})`);
              const pathLine = d3.line()

              .x(function(d){ return xScale(d.month)+xScale.bandwidth()/2 })
              .y(function(d){ return yScale(d.value) });

              g.append("path")

              .attr("d", pathLine(data))
              .attr("stroke-dasharray", function () {
                return d3.select(this).node().getTotalLength();
        
              })
              .attr("stroke-dashoffset", function () {
                return d3.select(this).node().getTotalLength();
              })//加点好看的动画
              .attr("stroke", '#FFA101')
              .attr("stroke-width", "2px")
              .attr("fill", "none")
              .attr("opacity",0.8)  // 透明度
              .transition()
              .duration(1500)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0);
      
      // 7. 每个矩形元素进行属性设置
      data.forEach(d => {
        //console.log("d.value",typeof(d.value));
        // var i=0;
        // console.log("i",typeof(i));
        var change_style= document.getElementById('change_style');
if(Number(change_style.getAttribute('flag'))){
            g.append("rect")//矩形图
              // .attr("width",xScale(d.value))
              .attr("width",xScale.bandwidth())
              
              .attr("height",yScale(d3.max(data, d => d.value)-d.value))//bandwidth = 一个柱子的高度
              .attr("fill","#B3DEE5")
              .transition()//添加过渡
              .duration(2000)//持续时间
              // .delay(function(d,i){//延迟
              // return i*400;
              //   })
              .attr("x",xScale(d.month))
              .attr("opacity",0.8)  // 透明度
              .attr("y",yScale(d.value));
}else{
              g.append("rect")//矩形图
              // .attr("width",xScale(d.value))
              .attr("width",xScale.bandwidth())
              
              .attr("height",yScale(d3.max(data, d => d.value)-d.value))//bandwidth = 一个柱子的高度
              .attr("fill","#B3DEE5")
              .attr("x",xScale(d.month))
              .transition()//添加过渡
              .duration(2000)//持续时间
              // .delay(function(d,i){//延迟
              // return i*400;
              //   })
              .attr("opacity",0.8)  // 透明度
              .attr("y",yScale(d.value));
}
//console.log("折线图完成？");
if(d.value!=0){
            g.append("text")//数字代表值
              // .attr("width",xScale(d.value))
              //.attr("width",xScale.bandwidth())
              .attr("x",xScale(d.month)+xScale.bandwidth()/4)
              .attr("height",yScale(d3.max(data, d => d.value)-d.value))//bandwidth = 一个柱子的高度
              //.attr("fill","green")
              .transition()//添加过渡
              .duration(2000)//持续时间

              // .delay(function(d,i){//延迟
              // return i*400;
              //   })
              .attr("opacity",0.5)  // 透明度
              .attr("color","grey")
              .attr("y",yScale(d.value)+15)
              .text(d.value);
}
              //.attr("height",yScale(d3.max(data, d => d.value)-d.value));//bandwidth = 一个柱子的高度;
            // g.append("p")
            // .text("wf");
      })
      // 8. 改变y轴上的字体大小
      d3.selectAll(".tick text").attr("font-size","1.5em");

      // // 9. 标题设置
      g.append("text").text("Chart")//要添加文字还要跟柱形图一样再
              .attr("font-size","1.5em")
              .attr("transform",`translate(${innerWidth / 2}, 0)`)  // 字体最左边居中
              .attr("text-anchor","middle");  // 字体居中
      }

      var tabletoarr=(j)=>{
        var tab=document.getElementById('tab');
        //option.yAxis.name=tab.rows[0].cells[j].innerHTML;
        //y轴名称
        // var arr
        // var yarr=[];
        // var xarr=[];
        var data=[];
        //console.log('j',j);
        //console.log('tab.rows[0].length',tab.rows[0].cells.length);
        if(j>=tab.rows[0].cells.length-1)console.log('程序内部错误');
        for(var i=1;i<tab.rows.length;i++){
          //循环出所有的表格

          data.push({"month":Number(tab.rows[i].cells[0].innerHTML),"value":Number(tab.rows[i].cells[j].innerHTML)});
            // xarr.push(Number(tab.rows[i].cells[0].innerHTML)); 
            // //console.log(typeof(tab.rows[i].cells[j].innerHTML)); string 
            // console.log("tab.rows[i].cells[j].innerHTML",tab.rows[i].cells[j].innerHTML);
            // yarr.push(Number(tab.rows[i].cells[j].innerHTML)); 
            //if (j==0) xarr[i-1]=  Number(tab.rows[i].cells[j].innerHTML);
        }
        // console.log('yarr',yarr);
        return data;
      }
      
      