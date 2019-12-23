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
    public class Artec3DController : BaseHomeController
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

        //private readonly I ;
        // log4net.ILog logger = log4net.LogManager.GetLogger(typeof(HomeController));  //Declaring Log4Net

        public Artec3DController(IProductService productService, IBlogService blogService,
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
        //
        // GET: /Artec3D/

        /// <summary>
        /// Index Error
        /// </summary>
        /// <returns></returns>
        /// 
        
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "Artec3d";
            var model = _blogService.GetBlogByUrlName("artec-3d");//lấy slug trong sql
            return View(model);
            //return View();
        }
        
        public ActionResult Overview()
        {
            return View();
        }
        public ActionResult ArtecEva()
        {
            ViewBag.ReturnUrl = "arteceva";
            var model = _productService.GetProductBySlug("artec-eva-2");//lấy slug trong sql
            return View(model);
        }
        public ActionResult ArtecEvaLite()
        {
            ViewBag.ReturnUrl = "artecEvaLite";
            var model = _productService.GetProductBySlug("artec-eva-lite-1");
            return View(model);
        }
        public ActionResult artecSpaceSpider()
        {
            ViewBag.ReturnUrl = "artecspacespider";
            var model = _productService.GetProductBySlug("artecspacespider-9");
            return View(model);
        }
        public ActionResult ArtecLeo()
        {
            ViewBag.ReturnUrl = "artecleo";
            //artecleo-10
            var model = _productService.GetProductBySlug("artecleo-10");
            return View(model);
        }
        public ActionResult ArtecRay()
        {
            ViewBag.ReturnUrl = "artecRay";
            var model = _productService.GetProductBySlug("artecray-11");
            return View(model);
        }
        public ActionResult RoboticScan()
        {
            ViewBag.ReturnUrl = "roboticscan";
            var model = _productService.GetProductBySlug("roboticscan-12");
            return View(model);
        }
        public ActionResult EducationalPackages()
        {
            ViewBag.ReturnUrl = "educationalpackages";
            //educationalpackage-13
            var model = _productService.GetProductBySlug("educationalpackage-13");
            return View(model);
        }
        public ActionResult ArtecStudio13()
        {
            ViewBag.ReturnUrl = "artecstudio13";
            var model = _productService.GetProductBySlug("artecstudiio13-16");
            return View(model);
        }
        public ActionResult ScanAppForMac()
        {
            ViewBag.ReturnUrl = "scanappformac";
            var model = _productService.GetProductBySlug("scanappformac-23");
            return View(model);
        }
        public ActionResult ArtecSDK()
        {
            ViewBag.ReturnUrl = "artecsdk";
            var model = _productService.GetProductBySlug("artecsdk-24");
            return View(model);
        }
        public ActionResult ScanToSolidworks()
        {
            ViewBag.ReturnUrl = "scanToSolidworks";
            var model = _productService.GetProductBySlug("solidworks-25");
            return View(model);
        }
        public ActionResult ArtecScaner()
        {
            ViewBag.ReturnUrl = "artecscaner";
            //artec-scanner-27
            var model = _productService.GetProductBySlug("artec-scanner-27");//lấy slug trong sql
            return View(model);
        }
        public ActionResult ArtecStudio()
        {
            ViewBag.ReturnUrl = "artecstudio";
            var model = _productService.GetProductBySlug("artec-studio-28");//lấy slug trong sql
            return View(model);
        }
        public ActionResult SoftWare()
        {
            ViewBag.ReturnUrl = "3dsoftware";
            var model = _blogService.GetBlogByUrlName("3dsoftware");//lấy slug trong sql
            return View(model);
        }
        public ActionResult GeoMagicWrap()
        {
            ViewBag.ReturnUrl = "geomagicwrap";
            //geomagicwrap-26
            var model = _productService.GetProductBySlug("geomagicwrap-26");//lấy slug trong sql
            return View(model);
        }
        public ActionResult OverView3D()
        {
            ViewBag.ReturnUrl = "/overview3d";
            //geomagicwrap-26
            var model = _productService.GetProductBySlug("overview3d-artec-68");//lấy slug trong sql
            return View(model);
        }
        public ActionResult OverView3D1()
        {        
            return View();
        }
    }
}