using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Outsourcing.Data;
using FluentValidation.Mvc;
using System.IO;
using System.IO.Compression;

namespace Labixa
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            
              //AreaRegistration.RegisterAllAreas();
              //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
              //RouteConfig.RegisterRoutes(RouteTable.Routes);
              //BundleConfig.RegisterBundles(BundleTable.Bundles);
              log4net.Config.XmlConfigurator.Configure();

            //System.Data.Entity.Database.SetInitializer<OutsourcingSampleData>(null);
            ////System.Data.Entity.Database.SetInitializer(new OutsourcingSampleData());
            System.Data.Entity.Database.SetInitializer<OutsourcingEntities>(null);
            //System.Data.Entity.Database.SetInitializer(new OutsourcingSampleData());
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            Bootstrapper.Run();
            FluentValidationModelValidatorProvider.Configure();//cấu hình cho fluent validation
        }  
		protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication app = (HttpApplication)sender;
            string acceptEncoding = app.Request.Headers["Accept-Encoding"];
            System.IO.Stream prevUncompressedStream = app.Response.Filter;

            if (acceptEncoding == null || acceptEncoding.Length == 0)
                return;

            acceptEncoding = acceptEncoding.ToLower();

            if (acceptEncoding.Contains("gzip"))
            {
                // gzip
                app.Response.Filter = new System.IO.Compression.GZipStream(prevUncompressedStream,
                System.IO.Compression.CompressionMode.Compress);
                app.Response.AppendHeader("Content-Encoding",
                "gzip");
            }
            else if (acceptEncoding.Contains("deflate"))
            {
                // defalte
                app.Response.Filter = new System.IO.Compression.DeflateStream(prevUncompressedStream,
                System.IO.Compression.CompressionMode.Compress);
                app.Response.AppendHeader("Content-Encoding",
                "deflate");
            }
        }
    }

}
