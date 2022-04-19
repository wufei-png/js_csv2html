// import Chart from "./chart.js";

var data_d3=[];
var data_key=[];
for (var i=0;i<6;i++)
data_d3.push({"month":i,"name1":i+1,"name2":i+2,"name3":i+3,"name4":i+4});
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
console.log('sum',sum);
// data[i].sum=sum;
// }
return sum;
}
for(var key in data_d3[0]){
    data_key.push(key);
}
data_key.shift();
console.log('data_key',data_key);



console.log('data',data_d3);

var data_csv=[];
var init =()=>{
    console.log("elect_file",document.getElementById("elect_file"));
    var input=document.getElementById('elect_file');
    input.addEventListener('change',openFile);
    }
    init();
// function addrow(data_csv,row_element_arr){
//         var data_row=[];
//         for(let i=0;i<row_element_arr.length;i++){
//             //else html+='<td>'+String(i)+'</td>';
//           data_row.push(String(row_element_arr[i]));
//             }
//         data_csv.push(data_row)
//     }
var openFile = function()
{
    console.log("elect_file",document.getElementById("elect_file"));
  var resultFile = document.getElementById("elect_file").files[0];
    var input = this.target;
    console.log("event.target.files[0]",this.target.files[0]);
    console.log("event.target.files",this.target.files);
    console.log("event.target",this.target);
    console.log("event",this);
    console.log("resultFile",resultFile);
    if(resultFile){
    var reader = new FileReader();
    reader.onload = function() 
    //读取完异步调用
    {  
        console.log("reader",reader);
        if(reader.result) 
        {
            //文件内容:reader.result
            var arr=reader.result.split("\n");
            console.log("为什么");
            console.log("arr",arr);
            // $("#output").html(reader.result);
            for (let index=0; index < arr.length; index++)
            {
              // arr[index],一行数据
                row_element_arr=arr[index].split(",");
                console.log('arr[',index,']',row_element_arr)
                data_csv.push(row_element_arr);
            }
        }

    };

    reader.readAsText(resultFile,'UTF-8');//异步函数，挂载到onload执行回调
  }
  else{
    alert("文件打不开")
  }
  console.log("data_csv",data_csv);
};


var d3chart=(data)=>{
console.log('data',data);
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
                    .order(d3.stackOrderAscending)
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
                    .text( d.name + ':' + d.data.food + '元');
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
        
    chart.render = function(){

        chart.renderAxis();

        chart.renderText();

        chart.renderGrid();

        chart.renderBars();

        chart.addMouseOn();

        chart.renderTitle();
    }

    chart.renderChart();
    
        
};
 d3chart(data_d3);

var selete_class=()=>{
    //添加add按钮
    // <input type='button' class='delete' value='Delete'> </input>
    var array=['Area','Group','Reservation','Clients age','Gender','Occupancy']
    for(var i=0;i<6;i++){
        var add=document.createElement('input');
        add.type='button';
        add.id='select'+String(i);
        add.className='select';
        add.value=array[i];
        add.setAttribute('index',i);
        var exportExcel=document.getElementById('box2_inner');
        exportExcel.appendChild(add);
        // add=document.getElementById('select'+String(i));
        //console.log('add',add);
        add.addEventListener('click',changed3);
    }
  //也可以通过上面的html+=来添加元素
  }
  var changed3=function(){//这里只能用function?
    //console.log(666);
    changed3_this(this);
  }
  var getdata=(i)=>{
      
  }
  var changed3_this=(element)=>{
    //console.log('element',typeof(element.getAttribute('index')));//string
var data=getdata(Number(element.getAttribute('index')));
d3chart(data);//更新柱形图
  }
  selete_class();













