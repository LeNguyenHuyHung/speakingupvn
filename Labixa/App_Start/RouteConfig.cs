using Labixa.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Labixa
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.MapRoute("culture", "language/{slug}", new { controller = "Home", action = "SetCulture", slug = UrlParameter.Optional });
            //routes.MapRoute("danhsachsanpham", "san-pham/{slug}", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });
            //routes.MapRoute("cart", "gio-hang", new { controller = "Cart", action = "Index", slug = UrlParameter.Optional });
            //routes.MapRoute("lienhe", "lien-he", new { controller = "Home", action = "about_us", slug = UrlParameter.Optional });
            //routes.MapRoute("checkout", "thanh-toan", new { controller = "Cart", action = "checkout", slug = UrlParameter.Optional });
            //routes.MapRoute("detailtintuc", "tin-tuc/{slug}", new { controller = "BlogNews", action = "Detail", slug = UrlParameter.Optional });
            //routes.MapRoute("chitietsanpham", "san-pham-chi-tiet/{slug}", new { controller = "ProductHome", action = "Detail", slug = UrlParameter.Optional });
            //routes.MapRoute("danhsachtintuc", "danh-sach-tin-tuc", new { controller = "BlogNews", action = "Index", slug = UrlParameter.Optional });
            //routes.MapRoute("onsale", "khuyen-mai", new { controller = "Onsale", action = "Index", slug = UrlParameter.Optional });
            //routes.MapRoute("chinhsachmuahang", "chinh-sach-mua-hang", new { controller = "Home", action = "PolicyBuy", slug = UrlParameter.Optional });
            //routes.MapRoute("chinhsachdoitra", "chinh-sach-doi-tra", new { controller = "Home", action = "PolicyReturn", slug = UrlParameter.Optional });
            routes.MapRoute("cultureSet", "set-culture", new { controller = "Home", action = "SetCulture" });
            routes.MapRoute("solution", "solution", new { controller = "Home", action = "SolutionHome" });
            routes.MapRoute("solutionpage", "solutionPage", new { controller = "Home", action = "SolutionPage" });
            //routes.MapRoute("home", "home", new { controller = "Home", action = "Index"});
            routes.MapRoute("home", "home", new { controller = "Home", action = "Index", slug = UrlParameter.Optional });

            routes.MapRoute("GeoOverview", "geomagic/overviewgeo", new { controller = "geomagic", action = "OverviewGeo" });
            routes.MapRoute("geomagic", "geomagic", new { controller = "geomagic", action = "index" });
            routes.MapRoute("moi", "moi", new { controller = "MoI", action = "index" });
            routes.MapRoute("overviewmoi", "moi/overview", new { controller = "MoI", action = "Overview" });
            routes.MapRoute("mainfunction", "moi/mainfunction", new { controller = "MoI", action = "MainFunction" });
            routes.MapRoute("workflow", "moi/workflow", new { controller = "MoI", action = "WorkFlow" });
            routes.MapRoute("gallery", "moi/gallery", new { controller = "MoI", action = "Gallery" });
            routes.MapRoute("moiv3", "moi/moiv3", new { controller = "MoI", action = "MoiV3" });
            routes.MapRoute("Specification", "geomagic/specification", new { controller = "geomagic", action = "Specification" });
            routes.MapRoute("3DScanningListBlog", "artec3d/news", new { controller = "ProductScanning", action = "ListBlog"});
            routes.MapRoute("3DScanningDetailBlog", "artec3D/news/{slug}", new { controller = "ProductScanning", action = "BlogDetail", slug = UrlParameter.Optional });
            routes.MapRoute("3DScanning", "artec3D", new { controller = "Artec3d", action = "Index"});
            // routes.MapRoute("DetailBlog", "DetailBlog/{slug}", new { controller = "DetailsBlog", action = "DetailBlog", slug = UrlParameter.Optional });
            // routes.MapRoute("Blog", "Blog/{slug}", new { controller = "Blog", action = "Blog", slug = UrlParameter.Optional });
            routes.MapRoute("BlogList", "tin-tuc", new { controller = "BlogList", action = "Index", slug = UrlParameter.Optional });
            routes.MapRoute("DetailBlog", "tin-tuc/{slug}", new { controller = "BlogList", action = "DetailBlog", slug = UrlParameter.Optional });
            routes.MapRoute("Recruitment", "tuyen-dung", new { controller = "Recruitment", action = "Index" });
            routes.MapRoute("DetailRecruitment", "tuyen-dung/{slug}", new { controller = "Recruitment", action = "DetailRecruitment", slug = UrlParameter.Optional });
            //  routes.MapRoute("BlogList", "list-search", new { controller = "BlogList", action = "Listsearch"});
            // routes.MapRoute("BlogDetail", "BlogList/{slug}", new { controller = "BlogList", action = "BlogDetail", slug = UrlParameter.Optional });
            
            //routes.MapRoute("ListBlog", "ListBlog/{slug}", new { controller = "BlogList", action = "ListBlog", slug = UrlParameter.Optional });
            //routes.MapRoute("Artec", "Artec", new { controller = "BlogList", action = "Artec" });

            //artec3D
            routes.MapRoute("overview3d", "overview3d", new { controller = "Artec3d", action = "OverView3D" });
            routes.MapRoute("overview3d1", "overview3d1", new { controller = "Artec3d", action = "OverView3D1" });
            routes.MapRoute("Artec3d", "artec3D/overview", new { controller = "Artec3d", action = "Index" });
            routes.MapRoute("arteceva", "artecEva", new { controller = "Artec3d", action = "ArtecEva" });
            routes.MapRoute("artecspacespider", "artecSpaceSpider", new { controller = "Artec3d", action = "artecSpaceSpider" });
            routes.MapRoute("artecleo", "artecLeo", new { controller = "Artec3d", action = "ArtecLeo" });
            routes.MapRoute("artecEvaLite", "artecEvaLite", new { controller = "Artec3d", action = "ArtecEvaLite" });
            routes.MapRoute("artecray", "artecRay", new { controller = "Artec3d", action = "ArtecRay" });
            routes.MapRoute("roboticscan", "roboticScan", new { controller = "Artec3d", action = "RoboticScan" });
            routes.MapRoute("educationalpackages", "educationalPackages", new { controller = "Artec3d", action = "EducationalPackages" });
            routes.MapRoute("artecstudio13", "artecStudio13", new { controller = "Artec3d", action = "ArtecStudio13" });
            routes.MapRoute("scanappformac", "scanAppForMac", new { controller = "Artec3d", action = "ScanAppForMac" });
            routes.MapRoute("artecsdk", "artecSDK", new { controller = "Artec3d", action = "ArtecSDK" });
            routes.MapRoute("scantoslidworks", "scanToSolidworks", new { controller = "Artec3d", action = "ScanToSolidworks" });
            routes.MapRoute("artecscaner", "artecScaner", new { controller = "Artec3d", action = "ArtecScaner" });
            routes.MapRoute("artecstudio", "artecStudio", new { controller = "Artec3d", action = "ArtecStudio" });
            routes.MapRoute("3dsoftware", "3dsoftWare", new { controller = "Artec3d", action = "SoftWare" });
            routes.MapRoute("geomagicwrap", "geoMagicWrap", new { controller = "Artec3d", action = "GeoMagicWrap" });
            routes.MapRoute("overview", "markforgedPrinter/overView", new { controller = "Markforge", action = "OverviewMark" });
            routes.MapRoute("markforgedprinter", "markforgedPrinter", new { controller = "Markforge", action = "MarkforgedPrinter" });
            routes.MapRoute("material", "markforgedprinter/material", new { controller = "Markforge", action = "Material" });
            routes.MapRoute("onyxone", "markforgedprinter/onyxone", new { controller = "Markforge", action = "OnyxOne" });
            routes.MapRoute("marktwo", "markforgedprinter/marktwo", new { controller = "Markforge", action = "MarkTwo" });
            routes.MapRoute("industrialx3", "industrialx3", new { controller = "Markforge", action = "IndustrialX3" });
            routes.MapRoute("industrialx5", "industrialx5", new { controller = "Markforge", action = "IndustrialX5" });
            routes.MapRoute("industrialx7", "industrialx7", new { controller = "Markforge", action = "IndustrialX7" });
            routes.MapRoute("metalx", "markforgedprinter/metalx", new { controller = "Markforge", action = "MetalX" });
            //routes.MapRoute("sinter1orsinter2", "sinter1orsinter2", new { controller = "Markforge", action = "Sinter1OrSinter2" });
            routes.MapRoute("eiger", "markforgedprinter/eiger", new { controller = "Markforge", action = "Eiger" });
            routes.MapRoute("movie", "markforgedprinter/movie", new { controller = "Markforge", action = "Movie" });
            routes.MapRoute("casestudy", "markforgedprinter/casestudy", new { controller = "Markforge", action = "CaseStudy" });
            routes.MapRoute("tooling", "markforgedprinter/tooling", new { controller = "Markforge", action = "Tooling" });
            routes.MapRoute("prototyping", "markforgedprinter/prototyping", new { controller = "Markforge", action = "ProtoTyping" });
            routes.MapRoute("enduseparts", "markforgedprinter/enduseparts", new { controller = "Markforge", action = "EndUseParts" });
            routes.MapRoute("education", "markforgedprinter/education", new { controller = "Markforge", action = "Education" });
            routes.MapRoute("case01", "case01", new { controller = "Markforge", action = "Case01" });
            routes.MapRoute("case02", "case02", new { controller = "Markforge", action = "Case02" });
            routes.MapRoute("case03", "case03", new { controller = "Markforge", action = "Case03" });
            routes.MapRoute("industrialseries", "markforgedprinter/industrialseries", new { controller = "Markforge", action = "IndustrialSeries" });

            //autodesk, netfabb
            routes.MapRoute("autodesk", "autodesk", new { controller = "Autodesk", action = "Index" });
            routes.MapRoute("overviewnetfabb", "autodesk/overviewnetfabb", new { controller = "Autodesk", action = "OverViewNetFabb" });
            routes.MapRoute("netfabbv2018", "autodesk/netfabbv2018", new { controller = "Autodesk", action = "NetFabbv2018" });
            routes.MapRoute("specificationautodesk", "autodesk/specificationautodesk", new { controller = "Autodesk", action = "SpecificationAutodesk" });
            routes.MapRoute("Regdownloadnetfabb", "Regdownloadnetfabb", new { controller = "Autodesk", action = "Regdownloadnetfabb" });

            routes.MapRoute("overviewautodesk", "autodesk/overviewautodesk", new { controller = "Autodesk", action = "OverviewAutoDesk" });
            routes.MapRoute("standardnetfabb", "autodesk/standardNetFabb", new { controller = "Autodesk", action = "StandardNetFabb" });
            //Prenium
            routes.MapRoute("preniumnetfabb", "autodesk/preniumNetFabb", new { controller = "Autodesk", action = "PreniumNetFabb" });
            //ultimate
            routes.MapRoute("ultimatenetfabb", "autodesk/ultimateNetFabb", new { controller = "Autodesk", action = "UltimateNetFabb" });
            //26 - 7 - 2019 KHOA {
            //WORKNC
            routes.MapRoute("WorkNC_FiveAxisMachining", "worknc/five-axis-machining", new { controller = "WorkNC", action = "FiveAxisMachining" });
            routes.MapRoute("WorkNC_CADFunction", "worknc/cad-function", new { controller = "WorkNC", action = "CADFunction" });
            routes.MapRoute("WorkNC_Function2Axis", "worknc/function-2-axis", new { controller = "WorkNC", action = "Function2Axis" });
            routes.MapRoute("WorkNC_Function3Axis", "worknc/function-3-axis", new { controller = "WorkNC", action = "Function3Axis" });
            routes.MapRoute("WorkNC_Function5Axis", "worknc/function-5-axis", new { controller = "WorkNC", action = "Function5Axis" });
            routes.MapRoute("WorkNC_WorkNCDesigner", "worknc/worknc-designer", new { controller = "WorkNC", action = "WorkNCDesigner" });

            routes.MapRoute("WorkNC_Overview", "worknc/overview", new { controller = "WorkNC", action = "Overview" });
            routes.MapRoute("WorkNC_Specification", "worknc/specification", new { controller = "WorkNC", action = "Specification" });
            routes.MapRoute("WorkNC_Index", "worknc", new { controller = "WorkNC", action = "Index" });
            routes.MapRoute("WorkNC_Video", "worknc/worknc_vdo", new { controller = "WorkNC", action = "WorkNCVideo" });

            //EUREKA
            routes.MapRoute("Eureka_Index", "eureka", new { controller = "Eureka", action = "Index" });
            routes.MapRoute("Eureka_Overview", "eureka/overview", new { controller = "Eureka", action = "Overview" });
            routes.MapRoute("Eureka_Specifications", "eureka/specifications", new { controller = "Eureka", action = "Specifications", slug = UrlParameter.Optional });
            routes.MapRoute("Eureka_CaseStudy", "eureka/caseStudy", new { controller = "Eureka", action = "CaseStudy" });
            //}

            //30 - 7 -2019 QUY{
            //GEOMAGIC_CX
            routes.MapRoute("Geomagic_CX", "geomagiccx", new { controller = "GeomagicCX", action = "Index" });
            routes.MapRoute("Geomagic_Function", "geomagiccx/function", new { controller = "GeomagicCX", action = "Function" });
            routes.MapRoute("Geomagic_Controlx_Overview", "geomagiccx/controlx-overview", new { controller = "GeomagicCX", action = "ControlxOverview" });
            routes.MapRoute("Geomagic_Function2018", "geomagiccx/function2018", new { controller = "GeomagicCX", action = "Function2018" });
            routes.MapRoute("Geomagic_Function2018_1", "geomagiccx/function2018-1", new { controller = "GeomagicCX", action = "Function20181" });
            routes.MapRoute("Geomagic_Overview", "geomagiccx/overview", new { controller = "GeomagicCX", action = "Overview" });
            //}

            //31 - 7 -2019 QUY{
            routes.MapRoute("Spinfire_Index", "spinfire", new { controller = "Spinfire", action = "Index" });
            routes.MapRoute("Spinfire_Ultimate", "spinfire/ultimate", new { controller = "Spinfire", action = "Ultimate" });
            routes.MapRoute("Spinfire_Specification", "spinfire/specification", new { controller = "Spinfire", action = "Specification" });
            routes.MapRoute("Spinfire_Overview", "spinfire/overview", new { controller = "Spinfire", action = "Overview" });
            routes.MapRoute("Spinfire_Gallery", "spinfire/gallery", new { controller = "Spinfire", action = "Gallery" });


            routes.MapRoute("Ncspeed_Index", "ncspeed", new { controller = "ncspeed", action = "Index" });
            routes.MapRoute("Ncspeed_Function", "ncspeed/function", new { controller = "ncspeed", action = "Function" });


            routes.MapRoute("Surfcam_Index", "surfcam", new { controller = "Surfcam", action = "Index" });
            routes.MapRoute("Surfcam_Vdo", "surfcam/vdo", new { controller = "Surfcam", action = "Vdo" });
            routes.MapRoute("Surfcam_Specifications", "surfcam/specifications", new { controller = "Surfcam", action = "Specifications" });
            routes.MapRoute("Surfcam_Evo", "surfcam/evo", new { controller = "Surfcam", action = "Evo" });
            //routes.MapRoute("Surfcam_Regdownload", "surfcam/regdownload", new { controller = "Surfcam", action = "Regdownload" });
            routes.MapRoute("Surfcam_Overview", "surfcam/overview", new { controller = "Surfcam", action = "Overview" });


            routes.MapRoute("Visualmill_Index", "visualmill", new { controller = "Visualmill", action = "Index" });
            routes.MapRoute("Visualmill_Regdownload", "regdownload", new { controller = "Visualmill", action = "Regdownload" });
            routes.MapRoute("Visualmill_Specification", "visualmill/specification", new { controller = "visualmill", action = "Specification" });
            routes.MapRoute("Visualmill_Overview", "visualmill/overview", new { controller = "Visualmill", action = "Overview" });

            //}

            //30 - 7 -2019 QUY{
            //routes.MapRoute("DetailsBlog", "DetailsBlog", new { controller = "DetailsBlog", action = "Index" });
            //routes.MapRoute("BlogOverview", "OverviewBlog", new { controller = "DetailsBlog", action = "BlogOverview" });
            //routes.MapRoute("Blog1", "Blog1", new { controller = "DetailsBlog", action = "Blog1" });
            //routes.MapRoute("Blog2", "Blog2", new { controller = "DetailsBlog", action = "Blog2" });
            //routes.MapRoute("Blog3", "Blog3", new { controller = "DetailsBlog", action = "Blog3" });
            //routes.MapRoute("Blog4", "Blog4", new { controller = "DetailsBlog", action = "Blog4" });
            //routes.MapRoute("Blog5", "Blog5", new { controller = "DetailsBlog", action = "Blog5" });
            //19-8
            //routes.MapRoute("DetailsBlog", "DetailsBlog", new {controller = "DetailsBlog", action = "BlogOverview"});
            //}


            routes.MapRoute("3DScanningSlug", "artec3D/{ProductName}", new { controller = "ProductScanning", action = "Detail", ProductName = UrlParameter.Optional });
            routes.MapRoute("commingsoon", "comming-soon", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });
            routes.MapRoute("ProductScanning", "3d-scanning", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });
            routes.MapRoute("ProductPrinting", "3d-printing", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });
            routes.MapRoute("ProductModeling", "3d-Modeling", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });
            routes.MapRoute("ProductManufactory", "3d-Manufactoring", new { controller = "ProductHome", action = "Index", slug = UrlParameter.Optional });

            //tesst
           // routes.MapRoute("UnSubcribe", "UnSubscribe", new { controller = "UnSubcribe", action = "Index", slug = UrlParameter.Optional });


            //Page blogs
            //routes.MapRoute("blogdetail", "blogDetail", new { controller = "BlogDetail", action = "BlogsDetail", slug = UrlParameter.Optional });
            //routes.MapRoute("blogoverview", "blogOverview", new { controller = "BlogDetail", action = "BlogsOverview", slug = UrlParameter.Optional });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }


    }
}
