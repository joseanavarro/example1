<%@ Page Language="C#" AutoEventWireup="true" CodeFile="navigation.aspx.cs" Inherits="EditPano_hotspots_Navigation"  validateRequest="false"  %>

	<!--#Include Virtual="~/Top.aspx"-->
		
	<!--#Include Virtual="~/includes/tinymce_simple.inc"-->
  
  <link href="/admin/css/jquery-ui/jquery-ui.css"  rel="stylesheet" type="text/css"/>

	<script type="text/javascript" src="/krpano/krpano.js"></script>
	
	<div class="container">
			 <!--#Include Virtual="~/EditPano/panomenu.inc"-->
			 <div class="titularpagina"><h1><%=Idiomas.lng("tEditHotSpots")%> - <span class="color-01"><%=Idiomas.lng("tNavigateBetweenPanoramas")%></span></h1></div>

			 <div class="row MargenInferior_10">
			      <div class="col-md-12 SinMargenHorizontal">
							   <div class="row MargenInferior_10">
			                <div class="col-md-12 MargenInferior_10 SinPaddingHorizontal border-bottom-box negrita"><%=Idiomas.lng("tDataOfLink")%>:</div>
			           </div>
			      </div>
			 </div>	     
			 <form method="post" action="<%=Request.Url.Query%>">
						<div class="form-group">
								  <div class="row MargenInferior_10 seleccion">
								       <div class="col-md-2 SinMargenHorizontal SinPaddingIzquierdo"><%=Idiomas.lng("tTitulo")%>:</div>
								       <div class="col-md-10 SinPaddingHorizontal SinMargenDerecho"><input type="text" name="title" value="<%=HttpUtility.HtmlEncode(HS.localizedData.title)%>" class="form-control SinMargenDerecho" /></div>
								  </div>
								  <div class="row MargenInferior_10 seleccion">
								  	   <div class="col-md-2 SinMargenHorizontal SinPaddingIzquierdo"></div>
								       <div class="col-md-10 SinMargenHorizontal SinPaddingHorizontal apunte">* <%=Idiomas.lng("tMsgTítuloEnlaceInterno")%></div>
								  </div>
						</div>
		  			<div class="form-group">
		  					 <!--#Include Virtual="includes/position.inc"-->
		  			</div>
						<!--#Include Virtual="includes/nextPano.aspx"-->
						<!--#Include Virtual="includes/buttons.inc"-->
		   </form>	     
	</div>

	<!--#Include Virtual="~/Down.aspx"-->