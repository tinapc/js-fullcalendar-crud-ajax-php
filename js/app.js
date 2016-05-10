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
		eventClick: function(calEvent, jsEvent, view)
		{
			if (confirm('Are you sure want to delete this event?')) {
				$.ajax({
					url: 'addEvent.php/?type=delete&id=' + calEvent.id,
				})
				.done(function() {
					console.log("success");
					$('#calendar').fullCalendar('refetchEvents');
				});	
			}
			
		},
		events: 'events.php',
		eventRender: function(event, element) {
			//element.append('<span data-id="'+ event.id+'" class="deleteEvent" onclick="alert("asds");">x</span>');
		},
		eventResize: function(event, delta, revertFunc) {

	        $.ajax({
				url: 'addEvent.php/?type=resize&start=' + event.start.format() + '&end=' + event.end.format() + '&id=' + event.id,
			})
			.done(function() {
				console.log("success");
				$('#calendar').fullCalendar('refetchEvents');
			});

	    },
	    eventDrop: function(event, delta, revertFunc) {

	        $.ajax({
				url: 'addEvent.php/?type=resize&start=' + event.start.format() + '&end=' + event.end.format() + '&id=' + event.id,
			})
			.done(function() {
				console.log("success");
				$('#calendar').fullCalendar('refetchEvents');
			});

	    }
	});

	// Delete Event
	$('.deleteEvent').click(function(event) {
		var eventId = $(this).attr('data-id');
		alert(eventId);
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
		});
		
	});
});