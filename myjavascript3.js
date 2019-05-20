var last_block; //последний открытый блок
var count_click = 0; //количество кликов
var timer_click = 0; //кол-во правильно открытых пар блоков, для отсчёт окончания игры
var timer = 0; //время, когда был открыт первый блок (начало игры)
var game_array = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]; //массив расположения блоков

$(document).ready(function() { //функция, которая перемешивает массив
	function mix(mixArray) {
		var index, valueIndex; 
		for (var i=0; i<=mixArray.length-1; i++) {
			index = Math.floor(Math.random()*i);
			valueIndex = mixArray[index];
			mixArray[index] = mixArray[i];
			mixArray[i] = valueIndex;
	  	}
	  	return mixArray;
	}

	mix(game_array);

	$('.test div').each(function() { //функция для присвоения каждому блоку class, с его цветом
		$(this).attr('class', + game_array[count_click]);
		$(this).attr('data-state','0');
		count_click++;
	});

	count_click = 0;

	document.getElementsByClassName('1')[0].value = "red";
	document.getElementsByClassName('2')[0].value = "orange";
	document.getElementsByClassName('3')[0].value = "yellow";
	document.getElementsByClassName('4')[0].value = "green";
	document.getElementsByClassName('5')[0].value = "blue";
	document.getElementsByClassName('6')[0].value = "black";
	document.getElementsByClassName('7')[0].value = "purple";
	document.getElementsByClassName('8')[0].value = "brown";

	$('.test div').click(function() {
		if (timer_click == 0) { //первый запуск
			timer = new Date().getTime();
			timer_click++;
		}
		if ($(this).data('state') == 0 ) { //закрытая ячейка
			if (count_click == 0) { //первый клик
				count_click++;
				last_block = $(this).attr('class');
				$(this).data('state',1).attr('data-state',1).css('background-color', document.getElementsByClassName(last_block)[0].value);
			}
			else { //второй клик
				if (last_block ==$(this).attr('class')) { //совпадение
					$('.' + last_block).data('state',2).attr('data-state',2).css('background-color', document.getElementsByClassName(last_block)[0].value);
					timer_click++;
				}
				else { //не совпадение
					$(this).data('state', 1).attr('data-state',1).css('background-color', document.getElementsByClassName($(this).attr('class'))[0].value);
					function hide_img() { //задержкай
						$('.test div').each(function(){
							if( $(this).data('state') == 1 ) {
								$(this).data('state',0).attr('data-state',0).css('background-color', 'white');
							}
						});
					}
				setTimeout(hide_img, 500);
				}
				count_click = 0;
			}
		}
		if (timer_click == 9) { //решенная мозаика
			alert('Вы выиграли! \n' + 'Затраченное время: ' + (new Date().getTime()-timer)/1000);
			timer = 0;
		}
	});
});