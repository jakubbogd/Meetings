class Shift
{
	constructor(adress,month,day,hour,filled=false)
	{
		this.adress=adress;
		this.month=month;
		this.day=day;
		this.hour=hour;
		this.filled=filled;
	}
}

function ShowShift(s)
{
	const month= (s.month=='t')? today.getMonth()+1 : today.getMonth()+2;
	$('#modal2-title').html(`${s.hour}-${s.day}-${month}`);
	Exit(2,'footer');
	Exit(2,'body');
	if (localStorage.getItem(`${s.day}-${s.month}-${s.hour}`)!=null){
		$('#modal2-body').append(`<div id="${s.day}-${s.month}-${s.hour}-dname"></div>`)
						 .append(`<div id="${s.day}-${s.month}-${s.hour}-dsurname"></div>`)
						 .append(`<div id="${s.day}-${s.month}-${s.hour}-demail"></div>`)
						 .append(`<div id="${s.day}-${s.month}-${s.hour}-dreason"></div>`);
		$(`#${s.day}-${s.month}-${s.hour}-dname`).html('Name: '+localStorage.getItem(`${s.day}-${s.month}-${s.hour}-name`));
		$(`#${s.day}-${s.month}-${s.hour}-dsurname`).html('Surname: '+localStorage.getItem(`${s.day}-${s.month}-${s.hour}-surname`));
		$(`#${s.day}-${s.month}-${s.hour}-demail`).html('Email: '+localStorage.getItem(`${s.day}-${s.month}-${s.hour}-email`));
		$(`#${s.day}-${s.month}-${s.hour}-dreason`).html('Reason: '+localStorage.getItem(`${s.day}-${s.month}-${s.hour}-reason`));
		$(`#modal2-exit`).html('OK');
		$(`#modal2-footer`).append(`<button type="button" id="modal2-delete" class="btn btn-secondary" data-dismiss="modal">Delete</button>`)
						   .append(`<button type="button" id="modal2-exit" class="btn btn-custom" data-dismiss="modal">OK</button>`);
		$(`#modal2-delete`).on('click', ()=>DeleteShift(s));	
	}
	else{
		$('#modal2-body').append(`<form>
									<div class="form-group">
										<label for="Name">Name</label>
										<textarea class="form-control" id="${s.day}-${s.month}-${s.hour}-name" rows="1"></textarea>
									</div>
									<div class="form-group">
										<label for="Surname">Surname</label>
										<textarea class="form-control" id="${s.day}-${s.month}-${s.hour}-surname" rows="1"></textarea>
									</div>
									<div class="form-group">
										<label for="Email">Email</label>
										<input type="email" class="form-control" id="${s.day}-${s.month}-${s.hour}-email">
									</div>
									<div class="form-group">
										<label for="Reason">Reason</label>
										<textarea class="form-control" id="${s.day}-${s.month}-${s.hour}-reason" rows="3"></textarea>
									</div>
		
								</form>`)
		$(`#modal2-footer`).append(`<button type="button" id="modal2-exit" class="btn btn-custom" data-dismiss="modal">OK</button>`);
		$('#modal2-exit').on('click',()=>SaveShift(s))
	}
}
	
function SaveShift(s)
{
	const input=$(`#${s.day}-${s.month}-${s.hour}-name`).val()+$(`#${s.day}-${s.month}-${s.hour}-surname`).val()+$(`#${s.day}-${s.month}-${s.hour}-email`).val()+$(`#${s.day}-${s.month}-${s.hour}-reason`).val();
	if (input){
		localStorage.setItem(`${s.day}-${s.month}-${s.hour}-name`, $(`#${s.day}-${s.month}-${s.hour}-name`).val());
		localStorage.setItem(`${s.day}-${s.month}-${s.hour}-surname`, $(`#${s.day}-${s.month}-${s.hour}-surname`).val());
		localStorage.setItem(`${s.day}-${s.month}-${s.hour}-email`, $(`#${s.day}-${s.month}-${s.hour}-email`).val());
		localStorage.setItem(`${s.day}-${s.month}-${s.hour}-reason`, $(`#${s.day}-${s.month}-${s.hour}-reason`).val());
		localStorage.setItem(`${s.day}-${s.month}-${s.hour}`, input);
		s.filled=true;
	}
	$(`#modal2-exit`).off('click');
}

function DeleteShift(s)
{
	localStorage.removeItem(`${s.day}-${s.month}-${s.hour}`);
	localStorage.removeItem(`${s.day}-${s.month}-${s.hour}-name`);
	localStorage.removeItem(`${s.day}-${s.month}-${s.hour}-surname`);
	localStorage.removeItem(`${s.day}-${s.month}-${s.hour}-email`);
	localStorage.removeItem(`${s.day}-${s.month}-${s.hour}-reason`);
	$(`#modal2-delete`).off('click');
	Exit(2,'body');
	s.filled=false;
}

$('#history').on('click',function(){if (confirm("Czy chcesz wyczyścić zapisane dane?")) localStorage.clear(); location.reload;});