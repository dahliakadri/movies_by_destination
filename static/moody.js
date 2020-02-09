const countryJS = document.querySelector('country_name_data')
console.log(countryJS)


$("button").click(function(){
	console.log("testing 123")
  $.ajax({url: "/test1", success: function(result){
  	console.log(result)
    $("#div1").html(result);
  }});
});