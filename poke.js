$(function(){
	let poke = [],
		colorArr = ['a','d','h','s'],
		flag = {},
		table = $('.table'),
		leftBtn = $('.leftBtn'),
		rightBtn = $('.rightBtn')
///////////////////////////////////发牌///////////////////////////////////
	while(poke.length<52){
		let obj = {};
		let	color = colorArr[Math.floor(Math.random()*4)],
			num = Math.floor(Math.random()*13+1)

		if(!flag[color+'_'+num]){
			color = colorArr[Math.floor(Math.random()*4)]
			num = Math.floor(Math.random()*13+1)
			poke.push({color,num});
			flag[color+'_'+num] = true;
		}
	}
	let index = 0;       	
	for(let i = 0;i<7;i++){
		for(let j = 0;j<=i;j++){
			let divs = $('<div>');
			let left = 350-50*i+100*j,
				top = 50*i;
			divs.addClass('poke')
				.attr('id',`${i}_${j}`)
				.data('num',poke[index].num)
				.css({backgroundImage:`url('img/${poke[index].color}${poke[index].num}.JPG')`})
				.appendTo('.table')
				.delay(150*i)
				.animate({left,top,opacity:1},1000);
			index++;		
		}
	}
	for(;index<poke.length;index++){
		let divs = $('<div>')
		divs.addClass('poke')
			.addClass('left')
			.attr('id',-2+'_'+-2)
			.data('num',poke[index].num)
			.css({backgroundImage:`url('img/${poke[index].color}${poke[index].num}.JPG')`,zIndex:index})
			.appendTo('.table')
			.delay(index*50)
			.animate({left:0,top:470,opacity:1},1000);
	}
////////////////////////////////////游戏//////////////////////////////////////////
	let first = null;
	table.on('click','.poke',function(){
		let card = $(this).attr('id').split('_');
		
		if($(`#${card[0]*1+1}_${card[1]*1}`).length || $(`#${card[0]*1+1}_${card[1]*1+1}`).length){
			return;
		}
		if($(this).hasClass('active')){
			$(this).animate({top:'+=10'})
		}else{
			$(this).animate({top:'-=10'})
		}
		$(this).toggleClass('active')

		if(!first){
			first = $(this)
		}else{
			if(first.data('num')+$(this).data('num') == 14){
				$('.active').animate({top:0,left:700},function(){
					$(this).remove()
				})				
			}else{
				$('.active').animate({top:"+=10"}).removeClass('active')				
			}
			first = null
		}
	})
//////////////////////////////////  button  //////////////////////////////////////////
	zIndex = 0;
	rightBtn.on('click',function(){
		if(!$('.left').length){
			return ;
		}

		zIndex++;
		$('.left').last().removeClass('left').addClass('right').animate({left:'+=700',zIndex})
	})

	leftBtn.on('click',function(){				
		if(!$('.right').length){
			return ;
		}

		$('.right').each(function(index,obj){
			let zIndex = $('.left').eq(-1).css('zIndex')*1+1					
			$(this).delay(index*60).animate({left:'-=700',zIndex},function(){
				$(this).removeClass('right').addClass('left')
			})
		})
	})

})