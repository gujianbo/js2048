$(function(){
	function game2048(elem){
		this.data=[
				   	[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
			];
		this.elem=elem;
		this.clean();
		this.init();
		this.lock=0;
	}
	game2048.prototype={
		clean:function(){
			this.elem.find("div.block2").remove();
			this.elem.find("div.block4").remove();
			this.elem.find("div.block8").remove();
			this.elem.find("div.block16").remove();
			this.elem.find("div.block32").remove();
			this.elem.find("div.block64").remove();
			this.elem.find("div.block128").remove();
			this.elem.find("div.block256").remove();
			this.elem.find("div.block512").remove();
			this.elem.find("div.block1024").remove();
			this.elem.find("div.block2048").remove();
		},
		init:function(){
			pos1=Math.floor(Math.random()*16);
			this.generate(pos1,Math.random()<0.8?2:4);
			pos2=this.randomgene();
			this.generate(pos2,Math.random()<0.8?2:4);
		},
		xpos:function(index){
			return 120*Math.floor(index%4)+20;
		},
		ypos:function(index){
			return 120*Math.floor(index/4)+20;
		},
		randomgene:function(){
			var rest=new Array();
			for(i=0;i<4;i++){
				for(j=0;j<4;j++){
					if(this.data[i][j]==0)
						rest.push(4*i+j);
				}
			}
			var rand=Math.floor(Math.random()*rest.length)
			return rest[rand];
		},
		generate:function(index,num){
			newelem=$("<div class='block"+num+"' id='block"+index+"'>"+num+"</div>");
			newelem.css("left",this.xpos(index));
			newelem.css("top",this.ypos(index));
			newelem.css("display","none");
			this.elem.append(newelem);
			this.data[Math.floor(index/4)][Math.floor(index%4)]=num;
			newelem.fadeIn(100);
		},
		move:function(direction){
			if(this.lock==0){
				this.lock=1;
				switch(direction){
					case 'l':
						if(this.moveleft()==1){
							//this.randomgene();
							//pos=this.randomgene();
							//this.generate(pos,Math.random()<0.8?2:4);
							//console.log(this.data);
						}
						break;
					case 'r':
						if(this.moveright()==1){
							//this.randomgene();
							//pos=this.randomgene();
							//this.generate(pos,Math.floor(Math.random()*2+1)*2);
							//console.log(this.data);
						}
						break;
					case 'u':
						if(this.moveup()==1){
							//this.randomgene();
							//pos=this.randomgene();
							//this.generate(pos,Math.floor(Math.random()*2+1)*2);
							//console.log(this.data);
						}
						break;
					case 'd':
						if(this.movedown()==1){
							//this.randomgene();
							//pos=this.randomgene();
							//this.generate(pos,Math.floor(Math.random()*2+1)*2);
							//console.log(this.data);
						}
						break;
				}
				this.lock=0;
			}
		},
		moveleft:function(){
			var flag=0;
			var obj=this;
			var gened=0;
			for(i=0;i<4;i++){
				var nonzeroindex=0;
				var merged=0;//是否可加
				for(j=0;j<4;j++){
					if(this.data[i][j]!=0){
						//满足相加的条件
						if(merged==0&&(nonzeroindex-1)!=-1&&this.data[i][j]==this.data[i][nonzeroindex-1]){
							flag=1;
							//console.log("["+i+"]["+j+"]="+this.data[i][j]+"与["+i+"]["+(nonzeroindex-1)+"]="+this.data[i][nonzeroindex-1]);
							this.data[i][nonzeroindex-1]=2*this.data[i][j];
							this.data[i][j]=0;
							curelem=this.elem.find("#block"+(4*i+j));
							//$("#block"+(i*4+nonzeroindex-1)).html(this.data[i][nonzeroindex-1]);
							curelem.css("z-index","1");
							curelem.attr("prev","#block"+(i*4+nonzeroindex-1));
							curelem.attr("prev-val",this.data[i][nonzeroindex-1]);
							curelem.animate({left:(120*(nonzeroindex-1)+20)+"px"},100,function(){
								$($(this).attr("prev")).html($(this).attr("prev-val"));
								$($(this).attr("prev")).removeClass();
								$($(this).attr("prev")).addClass("block"+$(this).attr("prev-val"));
								obj.expend($($(this).attr("prev")),gened);
								gened=1;
								$(this).remove();
							});
							merged=1;
						}else if(nonzeroindex!=j){
							flag=1;
							this.data[i][nonzeroindex]=this.data[i][j];
							this.data[i][j]=0;
							curelem=this.elem.find("#block"+(4*i+j));
							curelem.animate({left:(120*nonzeroindex+20)+"px"},100,function(){
								if(gened==0){
									pos=obj.randomgene();
									obj.generate(pos,Math.floor(Math.random()*2+1)*2);
									gened=1;
								}
							});
							curelem.attr("id","block"+(4*i+nonzeroindex));
							merged=0;
							nonzeroindex++;
						}else{
							nonzeroindex++;
						}
						
					}
				}
			}
			return flag;
		},
		moveright:function(){
			var flag=0;
			var obj=this;
			var gened=0;
			for(i=0;i<4;i++){
				var nonzeroindex=3;
				var merged=0;//是否可加
				for(j=3;j>=0;j--){
					if(this.data[i][j]!=0){
						//满足相加的条件
						if(merged==0&&(nonzeroindex+1)!=4&&this.data[i][j]==this.data[i][nonzeroindex+1]){
							flag=1;
							//console.log("["+i+"]["+j+"]="+this.data[i][j]+"与["+i+"]["+(nonzeroindex-1)+"]="+this.data[i][nonzeroindex-1]);
							this.data[i][nonzeroindex+1]=2*this.data[i][j];
							this.data[i][j]=0;
							curelem=this.elem.find("#block"+(4*i+j));
							//$("#block"+(i*4+nonzeroindex-1)).html(this.data[i][nonzeroindex-1]);
							curelem.css("z-index","1");
							curelem.attr("prev","#block"+(i*4+nonzeroindex+1));
							curelem.attr("prev-val",this.data[i][nonzeroindex+1]);
							curelem.animate({left:(120*(nonzeroindex+1)+20)+"px"},100,function(){
								$($(this).attr("prev")).html($(this).attr("prev-val"));
								$($(this).attr("prev")).removeClass();
								$($(this).attr("prev")).addClass("block"+$(this).attr("prev-val"));
								obj.expend($($(this).attr("prev")),gened);
								gened=1;
								$(this).remove();
							});
							merged=1;
						}else if(nonzeroindex!=j){
							flag=1;
							this.data[i][nonzeroindex]=this.data[i][j];
							this.data[i][j]=0;
							curelem=this.elem.find("#block"+(4*i+j));
							curelem.animate({left:(120*nonzeroindex+20)+"px"},100,function(){
								if(gened==0){
									pos=obj.randomgene();
									obj.generate(pos,Math.floor(Math.random()*2+1)*2);
									gened=1;
								}
							});
							curelem.attr("id","block"+(4*i+nonzeroindex));
							merged=0;
							nonzeroindex--;
						}else{
							nonzeroindex--;
						}
						
					}
				}
			}
			return flag;
		},
		moveup:function(){
			var flag=0;
			var obj=this;
			var gened=0;
			for(i=0;i<4;i++){
				var nonzeroindex=0;
				var merged=0;//是否可加
				for(j=0;j<4;j++){
					if(this.data[j][i]!=0){
						//满足相加的条件
						if(merged==0&&(nonzeroindex-1)!=-1&&this.data[j][i]==this.data[nonzeroindex-1][i]){
							flag=1;
							//console.log("["+i+"]["+j+"]="+this.data[i][j]+"与["+i+"]["+(nonzeroindex-1)+"]="+this.data[i][nonzeroindex-1]);
							this.data[nonzeroindex-1][i]=2*this.data[j][i];
							this.data[j][i]=0;
							curelem=this.elem.find("#block"+(4*j+i));
							//$("#block"+(i*4+nonzeroindex-1)).html(this.data[i][nonzeroindex-1]);
							curelem.css("z-index","1");
							curelem.attr("prev","#block"+((nonzeroindex-1)*4+i));
							curelem.attr("prev-val",this.data[nonzeroindex-1][i]);
							curelem.animate({top:(120*(nonzeroindex-1)+20)+"px"},100,function(){
								$($(this).attr("prev")).html($(this).attr("prev-val"));
								$($(this).attr("prev")).removeClass();
								$($(this).attr("prev")).addClass("block"+$(this).attr("prev-val"));
								obj.expend($($(this).attr("prev")),gened);
								gened=1;
								$(this).remove();
							});
							merged=1;
						}else if(nonzeroindex!=j){
							flag=1;
							this.data[nonzeroindex][i]=this.data[j][i];
							this.data[j][i]=0;
							curelem=this.elem.find("#block"+(4*j+i));
							curelem.animate({top:(120*nonzeroindex+20)+"px"},100,function(){
								if(gened==0){
									pos=obj.randomgene();
									obj.generate(pos,Math.floor(Math.random()*2+1)*2);
									gened=1;
								}
							});
							curelem.attr("id","block"+(4*nonzeroindex+i));
							merged=0;
							nonzeroindex++;
						}else{
							nonzeroindex++;
						}
						
					}
				}
			}
			return flag;
		},
		movedown:function(){
			var flag=0;
			var obj=this;
			var gened=0;
			for(i=0;i<4;i++){
				var nonzeroindex=3;
				var merged=0;//是否可加
				for(j=3;j>=0;j--){
					if(this.data[j][i]!=0){
						//满足相加的条件
						if(merged==0&&(nonzeroindex+1)!=4&&this.data[j][i]==this.data[nonzeroindex+1][i]){
							flag=1;
							//console.log("["+i+"]["+j+"]="+this.data[i][j]+"与["+i+"]["+(nonzeroindex-1)+"]="+this.data[i][nonzeroindex-1]);
							this.data[nonzeroindex+1][i]=2*this.data[j][i];
							this.data[j][i]=0;
							curelem=this.elem.find("#block"+(4*j+i));
							//$("#block"+(i*4+nonzeroindex-1)).html(this.data[i][nonzeroindex-1]);
							curelem.css("z-index","1");
							curelem.attr("prev","#block"+((nonzeroindex+1)*4+i));
							curelem.attr("prev-val",this.data[nonzeroindex+1][i]);
							curelem.animate({top:(120*(nonzeroindex+1)+20)+"px"},100,function(){
								$($(this).attr("prev")).html($(this).attr("prev-val"));
								$($(this).attr("prev")).removeClass();
								$($(this).attr("prev")).addClass("block"+$(this).attr("prev-val"));
								obj.expend($($(this).attr("prev")),gened);
								gened=1;
								$(this).remove();
							});
							merged=1;
						}else if(nonzeroindex!=j){
							flag=1;
							this.data[nonzeroindex][i]=this.data[j][i];
							this.data[j][i]=0;
							curelem=this.elem.find("#block"+(4*j+i));
							curelem.animate({top:(120*nonzeroindex+20)+"px"},100,function(){
								if(gened==0){
									pos=obj.randomgene();
									obj.generate(pos,Math.floor(Math.random()*2+1)*2);
									gened=1;
								}
							});
							curelem.attr("id","block"+(4*nonzeroindex+i));
							merged=0;
							nonzeroindex--;
						}else{
							nonzeroindex--;
						}
						
					}
				}
			}
			return flag;
		},
		
		expend:function(elem,gened){
			var t_left=elem.position().left;
			//console.log("left:"+t_left);
			var t_top=elem.position().top;
			var _this=this;
			elem.animate({left:(t_left-10)+"px",top:(t_top-10)+"px",width:"120px",height:"80px"},70,function(){
				$(this).animate({left:t_left+"px",top:t_top+"px",width:"100px",height:"60px"},70,function(){
					if(gened==0){
						pos=_this.randomgene();
						_this.generate(pos,Math.floor(Math.random()*2+1)*2);
					}
				});
			});
		},
		check:function(){
			flag=0;
			for(i=0;i<4;i++){
				for(j=1;j<4;j++){
					if(this.data[i][j]==this.data[i][j-1]){
						flag=1;
					}
				}
			}
			for(i=0;i<4;i++){
				for(j=1;j<4;j++){
					if(this.data[j-1][i]==this.data[j][i]){
						flag=1;
					}
				}
			}
			for(i=0;i<4;i++){
				for(j=0;j<4;j++){
					if(this.data[i][j]==2048){
						return 2;
					}
					if(this.data[i][j]==0)
						flag=1;
				}
			}
			return flag;
		}
	}
	
	var game=0;
	$(document).keydown(function(event){
		if(game!=0){
			if(event.keyCode == 37){
				game.move('l');
				res=game.check();
				if(res!=1){
					//alert(res);
					newgame($('div#wrap2048'),res);
				}
			}
			if(event.keyCode == 38){
				game.move('u');
				res=game.check();
				if(res!=1){					
					newgame($('div#wrap2048'),res);
				}
			}
			if(event.keyCode == 39){
				game.move('r');
				res=game.check();
				if(res!=1){					
					//alert(res);
					newgame($('div#wrap2048'),res);
				}
			}
			if(event.keyCode == 40){
				game.move('d');
				res=game.check();
				if(res!=1){
					newgame($('div#wrap2048'),res);
				}
			}
		}
	});
	
	function newgame(elem,type){
		//alert("play");
		elem.find(".respub").fadeIn(2000);
		if(type==0){
			elem.find(".respub div.restext").html("Game Over!");
		}
		if(type==1){
			elem.find(".respub div.restext").html("Enjoy yourself!");
		}
		if(type==2){
			elem.find(".respub div.restext").html("Congratulations!");
		}
		elem.find(".respub a.startbtn").click(function(){
			elem.find(".respub").hide();			
			game=new game2048($("div#wrap2048"));
			return false;
		});
	}
	
	newgame($('div#wrap2048'),1);
})