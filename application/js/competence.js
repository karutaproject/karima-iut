//==================================
//--- Evaluation
//==================================
var evaltypes = new Array();
evaltypes['autoeval']={'semtag':'eval-etudiant','evalrole':'etudiant'};
evaltypes['progresstage']={'semtag':'like-etudiant','evalrole':'etudiant'};
evaltypes['org']={'semtag':'eval-tuteur','evalrole':'tuteur'};
evaltypes['iut']={'semtag':'eval-iut2','evalrole':'iut2'};
evaltypes['entreprise']={'semtag':'eval-tuteur','evalrole':'tuteur'};
evaltypes['entreprise2']={'semtag':'eval-1_0','evalrole':'tuteur'};

var evaltype_exp = new Array();
evaltype_exp['DiplomaIUT2']= new Array();
evaltype_exp['DiplomaIUT2'][0]=['iut','autoeval'];
evaltype_exp['DiplomaIUT2'][1]=['autoeval'];

evaltype_exp['Diploma']= new Array();
evaltype_exp['Diploma'][0]=['autoeval'];
evaltype_exp['Diploma'][1]=['autoeval'];

evaltype_exp['Experience']= new Array();
evaltype_exp['Experience'][0]=['autoeval'];
evaltype_exp['Experience'][1]=['autoeval'];

evaltype_exp['Formation']= new Array();
evaltype_exp['Formation'][0]=['autoeval'];
evaltype_exp['Formation'][1]=['autoeval'];

evaltype_exp['Stage']= new Array();
evaltype_exp['Stage'][0]=['autoeval','entreprise'];
evaltype_exp['Stage'][1]=['autoeval','progresstage','entreprise'];

evaltype_exp['Projet']= new Array();
evaltype_exp['Projet'][0]=['autoeval'];
evaltype_exp['Projet'][1]=['autoeval'];

evaltype_exp['Alternance']= new Array();
evaltype_exp['Alternance'][0]=['autoeval'];
evaltype_exp['Alternance'][1]=['autoeval'];

evaltype_exp['ExperiencePerso']= new Array();
evaltype_exp['ExperiencePerso'][0]=['autoeval'];
evaltype_exp['ExperiencePerso'][1]=['autoeval'];

var ref = {}; // references aux units contenant les compétences

//==================================
var eval_competences = [];
var view_eval_competences = [];
//==================================
var g_langues = new Array();
g_langues [0] = ['',''];

//==================================
var objtype_to_add_competencies ="";
var objtype_destination_display ="";
var objtype_competencies_node = null;
var objtype_competencies_node2a = null;
var objtype_competencies_node2b = null;
var objtype_competencies_node2c = null;
//==================================

//==================================
function getNbEvalType(type,index_evaltype)
//==================================
{
	var nb_evaltype =0;
	if (evaltype_exp[type]!=undefined && evaltype_exp[type]!=null && index_evaltype>-1 && (evaltype_exp[type][index_evaltype]!=undefined && evaltype_exp[type][index_evaltype]!=null))
		nb_evaltype = evaltype_exp[type][index_evaltype].length;
	return nb_evaltype;
}

//==================================
function getIndex_evaltype(index_evaltype)
//==================================
{
	var index =-1;
	if (index_evaltype!=undefined && index_evaltype!=null)
		index = index_evaltype;
	return index;
}

//==================================
function getEvalTableau_begin(pos,objid,destid,type,index_evaltype)
//==================================
{
	var index_evaltype =getIndex_evaltype(index_evaltype);
	var nb_evaltype =getNbEvalType(type,index_evaltype);
	var html ="";
	var tableid= "evaluations_table_"+pos+"_"+objid+"_"+destid+"_"+index_evaltype+"_"+type;
	html += "<div class='div_evaluations_table'><table class='evaluations_table_head'>";
	html += "<thead><tr id='header_"+tableid+"' class='hidden'><th>";
	for ( var k = 0; k < nb_evaltype; k++) {
		var evaltype = evaltype_exp[type][index_evaltype][k];
		html += "</th><th class='evaluation_item evaluation_item_"+evaltype+"'>";
		html += appStr[LANG][evaltype];
		html += "<div><i class='fa fa-chevron-down '></i></div>";
	}
	html += "</th></tr></thead><tbody></tbody></table>";
	html += "<div class='div_scroll'><table class='evaluations_table' id='"+tableid+"'><tbody>";
	return html;
}

//==================================
function getEvalTableau_end()
//==================================
{
	return "</tbody></table></div></div>";
}

//==================================
function showHeaderEvaluationTable()
//==================================
{
	var comp_tables = $("table:has(td[class*='evaluation_item_'])");
	for (var i=0; i<comp_tables.length; i++){
	    var tableid=$(comp_tables[i]).attr('id');
		$("#header_"+tableid).attr('class', 'visible');
	}
}

//==================================
function getEvaluationCodes_bytype(evaltype)
//==================================
{
	var html = "";
	if (evaltype=='autoeval') {
		html += "<span class='eval-type'>Autoévaluation</span>";
		html += "<span class='eval-exp A0'>Aïe</span>";
		html += "<span class='eval-exp A1'>Pas bon!</span>";
		html += "<span class='eval-exp A2'>Ok</span>";
		html += "<span class='eval-exp A3'>Bon</span>";
		html += "<span class='eval-exp A4'>Au top!</span>";
//		html += "<span class='eval-exp eval-exp-0'>Pas évaluée</span>";
	}
	if (evaltype=='org') {
		html += "<span class='eval-type'>Evaluation par l'organisme</span>";
	}
	if (evaltype=='entreprise') {
		html += "<span class='eval-type'>Evaluation par l'entreprise</span>";
	}
	if (evaltype=='iut') {
		html += "<span class='eval-type'>Evaluation par l'IUT</span>";
	}
	if (evaltype=='entreprise' || evaltype=='iut') {
		html += "<span class='eval-exp'><span class='eval-exp eval-exp-Y2i'><i class='fa fa-square'></i>&nbsp;</span>acquise</span>";
		html += "<span class='eval-exp'><span class='eval-exp eval-exp-Y1i'><i class='fa fa-square'></i>&nbsp;</span>non acquise</span>";
		html += "<span class='eval-exp'><span class='eval-exp eval-exp-Y0i'><i class='fa fa-square'></i>&nbsp;</span>non évaluée</span>";
//		html += "<span class='eval-exp'><span class='eval-exp eval-exp-0i'><i class='fa fa-square'></i>&nbsp;</span>non évaluée</span>";
	}
	if ( evaltype=='org') {
		html += "<span class='eval-exp'><span class='eval-exp eval-exp-Y1i'><i class='fa fa-square'></i>&nbsp;</span>acquise</span>";
		html += "<span class='eval-exp'><span class='eval-exp eval-exp-Y0i'><i class='fa fa-square'></i>&nbsp;</span>non acquise</span>";
//		html += "<span class='eval-exp'><span class='eval-exp eval-exp-0i'><i class='fa fa-square'></i>&nbsp;</span>non évaluée</span>";
	}
	return html;
}

//==================================
function getEvaluationCodes_bytypes(evaltypes)
//==================================
{
	var nb_evaltypes=evaltypes.length;
	var width=12;
	if (nb_evaltypes>0) width=Math.floor(width/nb_evaltypes);
	var html = "";
	html += "<div class='row evalcaption'>";
	for (var i=0; i<nb_evaltypes; i++){
		html += "<span class='span"+width+"'>";
		html += getEvaluationCodes_bytype(evaltypes[i]);
		html += "</span>";
	}
	html += "</div>";
	return html;
}

//==================================
function showEvaluationCodes_bytypes(destid,evaltypes)
//==================================
{
	var html = getEvaluationCodes_bytypes(evaltypes);
	$("#"+destid).append($(html));
}

//==================================
function getEvaluations_displayView(view_evals)
//==================================
{
	for (var i=0; i<view_evals.length;i++){
		UICom.structure["ui"][view_evals[i]].resource.displayView("view_eval_"+view_evals[i],null,null,true);
	}
}

//==================================
function getEvaluations_displayEditor(evals)
//==================================
{
	for (var i=0; i<evals.length;i++){
		UICom.structure["ui"][evals[i]].resource.displayEditor("eval_"+evals[i],null,null,null,true);
	}
	setTimeout(function(){  //-- on attend le retour de ajax
		for (var i=0; i<evals.length;i++){
			$("#eval_"+evals[i]+">select").blur(function (ev){
				displayCompetencesMetiers(g_portfolio_current);
				displayCompetencesTrans(g_portfolio_current);
				displayCompetencesAutres(g_portfolio_current);
			});
		}		
	},3000);
}

//==================================
function getEvaluations_display(view_evals,evals)
//==================================
{
	getEvaluations_displayView(view_evals);
	getEvaluations_displayEditor(evals);
}


//==================================
function getCompetencies1(node,edit,type,objid,destid,level1,level2)
//==================================
{
	if (edit==null || edit==undefined)
		edit = false;
	var html ="";
	//---------------------------------------------
	var activites_nodes = $("asmContext:has(metadata[semantictag='"+level1+"'])",node);
	for ( var i = 0; i < activites_nodes.length; i++) {
		var activiteid = $(activites_nodes[i]).attr('id');
		var parentactiviteid = $(activites_nodes[i]).parent().attr('id');
		html += "<div class='activite'>";
		if (edit) {
			html += "   <a onclick=\"confirmDel('"+parentactiviteid+"','"+type+"','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
			html += "     <i class='fa fa-trash-o'></i>";
			html += "   </a>";
		}
		html += "  <span style='margin-left:10px'>"+UICom.structure["ui"][activiteid].resource.getView()+"</span>";
		html += "</div>";
		var competencies = $("asmContext:has(metadata[semantictag*='"+level2+"'])",$(activites_nodes[i]).parent());
		for ( var j = 0; j < competencies.length; j++) {
			var competencyid = $(competencies[j]).attr('id');
			var parentcompetencyid = $(competencies[j]).parent().attr('id');
			html += "<div class=' competence'>";
			if (edit) {
				html += "    <a onclick=\"confirmDel('"+parentcompetencyid+"','"+type+"','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
				html += "      <i class='fa fa-trash-o'></i>";
				html += "    </a>";
			}
			html += "  <span style='margin-left:10px'>"+UICom.structure["ui"][competencyid].resource.getView()+"</span>";
			html += "</div>";
		}
	}
	//---------------------------------------------
	return html;
}

//==================================
function getCompetencies2(comps2_metiers_node,edit,type,objid,destid,level1,level2,index_evaltype)
//==================================
{
	if (edit==null || edit==undefined)
		edit = false;
	var html ="";
	var index_evaltype =getIndex_evaltype(index_evaltype);
	var nb_evaltype = getNbEvalType(type,index_evaltype);
	//---------------------------------------------
	var activites_nodes = $("asmContext:has(metadata[semantictag='"+level1+"'])",comps2_metiers_node);
//	html += "<table class='evaluations_table'>";
	var nbcols=1+nb_evaltype;
	for ( var i = 0; i < activites_nodes.length; i++) {
		var activiteid = $(activites_nodes[i]).attr('id');
		var activiteid_parent = $($(activites_nodes[i]).parent()).attr('id');
		html += "<tr><td colspan='"+nbcols+"'>";
		html += "  <h6 style='margin-bottom:0px'><i class='fa fa-angle-right'></i>&nbsp;"+UICom.structure["ui"][activiteid].resource.getView();
		if (edit) {
			html += "   <span onclick=\"confirmDel('"+activiteid_parent+"','"+type+"','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
			html += "     <i class='fa fa-trash-o'></i>";
			html += "   </span>";
		}
		html += "</h6>";
		html += "</td></tr>";
		var competencies = $("asmContext:has(metadata[semantictag*='"+level2+"'])",$(activites_nodes[i]).parent());
		for ( var j = 0; j < competencies.length; j++) {
			var competencyid = $(competencies[j]).attr('id');
			var parentcompetencyid = $(competencies[j]).parent().attr('id');
			html += "  <tr><td class='item2evaluation'><i class='fa fa-circle icon_item'></i> "+UICom.structure["ui"][competencyid].resource.getView();
			if (edit) {
				html += "    <span onclick=\"confirmDel('"+parentcompetencyid+"','"+type+"','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
				html += "      <i class='fa fa-trash-o'></i>";
				html += "    </span>";
			}
			for ( var k = 0; k < nb_evaltype; k++) {
				var evaltype = evaltype_exp[type][index_evaltype][k];
				var semtag = evaltypes[evaltype].semtag;
				var evalrole = evaltypes[evaltype].evalrole;
				var evaluation_node = $("asmContext:has(metadata[semantictag*='"+semtag+"'])",$(competencies[j]).parent());
				var evaluation_nodeid = null;				
				if (evaluation_node.length>0){
					evaluation_nodeid = $(evaluation_node[0]).attr('id');
					var writenode = ($(evaluation_node[0]).attr('write')=='Y')? true:false;
					if (writenode && edit && (evalrole.indexOf(g_userrole)>-1)) {
						eval_competences[eval_competences.length] = evaluation_nodeid;
						html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"' id='eval_"+evaluation_nodeid+"'>";
					} else{
						view_eval_competences[view_eval_competences.length] = evaluation_nodeid;
						html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"' id='view_eval_"+evaluation_nodeid+"'>";
//						html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"'>";
//						html += UICom.structure["ui"][evaluation_nodeid].resource.getView();					
					}				
				} else {
					html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"'>";				
				}
			}
			html += "</td></tr>";
		}

		if (competencies.length>0){
			$("#comptable_"+objid+"_"+destid+"_"+index_evaltype).show();
		}

	}
//	html += "</table>";
	//---------------------------------------------
	return html;
}


//==================================
function displayCompetencies(data,destid,level1,level2)
//==================================
{
	var html = "";
	var activities = $("asmContext:has(metadata[semantictag='"+level1+"'])",data);
	html += "<table>";
	for ( var i = 0; i < activities.length; i++) {
		var activitycode = $($("code",activities[i])[0]).text();
		var label = $("label[lang='"+LANG+"']",$("asmResource[xsi_type='nodeRes']",activities[i])[0]).text();
		html += "<tr><td><input type='checkbox' value='"+activitycode+"'></td><td>"+label+"</td></tr>";
		var competencies = $("asmUnitStructure:has(metadata[semantictag='"+level2+"'])",activities[i]);
		html += "<tr><td></td><td><table>";
		for ( var j = 0; j < competencies.length; j++) {
			var code = $($("code",competencies[j])[0]).text();
			var label = $("label[lang='"+LANG+"']",$("asmResource[xsi_type='nodeRes']",competencies[j])[0]).text();
			html += "<tr><td><input type='checkbox' value='"+code+"'></td><td>"+label+"</td></tr>";
		}
		html += "</table></td></tr>";
	}
	html += "</table>";
	$("#"+destid).html(html);
}

//==================================
function refreshActivityBox(activiteid)
//==================================
{
	var diplomaid = $(UICom.structure["ui"][activiteid].node).parent().parent().parent().parent().attr("id");
	UIFactory['Diploma'].reloadparse(diplomaid,"diplomes-detail_"+diplomaid,null,getEditActivityBox,activiteid);
}
//==================================
function getEditPPNActivityBox(diplomaid,ppn_nodeid,objType,displayid,objTypecomps,color,level1,level2)
//==================================
{
	//---------------------------------
	objtype_to_add_competencies = objType;
	objtype_destination_display = displayid;
	objtype_competencies_node = objTypecomps;
	//---------------------------------
	var html = "";
	html += "<div>Sélectionnez le référentiel puis cliquer sur rechercher</div>";
	html += "<span id='ppn_"+ppn_nodeid+"'></span>&nbsp;&nbsp;";
	var js = "getAndDisplayPpnSelector('ppn_"+ppn_nodeid+"','select','"+level1+"','"+level2+"')";
	html += "<span class='btn btn--mini btn-bleu' onclick=\""+js+";\">Rechercher</span>";	
	html += "<div id='competency-selector'></div>";
	$("#activite-window-body").html($(html));
	UICom.structure["ui"][ppn_nodeid].resource.displayEditor("ppn_"+ppn_nodeid);
	// ------------------------------------
	// ------------------------------------
//	var js1 = "javascript:	$('#added-window').modal('show');addCompetencies('"+diplomaid+"','"+level1+"','"+level2+"');";
	var js2 = "javascript:$('#activite-window').modal('hide')";
	var header = "";
	header += "<span id='addcompbutton' class='btn btn-mini btn-"+color+"'>Ajouter les compétences sélectionnées</span>";
	header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	$("#activite-window-header").html($(header));

	$('#addcompbutton').on('click', function(e){
		e.preventDefault();
//		$('#added-window').modal('show');
		addCompetencies(diplomaid,level1,level2);
	});
	
	$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#activite-window").addClass('alert-'+color);
	$("#activite-window").modal('show');
};



//==================================
function getAndDisplayPpnSelector(srceid,type,level1,level2)
//==================================
{
	if (type=='select') {
		var select = $('#'+srceid).find("select");
		var option = $(select).find("option:selected");
		var value = $(option).attr('value');
		getCompetencySelector("competency-selector",value,level1,level2);
	}
}


//==================================
function getCompetencySelector(destid,ppn_code,level1,level2)
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/code/" + ppn_code + "?resources=true",
		success : function(data) {
			displayCompetencySelector(data,destid,ppn_code,level1,level2);
		}
	});
}

//==================================
function toggleChildren(obj)
//==================================
{
	var children = $("input[name='"+obj.id+"']");
	for ( var i = 0; i < children.length; i++) {
		children[i].checked = obj.checked;
	}
}

//==================================
function updateActivityCode()
//==================================
{				
	var activitycode = $("#langue").attr('code');
	var activitylabel = $("#langue").attr('label');
	var option = $("#langue").find("option:selected");
	var value = $(option).attr('value');
	var code = $(option).attr('code');
	var label = activitylabel+" - "+value;
	$("#"+activitycode).attr('label',label);
	$("#"+activitycode).attr('value',activitycode+code);
	var children = $("input[name='"+activitycode+"']");
	for ( var i = 0; i < children.length; i++) {
		$(children[i]).attr('actcode',activitycode+code);
		var orig = $(children[i]).attr('orig');
		children[i].value = orig+code;
	}
}

//==================================
function displayCompetencySelector(data,destid,ppn_code,level1,level2)
//==================================
{
	var html = "";
	var activities = $("asmUnit:has(metadata[semantictag='"+level1+"'])",data);
	html += "<table>";
	var gcf = false;
	var grh = false;
	var gmo = false;
	for ( var i = 0; i < activities.length; i++) {
		var activitycode = $($("code",activities[i])[0]).text();
		var label = $("label[lang='"+LANG+"']",$("asmResource[xsi_type='nodeRes']",activities[i])[0]).text();
		if (activitycode=='separator')
			html += "<tr><td colspan='2'><b>"+label+"</b></td></tr>";
		else {
			var html_act = "<tr><td><input type='checkbox' onchange='javascript:toggleChildren(this);'";
			html_act += "id='"+activitycode+"'";
			html_act += "code='"+$(activities[i]).attr('id')+"'";
			html_act += "portfoliocode='"+ppn_code+"'";
			html_act += "value='"+activitycode+"'";
			html_act += "label=\""+label+"\"";
			html_act += "></td><td class='activite'>"+label;
			//---------------------------
			if (label.indexOf("Langues étrangères")>-1){
				html_act += "<select id='langue' label=\""+label+"\" code='"+activitycode+"' onChange='updateActivityCode()'>";
				for (var lg=0;lg<g_langues.length;lg++)
					html_act += "<option code='"+g_langues[lg][0]+"' value='"+g_langues[lg][1]+"'>"+g_langues[lg][1];
				html_act += "</select>";
			}
			//---------------------------
			html_act += "</td></tr>";
			var competencies = $("asmUnitStructure:has(metadata[semantictag='"+level2+"'])",activities[i]);
			if (competencies.length>0) {
				html += html_act;
				html += "<tr><td></td><td><table>";
				for ( var j = 0; j < competencies.length; j++) {
					var code = $($("code",competencies[j])[0]).text();
					var label = $("label[lang='"+LANG+"']",$("asmResource[xsi_type='nodeRes']",competencies[j])[0]).text();
					if (code=='separator')
						html += "<tr><td colspan='2'>"+label+"</td></tr>";
					else
						html += "<tr><td><input name='"+activitycode+"' comptype='act-child' type='checkbox' actcode='"+activitycode+"' orig='"+code+"' value='"+code+"' label=\""+label+"\"></td><td class='competence'>"+label+"</td></tr>";
				}
				html += "</table></td></tr>";
			}
		}
	}
	html += "</table>";
	$("#"+destid).html(html);
}



//==================================
function addCompetencies(diplomaid,level1,level2)
//==================================
{
	$("#added-window-body").html("");
	$("#added-window").modal('show');
	var activities_id_bycode = {};
	var activities_toadd = [];
	var competencies_toadd = [];
	// -------------------------------------------------
	var competencies = $("input[comptype='act-child']:checked");
	var activites_nodes = $("asmContext:has(metadata[semantictag='"+level1+"'])",eval(objtype_competencies_node));
	var competency_nodes = $("asmContext:has(metadata[semantictag='"+level2+"'])",eval(objtype_competencies_node));
	for ( var i = 0; i < competencies.length; i++) {
		var exist = false;
		var activitecode = "";
		var activiteid = "";
		for  ( var j = 0; j < activites_nodes.length; j++) {
			if ($($("value",activites_nodes[j])[0]).text()==$(competencies[i]).attr('actcode') || $($("value",activites_nodes[j])[0]).text()==$(competencies[i]).attr('name')){
				exist = true;
				activiteid = $($(activites_nodes[j]).parent()).attr('id');
			}
		}
		if (!exist){
			var input = $("#"+$(competencies[i]).attr('name'));
			var value = $(input).attr('value');
			var portfoliocode = $(input).attr('portfoliocode');
			var label = $(input).attr('label');
			activitecode = $(input).attr('code');
			var destid = $(eval(objtype_competencies_node)).attr('id');
			var srcecode = 'IUT2-parts';
			var srcetag = level1.substring(0,level1.length-2)+'-parent';
			if (activities_id_bycode[activitecode]==undefined)
				activities_toadd[activities_toadd.length] = {'destid':destid,'srcecode':srcecode,'srcetag':srcetag,'activitecode':activitecode,'activiteid':activiteid,'portfoliocode':portfoliocode,'label':label,'value':value}; // note: activiteid = ""
		}
		activities_id_bycode[activitecode] = activiteid;
		var add = true;
		for  ( var j = 0; j < competency_nodes.length; j++) {
			if ($($("value",competency_nodes[j])[0]).text()==$(competencies[i]).attr('value'))
				add = false;
		}
		if (add){
			var input = $(competencies[i]);
			var code = $(input).attr('code');
			var value = $(input).attr('value');
			var portfoliocode = $(input).attr('portfoliocode');
			var label = $(input).attr('label');
			var srcecode = 'IUT2-parts';
			var srcetag = level2.substring(0,level2.length-2)+'-child';
			competencies_toadd[competencies_toadd.length] = {'activitecode':activitecode,'code':code,'srcecode':srcecode,'srcetag':srcetag,'activiteid':activiteid,'portfoliocode':portfoliocode,'label':label,'value':value}; // note: activiteid = ""
		}
	}
	// -------------------------------------------------
	$.ajaxSetup({async: false});
	for (var i = 0; i<activities_toadd.length; i++) {
		var destid = activities_toadd[i].destid;
		var activitecode = activities_toadd[i].activitecode;
		var srcecode = activities_toadd[i].srcecode;
		var srcetag = activities_toadd[i].srcetag;
		var portfoliocode = activities_toadd[i].portfoliocode;
		var label = activities_toadd[i].label;
		var value = activities_toadd[i].value;
		var urlS = "../../../"+serverBCK+"/nodes/node/import/"+destid+"?srcetag="+srcetag+"&srcecode="+srcecode;
		$.ajax({
			type : "POST",
			dataType : "text",
			url : urlS,
			data : "",
			success : function(data) {
				activities_id_bycode[activitecode] = data;
				getActiviteNode(data,activitecode,portfoliocode,value,label);
			}
		});
	}
	for (var i = 0; i<competencies_toadd.length; i++) {
		var destid = competencies_toadd[i].activiteid;
		if (destid=="")
			destid =	activities_id_bycode[competencies_toadd[i].activitecode];
		var srcecode = competencies_toadd[i].srcecode;
		var srcetag = competencies_toadd[i].srcetag;
		var portfoliocode = competencies_toadd[i].portfoliocode;
		var label = competencies_toadd[i].label;
		var value = competencies_toadd[i].value;
		var code = competencies_toadd[i].code;
		var urlS = "../../../"+serverBCK+"/nodes/node/import/"+destid+"?srcetag="+srcetag+"&srcecode="+srcecode;
		$.ajax({
			type : "POST",
			dataType : "text",
			url : urlS,
			data : "",
			success : function(data) {
				getCompetencyNode(data,code,portfoliocode,value,label,level2);
			}
		});
	}
	$.ajaxSetup({async: true});
	var callback = hide_activite_window;
	UIFactory[objtype_to_add_competencies].reloadparseone (diplomaid,objtype_destination_display,callback);
}

//==================================
function addFreeCompetencies(diplomaid,level1,level2)
//==================================
{
	$("#added-window-body").html("");
	$("#added-window").modal('show');
	// -------------------------------------------------
	var domain = $("input[type='radio'][name='domain']:checked").val();
	if (domain==undefined)
		domain ="";
	//-----------------------
	var option = $("select",$("#competency"+domain+"-selector")).find("option:selected");
	var value = $(option).attr('value');
	var code = $(option).attr('code');
	var label = $(option).attr('label_fr');
	//-----------------------
	var domaine_nodes = $("asmContext:has(metadata[semantictag*='"+level1+"'])",eval(objtype_competencies_node));
	var exist = false;
	var activiteid = "";
	for  ( var j = 0; j < domaine_nodes.length; j++) {
		if ($($("value",domaine_nodes[j])[0]).text()==value){
			exist = true;
			activiteid = $($(domaine_nodes[j]).parent()).attr('id');
		}
	}
	//-----------------------
	if (!exist){
		if (domain!=undefined) {
			if (domain=='2a')
				objtype_competencies_node = objtype_competencies_node2a;
			if (domain=='2b')
				objtype_competencies_node = objtype_competencies_node2b;
			if (domain=='2c')
				objtype_competencies_node = objtype_competencies_node2c;
		}
		var destid = $(eval(objtype_competencies_node)).attr('id');
		var srcecode = 'IUT2-parts';
		var srcetag = level1.substring(0,level1.length-2)+'-parent';
		var databack = true;
		var callback = getDomaineNode;
		var param2 = code;
		var param3 = value;
		var param4 = label;
		var param5 = diplomaid;
		var param6 = level1;
		var param7 = level2;
		importBranch(destid,srcecode,srcetag,databack,callback,param2,param3,param4,param5,param6,param7);
	} else {
		var text = $("#free-comp").val();
		$("#free-comp").val("");
		var srcecode = 'IUT2-parts';
		var srcetag = level2.substring(0,level2.length-2)+'-child';
		var databack = true;
		var callback = getFreeNode;
		var param2 = text;
		var param3 = diplomaid;
		var param4 = level2;
		importBranch(activiteid,srcecode,srcetag,databack,callback,param2,param3,param4);
	}
}


//==============================
	function hide_activite_window()
//==============================
{
	$("#added-window").modal('hide');
	$('#activite-window').modal('hide');
}
	
//==============================
function addedBox()
//==============================
{
	var html = "";
	html += "\n<!-- ==================== Added box ==================== -->";
	html += "\n<div id='added-window' class='modal hide' style='width:200px;margin-left:0px;background-color:lightgrey;position:fixed;top:15%;left:48%;'>";
	html += "\n	<div class='modal-body'>Compétences en cours d'ajout <span id='added-window-body'></span></div>";
	html += "\n</div>";
	html += "\n<!-- ============================================== -->";
	return html;
}

//=======================================================================
function writeAdded()
//=======================================================================
{
	var span = $("<span> . </span>");
	$("#added-window-body").append(span);
}

//==================================
function getActiviteNode(data,code,portfoliocode,value,label)
//==================================
{
	var result = data;
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + result + "?resources=true",
		success : function(data) {
			updateActivite(data,code,portfoliocode,value,label);
		}
	});
}

//==================================
function updateActivite(data,code,portfoliocode,value,label)
//==================================
{
	var activiteid = $("asmContext:has(metadata[semantictag='activite'])",data).attr('id');
	var xml = "<asmResource xsi_type='Get_Get_Resource'>";
	xml += "<code>"+code+"</code>";
	xml += "<portfoliocode>"+portfoliocode+"</portfoliocode>";
	xml += "<value>"+value+"</value>";
	xml += "<label lang='fr'>"+label+"</label>";
	xml += "<label lang='en'></label>";	
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + activiteid,
		success : function() {
			writeAdded();
		}
	});

}

//==================================
function getCompetencyNode(data,code,portfoliocode,value,label,level2)
//==================================
{
	var result = data;
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + result + "?resources=true",
		success : function(data) {
			updateCompetency(data,code,portfoliocode,value,label,level2);
		}
	});
}

//==================================
function updateCompetency(data,code,portfoliocode,value,label,level2)
//==================================
{
	var competencyid = $("asmContext:has(metadata[semantictag='"+level2+"'])",data).attr('id');
	var xml = "<asmResource xsi_type='Get_Get_Resource'>";
	xml += "<code>"+code+"</code>";
	xml += "<portfoliocode>"+portfoliocode+"</portfoliocode>";
	xml += "<value>"+value+"</value>";
	xml += "<label lang='fr'>"+label+"</label>";
	xml += "<label lang='en'></label>";
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + competencyid,
		success : function() {
			writeAdded();
		}
	});
}

//======================================================================================
//======================================================================================
//======================================================================================

//==================================
function getEditFreeActivityBox(diplomaid,dom_nodeid,objType,displayid,objTypecomps,color,level1,level2)
//==================================
{
	objtype_to_add_competencies = objType;
	objtype_destination_display = displayid;
	objtype_competencies_node = objTypecomps;
	var html = "";
	html += "<div>Choisir un domaine métiers dans la liste ci-dessous :</div>";
	html += "<div id='competency-selector'></div>";
	html += "<div>Saisir une compétence</div>";
	html += "<input id='free-comp' type='text' style='width:350px'/>";
	$("#activite-window-body").html($(html));
	UICom.structure["ui"][dom_nodeid].resource.displayEditor('competency-selector');
	// ------------------------------------
	// ------------------------------------
	var js2 = "javascript:$('#activite-window').modal('hide')";
	var header = "";
	header += "<a  class='btn btn-mini btn-"+color+"' onclick=\"javascript:addFreeCompetencies('"+diplomaid+"','"+level1+"','"+level2+"')\" data-title='ajouter' rel='tooltip'>";
	header += "Ajouter la compétence";
	header += "</a>";
	header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	$("#activite-window-header").html($(header));

	$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#activite-window").addClass('alert-'+color);
	$("#activite-window").modal('show');
}

//==================================
function selectDomain(domain)
//==================================
{
	$("#competency2a-selector").hide();
	$("#competency2b-selector").hide();
	$("#competency2c-selector").hide();
	$("#competency"+domain+"-selector").show();
}
//==================================
function getEditAutreCompetenceBox(diplomaid,dom2a_nodeid,dom2b_nodeid,dom2c_nodeid,objType,displayid,objTypecomps2a,objTypecomps2b,objTypecomps2c,color,level1,level2)
//==================================
{
	objtype_to_add_competencies = objType;
	objtype_destination_display = displayid;
	objtype_competencies_node2a = objTypecomps2a;
	objtype_competencies_node2b = objTypecomps2b;
	objtype_competencies_node2c = objTypecomps2c;
	var html = "";
	html += "<div>Choisir un domaine dans la liste ci-dessous :</div>";
	html += "<div style='margin-bottom:5px'>";
	html += " <input type='radio' name='domain' value='2a' onclick=\"selectDomain('2a')\" checked /> transversal ";
	html += " <input type='radio' name='domain' value='2b' onclick=\"selectDomain('2b')\" /> innovation ";
	html += " <input type='radio' name='domain' value='2c' onclick=\"selectDomain('2c')\" /> autre";
	html += "</div>";
	html += "<div id='competency2a-selector' style='display:block'></div>";
	html += "<div id='competency2b-selector' style='display:none'></div>";
	html += "<div id='competency2c-selector' style='display:none'></div>";
	html += "<div>Saisir une compétence</div>";
	html += "<input id='free-comp' type='text' style='width:350px'/>";
	$("#activite-window-body").html($(html));
	UICom.structure["ui"][dom2a_nodeid].resource.displayEditor('competency2a-selector');
	UICom.structure["ui"][dom2b_nodeid].resource.displayEditor('competency2b-selector');
	UICom.structure["ui"][dom2c_nodeid].resource.displayEditor('competency2c-selector');
	// ------------------------------------
	// ------------------------------------
	var js2 = "javascript:$('#activite-window').modal('hide')";
	var header = "";
	header += "<a  class='btn btn-mini btn-"+color+"' onclick=\"javascript:addFreeCompetencies('"+diplomaid+"','"+level1+"','"+level2+"')\" data-title='ajouter' rel='tooltip'>";
	header += "Ajouter la compétence";
	header += "</a>";
	header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	$("#activite-window-header").html($(header));

	$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#activite-window").addClass('alert-'+color);
	$("#activite-window").modal('show');
}


//==================================
function getDomaineNode(data,code,value,label,diplomaid,level1,level2)
//==================================
{
	var result = data;
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + result + "?resources=true",
		success : function(data) {
			updateDomaine(data,code,value,label,diplomaid,level1,level2);
		}
	});
}

//==================================
function updateDomaine(data,code,value,label,diplomaid,level1,level2)
//==================================
{
	var activiteid = $("asmContext:has(metadata[semantictag='"+level1+"'])",data).attr('id');
	var xml = "<asmResource xsi_type='Get_Resource'>";
	xml += "<code>"+code+"</code>";
	xml += "<value>"+value+"</value>";
	xml += "<label lang='fr'>"+label+"</label>";
	xml += "<label lang='en'></label>";	
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + activiteid,
		success : function() {
			UIFactory[objtype_to_add_competencies].reloadparseone (diplomaid,objtype_destination_display,addFreeCompetencies,diplomaid,level1,level2);
		}
	});

}

//==================================
function getFreeNode(data,text,diplomaid,level2)
//==================================
{
	var result = data;
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + result + "?resources=true",
		success : function(data) {
			updateFreeComp(data,text,diplomaid,level2);
		}
	});
}

//==================================
function updateFreeComp(data,text,diplomaid,level2)
//==================================
{
	var competencyid = $("asmContext:has(metadata[semantictag='"+level2+"'])",data).attr('id');
	var xml = "<asmResource xsi_type='Field'>";
	xml += "<text lang='fr'>"+text+"</text>";
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + competencyid,
		success : function() {
			var callback = hide_activite_window;
			UIFactory[objtype_to_add_competencies].reloadparseone (diplomaid,objtype_destination_display,callback);
		}
	});
}

//==================================
function getEditActivityBox(id,ppn_nodeid,dom_nodeid,type,dest,color,array_byid)
//==================================
{
	var html = "";
	html += "<div style='margin-bottom:5px'>Ajouter des compétences";
	html += "<br><input type='radio' onclick=\"javascript:getEditPPNActivityBox ('"+id+"','"+ppn_nodeid+"','"+type+"','"+dest+id+"','"+array_byid+"[diplomaid].comps_metiers_node', '"+color+"','activite','competence-metier');\"> à partir d'un référentiel ";
	html += "<br><input type='radio' onclick=\"javascript:getEditFreeActivityBox('"+id+"','"+dom_nodeid+"','"+type+"','"+dest+id+"','"+array_byid+"[diplomaid].comps2_metiers_node','"+color+"','dom-metier-ref','free-comp-metier');\"> hors référentiel"; 
	html += "</div>";
	$("#activite-window-body").html($(html));
	// ------------------------------------
	var js2 = "javascript:$('#activite-window').modal('hide')";
	var header = "";
	header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	$("#activite-window-header").html($(header));

	$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#activite-window").addClass('alert-'+color);
	$("#activite-window").modal('show');
}

//==================================
function getEditCompetenceBox(id,ppn_nodeid,ref_nodeid,dom2a_nodeid,dom2b_nodeid,dom2c_nodeid,type,dest,color,array_byid)
//==================================
{
	var html = "";
	html += "<div style='margin-bottom:5px'>Ajouter des compétences";
//	html += "<br><input type='radio' onclick=\"javascript:getEditPPNActivityBox ('"+id+"','"+ppn_nodeid+"','"+type+"','"+dest+id+"','"+array_byid+"[diplomaid].comps_autres_node','"+color+"','activite','competence-trans');\"> à partir d'un PPN ";
	html += "<br><input type='radio' onclick=\"javascript:getEditPPNActivityBox ('"+id+"','"+ref_nodeid+"','"+type+"','"+dest+id+"','"+array_byid+"[diplomaid].comps_autres_node','"+color+"','activite','competence-trans');\"> à partir d'un référentiel ";
	html += "<br><input type='radio' onclick=\"javascript:getEditAutreCompetenceBox('"+id+"','"+dom2a_nodeid+"','"+dom2b_nodeid+"','"+dom2c_nodeid+"','"+type+"','"+dest+id+"','"+array_byid+"[diplomaid].comps2_autres_node2a','"+array_byid+"[diplomaid].comps2_autres_node2b','"+array_byid+"[diplomaid].comps2_autres_node2c','"+color+"','dom-autre-ref','free-comp-autre');\"> hors référentiel"; 
	html += "</div>";
	$("#activite-window-body").html($(html));
	// ------------------------------------
	var js2 = "javascript:$('#activite-window').modal('hide')";
	var header = "";
	header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	$("#activite-window-header").html($(header));

	$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#activite-window").addClass('alert-'+color);
	$("#activite-window").modal('show');
}

//==================================
function getSectionCompetences(id,destid,ppn_nodeid,ref_nodeid,dom_nodeid,dom2a_nodeid,dom2b_nodeid,dom2c_nodeid,comps_metiers_node,comps2_metiers_node,comps_autres_node,comps2_autres_node2a,comps2_autres_node2b,comps2_autres_node2c,titre,type,dest,color,array_byid,comps_iut2_node)
//==================================
{
	var html = "";
	//----------------------------------------------------------------------------------------------------
	html  = "<div class='row competences-titre'>";
	html += "<span class='span6'><h4>"+titre+"</h4></span>";
	html += "</div>";
	//-----------------------------------------------------------------------
	html += "<div class='row'>";
	//-----------------------------------------------------
	html += "<span class='span5'>";
	html += "<h5>Compétences métiers</h5>";
	//=========================================== IUT2 =====================================================
/*	var edit = false;
	if (comps_iut2_node.length>0 && edit) {
		if (g_userrole=='etudiant') {
			html += "<div><a  class='' onclick=\"javascript:getEditActivityBox('"+id+"','"+ppn_nodeid+"','"+dom_nodeid+"','"+type+"','"+dest+"','"+color+"','"+array_byid+"');\" data-title='éditer' rel='tooltip'>";
			html += "Ajouter des compétences <i class='fa fa-plus-square'></i>";
			html += "</a></div>";
		}
		//---------------------------------------------
		html += getEvalTableau_begin(0,id,destid,type,0);
		html += getCompetencies2(comps_iut2_node,true,type,id,destid,'activite','competence-metier',0);
		html += getEvalTableau_end();
	}*/
	if (comps_iut2_node!=undefined && comps_iut2_node.length>0) { // diplome IUT2
		html += "Compétences venant du référentiel de vos formations acquises suite à la réussite de module de cours.";
		//---------------------------------------------
		html += getEvalTableau_begin(0,id,destid,'DiplomaIUT2',0);
		html += getCompetencies2(comps_iut2_node,true,'DiplomaIUT2',id,destid,'activite','competence-metier',0);
		html += getEvalTableau_end();
	}
	//======================================================================================================
	if (g_userrole=='etudiant') {
		html += "<div><a  class='' onclick=\"javascript:getEditActivityBox('"+id+"','"+ppn_nodeid+"','"+dom_nodeid+"','"+type+"','"+dest+"','"+color+"','"+array_byid+"');\" data-title='éditer' rel='tooltip'>";
		html += "Ajouter des compétences <i class='fa fa-plus-square'></i>";
		html += "</a></div>";
	}
	html += getEvalTableau_begin(1,id,destid,type,0);
	//---------------------------------------------
	html += getCompetencies2(comps_metiers_node,true,type,id,destid,'activite','competence-metier',0);
	//---------------------------------------------
	html += getCompetencies2(comps2_metiers_node,true,type,id,destid,'dom-metier-ref','free-comp-metier',0);
	//---------------------------------------------
	html += getEvalTableau_end();
	html += "</span>";
	//-----------------------------------------------------------------------
	html += "<span class='span5'>";
	html += "<h5>Autres compétences (transversales, innovation, ...)</h5>";
	if (g_userrole=='etudiant') {
		html += "<div><a  class='' onclick=\"javascript:getEditCompetenceBox('"+id+"','"+ppn_nodeid+"','"+ref_nodeid+"','"+dom2a_nodeid+"','"+dom2b_nodeid+"','"+dom2c_nodeid+"','"+type+"','"+dest+"','"+color+"','"+array_byid+"');\" data-title='éditer' rel='tooltip'>";
		html += "Ajouter des compétences <i class='fa fa-plus-square'></i>";
		html += "</a></div>";
	}
	html += getEvalTableau_begin(2,id,destid,type,1);
	//---------------------------------------------
	html += getCompetencies2(comps_autres_node,true,type,id,destid,'activite','competence-trans',1);
	//---------------------------------------------
	html += getCompetencies2(comps2_autres_node2a,true,type,id,destid,'dom-autre-ref','free-comp-autre',1);
	html += getCompetencies2(comps2_autres_node2b,true,type,id,destid,'dom-autre-ref','free-comp-autre',1);
	html += getCompetencies2(comps2_autres_node2c,true,type,id,destid,'dom-autre-ref','free-comp-autre',1);
	//---------------------------------------------
	html += getEvalTableau_end();
	html += "</span>";
	//-----------------------------------------------------------------------
	html += "</div>";
	//----------------------------------------------------------------------------------------------------
	return html;
}



//==================================
function searchCompetencies(data,domain,level1,level2,monprojet)
//==================================
{
	if (monprojet==null)
		monprojet = false;
	var tableau = new Array();
	var level1_objs = $("asmContext:has(metadata[semantictag='"+level1+"'])",data);
	for (var i=0;i<level1_objs.length;i++) {
		var nb_level2 = 0;
		var main_obj = $(level1_objs[i]).parent().parent().parent().parent();  // stage, formation, exp. pro., etc.
		var domaine_obj = $("asmContext:has(metadata[semantictag='"+domain+"'])",main_obj);
		var domaine_label = " ";
		if (domain!=null && domaine_obj!=undefined)
			domaine_label = $("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",domaine_obj)).text();
		var level1_code = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level1_objs[i])).text();
		var level1_label = $("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level1_objs[i])).text();
		var parent = $(level1_objs[i]).parent();
		var level2_objs = $("asmContext:has(metadata[semantictag='"+level2+"'])",parent);
		for (var j=0;j<level2_objs.length;j++) {
			var level2_obtention = false;
			var level2_obtention_node = $("asmContext:has(metadata[semantictag='eval-iut2'])",$(level2_objs[j]).parent());
			var level2_obtention_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_obtention_node)).text();
			var level2_eval_tuteur_node = $("asmContext:has(metadata[semantictag='eval-tuteur'])",$(level2_objs[j]).parent());
			var level2_eval_tuteur_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_eval_tuteur_node)).text();
			var level2_eval_etudiant_node = $("asmContext:has(metadata[semantictag='eval-etudiant'])",$(level2_objs[j]).parent());
			var level2_eval_etudiant_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_eval_etudiant_node)).text();
			var level2_like_etudiant_node = $("asmContext:has(metadata[semantictag='like-etudiant'])",$(level2_objs[j]).parent());
			var level2_like_id = $(level2_like_etudiant_node).attr("id");
			if (level2_obtention_value=='Y2' || level2_eval_tuteur_value=='Y2' || level2_eval_etudiant_value=='A2' || level2_eval_etudiant_value=='A3' || level2_eval_etudiant_value=='A4') {					
					level2_obtention = true;
			}
			var level2_code = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			var level2_label = $("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			if (level2_label.length==0)
				level2_label = $("text[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			var level2_id = $(level2_objs[j]).attr("id");
			var parentcompetencyid = $(level2_objs[j]).parent().attr("id");
			//---------- recherche diplôme, formation, etc. -------
			if (!monprojet) {
				var unitid = $(level1_objs[i]).parent().parent().parent().parent().attr('id');
				if (ref[level2_label] == undefined)
					ref[level2_label] = unitid;
				else if (ref[level2_label].indexOf(unitid)<0)
					ref[level2_label] += "/"+unitid;
			}
			//-------------------------------------------------------
			if (level2_obtention || monprojet) {
				if (monprojet)
					level2_obtention = true;
				tableau[tableau.length] = [domaine_label,level1_label,level2_label,nb_level2,level2_id,level2_obtention,level2_code,level1_code,level2_like_id,parentcompetencyid];
			}
		}
	}
	var newTableau = tableau.sort(sortOn1_2_3);
	return newTableau;
}

//==================================
function searchFreeCompetencies(data,domain,level1,level2,monprojet)
//==================================
{
	var tableau = new Array();
	var level1_objs = $("asmContext:has(metadata[semantictag='"+level1+"'])",data);
	for (var i=0;i<level1_objs.length;i++) {
		var domaine_label = "";/*$("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level1_objs[i])).text();*/
		var level1_code = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level1_objs[i])).text();
		var level1_label = $("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level1_objs[i])).text();
		var parent = $(level1_objs[i]).parent();
		var level2_objs = $("asmContext:has(metadata[semantictag='"+level2+"'])",parent);
		for (var j=0;j<level2_objs.length;j++) {
			var level2_obtention = false;
			var level2_obtention_node = $("asmContext:has(metadata[semantictag='eval-iut2'])",$(level2_objs[j]).parent());
			var level2_obtention_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_obtention_node)).text();
			var level2_eval_tuteur_node = $("asmContext:has(metadata[semantictag='eval-tuteur'])",$(level2_objs[j]).parent());
			var level2_eval_tuteur_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_eval_tuteur_node)).text();
			var level2_eval_etudiant_node = $("asmContext:has(metadata[semantictag='eval-etudiant'])",$(level2_objs[j]).parent());
			var level2_eval_etudiant_value = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_eval_etudiant_node)).text();
			var level2_like_etudiant_node = $("asmContext:has(metadata[semantictag='like-etudiant'])",$(level2_objs[j]).parent());
			var level2_like_id = $(level2_like_etudiant_node).attr("id");
			if (level2_obtention_value=='Y2' || level2_eval_tuteur_value=='Y2' || level2_eval_etudiant_value=='A2' || level2_eval_etudiant_value=='A3' || level2_eval_etudiant_value=='A4') {					
					level2_obtention = true;
			}
			var level2_code = $("value",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			var level2_label = $("label[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			var level2_id = $(level2_objs[j]).attr("id");
			var parentcompetencyid = $(level2_objs[j]).parent().attr("id");
			var unitid = $(level1_objs[i]).parent().parent().parent().parent().attr('id');
			if (level2_label.length==0)
				level2_label = $("text[lang='fr']",$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",level2_objs[j])).text();
			//---------- recherche diplôme, formation, etc. -------
			if (!monprojet) {
				if (ref[level2_label] == undefined)
					ref[level2_label] = unitid;
				else if (ref[level2_label].indexOf(unitid)<0)
					ref[level2_label] += "/"+unitid;
			}
			//-------------------------------------------------------
			if (level2_obtention || monprojet) {
				if (monprojet)
					level2_obtention = true;
				tableau[tableau.length] = [domaine_label,level1_label,level2_label,level2_objs.length,level2_id,level2_obtention,level2_code,level1_code,level2_like_id,parentcompetencyid];
			}
		}
	}
	var newTableau = tableau.sort(sortOn1_2_3);
	return newTableau;
}

//==================================
function getShortCompetencies(tableau,position)
//==================================
{
	var html ="";
	var temp_html ="";
	html += "<div>";
	var first = true;
	var domaine_label = "";
	var domaine_label_previous = "";
	var level1_label_previous = "";
	var level2_label_previous = "";
	var nb_level1 = 0;
	var nb_level2 = 0;
	for (var i=0; i<tableau.length; i++){
		var level2_obtention = tableau[i][5];
		if (level2_obtention) {
			domaine_label = tableau[i][0]; 
			var level1_label = tableau[i][1]; 
			var level2_label = tableau[i][2];
			if (domaine_label != domaine_label_previous) {
				if (nb_level2>0){
					html += "<p><i class='fa fa-angle-right fa-lg'></i>&nbsp;"+level1_label_previous;
					html += "("+nb_level2+")";
					html += temp_html;
					temp_html = "";
				}
				html += "</div>";
				nb_level1 = 0;
				if (!first || position==2 || position==4 || position==5)
					html += "<hr>";
				first = false;
				html += "<h5>"+domaine_label+"</h5>";
				html += "<div>";
				domaine_label_previous = domaine_label;
				level1_label_previous = "";
				level2_label_previous = "";
			}
			if (level1_label != level1_label_previous && level1_label!=domaine_label) {
				if (nb_level1>0) {
					if (domaine_label=="")
						html += "<p class='h5'>"+level1_label_previous;
					else
						html += "<p><i class='fa fa-angle-right fa-lg'></i>&nbsp;"+level1_label_previous;
					html += " ("+nb_level2+")";
					html += temp_html;
					html += "</div>";
					temp_html = "";
					}
				nb_level2 = 0;
				temp_html += " <span data-toggle='collapse' href='#collapseA"+position+"-"+i+"' onclick=\"toggleZoom('collapseA"+position+"-"+i+"')\">";
				temp_html += "<i id='zoom_collapseA"+position+"-"+i+"' class='fa fa-search-plus'></i>";
				temp_html += "</span>";
				level1_label_previous = level1_label;
				temp_html += "<div id ='collapseA"+position+"-"+i+"' class='collapse'>";
				nb_level1++;
			}
			if (level2_label != level2_label_previous) {
				if (level1_label=="" & domaine_label==""){
					if (nb_level1>0) {
						if (domaine_label=="")
							html += "<p class='h5'>"+level1_label_previous;
						else
							html += "<p><i class='fa fa-angle-right fa-lg'></i>&nbsp;"+level1_label_previous;
						html += " ("+nb_level2+")";
						html += temp_html;
						html += "</div>";
						temp_html = "";
						}
					nb_level2 = 0;
					temp_html += " <span data-toggle='collapse' href='#collapseA"+position+"-"+i+"' onclick=\"toggleZoom('collapseA"+position+"-"+i+"')\">";
					temp_html += "<i id='zoom_collapseA"+position+"-"+i+"' class='fa fa-search-plus'></i>";
					temp_html += "</span>";
					level1_label_previous = "Domaine non défini ";
					temp_html += "<div id ='collapseA"+position+"-"+i+"' class='collapse'>";
					nb_level1++;					
					nb_level2++;
					temp_html += "<p>&nbsp;<i class='fa fa-check-square-o'></i>&nbsp;"+level2_label+"</p>";
					level2_label_previous = level2_label;
				} else {
					nb_level2++;
					temp_html += "<p>&nbsp;<i class='fa fa-check-square-o'></i>&nbsp;"+level2_label+"</p>";
					level2_label_previous = level2_label;
				}
			}
		}
	}
	if (level1_label_previous!=""){
		if (domaine_label=="")
			html += "<p class='h5'>"+level1_label_previous;
		else
			html += "<p><i class='fa fa-angle-right fa-lg'></i>&nbsp;"+level1_label_previous;
		html += "("+nb_level2+")";
		html += temp_html;
	}
	html += "</div>";
	return html;
}

//==================================
function getDetailCompetencies(tableau,position,prefix,edit,type,objid,destid)
//==================================
{
	if (prefix==null)
		prefix = "";
	if (edit==null)
		edit = false;
	var html ="";
	var temp_html ="";
	html += "<div>";
	var first = true;
	var domaine_label = "";
	var domaine_label_previous = "";
	var level1_code_previous = "";
	var level1_label_previous = "";
	var level2_label_previous = "";
	var nb_level1 = 0;
	var nb_level2 = 0;
	for (var i=0; i<tableau.length; i++){
		var level2_obtention = tableau[i][5];
		if (level2_obtention) {
			domaine_label = tableau[i][0]; 
			var level1_label = tableau[i][1]; 
			var level2_label = tableau[i][2];
			var level2_id = tableau[i][4];
			var level2_code = tableau[i][6];
			var level1_code = tableau[i][7];
			var like_id = tableau[i][8];
			var parentcompetencyid = tableau[i][9];
			if (domaine_label != domaine_label_previous) {
				if (nb_level2>0){
					html += "<h5>";
					if (prefix=='projet')
						html += "<input id='"+level1_code_previous+"' type='checkbox' label=\""+level1_label_previous+"\" value='"+level1_code_previous+"' portfoliocode='' code='"+level1_code_previous+"' onchange='javascript:toggleChildren(this);'>";
					html += level1_label_previous+" ("+nb_level2+") </h5>";
					html += temp_html;
					temp_html = "";
				}
				html += "</div>";
				nb_level1 = 0;
				if (!first || position==2 || position==4 || position==5)
					html += "<hr>";
				first = false;
				html += "<h4>"+domaine_label+"</h4>";
				html += "<div>";
				domaine_label_previous = domaine_label;
				level1_code_previous = "";
				level1_label_previous = "";
				level2_label_previous = "";
			}
			if (level1_label != level1_label_previous && level1_label!=domaine_label) {
				if (nb_level1>0) {
					if (domaine_label==""){
						html += "<h4>";
						if (prefix=='projet')
							html += "<input id='"+level1_code_previous+"' type='checkbox' label=\""+level1_label_previous+"\" value='"+level1_code_previous+"' portfoliocode='' code='"+level1_code_previous+"' onchange='javascript:toggleChildren(this);'>";
						html += level1_label_previous+" ("+nb_level2+") </h4>";
					}
					else {
						html += "<h5>";
						if (prefix=='projet')
							html += "<input id='"+level1_code_previous+"' type='checkbox' label=\""+level1_label_previous+"\" value='"+level1_code_previous+"' portfoliocode='' code='"+level1_code_previous+"' onchange='javascript:toggleChildren(this);'>";
						html += level1_label_previous+" ("+nb_level2+") </h5>";
					}
					html += temp_html;
					html += "</div>";
					temp_html = "";
					}
				nb_level2 = 0;
				nb_level1++;
				level1_label_previous = level1_label;
				level1_code_previous = level1_code;
			}
			if (level2_label != level2_label_previous) {
				nb_level2++;
				if (prefix=='projet')
					temp_html += "<input type='checkbox' label=\""+level2_label+"\" value='"+level2_code+"' orig='"+level2_code+"' actcode='"+level1_code+"' comptype='act-child' name='"+level1_code+"'>";
				if (edit)
					temp_html += "<div class='comp-pref'>";
				temp_html += "&nbsp;"+level2_label;
				if (edit) {
					temp_html += "    <span onclick=\"confirmDel('"+parentcompetencyid+"','"+type+"','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
					temp_html += "      <i class='fa fa-trash-o'></i>";
					temp_html += "    </span>";
					temp_html += "    <span class='eval_like' id='eval_"+like_id+"'></span>";
					temp_html += "</div>";
					eval_competences[eval_competences.length] = like_id;
				} else {
					temp_html += " <span data-toggle='collapse' href='#collapseB"+prefix+level2_id+"' onclick=\"toggleZoom('collapseB"+prefix+level2_id+"')\">";
					temp_html += "<i id='zoom_collapseB"+prefix+level2_id+"' class='fa fa-search-plus'></i>";
					temp_html += "</span>";
					temp_html += "<ul id ='collapseB"+prefix+level2_id+"' class='collapse'>";
					var units = ref[level2_label].split('/');
					for (var k=0;k<units.length;k++){
						temp_html += "<li>"+obj_label[UICom.structure["ui"][units[k]].semantictag]+" : "+UICom.structure["ui"][units[k]].getLabel(null,'span')+"</li>";
					}
					temp_html += "</ul>";
				}
				level2_label_previous = level2_label;
			}
		}
	}
	if (level1_label_previous!=""){
		if (domaine_label==""){
			html += "<h4>";
			if (prefix=='projet')
				html += "<input id='"+level1_code_previous+"' type='checkbox' label=\""+level1_label_previous+"\" value='"+level1_code_previous+"' portfoliocode='' code='"+level1_code_previous+"' onchange='javascript:toggleChildren(this);'>";
			html += level1_label_previous+" ("+nb_level2+") </h4>";
		} else {
			html += "<h5>";
			if (prefix=='projet')
				html += "<input id='"+level1_code_previous+"' type='checkbox' label=\""+level1_label_previous+"\" value='"+level1_code_previous+"' portfoliocode='' code='"+level1_code_previous+"' onchange='javascript:toggleChildren(this);'>";
			html += level1_label_previous+" ("+nb_level2+") </h5>";
		}
		html += temp_html;
	}
	html += "</div>";
	return html;
}

//==================================
function displayCompetencesMetiers(data)
//==================================
{
	var tableau = null;
	var htmlShort = "";
	var htmlDetail = "";
	g_htmlDetail1 = "";
	//-----------------------------------------------
	tableau = searchCompetencies(data,'domaine-metier','activite','competence-metier');
	htmlShort +="<h4 style='text-align:right'>Provenant d'un référentiel</h4>";
	htmlShort += getShortCompetencies(tableau,1);
	htmlDetail +="<h4 style='text-align:right'>Provenant d'un référentiel</h4>";
	htmlDetail += getDetailCompetencies(tableau,1);
	//--------------
	htmlShort1 += getShortCompetencies(tableau,1);
	g_htmlDetail1 += getDetailCompetencies(tableau,1);
	//-----------------------------------------------
	tableau = searchFreeCompetencies(data,'dom-metier-ref','dom-metier-ref','free-comp-metier');
	htmlShort +="<h4  style='text-align:right'>Hors référentiel</h4>";
	htmlShort += getShortCompetencies(tableau,2);
	htmlDetail +="<h4  style='text-align:right'>Hors référentiel</h4>";
	htmlDetail += getDetailCompetencies(tableau,2);
	//--------------
	htmlShort1 += getShortCompetencies(tableau,2);
	g_htmlDetail1 += "<hr>"+getDetailCompetencies(tableau,2);
	//----------------------------
	$("#metiers-short_comp").html(htmlShort);
	$("#metiers-detail_comp").html(htmlDetail);
	$("#metiers-detail_cv").html(g_htmlDetail1);
}


//==================================
function displayCompetencesTrans(data)
//==================================
{
	htmlShort = "";
	htmlDetail = "";
	g_htmlDetail2 = "";
	//-----------------------------------------------
	tableau = searchCompetencies(data,null,'activite','competence-trans');
	htmlShort += getShortCompetencies(tableau,3);
	htmlDetail += getDetailCompetencies(tableau,3);
	comps2_objs = $("metadata[semantictag*='comps2a-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre');
	htmlShort += getShortCompetencies(tableau,4);
	htmlDetail += getDetailCompetencies(tableau,4);
	comps2_objs = $("metadata[semantictag*='comps2b-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre');
	htmlShort += getShortCompetencies(tableau,5);
	htmlDetail += getDetailCompetencies(tableau,5);
	$("#autres-short1_comp").html(htmlShort);
	$("#autres-detail1_comp").html(htmlDetail);
	g_htmlDetail2 = htmlDetail;
	$("#autres-detail1_cv").html(g_htmlDetail2);
}


//==================================
function displayCompetencesAutres(data)
//==================================
{
	htmlShort = "";
	htmlDetail = "";
	htmlShort3 = "";
	g_htmlDetail3 = "";
	//-----------------------------------------------
	comps2_objs = $("metadata[semantictag*='comps2c-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre');
	htmlShort += getShortCompetencies(tableau,6);
	htmlDetail += getDetailCompetencies(tableau,6);
	//----------------------------
	htmlShort3 += htmlShort;
	g_htmlDetail3 = htmlDetail;
	//----------------------------
	$("#autres-short2_comp").html(htmlShort);
	$("#autres-detail2_comp").html(htmlDetail);
	$("#autres-detail2_cv").html(g_htmlDetail3);
}



//==================================
function getLangues()
//==================================
{
		$.ajax({
			type : "GET",
			dataType : "xml",
			url : "../../../"+serverBCK+"/nodes?portfoliocode=IUT2-referentiel-autres&semtag=langue",
			success : function(data) {
				setLangues(data);
			}
		});
}

//==================================
function setLangues(data)
//==================================
{
	var nodes = $("node",data);
	for ( var i = 0; i < nodes.length; i++) {
		var resource = $("asmResource[xsi_type='Item']",nodes[i]);
		var code = $('code',resource).text();
		var label = $("label[lang='fr']",resource).text();
		g_langues[g_langues.length] = [code,label];
	}
}
