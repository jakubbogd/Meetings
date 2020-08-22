const today = new Date();
const tmonth=new Date(today.getFullYear(),today.getMonth(),1);
const nmonth=new Date(today.getFullYear(),today.getMonth()+1,1);
const tfirst=tmonth.getUTCDay();
const nfirst=nmonth.getUTCDay();
const tlast=new Date(today.getFullYear(),today.getMonth()+1, 0).getDate()+1;
const nlast=new Date(today.getFullYear(),today.getMonth()+2, 0).getDate()+1;

for (let i=0;i<tfirst && tfirst<5;i++) $('#tdays').append('<div class="empty col"></div>');
for (let i=0;i<nfirst && nfirst<5;i++) $('#ndays').append('<div class="empty col"></div>');

for (let i=1;i<=5-tfirst;i++) $('#tdays').append(`<button id="tmod${i}" type="button" class="ready col btn btn-custom2" data-toggle="modal" data-target="#modal1">${i}</button>`);
$('#tdays').append('<div class="w-100"></div>');
for (let i=1;i<=5-nfirst;i++) $('#ndays').append(`<button id="nmod${i}" type="button" class="ready col btn btn-custom2" data-toggle="modal" data-target="#modal1">${i}</button>`);
$('#ndays').append('<div class="w-100"></div>');


for (let i=6-tfirst;i<tlast;i++) {
	if ((tfirst+i-1)%7!=5 && (tfirst+i-1)%7!=6) $('#tdays').append(`<button id="tmod${i}" type="button" class="ready col btn btn-custom2" data-toggle="modal" data-target="#modal1">${i}</button>`);
	else $('#tdays').append('<div class="w-100"></div>')
}

for (let i=6-nfirst;i<nlast;i++) {
	if ((nfirst+i-1)%7!=5 && (nfirst+i-1)%7!=6) $('#ndays').append(`<button id="nmod${i}" type="button" class="ready col btn btn-custom2" data-toggle="modal" data-target="#modal1">${i}</button>`);
	else $('#ndays').append('<div class="w-100"></div>')
}

for (let i=1;(tfirst+tlast-1)%7+i<6;i++) $('#tdays').append('<div class="empty col"></div>');
for (let i=1;(nfirst+nlast-1)%7+i<6;i++) $('#ndays').append('<div class="empty col"></div>');
$('#thead').html(today.getFullYear()+'-'+(today.getMonth()+1));
$('#nhead').html(today.getFullYear()+'-'+(today.getMonth()+2));


function FillPlan(type,day){
	for (let i=0;i<12;i++){
	$(`#${type}${day}plan`).append(`<li id="${type}${day}shift${i+8}" class="shift"><button  type="button" class="btn btn-custom2" data-toggle="modal" data-target="#modal2">${i+8}:00-${i+8}:55</button></li>`);
		let el=$(`#${type}${day}shift${i+8}`)
		let s=new Shift(el,type,day,(i+8));
		el.on('click',()=>ShowShift(s));
	}
}

const Exit=((nr,what)=>($(`#modal${nr}-${what}`).empty()));

const arr=Array.from($('.ready'));
arr.forEach((wind,index)=> {wind.addEventListener('click',(e)=>{
	const type=$(wind).parent().attr('id').substr(0,1);
	const month= (type=='t')? today.getMonth()+1 : today.getMonth()+2;
	const day=Number(wind.innerHTML);
	$('#modal1-title').html(`${day}-${month}`);
	$('#modal1-body').append(`<ul id=${type}${day}plan></ul>`)
	FillPlan(type,day);
	$('#modal1-exit').click(function(){Exit(1,'body')})
	$('#modal1-close').click(function(){Exit(1,'body')})
})});

function CheckStatus()
{
	Array.from($('.shift')).forEach((el)=>{
		for (let i=8;i<20;i++)
		{
			let beg=el.id.indexOf('shift');
			if (localStorage.getItem(`${el.id.substring(1,beg)}-${el.id.substr(0,1)}-${el.id.substr(beg+5)}`)!=null){
				$('#'+el.id).hover(function() {
					$(this).css('background-color','#ff4d4d');
					}, function() {
					$(this).css('background-color','white');})
			}
			else {
				$('#'+el.id).hover(function() {
					$(this).css('background-color','#00ff80');
					}, function() {
					$(this).css('background-color','white');})
			}
		}
	})	
}

setInterval(function(){ CheckDayStatus();CheckStatus();},500);
function CheckDayStatus(){
	arr.forEach((el)=>{
		let j=0;
		for (let i=8;i<20;i++){
			if (localStorage.getItem(`${el.id.substr(4)}-${el.id.substr(0,1)}-${i}`)!=null) j+=1;
		}
		if (j==0){
			$('#'+el.id).hover(function() {
				$(this).css('background-color','#00ff80');
				}, function() {
				$(this).css('background-color','#eee');})
		}
		else if (j<12 && j>0){
			$('#'+el.id).hover(function() {
				$(this).css('background-color','#ffff66');
				}, function() {
				$(this).css('background-color','#eee');})
		}
		else {
			$('#'+el.id).hover(function() {
				$(this).css('background-color','#ff4d4d');
				}, function() {
				$(this).css('background-color','#eee');})
		}
})}