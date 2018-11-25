using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
using System.Web.Script.Serialization;
using Clictel.Data.HotSpots.Base;
using Clictel.Data.HotSpots;
using Clictel.Security;
using Clictel;
using Clictel.i18n;

public partial class EditPano_visita_Default : Clictel.Web.Administration.AdminPage
{
    protected string mensaje;
    protected string errores;
    protected string grafJSON;
    protected string infoJSON;
    protected int area;


    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        area = -1;
        if (!String.IsNullOrEmpty(Request.QueryString["area"])) area = int.Parse(Request.QueryString["area"]);
        getGraph(id_visita, area);
    }

    protected string getMap()
    {
        if (System.IO.File.Exists("C:\\Webs\\Viajes_Virtuales\\Panoramas2\\mapas\\" + id_visita + "\\" + area + ".png"))
        {
            return "'/panoramas2/mapas/" + id_visita + "/" + area + ".png'";
        }
        else
        {
            return "null";
        }
    }

    protected void getGraph(long id_visita, int area)
    {
        Grafo g = new Grafo();
        PanoInfo inf = new PanoInfo();
        using (MySqlConnection conn = Bdatos.open(Bdatos.ConnGlobal))
        {
            MySqlCommand command = new MySqlCommand();

            command.Connection = conn;
            String sSql = "Num2=1 and Text30 = " + id_visita;

            if (area != -1) sSql += " AND Num15 = " + area;
            sSql += " AND " + Permisos.queryEditAuth(ref parameters);

            command.CommandText = "Select count(Codigo) From elementos where " + sSql + " Order By numero_pano,Num13 Asc";
            Int64 nNodes = (Int64)command.ExecuteScalar();
            g.vertices = new String[nNodes];


            command.CommandText = "Select  e.codigo,if(e.Text63 is null,'',e.Text63),e.Num13 + 1 as Num13,numero_pano From elementos e where " + sSql + " Order By numero_pano,Num13 Asc";
            using (MySqlDataReader oDR = command.ExecuteReader())
            {
                int i = 0;
                while (oDR.Read())
                {
                    g.vertices[i++] = oDR.GetString("Codigo");
                    string label = Bdatos.readStringBD(oDR, "numero_pano");
                    if (label == "-1")
                    {
                        label = Bdatos.readStringBD(oDR, "Num13");
                    }
                    g.labels.Add(oDR.GetString(0), label);
                    inf.text.Add(oDR.GetString(0), oDR.GetString(1));
                }
            }

            if (g.vertices.Length == 0) return;
            command.CommandText = "Select count(*) From arista_visita where nodo1 in (" + String.Join(",", g.vertices) + ") and nodo2 in (" + String.Join(",", g.vertices) + ")";

            Int64 nEdges = (Int64)command.ExecuteScalar();
            if (nEdges == 0) g.fit = true;


            List<String[]> edgeList = new List<String[]>();
            g.edges = edgeList.ToArray();


            command.CommandText = "Select nodo1,nodo2,(Select count(*) From hotspots h where id_pano in (av.nodo1,av.nodo2) and h.general_data regexp concat('\"next_pano\":(',av.nodo1,'|',av.nodo2,')[,}]')) > 1 as edited From arista_visita av where nodo1 in (" + String.Join(",", g.vertices) + ") and nodo2 in (" + String.Join(",", g.vertices) + ")";
            using (MySqlDataReader oDR = command.ExecuteReader())
            {

                while (oDR.Read())
                {
                    String[] edge;
                    if (oDR.GetBoolean(2))
                        edge = new String[] { oDR.GetString(0), oDR.GetString(1), "ok" };
                    else
                        edge = new String[] { oDR.GetString(0), oDR.GetString(1) };
                    if (!contains_edge(edgeList, edge))
                    {
                        edgeList.Add(edge);
                    }



                }
            }
            g.edges = edgeList.ToArray();

            command.CommandText = "Select e.codigo,if(e.Text63 is null,'',e.Text63),n.x,n.y,e.Num13,numero_pano From elementos e left join nodo_visita n on e.Codigo = n.id where " + sSql + " Order By numero_pano,Num13 Asc";

            using (MySqlDataReader oDR = command.ExecuteReader())
            {

                int auxX = 1, auxY = 0, step = 1;
                while (oDR.Read())
                {
                    if (nEdges > 0)
                    {
                        double x, y;

                        if (!oDR.IsDBNull(2)) x = oDR.GetDouble("x");
                        else x = 30;
                        if (!oDR.IsDBNull(3)) y = oDR.GetDouble("y");
                        else y = 30;

                        g.pos.Add(oDR.GetString(0), new Double[] { x, y });
                    }
                    else
                    {


                        g.pos.Add(oDR.GetString(0), new Double[] { auxX, auxY });

                        auxX += step;


                        if (auxX == 10 || auxX == 0)
                        {
                            auxY += 1;
                            step *= -1;
                            auxX += step;
                        }

                    }
                }


            }

            foreach (string node in g.vertices)
            {
                HotSpotsManager hsm = new HotSpotsManager();
                hsm.loadUntranslated = true;
                hsm.loadCustomData = true;
                hsm.locale = parameters.lenguaje;
                foreach (NavigationHS hs in hsm.getHotSpotsByPano(Convert.ToInt64(node), HotSpotType.navigation))
                {
                    if (!hs.generalData.external && Array.IndexOf(g.vertices, hs.generalData.next_pano.ToString()) != -1)
                    {
                        if (!inf.hsLabels.Keys.Contains(hs.generalData.id_pano + "," + hs.generalData.next_pano))
                            inf.hsLabels.Add(hs.generalData.id_pano + "," + hs.generalData.next_pano, hs.localizedData.title);
                    }
                }
            }




            JavaScriptSerializer serializer = new JavaScriptSerializer();
            grafJSON = serializer.Serialize(g);
            infoJSON = serializer.Serialize(inf);
        }


    }


    public Boolean contains_edge(List<String[]> nodes, String[] node)
    {
        foreach (String[] n in nodes)
        {
            if ((n[0] == node[0] && n[1] == node[1]) || (n[0] == node[1] && n[1] == node[0])) return true;
        }
        return false;
    }


}


[Serializable]
public class Grafo
{

    public String[] vertices;

    public String[][] edges;

    public Dictionary<string, double[]> pos = new Dictionary<string, double[]>();
    public Dictionary<string, string> labels = new Dictionary<string, string>();

    public Boolean fit = false;
}

[Serializable]
public class PanoInfo
{

    public Dictionary<string, string> text = new Dictionary<string, string>();
    public Dictionary<string, string> hsLabels = new Dictionary<string, string>();
}


