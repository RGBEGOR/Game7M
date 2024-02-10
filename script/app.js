const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	
	new Question("Какие кочевники начали завоевание  Китая в начале 13 века?  ", 
	[
		new Answer('Караханиды', 0),
		new Answer("Японцы  ", 0),
		new Answer("Эфталиты", 0),
		new Answer("Монголы", 1)
	]),
	new Question("Священные реки в Китае", 
	[
		new Answer('Янцзы и Хуанхе', 1),
		new Answer("Инд и Ганг", 0),
		new Answer("Нил и Амазонка", 0),
		new Answer("Амударья и Сырдарья", 0)
	]),
	new Question("В каком веке  на севере Индии образовался Делийский султанат? ", 
	[
		new Answer('11 век ', 0),
		new Answer("6 век", 0),
		new Answer("10 век ", 0),
		new Answer(" 13 век ", 1)
	]),
	new Question("Какая династия правила в Индии до прихода Делийского султаната", 
	[
		new Answer('Кушаны ', 0),
		new Answer("Гупты", 1),
		new Answer("Маратха", 0),
		new Answer("Моголы", 0)
	]),
	new Question("Кто был основателем империи Великих Моголов?", 
	[
		new Answer('Бабур', 1),
		new Answer("Тимур ", 0),
		new Answer("Шейбанихан ", 0),
		new Answer("Байкара", 0)

	]),
	new Question("Полуостров на котором находиться Индия?", 
	[
		new Answer('Пакистан ', 0),
		new Answer("Индостан", 1),
		new Answer("Непал ", 0),
		new Answer("Дехкан", 0)
	]),
	new Question("Какие народы жили на территории  доколумбовой Америки", 
	[
		new Answer('Испанцы Французы Британцы', 0),
		new Answer("Инки Сиу Ацтекм", 0),
		new Answer("Майя Ацтеки Инки", 1),
		new Answer("Чироки Ирокезы Поэбло", 0)
	]),
	new Question("На каком полуострове жили Ацтеки и Майя", 
	[
		new Answer('Ютландия', 0),
		new Answer("Юкотан ", 1),
		new Answer("Иберия", 0),
		new Answer("Балканский ", 0)
	]),
	new Question("Что использовали Ацтеки и Майя в качестве валюты..", 
	[
		new Answer('Шоколад', 1),
		new Answer("Пшеницу", 0),
		new Answer("Кофе", 0),
		new Answer("Хлопок", 0)
	]),
	new Question("В каком году Карл Великий стал Императором Франков", 
	[
		new Answer('490 год ', 0),
		new Answer("476 году ", 0),
		new Answer("800 год", 1),
		new Answer("777 году ", 0)
	]),


	new Question("Сёгуны в средневековой Японии — это ", 
	[
		new Answer('Императоры ', 0),
		new Answer("Чиновники ", 0),
		new Answer("Верховные военные правители ", 1),
		new Answer("Торговцы", 0)
	]),
	new Question("Самураи в средневековой Японии — это", 
	[
		new Answer('Наследственные войны-феодалы', 1),
		new Answer("Чиновники", 0),
		new Answer("Судьи", 0),
		new Answer("Ниндзя-войны", 0)
	]),
	new Question("Особенность Японии в Средние века:", 
	[
		new Answer('Император самый крутой', 0),
		new Answer("Сегуны ничего не решали ", 0),
		new Answer("Самураи самые важные в стране ", 0),
		new Answer("У Императора небыло реальной власти ", 1)
	]),
	new Question("Государственная религия средневековой Японии:", 
	[
		new Answer('Иудаизм', 0),
		new Answer("Буддизм", 1),
		new Answer("Ислам", 0),
		new Answer("Конфуцианство", 0)
	]),
	new Question("В период сегуната в Японии", 
	[
		new Answer('проводилась политика изоляции от других стран ', 1),
		new Answer("усилилась власть императора", 0),
		new Answer("прекратились междоусобные войны", 0),
		new Answer("Нет ответа", 0)

	]),

	new Question("Раджи — это ", 
	[
		new Answer('Императоры', 0),
		new Answer("Князья в Индии  ", 1),
		new Answer("Чиновники ", 0),
		new Answer("Священослукжители", 0)
	]),
	new Question("Ахеменидская динсатия Персидкой имперрии это династия какой  современной страны?", 
	[
		new Answer('Ирана', 1),
		new Answer("Ирака", 0),
		new Answer("Турции", 0),
		new Answer("Египта", 0)
	]),
	new Question("Династии Тан и Сун правили в", 
	[
		new Answer('Корее', 0),
		new Answer("Японии", 0),
		new Answer("Индии", 0),
		new Answer("Китае", 1)
	]),
	new Question("Выходец из итальянского города Венеции, в XIII веке посе­тивший Китай и подробно описавший его особенности и традиции, — это", 
	[
		new Answer('Бруно', 0),
		new Answer("Марко-поло", 1),
		new Answer("Магелан", 0),
		new Answer("Хубилай", 0)
	]),
	new Question("Как называются в Индии замкнутые группы людей со сходным происхождением, профессией, правами и обязанностями?", 
	[
		new Answer(' Касты ', 1),
		new Answer("Кланы", 0),
		new Answer("Префекты", 0),
		new Answer("Сословия", 0)

	]),

	new Question("Кордовский халифат это на самом дела страна...", 
	[
		new Answer('Франция', 0),
		new Answer("Испания ", 1),
		new Answer("Марокко", 0),
		new Answer("Алжир", 0)
	]),
	new Question("До середины VII века на территории Корейского полуострова находилось три крупных государства. Какого государства там не существовало?", 
	[
		new Answer('Мин', 1),
		new Answer("Пикче", 0),
		new Answer("Когёре", 0),
		new Answer("Чосон", 0)
	]),
	new Question("Место для сооружения храмов в Афинах называлось:", 
	[
		new Answer('Пропилеи', 0),
		new Answer("Парфенон", 0),
		new Answer("Агора", 0),
		new Answer("Акрополь", 1)
	]),
	new Question("Как называють кунсткамеры для содержания евреев и славян в неволе и далнейшего их уничтожения", 
	[
		new Answer('Кунсткамеры ', 0),
		new Answer("Концлагери", 1),
		new Answer("Тюрьмы", 0),
		new Answer("не знаю", 0)
	]),
	new Question("Какую богиню называли «воительница»:", 
	[
		new Answer(' Афина', 1),
		new Answer("Афродита", 0),
		new Answer("Гера", 0),
		new Answer("Лера", 0)

	]),


	new Question(" Как звали спартанского полководца, сражавшегося с персами при Фермопилах?", 
	[
		new Answer('Фемистокол', 0),
		new Answer("Леонид", 1),
		new Answer("Милан", 0),
		new Answer("Москва", 0)
	]),
	new Question("Какое расстояние пробежал воин от Марафона к Афинам, чтобы сообщить весть о победе греков?", 
	[
		new Answer('35км ', 0),
		new Answer("300км", 0),
		new Answer("42 км", 1),
		new Answer("62 км", 0)

	]),


	new Question("главным «учебником», который следовало знать в Средневековой Европе наизусть, была...", 
	[
		new Answer('Библия', 1),
		new Answer("Коран ", 0),
		new Answer("Тора", 0),
		new Answer("История ", 0)
	]),
	new Question("Какой король Франкского королевства первым принял христианство",

	[
		new Answer('Хлодвиг', 1),
		new Answer("Карл1 ", 0),
		new Answer("Меровий", 0),
		new Answer("Пипин короткий ", 0)
	]),
	new Question("В каком городе в течение большей части XIV века находилась резиденция Римских Пап?", 
	[
		new Answer('Авиньон', 1),
		new Answer("Рим ", 0),
		new Answer("Париж", 0),
		new Answer("Мадрид ", 0)
	]),
	new Question("Какие две ветви христианства образовались в результате Великой Схизмы 1054 года?", 
	[
		new Answer('Православное и Католическое', 1),
		new Answer("Западное и Католическое ", 0),
		new Answer("Протестантизм и Католическое", 0),
		new Answer("Восточное и Православное ", 0)
	]),
	new Question("Что такое «индульгенция»?", 
	[
		new Answer('Отпущение грехов', 1),
		new Answer("Взятка ", 0),
		new Answer("Документ", 0),
		new Answer("Это индульгенция ", 0)
	]),
	new Question("Главой всей церкви являлся", 
	[
		new Answer('Папа Римский', 1),
		new Answer("Аббат ", 0),
		new Answer("Священник", 0),
		new Answer("Экзорцист ", 0)
	]),
	new Question("Церковный суд требунал в католической церкви", 
	[
		new Answer('Инквизиция', 1),
		new Answer("Аутодафе ", 0),
		new Answer("Еретик", 0),
		new Answer("Булла ", 0)
	]),


];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



