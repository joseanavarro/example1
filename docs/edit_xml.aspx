<%@ Page Language="C#" AutoEventWireup="true" debug="true"%>

<%
	string[] sPar = Request["par"].Split(';');
long sPano1 = 0;
long sPano2 = 0;
string tipo = null;
bool automap = false;
sPano1 = long.Parse(sPar[0]);
sPano2 = long.Parse(sPar[1]);
string h = "0";
string v = "0";
string piso = null;
string id_visita = null;
tipo = sPar[2];
automap = tipo == "map";
if (automap) {
	tipo = "0";
}
string radar_x = null;
string radar_y = null;
string radar_offset = null;
Response.ContentType = "text/xml";





const string sIdm = "edit_xml.aspx";
if (sPano2 > 0)
{
    Clictel.Data.HotSpots.NavigationHS[] HSl = null;
    if (tipo == "1")
    {
        HSl = Clictel.Data.HotSpots.HotSpotsManager.getConnectedHSList(Convert.ToInt64(sPano1), Convert.ToInt64(sPano2), "es");
        if (HSl.Length > 0)
            h = HSl[0].generalData.ath.ToString();
    }
    else
    {
        HSl = Clictel.Data.HotSpots.HotSpotsManager.getConnectedHSList(Convert.ToInt64(sPano2), Convert.ToInt64(sPano1), "es");
        if (HSl.Length > 0)
            h = HSl[0].generalData.next_pano_ath.ToString();
    }

}
using (MySql.Data.MySqlClient.MySqlConnection conn = Clictel.Bdatos.open(Clictel.Bdatos.ConnGlobal)) {

	MySql.Data.MySqlClient.MySqlCommand command = new MySql.Data.MySqlClient.MySqlCommand();
	command.Connection = conn;


    if (sPano2 == 0)
    {
		command.CommandText = "Select Text13,Text70,Num15,Text30 From elementos where Codigo =" + sPano1;
		using (MySql.Data.MySqlClient.MySqlDataReader oDR = command.ExecuteReader()) {
			oDR.Read();
			h = Clictel.Bdatos.readStringBD(oDR, "Text13");
            v = Clictel.Bdatos.readStringBD(oDR, "Text70");
            piso = Clictel.Bdatos.readStringBD(oDR, "Num15");
            id_visita = Clictel.Bdatos.readStringBD(oDR, "Text30");
		}
	}
	if (automap) {
		command.CommandText = "Select map_x,map_y,radar_offset From nodo_visita where id =" + sPano1;
        using (MySql.Data.MySqlClient.MySqlDataReader oDR = command.ExecuteReader())
        {
			if (oDR.Read()) {
				radar_x = oDR.GetString("map_x");
                radar_y = oDR.GetString("map_y");
                radar_offset = oDR.GetString("radar_offset");
			} else {
				automap = false;
			}
            
		}
	}





}


	
%>
<krpano version="1.16.4">
	<%if (automap){%>
					<include url="%SWFPATH%/plugins/automap/automap.xml" />
					<map name="map1" 
					keep="true"
					edge="righttop" 
					align="righttop"
					topmargin="0"
					topmarginzoom="0"
					x="10" y="10"
					path="%SWFPATH%/plugins/automap/"
					map="/panoramas2/mapas/<%=id_visita%>/<%=piso%>.png"
					zorder="100"
					scale="0.2" 
					alpha="0.7"
					radar_alpha="1"    
					radar_visible="true"    
					point_url="%SWFPATH%/plugins/automap/viewpoint.png"
					point_crop="20"
					viewpoint_auto="false"
					zoomed="false"
					editmode="true"
					onclick="toggleautomap(map1);"
				> 
					<viewpoint name="radarpoint" selected="true" x="<%=radar_x%>" y="<%=radar_y%>" heading="<%=radar_offset%>" scale="1" 
						onhover="showtext(Camping La Tordera (Calle Servicios Centrales),maponhovertext);" />
				</map>
				<events  onxmlcomplete="buildmap(map1);" />
	<%}%>
	<view hlookat="<%=h%>" vlookat="<%=v%>" fovtype="MFOV" fov="120" fovmin="70" fovmax="140" limitview="auto"/>

	<preview url="/Panoramas2/<%=sPano1%>/preview.jpg" />
	 <%
		
string sPanoFolder = Request.MapPath("/Panoramas2/" + sPano1 + "/");
System.IO.StreamReader oRead = null;
try {
	if (System.IO.File.Exists(sPanoFolder + "\\image.xml")) {
		oRead = System.IO.File.OpenText(sPanoFolder + "\\image.xml");
		Response.Write(oRead.ReadToEnd().Replace("{#URL#}", "").Replace("{#PanoPath#}","/panoramas2/" + sPano1 + "/"));
		oRead.Dispose();
	}

} catch (Exception ex) {

}

		%>

            
  <control mousetype="drag2d"
         touchtype="drag2d"
         zoomtocursor="false"
         zoomoutcursor="true"
         mouseaccelerate="0"
         mousespeed="10.0"
         mousefriction="0.8"
         mousefovchange="1.0"
         fovspeed="3.0"
         fovfriction="0.9"
         touchfriction="0"
         trackpadzoom="true"
         keybaccelerate="0.01"
         keybspeed="1"
         />     
      
  <plugin name="linea" url="/krpano/images/red-line.png" width="2" height="100%" align="topcenter" enabled="false" zorder="1"></plugin>

  <%if(tipo == "1"){%>
  	<hotspot name="flecha" url="/images/icons/tDireccion.png" ath="<%=h%>" atv="30" distorted="true" zorder="2" />
  	<events  onviewchange="set(hotspot[flecha].ath,get(view.hlookat));" />
  <%}%>
   			  
</krpano>
