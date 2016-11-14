$(document).ready(function(){

	function getData(){
		$.ajax({
			method: "GET",
  			url: "http://172.26.116.159/ycpc/js/testdata.json",
  			dataType: "json",
  			success:function(response){
  				var $head = $('<tr>');

  				$head.append($('<th>').text('Name').css({color:"#fff",background:"#4a4a4a"}));
  				$head.append($('<th>').text('Solved').css({color:"#fff",background:"#4a4a4a"}));
  				$head.append($('<th>').text('Time').css({color:"#fff",background:"#4a4a4a"}));

  				for(var i = 0;i < response.contestStandings.standingsHeader[0].$.problemCount;i++){
  						$head
  							.append(
  								$('<th>')
  								.html('<i class="fa fa-star fa-2x"></i>')
  								.css({"text-align":"center",background:"#4a4a4a",color:response.contestStandings.standingsHeader[0].colorList[0].colors[0].problem[i].$.color})
  							);
  				}

  					$('#header').append($head);

  				$.each(response.contestStandings.teamStanding,function(i,team){
  					var $tr = $('<tr>');

  					$tr.append($('<th>').text(team.$.teamName));
  					$tr.append($('<th>').text(team.$.solved));
  					$tr.append($('<th>').text(team.$.points));

  					$.each(team.problemSummaryInfo,function(j,problem){
  						$problem = problem.$;
  						$attempts = parseInt($problem.attempts);
  						$isPending = $problem.isPending == 'true';
  						$isSolved = $problem.isSolved == 'true';
  						$point = parseInt($problem.points);
  						$solutionTime = parseInt($problem.solutionTime);
  						$result = '';
  						$bestsolutiontime = response.contestStandings.standingsHeader[0].problem[j].$.bestSolutionTime;
  						
  						if($attempts > 0) {
	  						$result = $attempts + ' ';

	  						if($isPending){
	  							$color = "is-info";
	  						}else if($solutionTime < 0){
	  							$color = "is-danger";
	  						}else{
	  							
	  							if($bestsolutiontime == $solutionTime){
  									$color="is-warning";
  								} else {
  									$color = "is-success";
  								}

	  							if($isSolved) $result += "("+ $point +")";
	  							else{ $result += ($solutionTime < 0)?"(--)":"" }
	  						}
  						}

  						//console.log($isSolved);
  						$td = $('<td class="has-text-centered">');
  						if($result){
  							$td.append('<div class="tag '+$color+'">'+ $result+'</div>');
  						}
  						$tr
  							.append(
  								$td
  							);
  					});
  					
  					$('#data').append($tr);
  				});
  			}
		})
	}
	getData();
});