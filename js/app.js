jQuery(document).ready(function($) {
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: '2016-05-01',
		timezone: "Asia/Ho_Chi_Minh",
		defaultView: 'month',
		editable: true,
		selectable: true,
		dayClick: function(date, jsEvent, view)
		{
			alert('You have clicked' + date.format());
		},
		events: 'events.php',
		eventResize: function(event, delta, revertFunc) {

	        $.ajax({
				url: 'addEvent.php/?type=resize&start=' + event.start.format() + '&end=' + event.end.format() + '&id=' + event.id,
			})
			.done(function() {
				console.log("success");
				$('#calendar').fullCalendar('refetchEvents');
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	    },
	    eventDrop: function(event, delta, revertFunc) {

	        $.ajax({
				url: 'addEvent.php/?type=resize&start=' + event.start.format() + '&end=' + event.end.format() + '&id=' + event.id,
			})
			.done(function() {
				console.log("success");
				$('#calendar').fullCalendar('refetchEvents');
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	    }
	});


	$('#formAdd').submit(function(event) {
		event.preventDefault();
		var data = $(this).serialize();
		$.ajax({
			url: $(this).attr('action'),
			type: 'GET',
			dataType: 'json',
			data: data
		})
		.done(function() {
			console.log("success");
			$('#calendar').fullCalendar('refetchEvents');
			$('#myModal').modal('hide');
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
});