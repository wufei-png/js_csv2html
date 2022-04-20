    // 基于准备好的dom，初始化echarts实例
      //刚打开的时候  1
      //点击行的时候  1
      //修改元素的时候  1
      //add但是没有修改的时候也初始化为0 
      //deleteline的时候 <script src="d3.min.js"></script>

//定时更新还是检测鼠标点击 前者简单后者性能好
      //show chart 函数输入数据绘制图像、
      //init 调用showchart 输入第一行的
//饼图一直显示，点击第一列更换，如果现在的列对应的那四个数变了，也需要更新 如果deleteline了，直接把图删除
      var j_index=1;
      var i_index=1;
      var class_j=0;
      var bar_array=[[2,8],[8,10],[10,13],[13,17]];
      function addrow(row_index,row_element_arr){
            var tab=document.getElementById('tab');
            var html="<tr>";
            //这里比较智能html为""效果一样，自动填充tr(如果有td)
            if (row_index==0)html+='<td >'+'month'+'</td>';
            else html+='<td style="cursor: pointer;">'+String(row_index)+'</td>';
            for(let i=0;i<row_element_arr.length;i++){
                //else html+='<td>'+String(i)+'</td>';
                if (row_index==0){
                  html+='<td id="can_click" col='+(i+1)+'>'+String(row_element_arr[i])+'</td>';//由于没有找到dom类似通过this遍历左兄弟,设置属性了，但是其他不是第一行的数据我就不设置了，还是用原来的dom操作把，原理有一个实现了就好
                }
                else
                {
                    html+='<td>'+String(row_element_arr[i])+'</td>';
                }
                  
                if(i==row_element_arr.length-1){
                  //console.log(6666666);
                  if(row_index!=0)
                  html+='<td>'+"<input type='button' class='delete' value='Delete' deleteindex="+String(row_index)+"> </input>"+'</td>';
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
                navigator1();
                selete_class();
                  add_btn();
                  save_btn();
                  tips();
                remove_reason();  
                delete_elect_btn();
                add_change_style();
              
                  
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
      var navigator1=()=>{//navigator not a function?
        var navigator=document.createElement('div');
        navigator.id='navigator';
        document.body.insertBefore(navigator,document.getElementById('exportExcel'));
        // document.body.appendChild(navigator);
      }
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
        //console.log("这里的i是：",i);闭包了

        var i_tmp=Number(this.parentNode.firstChild.innerHTML);
        var j_tmp=child_get_order(this);
        // console.log("这次点击i:",i_tmp);
        // console.log("这次点击j:",j_tmp);
        if(i_tmp!=0&&j_tmp==0){
          i_index=i_tmp;
          showpie(i_index,class_j);
        }
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
      //console.log("parent.parentNode.parentNode",parent.parentNode.firstChild.innerHTML);
      //这里有一个疑问，table有很多tbody，调用child_get_order失效都是0   ：child_get_order(parent.parentNode.parentNode)
      //console.log("child_get_order(parent)",child_get_order(parent));
      if(Number(parent.parentNode.firstChild.innerHTML)==i_index&&(child_get_order(parent)>=bar_array[class_j][0]&&child_get_order(parent)<bar_array[class_j][1])){
        showpie(i_index,class_j);
      }
      if((child_get_order(parent)>=bar_array[class_j][0]&&child_get_order(parent)<bar_array[class_j][1])||(child_get_order(parent)==0))
        {show_heatmap(class_j);
          show_stacked_chart(class_j);
          //show_dashboard(class_j);
        }
      
      //如果此时修改的是当前展示的图表，那么直接更新，否则不管。
      }
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
      // console.log("child_get_order(parent.parentNode)",child_get_order(parent.parentNode));
      // console.log("child_get_order(parent)",child_get_order(parent));
      if(Number(parent.parentNode.firstChild.innerHTML)==i_index&&(child_get_order(parent)>=bar_array[class_j][0]&&child_get_order(parent)<bar_array[class_j][1])){
        showpie(i_index,class_j);
      }
      if((child_get_order(parent)>=bar_array[class_j][0]&&child_get_order(parent)<bar_array[class_j][1])||(child_get_order(parent)==0))
        {show_heatmap(class_j);
          show_stacked_chart(class_j);
          //show_dashboard(class_j);
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
      document.getElementById('navigator').appendChild(add);
      // document.body.insertBefore(add,document.getElementById('exportExcel'));
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
      document.getElementById('navigator').appendChild(add);
      // document.body.insertBefore(add,document.getElementById('exportExcel'));
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
        //console.log("tab.lastElementChild",tab.lastElementChild);
      // tab.appendChild("<tbody><tr><td>12</td><td>40</td><td>72</td><td>8</td><td>0</td><td>17</td><td>1</td><td>2</td><td>80</td><td>20</td><td>75</td><td>15</td><td>10</td><td>5</td><td>30</td><td>43</td><td>22</td><td>200</td><td>1.44</td><td>56</td><td>1</td><td><input type=\"button\" class=\"delete\" value=\"Delete\"> </td></tr></tbody>");
      var new_tr=document.createElement('tr');
      new_tbody=document.createElement('tbody');
      for (let i = 0; i < 21; i++) {
        var new_td=document.createElement('td');
        new_td.innerHTML=0;
        if(i==0)new_td.style="cursor: pointer";
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
      show_heatmap(class_j);
      show_stacked_chart(class_j);
      //show_dashboard(class_j);
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
        // tip.style="position: absolute;  top: 125px;left: 1350px;fontsize:'20px'"
        tip.style="fontsize:'15px'"
        // document.body.appendChild(tip);
        document.getElementById('navigator').appendChild(tip);
      }
      
      var deleteline=(element)=>{
        //console.log("typeof(element)",element);
        // console.log("Delete第",i,"i行");
        element.removeEventListener("click",delete_handle);
        console.log("element",element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode));
        //console.log("delte index",Number(element.getAttribute("deleteindex")));
        if(Number(element.getAttribute("deleteindex")==i_index)){
          delete_pie();
        }
        show_chart(j_index);
        show_heatmap(class_j);
        show_stacked_chart(class_j);
        //show_dashboard(class_j);
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
         var block_chart1 = d3.select("body").append("svg").attr("id",'chart').attr("width",600).attr("height",400).attr('transform','translate(400,750)');
         var block_chart2 = d3.select("body").append("svg").attr("id",'chart_pie').attr('transform','translate(-600,800)').attr("width",400).attr("height",400);
         var block_chart3 = d3.select("body").append("svg").attr("id",'heatmap').attr('transform','translate(100,750)').attr("width",450).attr("height",300);
         var block_chart4 = d3.select("body").append("div").attr("id",'stack').attr("width",600).attr("height",400);//为什么svg不行呢？
         var block_chart5 = d3.select("body").append("div").attr("id",'dashboard').attr("width",600).attr("height",500);
        //  d3.select('#stack').style('background-color','red');
        //  var svg = d3.select("body")
        //  .append("svg")
        //  .attr("width",width)
        //  .attr("height",height)
        //  .append("g")
        //  .attr("transform","translate("+ width/2 +"," + height/2 +")");
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
        showpie(i_index,class_j);
        show_heatmap(class_j);
        show_stacked_chart(class_j);
        //show_dashboard(class_j);
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
//console.log("d3.max(data, d => d.value)",d3.max(data, d => d.value));

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
      g.append("text").text("histogram")//要添加文字还要跟柱形图一样再
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
        // console.log(data);
        return data;
      }
      var tabletoarr_pie=(i,j)=>{
        var data=[];
        var tab=document.getElementById('tab');
        //console.log('j',j);
        // console.log("tab.rows[i]",tab.rows[i]);
        // console.log("bar_array[j][0]",bar_array[j][0]);
        // console.log("bar_array[j][1]",bar_array[j][1]);
        for(var index_j=bar_array[j][0];index_j<bar_array[j][1];index_j++){
          data.push({"index":String(tab.rows[0].cells[index_j].innerHTML),"value":Number(tab.rows[i].cells[index_j].innerHTML)});
        }
        //console.log(data);
        return data;
      }
      var showpie=(i,j)=>{
      var data=tabletoarr_pie(i,j);
      //console.log('pie_data',data);
      var color=["#BBDEFB","#98CAF9","#64B5F6","#42A5F5","#2196F3","#1E88E5","#1976D2"];
      //console.log('data.length',data.length);
      color=color.slice(0,data.length);
      //console.log('color',color);
      var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 450 - margin.right - margin.left,
      height = 450 - margin.top - margin.bottom,
      radius = width/2;
      // .range(["#BBDEFB","#98CAF9","#64B5F6","#42A5F5","#2196F3","#1E88E5","#1976D2"]);
    var color = d3.scaleOrdinal()
      .range(color);
      var arc = d3.arc()
      .outerRadius( radius - 10)
      .innerRadius(radius - 60);
    
    var labelArc = d3.arc()
      .outerRadius(radius - 70)
      .innerRadius(radius - 80)
      var pie = d3.pie()
      .sort(null)
      .value(function(d) { 
      //console.log(d[1]);
      return d.value; });

      var svg=d3.select("#chart_pie");
      if(svg.select("g"))
      svg.select("g").remove();//避免覆盖
     svg = d3.select("#chart_pie") .append("g")	.attr("transform","translate("+ width/2 +"," + height/2 +")"); 
      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class","arc");
        g.append("path")
        .attr("d",arc)
        .style("fill",function(d) {
          return color(d.data.index);
        })
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attrTween("d",pieTween);
        g.append("text")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy",".35em")
        .text(function(d){ 
        //console.log(d);
        return d.data.index;});
        function pieTween(b){
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle:0,endAngle:0},b);
        return function(t) {return arc(i(t));};
      }
       }
       var delete_pie=()=>{
        var svg=d3.select("#chart_pie");
        if(svg.select("g"))
        svg.select("g").remove();//避免覆盖
       }

var get_heatmap_data=(j)=>{
  var data0=[];
  var data1=[];
  var data2=[];
  var data3=[];
  for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
  data1.push(String(tab.rows[0].cells[j_index].innerHTML));

  for(var i=1;i<tab.rows.length;i++){
    data0.push(Number(tab.rows[i].cells[0].innerHTML));//month
    for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
      data2.push({"month":Number(tab.rows[i].cells[0].innerHTML),"area":String(tab.rows[0].cells[j_index].innerHTML),"value":Number(tab.rows[i].cells[j_index].innerHTML)});//这里的area也可以是四个里面任意一个，只是一个标号
      // xarr.push(Number(tab.rows[i].cells[0].innerHTML)); 
      // //console.log(typeof(tab.rows[i].cells[j].innerHTML)); string 
      // console.log("tab.rows[i].cells[j].innerHTML",tab.rows[i].cells[j].innerHTML);
      // yarr.push(Number(tab.rows[i].cells[j].innerHTML)); 
      //if (j==0) xarr[i-1]=  Number(tab.rows[i].cells[j].innerHTML);
  }
  // console.log('yarr',yarr);
  // console.log(data);
  data3.push(data0);data3.push(data1);data3.push(data2);
  return data3;
}

// set the dimensions and margins of the graphv
var show_heatmap=(j_index)=>{
  const margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg=d3.select("#heatmap");
  svg.selectAll("*").remove();    
  svg.append("g")
    .attr("transform", `translate(${margin.left+20},${margin.top})`);
  svg=svg.select('g');

    var data=get_heatmap_data(j_index);
  // Labels of row and columns
  const month = data[0];

  const area = data[1];

  const dataset=data[2];

  //USA	SA	EU	MEA	ASIA 
  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(month)
    .padding(0.01);
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
  
  // Build X scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(area)
    .padding(0.01);
  svg.append("g")
  // .attr("transform", `translate(-${margin.left},0)`)
    .call(d3.axisLeft(y))
    .attr("width", '40px');
  // Build color scale
  const myColor = d3.scaleLinear()
    .range(["white", "#69b3a2"])
    .domain([1,50])
  
  //Read the data
  
  // console.log(data);	
    svg.selectAll()
        .data(dataset, function(d) {return d.month+':'+d.area;})
        .join("rect")
        .attr("x", function(d) { return x(d.month) })
        .attr("y", function(d) { return y(d.area) })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value)} )
  }

  var selete_class=()=>{
    //添加add按钮
    // <input type='button' class='delete' value='Delete'> </input>
    var array=['Area','Group','Reservation','Clients age']
    var select_bar=document.createElement('div');
    select_bar.id='select_bar';
    document.getElementById('navigator').appendChild(select_bar);
    for(var i=0;i<4;i++){
        var add=document.createElement('input');
        add.type='button';
        add.id='select'+String(i);
        add.className='select';
        add.value=array[i];
        add.setAttribute('index',i);
        select_bar.appendChild(add);
        // var exportExcel=document.getElementById('box2_inner');
        
        add=document.getElementById('select'+String(i));
        //console.log('add',add);
        add.addEventListener('click',update_graph);
    }
  }
    var update_graph=function(){//这里只能用function?

      update_graph_this(this);
    }


    var update_graph_this=(element)=>{
      class_j=Number(element.getAttribute('index'));
      console.log('class_j',class_j);
      showpie(i_index,class_j);
      show_heatmap(class_j);
      show_stacked_chart(class_j);
      //show_dashboard(class_j);
  // var data=getdata(Number(element.getAttribute('index')));
  // d3chart(data);//更新柱形图
    }

    var get_heatmap_data=(j)=>{
      var data0=[];
      var data1=[];
      var data2=[];
      var data3=[];


      for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
      data1.push(String(tab.rows[0].cells[j_index].innerHTML));
    
      for(var i=1;i<tab.rows.length;i++){
        data0.push(Number(tab.rows[i].cells[0].innerHTML));//month
        for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
          data2.push({"month":Number(tab.rows[i].cells[0].innerHTML),"area":String(tab.rows[0].cells[j_index].innerHTML),"value":Number(tab.rows[i].cells[j_index].innerHTML)});//这里的area也可以是四个里面任意一个，只是一个标号
          // xarr.push(Number(tab.rows[i].cells[0].innerHTML)); 
          // //console.log(typeof(tab.rows[i].cells[j].innerHTML)); string 
          // console.log("tab.rows[i].cells[j].innerHTML",tab.rows[i].cells[j].innerHTML);
          // yarr.push(Number(tab.rows[i].cells[j].innerHTML)); 
          //if (j==0) xarr[i-1]=  Number(tab.rows[i].cells[j].innerHTML);
      }
      // console.log('yarr',yarr);
      // console.log(data);
      data3.push(data0);data3.push(data1);data3.push(data2);
      return data3;
    }
    var get_stack_data=(j)=>{
      var data=[];
      var data_key=[];
      var data_final=[];
      for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
        data_key.push(String(tab.rows[0].cells[j_index].innerHTML));

        for(var i=1;i<tab.rows.length;i++){

          var data_element={"month":Number(tab.rows[i].cells[0].innerHTML)};

          for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
            data_element[String(tab.rows[0].cells[j_index].innerHTML)]=Number(tab.rows[i].cells[j_index].innerHTML);

          data.push(data_element);
        } 
        data_final.push(data_key);
        data_final.push(data);
        return data_final;
    }
    // console.log("indexOf",indexOf(data[0]));
    var sum_data=(data)=>{
    // for (var i=0;i<data.length;i++){
        let sum=0;
    for(var key in data){
            //console.log(key,data[0][key]);
            //console.log("data[i][key]",data[i][key]);
            sum+=data[key];
            //console.log('sum',sum);
            
    }
    sum-=data["month"];
    // data[i].sum=sum;
    // }
    return sum;
    }
    var sum_data_dash=(data)=>{
      // for (var i=0;i<data.length;i++){
          let sum=0;
      for(var key in data){
              //console.log(key,data[0][key]);
              //console.log("data[i][key]",data[i][key]);
              sum+=data[key];
              //console.log('sum',sum);
              
      }
      // data[i].sum=sum;
      // }
      return sum;
      }
    var show_stacked_chart=(j)=>{
      
          var data_final=get_stack_data(j);
          var data_key=data_final[0];
          var data=data_final[1];
          console.log(data);
          var stack=document.getElementById('stack');
          if(document.getElementById('stack_inner'))
            stack.removeChild(document.getElementById('stack_inner'));
      // console.log('data',data);
          /* ----------------------------配置参数------------------------  */
          const chart = new Chart();
          const config = {
              barPadding: 0.15,
              margins: {top: 80, left: 80, bottom: 50, right: 80},
              textColor: 'black',
              gridColor: 'gray',
              tickShowGrid: [60, 120, 180],
              title: '堆叠直方图',
              hoverColor: 'white',
              animateDuration: 1000
          }
      
          chart.margins(config.margins);
          
          /* ----------------------------尺度转换------------------------  */
          chart.scaleX = d3.scaleBand()
                          .domain(data.map((d) => d.month))
                          .range([0, chart.getBodyWidth()])
                          .padding(config.barPadding);
          
          chart.scaleY = d3.scaleLinear()
                          .domain([0, d3.max(data.map((d) => sum_data(d)))])
                          .range([chart.getBodyHeight(), 0])
          
          chart.stack = d3.stack()
                          .keys(data_key)
                          // .order(d3.stackOrderAscending)
                          .offset(d3.stackOffsetNone);
          
          /* ----------------------------渲染柱形------------------------  */
          chart.renderBars = function(){
      
              let groups = chart.body().selectAll('.g')
                              .data(chart.stack(data));
                          
              let bars = groups.enter()
                          .append('g')
                        .merge(groups)
                          .attr('class', (d) => 'g ' + d.key)
                          .attr('fill', (d,i) => chart._colors(i))
                          .selectAll('.bar')
                          .data((d)=>{
                              return d.map((item) => {
                                  item.index = d.index;
                                  item.name = d.key;
                                  return item;
                              });
                          });
                  
                  groups.exit()
                          .remove();
      
                  bars.enter()
                          .append('rect')
                          .attr('class', 'bar')
                      .merge(bars)
                          .attr('x', (d) => chart.scaleX(d.data.month))
                          .attr('y', (d) => chart.scaleY(d[0]))
                          .attr('width', chart.scaleX.bandwidth())
                          .attr('height', 0)
                          .transition().duration(config.animateDuration)
                          .attr('height', (d) => chart.scaleY(d[0]) - chart.scaleY(d[1]))
                          .attr('y', (d) => chart.scaleY(d[1]));
                  
                  bars.exit()
                          .remove();
          }
      
          /* ----------------------------渲染坐标轴------------------------  */
          chart.renderX = function(){
              chart.svg().insert('g','.body')
                      .attr('transform', 'translate(' + chart.bodyX() + ',' + (chart.bodyY() + chart.getBodyHeight()) + ')')
                      .attr('class', 'xAxis')
                      .call(d3.axisBottom(chart.scaleX));
          }
      
          chart.renderY = function(){
              chart.svg().insert('g','.body')
                      .attr('transform', 'translate(' + chart.bodyX() + ',' + chart.bodyY() + ')')
                      .attr('class', 'yAxis')
                      .call(d3.axisLeft(chart.scaleY));
          }
      
          chart.renderAxis = function(){
              chart.renderX();
              chart.renderY();
          }
      
          /* ----------------------------渲染文本标签------------------------  */
          chart.renderText = function(){
              d3.select('.xAxis').append('text')
                                  .attr('class', 'axisText')
                                  .attr('x', chart.getBodyWidth())
                                  .attr('y', 0)
                                  .attr('fill', config.textColor)
                                  .attr('dy', 30)
                                  .text('month');
      
              d3.select('.yAxis').append('text')
                                  .attr('class', 'axisText')
                                  .attr('x', 0)
                                  .attr('y', 0)
                                  .attr('fill', config.textColor)
                                  .attr('transform', 'rotate(-90)')
                                  .attr('dy', -40)
                                  .attr('text-anchor','end')
                                  .text('y');
          }
      
          /* ----------------------------渲染网格线------------------------  */
          chart.renderGrid = function(){
              d3.selectAll('.yAxis .tick')
                  .each(function(d, i){
                      if (config.tickShowGrid.indexOf(d) > -1){
                          d3.select(this).append('line')
                              .attr('class','grid')
                              .attr('stroke', config.gridColor)
                              .attr('x1', 0)
                              .attr('y1', 0)
                              .attr('x2', chart.getBodyWidth())
                              .attr('y2', 0);
                      }
                  });
          }
      
          /* ----------------------------渲染图标题------------------------  */
          chart.renderTitle = function(){
              chart.svg().append('text')
                      .classed('title', true)
                      .attr('x', chart.width()/2)
                      .attr('y', 0)
                      .attr('dy', '2em')
                      .text(config.title)
                      .attr('fill', config.textColor)
                      .attr('text-anchor', 'middle')
                      .attr('stroke', config.textColor);
      
          }
      
          /* ----------------------------绑定鼠标交互事件------------------------  */
          chart.addMouseOn = function(){
              //防抖函数
              function debounce(fn, time){
                  let timeId = null;
                  return function(){
                      const context = this;
                      const event = d3.event;
                      timeId && clearTimeout(timeId)
                      timeId = setTimeout(function(){
                          d3.event = event;
                          fn.apply(context, arguments);
                      }, time);
                  }
              }
      
              d3.selectAll('.bar')
                  .on('mouseover', function(d){
                      const e = d3.event;
                      const position = d3.mouse(chart.svg().node());
      
                      d3.select(e.target)
                          .attr('fill', config.hoverColor);
                      
                      chart.svg()
                          .append('text')
                          .classed('tip', true)
                          .attr('x', position[0]+5)
                          .attr('y', position[1])
                          .attr('fill', config.textColor)
                          .text( d.name + ':' + d.data[String(d.name)]);
                  })
                  .on('mouseleave', function(d){
                      const e = d3.event;
                      
                      d3.select(e.target)
                          .attr('fill', chart._colors(d.index));
                          
                      d3.select('.tip').remove();
                  })
                  .on('mousemove', debounce(function(){
                          const position = d3.mouse(chart.svg().node());
                          d3.select('.tip')
                          .attr('x', position[0]+5)
                          .attr('y', position[1]-5);
                      }, 6)
                  );
          }
          var get_data_legend=(data_key)=>{
            var data_legend=[];
            console.log('data_key',data_key.length)
            for(var i=0;i<data_key.length;i++){
              //console.log('data_legend',data_legend.length);
              data_legend.push({"name":data_key[i],"color":chart._colors(i)});
              //console.log('data_legend',data_legend.length);
           
          } 
          console.log('data_legend',data_legend);
          return data_legend;
        }
          chart.renderColorbar = function(data_key){ 
            var data_legend=get_data_legend(data_key);
          var svg = d3.select("#stack_inner").select('svg');
          var legend = svg.selectAll(".legend")
              .data(data_legend)
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(200," + ((data_key.length-i+1) * 25 + 30) + ")"; });  //transform属性便是整个图例的坐标
    
          //绘制文字后方的颜色框或线
          legend.append("rect")
              .attr("x", 600 - 25) //width是svg的宽度，x属性用来调整位置
              // .attr("x", (width / 160) * 157)  
              //或者可以用width的分数来表示，更稳定一些，这是我试出来的，下面同
              .attr("y", 8)
              .attr("width", 30)
              .attr("height", 15) //设低一些就是线，高一些就是面，很好理解
              .style("fill", function(d){
                  return d.color
              });
    
          //绘制图例文字
          legend.append("text")
              .attr("x", 600 - 30)
              // .attr("x", (width / 40) * 39)
              .attr("y", 20)
              .style("text-anchor", "end") //样式对齐
              .text(function(d) { 
                  return d.name;
              });
            }   
          
          chart.render = function(){
      
              chart.renderAxis();
              
              chart.renderColorbar(data_key); 

              chart.renderText();
      
              chart.renderGrid();
      
              chart.renderBars();
      
              chart.addMouseOn();
      
              chart.renderTitle();
              
          }
      
          chart.renderChart();
          
              
      };


      var get_stack_data=(j)=>{
        var data=[];
        var data_key=[];
        var data_final=[];
        for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
          data_key.push(String(tab.rows[0].cells[j_index].innerHTML));
  
          for(var i=1;i<tab.rows.length;i++){
  
            var data_element={"month":Number(tab.rows[i].cells[0].innerHTML)};
  
            for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
              data_element[String(tab.rows[0].cells[j_index].innerHTML)]=Number(tab.rows[i].cells[j_index].innerHTML);
  
            data.push(data_element);
          } 
          data_final.push(data_key);
          data_final.push(data);
          return data_final;
      }
// var objtokeys=(obj)=>{
//   var data_keys=[];


// }
// var dash_d3_v3=(j)=>{
//   require.config({
//     paths: {
//         d3: "https://d3js.org/d3.v3.min.js"
//     }
// });

// require(["d3"], function(d3) {
//   var show_dashboard=(j)=>{
//     var fData=get_dashboard_data(j);
//     dashboard(fData);
//   }
// });
// }
// }
  var show_dashboard=(j)=>{
    var fData=get_dashboard_data(j);
    dashboard(fData);
  }
var get_dashboard_data=(j)=>{
  var freqdata=[];
  for(var i=1;i<tab.rows.length;i++){
    var line_data={};
    line_data.State=String(tab.rows[i].cells[0].innerHTML);
    var freq_data={};
    for (var j_index=bar_array[j][0];j_index<bar_array[j][1];j_index++)
      freq_data[String(tab.rows[0].cells[j_index].innerHTML)]=Number(tab.rows[i].cells[j_index].innerHTML);
    line_data.freq=freq_data;
    freqdata.push(line_data);
}
return freqdata;
}

      function dashboard(fData){
        console.log('fData',fData);
        var barColor = 'steelblue';
        function segColor(c){ 
          var i=0;
          var data_key={};
          for (x in fData.freq)
          {
            data_key[x]=chart._colors(i);
            i++;
          }
          return data_key[c];
          //return {low:"#807dba", mid:"#e08214",high:"#41ab5d"}[c]; }//改
        }
        // compute total for each state.
        fData.forEach(function(d){d.total=sum_data_dash(d.freq);});
        
        // function to handle histogram.
        function histoGram(fD){
            var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
            hGDim.w = 500 - hGDim.l - hGDim.r, 
            hGDim.h = 300 - hGDim.t - hGDim.b;
                
            //create svg for histogram.
            var dashboard=document.getElementById('dashboard');
            if(document.getElementById('hGsvg'))
              dashboard.removeChild(document.getElementById('hGsvg'));
            var hGsvg = d3.select('#dashboard').append("svg")
                .attr("id",'hGsvg')
                .attr("width", hGDim.w + hGDim.l + hGDim.r)
                .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
                .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");
    
            // create function for x-axis mapping.
            var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                    .domain(fD.map(function(d) { return d[0]; }));
    
            // Add x-axis to the histogram svg.
            hGsvg.append("g").attr("class", "x axis")
                .attr("transform", "translate(0," + hGDim.h + ")")
                .call(d3.svg.axis().scale(x).orient("bottom"));
    
            // Create function for y-axis map.
            var y = d3.scale.linear().range([hGDim.h, 0])
                    .domain([0, d3.max(fD, function(d) { return d[1]; })]);
    
            // Create bars for histogram to contain rectangles and freq labels.
            var bars = hGsvg.selectAll(".bar").data(fD).enter()
                    .append("g").attr("class", "bar");
            
            //create the rectangles.
            bars.append("rect")
                .attr("x", function(d) { return x(d[0]); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("width", x.rangeBand())
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr('fill',barColor)
                .on("mouseover",mouseover)// mouseover is defined below.
                .on("mouseout",mouseout);// mouseout is defined below.
                
            //Create the frequency labels above the rectangles.
            bars.append("text").text(function(d){ return d3.format(",")(d[1])})
                .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
                .attr("y", function(d) { return y(d[1])-5; })
                .attr("text-anchor", "middle");
            
            function mouseover(d){  // utility function to be called on mouseover.
                // filter for selected state.
                var st = fData.filter(function(s){ return s.State == d[0];})[0],
                    nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
                   
                // call update functions of pie-chart and legend.    
                pC.update(nD);
                leg.update(nD);
            }
            
            function mouseout(d){    // utility function to be called on mouseout.
                // reset the pie-chart and legend.    
                pC.update(tF);
                leg.update(tF);
            }
            
            // create function to update the bars. This will be used by pie-chart.
            hG.update = function(nD, color){
                // update the domain of the y-axis map to reflect change in frequencies.
                y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
                
                // Attach the new data to the bars.
                var bars = hGsvg.selectAll(".bar").data(nD);
                
                // transition the height and color of rectangles.
                bars.select("rect").transition().duration(500)
                    .attr("y", function(d) {return y(d[1]); })
                    .attr("height", function(d) { return hGDim.h - y(d[1]); })
                    .attr("fill", color);
    
                // transition the frequency labels location and change value.
                bars.select("text").transition().duration(500)
                    .text(function(d){ return d3.format(",")(d[1])})
                    .attr("y", function(d) {return y(d[1])-5; });            
            }        
            return hG;
        }
        
        // function to handle pieChart.
        function pieChart(pD){
            var pC ={},    pieDim ={w:250, h: 250};
            pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                    
            // create svg for pie chart.
            var piesvg = d3.select(id).append("svg")
                .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
            
            // create function to draw the arcs of the pie slices.
            var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);
    
            // create a function to compute the pie slice angles.
            var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });
    
            // Draw the pie slices.
            piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                .each(function(d) { this._current = d; })
                .style("fill", function(d) { return segColor(d.data.type); })
                .on("mouseover",mouseover).on("mouseout",mouseout);
    
            // create function to update pie-chart. This will be used by histogram.
            pC.update = function(nD){
                piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                    .attrTween("d", arcTween);
            }        
            // Utility function to be called on mouseover a pie slice.
            function mouseover(d){
                // call the update function of histogram with new data.
                hG.update(fData.map(function(v){ 
                    return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
            }
            //Utility function to be called on mouseout a pie slice.
            function mouseout(d){
                // call the update function of histogram with all data.
                hG.update(fData.map(function(v){
                    return [v.State,v.total];}), barColor);
            }
            // Animating the pie-slice requiring a custom function which specifies
            // how the intermediate paths should be drawn.
            function arcTween(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) { return arc(i(t));    };
            }    
            return pC;
        }
        
        // function to handle legend.
        function legend(lD){
            var leg = {};
                
            // create table for legend.
            var legend = d3.select(id).append("table").attr('class','legend');
            
            // create one row per segment.
            var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
                
            // create the first column for each segment.
            tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                .attr("width", '16').attr("height", '16')
          .attr("fill",function(d){ return segColor(d.type); });
                
            // create the second column for each segment.
            tr.append("td").text(function(d){ return d.type;});
    
            // create the third column for each segment.
            tr.append("td").attr("class",'legendFreq')
                .text(function(d){ return d3.format(",")(d.freq);});
    
            // create the fourth column for each segment.
            tr.append("td").attr("class",'legendPerc')
                .text(function(d){ return getLegend(d,lD);});
    
            // Utility function to be used to update the legend.
            leg.update = function(nD){
                // update the data attached to the row elements.
                var l = legend.select("tbody").selectAll("tr").data(nD);
    
                // update the frequencies.
                l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});
    
                // update the percentage column.
                l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
            }
            
            function getLegend(d,aD){ // Utility function to compute percentage.
                return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
            }
    
            return leg;
        }
        // console.log('Object.keys(freqData.freq)',Object.keys(fData.freq));
        // calculate total frequency by segment for all state.
        var tF = Object.keys(fData[0].freq).map(function(d){ 
            return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
        });    
        
        // calculate total frequency by state for all segment.
        var sF = fData.map(function(d){return [d.State,d.total];});
    
        var hG = histoGram(sF), // create the histogram.
            pC = pieChart(tF), // create the pie-chart.
            leg= legend(tF);  // create the legend.
    }
