<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MapaVisita2.aspx.cs" Inherits="EditPano_visita_Default" %>

<!--#Include Virtual="~/Top.aspx"-->
<link type="text/css" href="/admin/js/graph-editor/graph-editor.css" rel="Stylesheet" />    

<script src="/admin/js/graph-editor/graph-editor.js" 	type="text/javascript"></script>
<script src="/krpano/krpano.js" 										  type="text/javascript"></script>


<script>
    var K4_graph = JSON.stringify(<%=grafJSON %>);
    var jdata = <%=infoJSON %>;
    var logFunction;
    $(function () {
        var panoTooltip = $("#graph_ed1").tooltip({track:true,content:" ",open:function(){$(".ui-tooltip").css("display","none");}});
        mostradDatosPano = function (nodeId) {
            if (nodeId){
                   panoTooltip.tooltip({
                        content: "<img width='250px' src='/thumbnail.aspx?p_registro="+ nodeId +"&nocache=1&w=400&h=400' /><br />" +jdata.text[nodeId]
                        });
                        $(".ui-tooltip").css("display","block");
            }
            else {
                $(".ui-tooltip").css("display","none");
                panoTooltip.tooltip({content:" "});
            }
        }
        var linkData;
        var step;
         showedgedata = function (nodeId1,nodeId2) {
            linkData = {};
            linkData.lng = '<%=visitLanguages[0] %>';
            linkData.node1 = nodeId1;
            linkData.node2 = nodeId2 ;
            step = 1;
            asistente();
        }
        asistente = function(){
            var text = "<div class='row SinMargenHorizontal'>\
                             <div class='col-xs-12'><span class='Capitalizar'><%=Idiomas.lng("tFrom")%></span> <%=Idiomas.lng("tPano")%> <%=Idiomas.lng("tSources")%>: <span id='hstitle2'></span></div>\
                        </div>\
                        <div class='row MargenInferior_10 SinMargenHorizontal'>\
                             <div class='col-md-12'>\
                                  <div id='pano1'></div>\
                             </div>\
                        </div>\
                        <div class='row SinMargenHorizontal'>\
                             <div class='col-xs-12'><%=Idiomas.lng("tPano")%> <%=Idiomas.lng("tDestination")%>: <span id='hstitle3'></span></div>\
                        </div>\
                        <div class='row MargenInferior_10 SinMargenHorizontal'>\
                             <div class='col-md-12'>\
                                  <div id='pano2'></div>\
                             </div>\
                        </div>\
                        <div class='row MargenInferior_20 SinMargenHorizontal'>\
                             <div class='col-xs-4'><%=Idiomas.lng("tTextLink")%>:</div>\
                             <div class='col-xs-4'><input id='hstitle' type='text' class='form-control' /></div>\
                             <div class='col-xs-4'>(<%=Idiomas.lng("tOptional")%>)</div>\
                        </div>";                                         
            if (step==1)
                text += "<div class='row MargenInferior_20 centrado'><div class='col-md-12'><input id='loadPanoData' type='button' value='<%=Idiomas.lng("tNextPage")%>' class='btn btn-primary width-100x100' /></div></div>";
            else
                text += "div class='row MargenInferior_20 centrado'><div class='col-md-12'><input id='loadPanoData' type='button' value='<%=Idiomas.lng("tSave")%>' class='btn btn-primary width-100x100' /></div></div>";;
            $("#editor").html(text );

            var n1,n2;
            if (step == 1)
            { 
                n1=linkData.node1;
                n2=linkData.node2;
                
                 $("#hstitle2").html( "<b>" + JSON.parse(K4_graph).labels[linkData.node1] + "</b>"  + " <%=Idiomas.lng("tTo")%> <%=Idiomas.lng("tPano")%> " + "<%=Idiomas.lng("tDestination")%>" + ": <b>" + JSON.parse(K4_graph).labels[linkData.node2]+ "</b>");
                 $("#hstitle3").html( "<b>" + JSON.parse(K4_graph).labels[linkData.node2] + "</b>");
                 $("#hstitle").val(jdata.hsLabels[linkData.node1 + "," + linkData.node2]);
            }
            else
            {   
                $("#hstitle").val();
                n1=linkData.node2;
                n2=linkData.node1;
                 $("#hstitle2").html(JSON.parse(K4_graph).labels[linkData.node2] + " <%=Idiomas.lng("tTo")%> " + "<%=Idiomas.lng("tDestination")%>" + ": <b>" +JSON.parse(K4_graph).labels[linkData.node1] + "</b>" );
                 $("#hstitle").val(jdata.hsLabels[linkData.node2 + "," + linkData.node1]);
            }                
            embedpano({swf:"/krpano/krpano.swf",xml:"/admin/panoScripts/edit_xml.aspx?par="+n1 + ";"+ n2 + ";1", target:"pano1",id:"krpano1",html5:"prefer"});
            embedpano({swf:"/krpano/krpano.swf",xml:"/admin/panoScripts/edit_xml.aspx?par="+n2+ ";"+n1+ ";2", target:"pano2",id:"krpano2",html5:"prefer"});             
            $("#loadPanoData").click(
                     function()
                     {
                            var p1 = document.getElementById("krpano1");
                            var p2 = document.getElementById("krpano2");
                           
                            if ($( "#calculateLink:checked" ).length != 1){
                                linkData.autoret = 0;
                            }
                           if(step == 1){
                                linkData.hs1 = p1.get("view.hlookat");
                                linkData.pw1 = p2.get("view.hlookat");
                                linkData.t1 = $("#hstitle").val();
                                step=2;
                                asistente();
                                return; 
                            }
                            else
                            {
                                linkData.hs2 = p1.get("view.hlookat");
                                linkData.pw2 = p2.get("view.hlookat");
                                linkData.t2 = $("#hstitle").val();
                            }
                            linkData.action = "hotspot";
                             var url = "/admin/editPano/visita/editaVisitaAjax.aspx";
                                data = { action: "hostspot"};
                                $.ajax({
                                    type: "POST",
                                    url: url,
                                    data: linkData,
                                    success: function (data) {
                                        $("#mensaje").html(data.mensaje);
                                        $("#editor").html('');
                                        jdata.hsLabels[linkData.node1 + "," + linkData.node2] = linkData.t1;
                                          jdata.hsLabels[linkData.node2 + "," + linkData.node1] = linkData.t2;
                                        my_graph_editor1.confirmEdge(linkData.node1,linkData.node2);
                                     },
                                    dataType: "json"
                                }).fail(function () { $("#mensaje").html("<%=Idiomas.lng("tMsgFailedToCreateTheLinks")%>"); });
                     }
               );
        }
        var my_graph_editor1 = new GraphEditor('#graph_ed1', {
            JSONdata: K4_graph,
            node_radius: 8,
            editable: false,
            node_over: mostradDatosPano,
            edge_click : showedgedata,
            width:600,
            height:600,
            background_src:<%=getMap()%>
        });
            if(location.hash.indexOf("#HS:") == 0){
                var nodes = location.hash.substring(4).split(";");
                showedgedata(nodes[0],nodes[1]);
            }
		});
</script>

<style>	
		#graph_ed1 {-webkit-touch-callout:none; -webkit-user-select:none; -khtml-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none; /*overflow: hidden;*/ border: 1px solid #337ab7; width:100%;}
		#pano1 {width:100%; height:241px;}
		#pano2 {width:100%; height:241px;}	  
	  .ui-widget-header{background-image:none;}
	  .graph_editor_canvas:focus{border: 1px solid #FFF;} 		
</style>

</head>

<body>
		
			<div class="container">
			     <!--#Include Virtual="~/includes/menu_cs.inc"-->
			     
			     <div class="titularpagina"><h1><%=Idiomas.lng("tManageTour")%>  | <span class="color-01"><%=Idiomas.lng("tEditLinksOfVisit")%></span></h1></div>

  		 		 <span id="mensaje"></span>
					 								
					 <div class="row MargenInferior_20">
								<div class="col-md-4 col-md-offset-4 centrado">
								     <a href="mapavisita.aspx?id_visita=<%=Request.QueryString["id_visita"] %>&area=<%=Request.QueryString["area"] %>"><input type="button" value="<%=Idiomas.lng("tModifyMapLinks")%>" class="btn btn-primary width-100x100" /></a>
								</div>
					 </div>
				 

			     <div class="row MargenInferior_20">
							  <div class="col-md-6 MargenInferior_10"><div id="graph_ed1" title="" style="border: 1px solid #337ab7;"></div></div>
							  <div class="col-md-6 MargenInferior_10 SinPaddingHorizontal"><div id="editor" style="width:100%;"></div></div>
					</div>
				 	
		  </div>

	</body>
</html>