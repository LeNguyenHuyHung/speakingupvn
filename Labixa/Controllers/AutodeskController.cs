using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Labixa.Models;
using Outsourcing.Service;
using Outsourcing.Data.Models;
using PagedList;
using Labixa.ViewModels;
using Labixa.Helpers;
using Outsourcing.Core.Common;
using Labixa.Areas.Admin.ViewModel;
using Outsourcing.Core.Framework.Controllers;
using AutoMapper;
using Microsoft.Ajax.Utilities;
using System.Net.Mail;
using System.Net;
namespace Labixa.Controllers
{
    public class AutodeskController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public NetworkCredential Credentials { get; private set; }
        public bool EnableSsl { get; private set; }
        public string From { get; private set; }
        public string skype { get; private set; }
        public string Description { get; private set; }
        public string Name { get; private set; }
        public AutodeskController(IProductService productService, IBlogService blogService,
IWebsiteAttributeService websiteAttributeService, IBlogCategoryService blogCategoryService,
IStaffService staffService, IProductAttributeMappingService productAttributeMappingService,
IProductRelationshipService productRelationshipService, IProductCategoryService productcategoryService)
        {
            Log.Info("sssshahaha");
            this._productService = productService;
            this._blogService = blogService;
            this._websiteAttributeService = websiteAttributeService;
            this._blogCategoryService = blogCategoryService;
            this._staffService = staffService;
            this._productAttributeMappingService = productAttributeMappingService;
            this._productRelationshipService = productRelationshipService;
            this._productcategoryService = productcategoryService;
        }

        // GET: /Autodesk/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "/autodesk";
            var model = _blogService.GetBlogByUrlName("autodesk");//lấy slug trong sql
            return View(model);
        }
        public ActionResult OverViewNetFabb()
        {
            ViewBag.ReturnUrl = "/autodesk/overviewnetfabb";
            var model = _productService.GetProductBySlug("overview-autodesk-7");//lấy slug trong sql
            return View(model);
        }
        public ActionResult NetFabbv2018()
        {
            ViewBag.ReturnUrl = "/autodesk/netfabbv2018";
            var model = _productService.GetProductBySlug("netfabbv2018-markforge-29");//lấy slug trong sql
            return View(model); 
        }
        public ActionResult SpecificationAutodesk()
        {
            ViewBag.ReturnUrl = "/autodesk/specificationautodesk";
            var model = _productService.GetProductBySlug("specification-autodesk-8");//lấy slug trong sql
            return View(model);
        }

        // public ActionResult OverviewAutoDesk()
        // {
        //   return View();
        //  }

        public ActionResult PreniumNetFabb()
        {
            ViewBag.ReturnUrl = "/autodesk/preniumnetfabb";
            var model = _productService.GetProductBySlug("preniumnetfabb-38");//lấy slug trong sql
            return View(model);
        }
        //UltimateNetFabb
        public ActionResult UltimateNetFabb()
        {
            ViewBag.ReturnUrl = "/autodesk/ultimatenetfabb";
            var model = _productService.GetProductBySlug("ultimatenetfabb-39");//lấy slug trong sql
            return View(model);
        }
        public ActionResult StandardNetFabb()
        {
            ViewBag.ReturnUrl = "/autodesk/standardnetfabb";
            var model = _productService.GetProductBySlug("standardnetfabb-37");
            return View(model);
        }
        public ActionResult Regdownloadnetfabb()
        {
            ViewBag.ReturnUrl = "Regdownloadnetfabb";
            var model = _productService.GetProductBySlug("download-program-try-version");
            return View(model);
        }
        //public ActionResult PreniumNetFabb()
        //{
        //    var model = _productService.GetProductBySlug("specification-autodesk-8");
        //    return View(model);
        //}
        public ActionResult Ultimate()
        {
            
            var model = _productService.GetProductBySlug("specification-autodesk-8");
            return View(model);
        }
    }
}