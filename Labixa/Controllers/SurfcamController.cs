
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
    public class SurfcamController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public SurfcamController(IProductService productService, IBlogService blogService,
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
        // GET: /Surfcam/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "surfcam";
            var model = _blogService.GetBlogByUrlName("surfcam");
            return View(model);
        }

        public ActionResult Vdo()
        {
            ViewBag.ReturnUrl = "/surfcam/vdo";
            var model = _productService.GetProductBySlug("vdo-surfcam-64");
            return View(model);
        }
        public ActionResult Specifications()
        {
            ViewBag.ReturnUrl = "/surfcam/specifications";
            var model = _productService.GetProductBySlug("specifications-surfcam-63");
            return View(model);
        }
        public ActionResult Evo()
        {
            ViewBag.ReturnUrl = "/surfcam/evo";
            var model = _productService.GetProductBySlug("evo-surfcam-65");
            return View(model);
        }
        public ActionResult Regdownload()
        {
            ViewBag.ReturnUrl = "Regdownload";
            var model = _productService.GetProductBySlug("regdownload-surfcam-62");
            return View(model);
        }
        public ActionResult Overview()
        {
            ViewBag.ReturnUrl = "/surfcam/overview";
            var model = _productService.GetProductBySlug("overview-surfcam-61");
            return View(model);
        }
    }
}