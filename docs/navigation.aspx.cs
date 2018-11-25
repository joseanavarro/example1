using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Clictel.Data.HotSpots.Base;
using Clictel.Data.HotSpots;
using Clictel.i18n;


public partial class EditPano_hotspots_Navigation : Clictel.Web.Administration.EditHSPage
{
    protected NavigationHS HS;

    protected override void newHotspot()
    {
        hotspot = new NavigationHS();
        HS = (NavigationHS)hotspot;
        sameFileAllLanguages = false;
        HS.generalData.ath = 0;
        HS.generalData.atv = 0;
        HS.generalData.id_pano = 0;
        HS.generalData.name = Idiomas.lng("tManualLink") + (totalHotspots() + 1).ToString();
        HS.generalData.external = true;
    
    }
    protected override void setPageVariables()
    {
        HS = (NavigationHS)hotspot;

    }

    protected override void getNewGeneralData()
    {
        base.getNewGeneralData();
        HS.generalData.atv = 0;
        HS.generalData.next_pano = Convert.ToInt64(Request["next_pano"]);
        HS.generalData.next_pano_ath = Convert.ToDouble(Request["next_pano_ath"]);
        HS.generalData.next_pano_atv = 0;
    }

    protected override void getNewLocalizedData()
    {
        base.getNewLocalizedData();

    }

   
}