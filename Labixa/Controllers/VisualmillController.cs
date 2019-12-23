
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
    public class VisualmillController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public VisualmillController(IProductService productService, IBlogService blogService,
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
        // GET: /Visualmill/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "visualmill";
            var model = _blogService.GetBlogByUrlName("visualmil");
            return View(model);
        }
        public ActionResult Specification()
        {
            ViewBag.ReturnUrl = "/visualmill/specification";
            var model = _productService.GetProductBySlug("specification-visualmil-47");
            return View(model);
        }
        public ActionResult Regdownload()
        {
            ViewBag.ReturnUrl = "Visualmill_Regdownload";
            var model = _productService.GetProductBySlug("download-visualmil-48");
            return View(model);
        }
        public ActionResult Overview()
        {
            ViewBag.ReturnUrl = "/visualmill/overview";
            var model = _productService.GetProductBySlug("overview-visualmil-46");
            return View(model);
        }
    }
}