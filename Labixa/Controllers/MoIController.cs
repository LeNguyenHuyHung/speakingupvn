﻿using System;
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
    public class MoiController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public MoiController(IProductService productService, IBlogService blogService,
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
        // GET: /MoI/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "moi";
            var model = _blogService.GetBlogByUrlName("moi");
            return View(model);
        }
        public ActionResult Overview()
        {
            ViewBag.ReturnUrl = "/moi/overview";
            var model = _productService.GetProductBySlug("overview-moi-49");
            return View(model);
        }
        public ActionResult MainFunction()
        {
            ViewBag.ReturnUrl = "/moi/mainfunction";
            var model = _productService.GetProductBySlug("main-function-moi-33");
            return View(model);
        }
        public ActionResult WorkFlow()
        {
            ViewBag.ReturnUrl = "/moi/workflow";
            var model = _productService.GetProductBySlug("workflow-moi-34");
            return View(model);
        }
        public ActionResult Gallery()
        {
            ViewBag.ReturnUrl = "/moi/gallery";
            var model = _productService.GetProductBySlug("gallery-35");
            return View(model);
        }
        public ActionResult MoiV3()
        {
            ViewBag.ReturnUrl = "/moi/moiv3";
            var model = _productService.GetProductBySlug("moiv3-50");
            return View(model);
        }
    }
}