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
    public class WorkNCController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public WorkNCController(IProductService productService, IBlogService blogService,
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
        // GET: /WorkNC/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "worknc";
            var model = _blogService.GetBlogByUrlName("worknc");
            return View(model);
        }

        public ActionResult FiveAxisMachining()
        {
            ViewBag.ReturnUrl = "/worknc/five-axis-machining";
            var model = _productService.GetProductBySlug("fiveaxismachining-worknc-52");
            return View(model);
        }

        public ActionResult Overview()
        {
            ViewBag.ReturnUrl = "/worknc/overview";
            var model = _productService.GetProductBySlug("overview-worknc-40");
            return View(model);
        }

        //<--Specification
        public ActionResult Specification()
        {
            ViewBag.ReturnUrl = "/worknc/specification";
            var model = _productService.GetProductBySlug("specification-worknc-41");
            return View(model);
        }
        public ActionResult CADFunction()
        {
            ViewBag.ReturnUrl = "/worknc/cad-function";
            var model = _productService.GetProductBySlug("cadfunction-worknc-51");
            return View(model);
        }
        public ActionResult Function2Axis()
        {
            ViewBag.ReturnUrl = "/worknc/function-2-axis";
            var model = _productService.GetProductBySlug("function2axis-53");
            return View(model);
        }
        public ActionResult Function3Axis()
        {
            ViewBag.ReturnUrl = "/worknc/function-3-axis";
            var model = _productService.GetProductBySlug("function3axis-worknc-54");
            return View(model);
        }
        public ActionResult Function5Axis()
        {
            ViewBag.ReturnUrl = "/worknc/function-5-axis";
            var model = _productService.GetProductBySlug("function5axis-worknc-55");
            return View(model);
        }
        public ActionResult WorkNCDesigner()
        {
            ViewBag.ReturnUrl = "/worknc/worknc-designer";
            var model = _productService.GetProductBySlug("workncdesigner-56");
            return View(model);
        }
        //Specification-->

        public ActionResult WorkNCVideo()
        {
            ViewBag.ReturnUrl = "/worknc/worknc_vdo";
            var model = _productService.GetProductBySlug("video-worknc-42");
            return View(model);
        }
    }
}