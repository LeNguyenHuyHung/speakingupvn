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
    public class GeomagicController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public GeomagicController(IProductService productService, IBlogService blogService,
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
        // GET: /Geomagic/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "geomagic";
            var model = _blogService.GetBlogByUrlName("geomagic");//Tinh
            return View(model);     
        }
        public ActionResult OverviewGeo()
        {
            ViewBag.ReturnUrl = "/geomagic/overviewgeo";
            var model = _productService.GetProductBySlug("overview-geomagic-30");
            return View(model);
        }
        public ActionResult Specification()
        {
            ViewBag.ReturnUrl = "/geomagic/specification";
            //specification-geomagic-31
            var model = _productService.GetProductBySlug("specification-geomagic-31");//Dong
            return View(model);
        }
	}
}