function DrawScatter(div,width,height,dataset,color,padding){
		
		//在div中添加svg
		var svg = d3.select(div)
				    .append("svg")
				    .attr("width",width)
				    .attr("height",height);


		//定义x轴比例尺:domain() 和 range() 分别设定比例尺的值域和范围。
		var xScale = d3.scale.linear()
		    .domain([0,d3.max(dataset,function(d){
		    	return d[0];
		     })]) //the maxiest of the first  column:[0,700]
		    .range([0,width-padding.right*2-padding.left]); // the mapping range of the domain:
 
		
		//定义y轴比例尺
		var yScale = d3.scale.linear()
		    .domain([0,d3.max(dataset,function(d){
		    	return d[1];
		    })])
		    .range([height-padding.top-padding.bottom,0]);


		//描点：为数据添加圆形
		svg.selectAll("circle")
		   .data(dataset)
		   .enter()
		   .append("circle")
		   .attr("cx",function(d){
		   		return xScale(d[0]) + padding.left;    //画布左边留了空白，所以x也应该右移padding.left大小
		   })
		   .attr("cy",function(d){
		   		return yScale(d[1]) + padding.top;
		   })
		   .attr("r",8)
		   .attr("fill",function(d,i){
		   		return color(i);
		   		//return "rgb(168,255," + i*10 + ")"
		   })
		   .attr("fill-opacity",0.5);

		//为数据添加数字标签
		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .attr("font-size",7)
		   .attr("x",function(d){
		   		return xScale(d[0]) + padding.left;
		   })
		   .attr("y",function(d){
		   		return yScale(d[1]) + padding.top;
		   })
		   .attr("dx",10)
		   .attr("dy",10)
		   .text(function(d,i){
		   		return i+1+" ("+ d[0] + "," + d[1] +")";
		   });
		

		
		//定义x轴
		var xAxis = d3.svg.axis()
		    .scale(xScale)
		    .orient("bottom");

		//添加x轴坐标
		svg.append("g")
		   .attr("class","axis")
		   .attr("transform","translate(" + padding.left + "," + (width - padding.bottom) + ")")
		   .call(xAxis);

		//定义y轴
		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");


		//添加y轴坐标
		svg.append("g")
		   .attr("class","axis")
		   .attr("transform","translate(" + padding.left + "," + padding.top + ")")
		   .call(yAxis);


		//添加一条y=x的直线
		svg.append("path")
		   .attr("d","M " + padding.left + " " + (height - padding.top) + " L " + (width-padding.right) + " " + padding.top)
		   .attr("stroke","#ccc")
		   .attr("stroke-width",2)
		   .attr("fill-opacity",0.1);


		
}