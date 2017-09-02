$(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCVz1bE_46uK072EKpwmORH9m-v6inPx48",
    authDomain: "scheduler-3429b.firebaseapp.com",
    databaseURL: "https://scheduler-3429b.firebaseio.com",
    projectId: "scheduler-3429b",
    storageBucket: "scheduler-3429b.appspot.com",
    messagingSenderId: "475396037745"
  };
  firebase.initializeApp(config);

	var database = firebase.database().ref();

	var name = "";
	var role = "";
	var startDate = 0;
	var rate = 0;

	$('#addtrain').click(function(event){
		event.preventDefault();

		name = $('#name').val();
		role = $('#role').val();
		startDate = $('#startDate').val();
		rate = $('#rate').val();

	database.push({
		name: name,
		role: role,
		startDate: startDate,
		rate: rate,
		dataAdded: firebase.database.ServerValue.TIMESTAMP
	})

	$('#name').val("")	
	$('#role').val("")	
	$('#startDate').val("")	
	$('#rate').val("")	

	})

	database.on('child_added', function(snapshot){

	
	var startDate = moment(snapshot.val().startDate).format('X');
    var difference = moment().diff(moment.unix(startDate), 'months');

	var newData = $('<tr>');
        newData.append("<td>"+snapshot.val().name);
        newData.append("<td>"+snapshot.val().role);
        newData.append("<td>"+snapshot.val().startDate);
        newData.append("<td>" + difference);
        newData.append("<td>"+snapshot.val().rate);
        newData.append("<button class='btn btn-danger' data-timestamp=" + snapshot.val().dataAdded + ">X");

        $('tbody').append(newData);

    })

	$('tbody').on("click", "button", function() {  
		var ts = $(this).attr('data-timestamp');
		console.log(ts);
		// .remove()
	});
})